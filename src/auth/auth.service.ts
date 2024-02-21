import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';

import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt'

import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtPayload } from './interface/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtServie: JwtService,
  ) { }

  async create(createUserDto: CreateUserDto) {
    try {

      const { password, ...userData } = createUserDto
      const user = this.userRepository.create({
        ...userData,
        password: bcrypt.hashSync(password, 10)
      })

      const test = await this.userRepository.save(user)
      delete user.password

      // console.log(test, ': ademas :', user);

      return {
        ...user,
        token: this.getJwtToken({ id: user.id })
      }

    } catch (error) {
      this.handleDbErrors(error)
    }
  }

  async login(loginUserDto: LoginUserDto) {
    const { password, email } = loginUserDto

    const user = await this.userRepository.findOne({
      where: { email },
      select: {
        id: true,
        password: true,
        isActive: true,
        fullName: true,
        roles: true
      }
    })

    if (!user)
      throw new UnauthorizedException('Email no registrado.')

    if (!bcrypt.compareSync(password, user.password))
      throw new UnauthorizedException('Credenciales invalidas.')


    const { password: omitPassword, ...userNoPassword } = user
    return {
      user: userNoPassword,
      token: this.getJwtToken({ id: user.id })
    }
  }

  async checkAuthStatus(user: User) {
    return {
      user,
      token: this.getJwtToken({ id: user.id })
    }
  }

  private getJwtToken(payload: JwtPayload) {
    const expiresIn = '1h'
    const token = this.jwtServie.sign(payload,{expiresIn});
    return token
  }

  private handleDbErrors(error: any): never {
    if (error.code === '23505') {
      throw new BadRequestException(error.detail)
    }

    console.log(error);
    throw new InternalServerErrorException('Revisar logs del servidor.')
  }

}
