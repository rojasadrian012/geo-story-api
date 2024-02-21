import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import * as bcrypt from 'bcrypt'
import { Repository } from 'typeorm';

import { VehicleService } from './../vehicle/vehicle.service';
import { initialData } from './data/seed-data';
import { User } from 'src/auth/entities/user.entity';
import { Inventory } from 'src/invetory/entities/inventory.entity';
import { Question } from 'src/invetory/entities/question.entity';

@Injectable()
export class SeedService {

  constructor(
    private readonly vehicleService: VehicleService,
    @InjectRepository(Inventory)
    private readonly inventoryRepository: Repository<Inventory>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>
  ) { }

  async runSedd() {
    await this.deleteTables();
    const firstUser = await this.insertUsers();
    const vehicles = await this.insertVehicles(firstUser);
    await this.insertInventories(vehicles, firstUser)
    await this.insertQuestions()
    
    return 'SEED EXECUTED.'
  }

  private async deleteTables() {
    const queryBuilderInventory = this.inventoryRepository.createQueryBuilder();
    queryBuilderInventory.delete().where({}).execute();
    await this.vehicleService.deleteAllVehicles();
    const queryBuilderUser = this.userRepository.createQueryBuilder();
    queryBuilderUser.delete().where({}).execute();

  }

  private async insertUsers() {
    const seedUsers = initialData.users
    const users: User[] = []

    seedUsers.forEach(user => {
      const { password, ...userData } = user
      users.push(this.userRepository.create({
        ...userData,
        password: bcrypt.hashSync(password, 10)
      }))
    })

    const dbUsers = await this.userRepository.save(users)
    return dbUsers[0]

  }

  private async insertVehicles(firstUser: User) {

    await this.vehicleService.deleteAllVehicles()
    const vehicles = initialData.vehicles;
    const insertPromises = []

    vehicles.forEach(vehicle => {
      insertPromises.push(this.vehicleService.create(vehicle, firstUser))
    })

    return await Promise.all(insertPromises)

  }

  private async insertInventories(vehicles, firstUser: User) {
    let sw = false
    const inventories = vehicles.map(vehicle => {
      const inventoryItem = new Inventory();
      inventoryItem.vehicle = vehicle.id;
      inventoryItem.creatorUser = firstUser
      inventoryItem.status = sw ? 'processing' : 'complete'
      inventoryItem.kilometers = 300
      sw = !sw
      return inventoryItem;
    });

    await this.inventoryRepository.save(inventories);
  }

  private async insertQuestions() {
    const seedQuestion = initialData.questions
    const questions: Question[] = []
    seedQuestion.forEach(question => {
      questions.push(this.questionRepository.create({
        ...question
      }))
    })
    this.questionRepository.save(questions)
  }
}
