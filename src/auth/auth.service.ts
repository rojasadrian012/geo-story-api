import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';

import { ILike, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtPayload } from './interface/jwt-payload.interface';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserQuiz } from 'src/quiz/entities/userQuiz.entity';
import { Quiz } from 'src/quiz/entities/quiz.entity';
import { SearchUserDto } from './dto/search-user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Quiz)
    private readonly quizRepository: Repository<Quiz>,
    @InjectRepository(UserQuiz)
    private readonly userQuizRepository: Repository<UserQuiz>,

    private readonly jwtServie: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const { password, ...userData } = createUserDto;
      const user = this.userRepository.create({
        ...userData,
        password: bcrypt.hashSync(password, 10),
      });

      await this.userRepository.save(user);
      delete user.password;

      const quizzes = await this.quizRepository.find({
        select: {
          id: true,
          difficulty: true,
        },
      });

      const userQuizzes = [];

      quizzes.forEach((quiz) => {
        if (quiz.difficulty != 1) {
          userQuizzes.push(
            this.userQuizRepository.create({
              quiz,
              user,
            }),
          );
        } else {
          userQuizzes.push(
            this.userQuizRepository.create({
              quiz,
              user,
              unlockLevel: true,
            }),
          );
        }
      });

      await this.userQuizRepository.save(userQuizzes);

      return {
        ...user,
        token: this.getJwtToken({ id: user.id }),
      };
    } catch (error) {
      this.handleDbErrors(error);
    }
  }

  async login(loginUserDto: LoginUserDto) {
    const { password, nickname: nickname } = loginUserDto;

    const user = await this.userRepository.findOne({
      where: { nickname: nickname },
      select: {
        id: true,
        password: true,
        isActive: true,
        fullName: true,
        roles: true,
        nickname: true,
      },
    });

    if (!user) throw new UnauthorizedException('Invalid User.');

    if (!user.isActive) throw new UnauthorizedException('User inactive.');

    if (!bcrypt.compareSync(password, user.password))
      throw new UnauthorizedException('Error Password.');

    const { password: omitPassword, ...userNoPassword } = user;
    return {
      user: userNoPassword,
      token: this.getJwtToken({ id: user.id }),
    };
  }

  async checkAuthStatus(user: User) {
    return {
      user,
      token: this.getJwtToken({ id: user.id }),
    };
  }

  private getJwtToken(payload: JwtPayload) {
    const expiresIn = '1h';
    const token = this.jwtServie.sign(payload, { expiresIn });
    return token;
  }

  private handleDbErrors(error: any): never {
    if (error.code === '23505') {
      throw new BadRequestException(error.detail);
    }

    console.error(error);
    throw new InternalServerErrorException('Revisar logs del servidor.');
  }

  async getUsers() {
    return this.userRepository.find({
      where: {
        isActive: true,
      },
    });
  }

  async updateUser(userUpdate: UpdateUserDto, id: string) {
    const user = await this.userRepository.preload({
      id,
      ...userUpdate,
    });

    if (!user) throw new NotFoundException(`User with id: ${id} not found.`);

    return this.userRepository.save(user);
  }

  async deleteUser(id: string) {
    const user = await this.userRepository.preload({
      id,
      isActive: false,
    });

    if (!user) throw new NotFoundException(`User with id: ${id} not found.`);

    return this.userRepository.save(user);
  }

  async searchUser(parameters: SearchUserDto) {
    const searchPattern = `%${parameters.parameters}%`; // Crea un patrón de búsqueda para LIKE

    const data = await this.userRepository.find({
      where: [
        { isActive: true, nickname: ILike(searchPattern) },
        { isActive: true, nickname: ILike(searchPattern) },
      ],
    });

    return data;
  }
}
