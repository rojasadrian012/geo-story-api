import { Module } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { QuizController } from './quiz.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quiz } from './entities/quiz.entity';
import { AuthModule } from 'src/auth/auth.module';
import { Question } from './entities/question.entity';
import { Answer } from './entities/answer.entity';
import { UserQuiz } from './entities/userQuiz.entity';

@Module({
  controllers: [QuizController],
  providers: [QuizService],
  imports: [
    // ConfigModule,

    TypeOrmModule.forFeature([
      Quiz,
      Question,
      Answer,
      UserQuiz
    ]),

    AuthModule,
  ],
  exports: [
    TypeOrmModule
  ]
})
export class QuizModule { }
