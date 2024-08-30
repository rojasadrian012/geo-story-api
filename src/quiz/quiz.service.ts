import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { User } from 'src/auth/entities/user.entity';
import { UserQuiz } from './entities/userQuiz.entity';
import { MinPointsUnlock } from './interfaces/min-points-unlock';
import { UserAchievement } from './entities/userAchievement';
import { Achievement } from './entities/achievement.entity';
import { CreateSurveyDto } from './dto/create-survey.dto';
import { Survey } from './entities/survey.entity';
import { CreateUserSurveyDto } from './dto/create-user-survey.dto';
import { UserSurvey } from './entities/userSurvey.entity';
import { Config } from './entities/config.entity';
import { Quiz } from './entities/quiz.entity';

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

  shuffleArray<T>(array: T[]): T[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  async findByIdUserQuiz(id: string) {
    const userQuiz = await this.userQuizRepository.findOne({
      where: {
        id: id,
      },
      relations: {
        quiz: {
          questions: {
            answers: true,
          },
        },
      },
      select: {
        id: true,
        score: true,
        dataScore: true,
        unlockLevel: true,
        quiz: {
          id: true,
          title: true,
          description: true,
          difficulty: true,
          questions: {
            id: true,
            title: true,
            hint: true,
            answers: {
              id: true,
              text: true,
              isCorrect: true,
            },
          },
        },
      },
      cache: true,
    });

    // Filtrar preguntas que tengan exactamente 4 respuestas
    const validQuestions = userQuiz.quiz.questions.filter(
      (question) => question.answers.length === 4,
    );

    // Seleccionar aleatoriamente 5 preguntas
    const selectedQuestions = this.shuffleArray(validQuestions).slice(0, 5);

    // Desordenar las respuestas de cada pregunta
    selectedQuestions.forEach((question) => {
      question.answers = this.shuffleArray(question.answers);
    });

    // Asignar las preguntas seleccionadas de vuelta al quiz
    userQuiz.quiz.questions = selectedQuestions;


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

  async createOrEditGlobalConfig(config: { name: string; value: boolean }) {
    const existingConfig = await this.configRepository.findOne({
      where: {
        name: config.name,
      },
    });

    if (existingConfig) {
      existingConfig.value = config.value;
      return this.configRepository.save(existingConfig);
    } else {
      const newConfig = this.configRepository.create({
        name: config.name,
        value: config.value,
      });
      return this.configRepository.save(newConfig);
    }
  }
}
