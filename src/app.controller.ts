import { Controller, Get } from '@nestjs/common';

import { AppService } from './app.service';
import { Auth } from './auth/decorators/auth.decorator';

// @Auth()//TODO: ver como hacer autenticacion en todos los modulos
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
