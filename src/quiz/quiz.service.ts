import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Quiz } from './entities/quiz.entity';
import { Repository } from 'typeorm';
import { User } from 'src/auth/entities/user.entity';
import { UserQuiz } from './entities/userQuiz.entity';
import { MinPointsUnlock } from './interfaces/min-points-unlock';
import { UserAchievement } from './entities/userAchievement';
import { Achievement } from './entities/achievement.entity';
import { CreateSurveyDto } from './dto/create-survey.dto';
import { Survey } from './entities/survey.entity';
import { SurveyOption } from './entities/surveyOption.entity';
import { CreateUserSurveyDto } from './dto/create-user-survey.dto';
import { UserSurvey } from './entities/userSurvey.entity';
import { Config } from './entities/config.entity';

@Injectable()
export class QuizService {
  constructor(
    @InjectRepository(Quiz)
    private readonly quizRepository: Repository<Quiz>,

    @InjectRepository(UserQuiz)
    private readonly userQuizRepository: Repository<UserQuiz>,

    @InjectRepository(UserAchievement)
    private readonly userAchievementRepository: Repository<UserAchievement>,

    @InjectRepository(Achievement)
    private readonly achievementRepository: Repository<Achievement>,

    @InjectRepository(Survey)
    private readonly surveyRepositoty: Repository<Survey>,

    @InjectRepository(UserSurvey)
    private readonly userSurveyRepository: Repository<UserSurvey>,

    @InjectRepository(Config)
    private readonly configRepository: Repository<Config>,
  ) {}

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
    return this.userQuizRepository
      .createQueryBuilder('userQuiz')
      .leftJoinAndSelect('userQuiz.quiz', 'quiz')
      .leftJoinAndSelect('quiz.questions', 'question')
      .leftJoinAndSelect('question.answers', 'answer')
      .where('userQuiz.id = :id', { id })
      .andWhere((qb) => {
        const subQuery = qb
          .subQuery()
          .select('question.id')
          .from('questions', 'question')
          .where('question.quizId = quiz.id')
          .orderBy('RANDOM()')
          .limit(5)
          .getQuery();
        return 'question.id IN ' + subQuery;
      })
      .addOrderBy('RANDOM()') // Desordenar las respuestas dentro de cada pregunta
      .getOne();
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
      select: {
        id: true,
        score: true,
        unlockLevel: true,
        completed: true,
        quiz: {
          id: true,
          title: true,
          image: true,
          difficulty: true,
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
      if (data.points >= MinPointsUnlock.poinst)
        currentUserQuiz.completed = true;

      return this.userQuizRepository.save(currentUserQuiz);
    }

    if (data.points >= MinPointsUnlock.poinst) {
      currentUserQuiz.completed = true;
      nextUserQuiz.unlockLevel = true;
    }

    return this.userQuizRepository.save([currentUserQuiz, nextUserQuiz]);
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
    const achievementsCurrentUser = await this.userAchievementRepository.find({
      where: {
        user: {
          id: user.id,
        },
      },
      relations: {
        achievement: true,
      },
      order: {
        date: 'DESC',
      },
    });

    // Obtener logros no desbloqueados por el usuario usando una subconsulta
    const achievementsNoUnlocked = await this.achievementRepository
      .createQueryBuilder('achievement')
      .where(
        'achievement.id NOT IN (SELECT ua."achievementId" FROM "user-achievements" ua WHERE ua."userId" = :userId)',
        { userId: user.id },
      )
      .getMany();

    return { achievementsCurrentUser, achievementsNoUnlocked };
  }

  async saveAchievementsUser(user: User, data: { code: string }) {
    const achievement = await this.achievementRepository.findOne({
      where: { code: data.code },
    });

    if (!achievement) {
      throw new Error('Achievement not found');
    }

    const existingUserAchievement =
      await this.userAchievementRepository.findOne({
        where: {
          user: { id: user.id },
          achievement: { id: achievement.id },
        },
      });

    if (existingUserAchievement) {
      throw new ConflictException(
        'User already has this achievement ' + achievement.name,
      );
    }

    const userAchievement = this.userAchievementRepository.create({
      user: { id: user.id },
      achievement: { id: achievement.id },
    });

    await this.userAchievementRepository.save(userAchievement);

    return achievement;
  }

  async createSurvey(user: User, surveys: CreateSurveyDto[]) {}

  async getSurveyList(firstSurvey: boolean) {
    return this.surveyRepositoty.find({
      where: {
        isFirstSurvey: firstSurvey,
      },
      relations: {
        surveyOptions: true,
      },
    });
  }

  async createUserSurvey(user: User, createUserSurveys: CreateUserSurveyDto[]) {
    console.log({ user, createUserSurveys });

    const surveys = [];

    createUserSurveys.forEach((createUserSurvey) => {
      surveys.push(
        this.userSurveyRepository.create({
          response: createUserSurvey.response,
          user,
          survey: {
            id: createUserSurvey.surveyId,
          },
        }),
      );
    });

    return this.userSurveyRepository.save(surveys);
  }

  async getConfigs() {
    return this.configRepository.find({});
  }
}
