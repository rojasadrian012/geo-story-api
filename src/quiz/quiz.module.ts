import { Module } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { QuizController } from './quiz.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quiz } from './entities/quiz.entity';
import { AuthModule } from 'src/auth/auth.module';
import { Question } from './entities/question.entity';
import { Answer } from './entities/answer.entity';
import { UserQuiz } from './entities/userQuiz.entity';
import { Achievement } from './entities/achievement.entity';
import { UserAchievement } from './entities/userAchievement';
import { Survey } from './entities/survey.entity';
import { SurveyOption } from './entities/surveyOption.entity';
import { UserSurvey } from './entities/userSurvey.entity';
import { Config } from './entities/config.entity';

@Module({
  controllers: [QuizController],
  providers: [QuizService],
  imports: [
    // ConfigModule,

    TypeOrmModule.forFeature([
      Quiz,
      Question,
      Answer,
      UserQuiz,
      Achievement,
      UserAchievement,
      Survey,
      SurveyOption,
      UserSurvey,
      Config,
    ]),

    AuthModule,
  ],
  exports: [
    TypeOrmModule
  ]
})
export class QuizModule { }
