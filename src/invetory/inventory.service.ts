import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Logger } from '@nestjs/common';

import { DataSource, Repository } from 'typeorm';

import { CreateInvetoryDto } from './dto/create-inventory.dto';
import { UpdateInvetoryDto } from './dto/update-inventory.dto';
import { Inventory } from './entities/inventory.entity';
import { User } from '../auth/entities/user.entity';
import { VehicleService } from 'src/vehicle/vehicle.service';
import { Question } from './entities/question.entity';
import { DataInventoryAnswersDto } from './dto/data-inventory-answers.dto';
import { InventoryChecklistItem } from './entities/inventory-checklist-item.entity';
import { GeneralInventory } from './entities/general-inventory.entity';
import { GeneralInventoryDto } from './interfaces/general-inventory.interface';
import { CreateGeneralInventoryDto } from './dto/create-general-inventory.dto';
import { CreateVehicleDto } from 'src/vehicle/dto/create-vehicle.dto';
import { Vehicle } from 'src/vehicle/entities/vehicle.entity';
import { UpdateGeneralInventory } from './dto/update-general-inventory.dto';

@Injectable()
export class InventoryService {
  private readonly logger = new Logger('InventoyService');

  constructor(
    @InjectRepository(Inventory)
    private readonly inventoryRepository: Repository<Inventory>,
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,
    @InjectRepository(InventoryChecklistItem)
    private readonly inventoryChecklistItemRepository: Repository<InventoryChecklistItem>,
    @InjectRepository(GeneralInventory)
    private readonly generalInventoryRepository: Repository<GeneralInventory>,
    @InjectRepository(Vehicle)
    private readonly vehicleRepository: Repository<Vehicle>,

    private readonly vehicleService: VehicleService,
    private readonly dataSource: DataSource,
  ) {}

  async create(createInventoryDto: CreateInvetoryDto, user: User) {
    try {
      const { vehicle, ...restInventory } = createInventoryDto;
      const newVehicle = await this.vehicleService.create(vehicle, user); //TODO: no es necesario poner el usuario en el vehiculo por que va en el inventario

      const savedInventory = await this.inventoryRepository.insert({
        creatorUser: user,
        vehicle: newVehicle,
        ...restInventory,
      });
      return { newInventory: savedInventory };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async findAll() {
    //TODO: PAGINAR
    const inventorys = await this.inventoryRepository.find({
      // select:[
      //   'id',
      //   'status',
      //   'observation',
      //   'kilometers',
      //   'creatorUser'
      // ],
    });
    return inventorys;
  }

  async findOne(id: string) {
    const query = this.inventoryRepository.createQueryBuilder('inventoryById');
    const inventory = await query
      .leftJoinAndSelect('inventoryById.lastUserEdited', 'lastUserEdited')
      .leftJoinAndSelect('inventoryById.creatorUser', 'creatorUser')
      .leftJoinAndSelect('inventoryById.vehicle', 'vehicle')
      .where('inventoryById.id = :id', { id })
      .getOne();

    return inventory;
  }
  update(id: number, updateInvetoryDto: UpdateInvetoryDto) {
    return `This action updates a #${id} invetory`;
  }

  remove(id: number) {
    return `This action removes a #${id} invetory`;
  }

  async findAllQuestionsWithQueryBuilder(): Promise<Question[]> {
    return await this.questionRepository.find();
  }

  async createInventoryAnswers(dataInventoryAnswers: DataInventoryAnswersDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const { inventoryId, answers } = dataInventoryAnswers;
      const inventory = await this.findOne(inventoryId);

      await Promise.all(
        answers.map(async (answer) => {
          const newAnswer = this.inventoryChecklistItemRepository.create({
            inventory,
            response: answer.response,
            question: answer.question,
          });

          await queryRunner.manager.save(newAnswer);
        }),
      );

      await queryRunner.commitTransaction();
      await queryRunner.release();

      return 'todo ok'; //!REVISAR por alguna razon de retorna null
    } catch (error) {
      await queryRunner.rollbackTransaction();
      await queryRunner.release();

      this.handleDataBaseExceptions(error);
    }
  }

  private handleDataBaseExceptions(error: any) {
    if (error.code === '23505')
      throw new BadRequestException('Registro ya existe. ' + error.detail);
    this.logger.log(error);
    throw new InternalServerErrorException(
      'Error no registrado, revisar logs del servidor.',
    );
  }

  async getAllInventoryChecklist(id: string) {
    return await this.inventoryChecklistItemRepository.find({
      relations: ['question'],
      where: {
        inventory: { id },
      },
    });
  }

  //TODO: Paginar
  async findAllGeneralInventories() {
    const inventories = await this.generalInventoryRepository.find({
      relations: {
        beforeChange: {
          vehicle: true,
        },
      },
    });
    //   console.log(inventory);

    //   inventoriesDto.push({
    //     id: inventory.id,
    //     status:
    //       inventory.afterChange.status === undefined
    //         ? 'complete'
    //         : inventory.afterChange.status,
    //     observation: inventory.beforeChange.observation,
    //     kilometers: inventory.beforeChange.kilometers,
    //     createdAt: inventory.beforeChange.createdAt.toString(),
    //     vehicle: {
    //       id: inventory.beforeChange.vehicle.id,
    //       model: inventory.beforeChange.vehicle.model,
    //       brand: inventory.beforeChange.vehicle.brand,
    //       color: inventory.beforeChange.vehicle.color,
    //       chassis: inventory.beforeChange.vehicle.chassis,
    //       images: inventory.beforeChange.vehicle.images,
    //     },
    //   });
    // });

    return inventories;
  }

  async findOneByChassis(chassis: string): Promise<GeneralInventoryDto> {
    try {
      const response = await this.generalInventoryRepository.findOne({
        relations: {
          beforeChange: {
            vehicle: true,
          },
        },
        where: {
          beforeChange: {
            vehicle: {
              chassis: chassis,
            },
          },
        },
      });

      const { id, beforeChange } = response;
      const { vehicle } = beforeChange;

      const generalInventoryDto: GeneralInventoryDto = {
        id: id,
        beforeChange: {
          id: beforeChange.id,
          status: beforeChange.status,
          observation: beforeChange.observation,
          kilometers: beforeChange.kilometers.toString(),
          createdAt: beforeChange.createdAt.toString(),
          vehicle: {
            id: vehicle.id,
            brand: vehicle.brand,
            model: vehicle.model,
            chassis: vehicle.chassis,
            color: vehicle.color,
            images: vehicle.images,
          },
        },
      };

      return generalInventoryDto;
    } catch (error) {
      throw error;
    }
  }

  async findGeneralInventoryById(id: string) {
    try {
      const generalInventory = await this.generalInventoryRepository.findOne({
        relations: {
          beforeChange: {
            vehicle: true,
            creatorUser: true,
            lastUserEdited: true,
          },
          afterChange: {
            vehicle: true,
            creatorUser: true,
            lastUserEdited: true,
          },
        },
        where: {
          id,
        },
      });

      return generalInventory;
    } catch (error) {
      throw error;
    }
  }

  async createBeforeGeneralInventory(
    data: CreateGeneralInventoryDto,
    user: User,
  ) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const { inventory, inventory_checklist_items } = data;
      const { vehicle } = inventory;

      const vehicleDto = this.vehicleRepository.create({
        brand: vehicle.brand,
        chassis: vehicle.chassis,
        color: vehicle.color,
        model: vehicle.model, //TODO: ojo el user en la entity de vehicle en los demas lugares, solo debe ir en inventory
        images: [],
      });
      const newVehicles = await queryRunner.manager.save(vehicleDto);

      const inventoryDto = this.inventoryRepository.create({
        status: inventory.status,
        observation: inventory.observation,
        kilometers: inventory.kilometers,
        creatorUser: user,
        vehicle: newVehicles,
      });
      const newInventory = await queryRunner.manager.save(inventoryDto);

      const generalInventoryDto = this.generalInventoryRepository.create({
        beforeChange: newInventory,
      });
      const newGeneralInventory =
        await queryRunner.manager.save(generalInventoryDto);

      const inventoryChecklistItems: InventoryChecklistItem[] = [];
      for (const key in inventory_checklist_items) {
        inventoryChecklistItems.push(
          this.inventoryChecklistItemRepository.create({
            inventory: newInventory,
            response: inventory_checklist_items[key],
            question: {
              id: key,
            },
          }),
        );
      }
      const newInventoryChecklistItems = await queryRunner.manager.save(
        inventoryChecklistItems,
      );

      await queryRunner.commitTransaction();
      await queryRunner.release();

      return true;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      await queryRunner.release();
    }
  }

  async updateAfterGeneralInventory(
    id: string,
    updateVehicleDto: UpdateGeneralInventory,
    user: User,
  ) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const { inventory, inventory_checklist_items } = updateVehicleDto;

      const generalInventory = await this.generalInventoryRepository.findOne({
        where: {
          id,
        },
        relations: {
          beforeChange: {
            vehicle: true,
          },
          afterChange: true,
        },
      });

      console.log({ generalInventory });

      const { beforeChange } = generalInventory;
      const { vehicle } = beforeChange;

      const newInventory = this.inventoryRepository.create({
        status: inventory.status,
        kilometers: inventory.kilometers,
        observation: inventory.observation,
        vehicle,
        lastUserEdited: user,
      });

      generalInventory.afterChange = { ...newInventory };

      await this.generalInventoryRepository.save(generalInventory);

      // const inventoryChecklistItems: InventoryChecklistItem[] = [];
      // for (const key in inventory_checklist_items) {
      //   inventoryChecklistItems.push(
      //     this.inventoryChecklistItemRepository.create({
      //       inventory: {
      //         id: generalInventory.id,
      //       },
      //       response: inventory_checklist_items[key],
      //       question: {
      //         id: key,
      //       },
      //     }),
      //   );
      // }
      // await this.inventoryChecklistItemRepository.save(inventoryChecklistItems);

      await queryRunner.commitTransaction();
      await queryRunner.release();

      return true;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      throw error; // Re-throw the error to handle it further up the call stack
    }
  }
}
