import { PartialType } from '@nestjs/swagger';
import { CreateInvetoryDto } from './create-inventory.dto';

export class UpdateInvetoryDto extends PartialType(CreateInvetoryDto) {}
