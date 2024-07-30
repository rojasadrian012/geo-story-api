import { Controller, Get } from '@nestjs/common';

import { AppService } from './app.service';

// @Auth()//TODO: ver como hacer autenticacion en todos los modulos
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
