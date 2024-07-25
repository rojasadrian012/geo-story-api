import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { SeedService } from './seed.service';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ValidRoles } from 'src/auth/interface/valid-roles';

@ApiTags('Seed')
@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @Get()
  // @Auth(ValidRoles.superUser)
  executeSeed() {
    return this.seedService.runSedd();
  }

  @Get('by-client')
  @Auth(ValidRoles.admin)
  executeSeedByClient() {
    return this.seedService.runSedd();
  }
}
