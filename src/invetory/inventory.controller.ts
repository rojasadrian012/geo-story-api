import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  Put,
} from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { CreateInvetoryDto } from './dto/create-inventory.dto';
import { UpdateInvetoryDto } from './dto/update-inventory.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { User } from 'src/auth/entities/user.entity';
import { DataInventoryAnswersDto } from './dto/data-inventory-answers.dto';
import { CreateGeneralInventoryDto } from './dto/create-general-inventory.dto';

@Auth()
@Controller('inventory')
export class InventoryController {
  constructor(private readonly invetoryService: InventoryService) {}

  @Post()
  create(@Body() createInvetoryDto: CreateInvetoryDto, @GetUser() user: User) {
    return this.invetoryService.create(createInvetoryDto, user);
  }

  @Get()
  findAll() {
    return this.invetoryService.findAll();
  }

  @Get('find/:id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.invetoryService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateInvetoryDto: UpdateInvetoryDto,
  ) {
    return this.invetoryService.update(+id, updateInvetoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.invetoryService.remove(+id);
  }

  @Get('questions')
  findAllQuestions() {
    return this.invetoryService.findAllQuestionsWithQueryBuilder();
  }

  @Post('create-inventory-answers')
  createInventoryAnswers(
    @Body() createInventoryAnswers: DataInventoryAnswersDto,
  ) {
    this.invetoryService.createInventoryAnswers(createInventoryAnswers);
  }

  @Get('inventory-checklist/:id')
  findInventoryChecklist(@Param('id', ParseUUIDPipe) id: string) {
    return this.invetoryService.getAllInventoryChecklist(id);
  }

  @Post('general-inventory')
  createBeforeGeneralInventories(
    @Body() data: CreateGeneralInventoryDto,
    @GetUser() user: User,
  ) {
    return this.invetoryService.createBeforeGeneralInventory(data, user);
  }

  @Get('general-inventory/beforechange')
  findAllGeneralInventpries() {
    return this.invetoryService.findAllGeneralInventories();
  }

  @Get('general-inventory/chassis/:chassis')
  findOneByChassis(@Param('chassis') chassis: string) {
    return this.invetoryService.findOneByChassis(chassis);
  }

  @Get('general-inventory/find/:id')
  findGeneralInventoryById(@Param('id', ParseUUIDPipe) id: string) {
    return this.invetoryService.findGeneralInventoryById(id);
  }

  @Put('general-inventory/update/:id')
  updateGeneralInventory(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateVehicleDto: any,
    @GetUser() user: User,
  ) {
    return this.invetoryService.updateAfterGeneralInventory(
      id,
      updateVehicleDto,
      user,
    );
  }
}
