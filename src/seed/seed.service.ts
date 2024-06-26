import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';

import { initialData } from './data/seed-data';
import { User } from 'src/auth/entities/user.entity';
import { Quiz } from 'src/quiz/entities/quiz.entity';
import { Question } from 'src/quiz/entities/question.entity';
import { Answer } from 'src/quiz/entities/answer.entity';

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Quiz)
    private readonly quizRepository: Repository<Quiz>,
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,
    @InjectRepository(Answer)
    private readonly answerRepository: Repository<Answer>,

  ) { }

  async runSedd() {
    await this.deleteTables();
    await this.insertUsers();
    await this.insertQuizzes();
    return 'SEED EXECUTED.';
  }

  private async deleteTables() {
    //!DELETE TABLES
    const queryBuilderAnswer = this.answerRepository.createQueryBuilder();
    queryBuilderAnswer.delete().where({}).execute();
    const queryBuilderQuestion = this.questionRepository.createQueryBuilder();
    queryBuilderQuestion.delete().where({}).execute();
    const queryBuilderQuiz = this.quizRepository.createQueryBuilder();
    queryBuilderQuiz.delete().where({}).execute();
    const queryBuilderUser = this.userRepository.createQueryBuilder();
    queryBuilderUser.delete().where({}).execute();
  }

  private async insertUsers() {
    const seedUsers = initialData.users;
    const users: User[] = [];

    seedUsers.forEach((user) => {
      const { password, ...userData } = user;
      users.push(
        this.userRepository.create({
          ...userData,
          password: bcrypt.hashSync(password, 10),
        }),
      );
    });

    const dbUsers = await this.userRepository.save(users);
    // console.log({ dbUsers, zero: dbUsers[0] });
    return dbUsers[0];
  }

  private async insertQuizzes() {
    const seedQuizzes = initialData.quizzes;

    for (const quizData of seedQuizzes) {
      const quiz = this.quizRepository.create({
        title: quizData.title,
      });
      const dbQuiz = await this.quizRepository.save(quiz);

      for (const questionData of quizData.questions) {
        const question = this.questionRepository.create({
          title: questionData.title,
          hint: questionData.hint,
          quiz: dbQuiz,  // associate question with the quiz
        });
        const dbQuestion = await this.questionRepository.save(question);

        for (const answerData of questionData.answers) {
          const answer = this.answerRepository.create({
            text: answerData.text,
            isCorrect: answerData.isCorrect,
            question: dbQuestion,  // associate answer with the question
          });
          await this.answerRepository.save(answer);
        }
      }
    }
  }

}
