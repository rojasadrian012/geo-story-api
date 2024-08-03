import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Quiz } from './entities/quiz.entity';
import { Repository } from 'typeorm';
import { Question } from './entities/question.entity';
import { User } from 'src/auth/entities/user.entity';
import { UserQuiz } from './entities/userQuiz.entity';
import { MinPointsUnlock } from './interfaces/min-points-unlock';
import { UserAchievement } from './entities/userAchievement';

@Injectable()
export class QuizService {
  constructor(
    @InjectRepository(Quiz)
    private readonly quizRepository: Repository<Quiz>,
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,
    @InjectRepository(UserQuiz)
    private readonly userQuizRepository: Repository<UserQuiz>,
    @InjectRepository(UserAchievement)
    private readonly userAchievementRepository: Repository<UserAchievement>,

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
        quiz: {
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
        user: {
          id: user.id,
        },
      },
      relations: {
        quiz: true,
      },
      order: {
        quiz: {
          difficulty: 'ASC',
        },
      },
    });
  }

  async savePointsWinned(
    user: User,
    data: { points: number; title: string; userQuizId: string },
  ) {
    const currentUserQuiz = await this.userQuizRepository.findOne({
      where: {
        id: data.userQuizId,
      },
      relations: {
        quiz: true,
      },
    });

    if (!currentUserQuiz) {
      throw new Error('Current user quiz not found');
    }

    currentUserQuiz.score = data.points;

    const nextUserQuiz = await this.userQuizRepository.findOne({
      where: {
        user: {
          id: user.id,
        },
        quiz: {
          difficulty: +currentUserQuiz.quiz.difficulty + 1,
        },
      },
      relations: {
        quiz: true,
      },
    });

    if (!nextUserQuiz) {
      throw new Error('Next user quiz not found');
    }

    if (data.points >= MinPointsUnlock.poinst) nextUserQuiz.unlockLevel = true;

    await this.userQuizRepository.save([currentUserQuiz, nextUserQuiz]);

    return { nextUserQuiz };
  }

  async rankingUsers(user: User) {
    const usersTop = await this.userQuizRepository
      .createQueryBuilder('userQuiz')
      .leftJoinAndSelect('userQuiz.user', 'user')
      .select(['user.id', 'user.nickname', 'user.fullName']) // Selecciona los campos necesarios del usuario
      .addSelect('SUM(userQuiz.score)', 'score')
      .groupBy('user.id')
      .addGroupBy('user.nickname')
      .addGroupBy('user.fullName')
      .having('SUM(userQuiz.score) > 0')
      .orderBy('score', 'DESC')
      .getRawMany();

    const usersTopWithPosition = usersTop.map((user, index) => ({
      ...user,
      position: index + 1,
    }));

    const currentUserRanking = usersTopWithPosition.find(
      (u) => u.user_id === user.id,
    );

    const currentUserWithPosition = {
      ...user,
      position: currentUserRanking ? currentUserRanking.position : 0,
    };

    const usersRankingAndCurrentUser = {
      currentUser: currentUserWithPosition,
      rankingUsers: usersTopWithPosition,
    };

    return usersRankingAndCurrentUser;
  }


  async achievementsByUser(user: User) {
    const data = await this.userAchievementRepository.find({
      where: {
        user: {
          id: user.id
        }
      },
      relations: {
        achievement: true,
      }
    })

    return data
  }
}
