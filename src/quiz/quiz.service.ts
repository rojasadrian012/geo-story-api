import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Quiz } from './entities/quiz.entity';
import { Repository } from 'typeorm';
import { Question } from './entities/question.entity';
import { Answer } from './entities/answer.entity';
import { User } from 'src/auth/entities/user.entity';
import { UserQuiz } from './entities/userQuiz.entity';

@Injectable()
export class QuizService {
  constructor(
    @InjectRepository(Quiz)
    private readonly quizRepository: Repository<Quiz>,
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,
    @InjectRepository(UserQuiz)
    private readonly userQuizRepository: Repository<UserQuiz>,
  ) { }

  private handleDataBaseExceptions(error: any) {
    if (error.code === '23505')
      throw new BadRequestException('Registro ya existe. ' + error.detail);

    console.error(error);
    throw new InternalServerErrorException(
      'Error no registrado, revisar logs del servidor.',
    );
  }

  async create(createQuizDto: CreateQuizDto) {
    try {
      const quiz = this.quizRepository.create(createQuizDto);
      return this.quizRepository.save(quiz);
    } catch (error) {
      this.handleDataBaseExceptions(error);
    }
  }

  async findAll() {
    const quizs = this.quizRepository.find();
    return quizs;
  }

  async findOne(id: string) {
    return this.quizRepository.findOneBy({ id });
  }

  async update(id: string, updateQuizDto: UpdateQuizDto) {
    const quiz = await this.quizRepository.preload({
      id: id,
      ...updateQuizDto,
    });

    if (!quiz)
      throw new NotFoundException(`Quiz con id: ${id} no se ha encontrado.`);

    return this.quizRepository.save(quiz);
  }

  async remove(id: string) {
    return this.quizRepository.delete(id);
  }

  async findByIdUserQuiz(id: string) {
    const userQuiz = await this.userQuizRepository.findOne({
      where: {
        id,
      },
      relations: {
        quizId: {
          questions: {
            answers: true,
          },
        },
      },
    });

    return userQuiz;
  }

  async levelsByUser(user: User) {
    return this.userQuizRepository.find({
      where: {
        userId: {
          id: user.id,
        },
      },
      relations: {
        quizId: true,
      },
      order: {
        quizId: {
          difficulty: 'ASC',
        },
      },
    });
  }

  async savePointsWinned(user: User, data: { points: number; title: string, userQuizId: string }) {
    const currentUserQuiz = await this.userQuizRepository.findOne({
      where: {
        id: data.userQuizId
      },
      relations: {
        quizId: true,
      },
    });

    if (!currentUserQuiz) {
      throw new Error('Current user quiz not found');
    }

    currentUserQuiz.score = data.points

    const nextUserQuiz = await this.userQuizRepository.findOne({
      where: {
        userId: {
          id: user.id,
        },
        quizId: {
          difficulty: +currentUserQuiz.quizId.difficulty + 1,
        },
      },
      relations: {
        quizId: true,
      },
    });

    if (!nextUserQuiz) {
      throw new Error('Next user quiz not found');
    }

    nextUserQuiz.unlockLevel = true

    return this.userQuizRepository.save([currentUserQuiz, nextUserQuiz]);
  }
}
