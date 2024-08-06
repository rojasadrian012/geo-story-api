import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Res,
  SetMetadata,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { GetUser } from './decorators/get-user.decorator';
import { User } from './entities/user.entity';
import { Auth } from './decorators/auth.decorator';
import { ValidRoles } from './interface/valid-roles';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  //TODO: Cuando se crea usuarios por este endpoint solo se debe poder crear con privilegios de 'user', actualmente perdime 'admin'
  @Post('register')
  createUserForSeed(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @Post('login')
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Auth()
  @Get('check-token')
  checkAuthStatus(@GetUser() user: User) {
    return this.authService.checkAuthStatus(user);
  }

  @Auth(ValidRoles.admin)
  @Get('user/list')
  getUsers() {
    return this.authService.getUsers();
  }

  @Auth(ValidRoles.admin)
  @Patch('user/edit/:userId')
  updateUser(
    @Param('userID') userId: string,
    @Body() userToEdit: UpdateUserDto,
  ) {
    return this.authService.updateUser(userToEdit, userId);
  }

  @Auth(ValidRoles.admin)
  @Post('user/new')
  createUser(
    @Body() createUserDto: CreateUserDto
  ) {
    return this.authService.create(createUserDto);
  }

  @Auth(ValidRoles.admin)
  @Delete('user/delete/:userId')
  deleteUser(
    @Param('userId') userId: string,
  ) {
    return this.authService.deleteUser(userId);
  }
}
