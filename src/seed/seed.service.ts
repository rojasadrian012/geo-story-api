import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';

import { initialData } from './data/seed-data';
import { User } from 'src/auth/entities/user.entity';
import { Quiz } from 'src/quiz/entities/quiz.entity';
import { Question } from 'src/quiz/entities/question.entity';
import { Answer } from 'src/quiz/entities/answer.entity';
import { UserQuiz } from 'src/quiz/entities/userQuiz.entity';
import { Achievement } from 'src/quiz/entities/achievement.entity';
import { UserAchievement } from 'src/quiz/entities/userAchievement';

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

    @InjectRepository(UserQuiz)
    private readonly userQuizRepository: Repository<UserQuiz>,

    @InjectRepository(Achievement)
    private readonly achievementRepository: Repository<Achievement>,

    @InjectRepository(UserAchievement)
    private readonly userAchievementRepository: Repository<UserAchievement>,
  ) { }

  async runSedd() {
    await this.deleteTables();
    await this.insertUsers();
    await this.insertQuizzes();
    await this.instertUserQuizzes();
    await this.inserAchievements();
    return 'SEED EXECUTED.';
  }

  private async deleteTables() {
    //!UserAchievement
    const queryBuilderUserAchievement = this.userAchievementRepository.createQueryBuilder();
    await queryBuilderUserAchievement.delete().where({}).execute();

    //!UserQuiz
    const queryBuilderUserQuiz = this.userQuizRepository.createQueryBuilder();
    await queryBuilderUserQuiz.delete().where({}).execute();

    //!Achievement
    const queryBuilderAchievement = this.achievementRepository.createQueryBuilder();
    await queryBuilderAchievement.delete().where({}).execute();

    //!Answer
    const queryBuilderAnswer = this.answerRepository.createQueryBuilder();
    await queryBuilderAnswer.delete().where({}).execute();

    //!Question
    const queryBuilderQuestion = this.questionRepository.createQueryBuilder();
    await queryBuilderQuestion.delete().where({}).execute();

    //!Quiz
    const queryBuilderQuiz = this.quizRepository.createQueryBuilder();
    await queryBuilderQuiz.delete().where({}).execute();

    //!User
    const queryBuilderUser = this.userRepository.createQueryBuilder();
    await queryBuilderUser.delete().where({}).execute();
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
    return dbUsers[0];
  }

  private async insertQuizzes() {
    const seedQuizzes = initialData.quizzes;

    for (const quizData of seedQuizzes) {
      const quiz = this.quizRepository.create({
        title: quizData.title,
        difficulty: quizData.difficulty,
        image: quizData.image,
      });
      const dbQuiz = await this.quizRepository.save(quiz);

      for (const questionData of quizData.questions) {
        const question = this.questionRepository.create({
          title: questionData.title,
          hint: questionData.hint,
          quiz: dbQuiz, // associate question with the quiz
        });
        const dbQuestion = await this.questionRepository.save(question);

        for (const answerData of questionData.answers) {
          const answer = this.answerRepository.create({
            text: answerData.text,
            isCorrect: answerData.isCorrect,
            question: dbQuestion, // associate answer with the question
          });
          await this.answerRepository.save(answer);
        }
      }
    }
  }

  private async instertUserQuizzes() {
    const users = await this.userRepository.find({});
    const quizzes = await this.quizRepository.find({});

    const userQuizzes = [];

    users.forEach((user) => {
      quizzes.forEach((quiz) => {
        let unlockLevel = false;
        if (quiz.title === 'Curiosidades') unlockLevel = true;
        userQuizzes.push({
          score: 0,
          quiz: quiz,
          user: user,
          unlockLevel,
        });
      });
    });

    await this.userQuizRepository.insert(userQuizzes);
  }

  private async inserAchievements() {
    const achievements = [];

    initialData.achievements.forEach((achievement) => {

      const newAchievement = this.achievementRepository.create({
        name: achievement.name,
        description: achievement.description,
        image: achievement.image,
      });

      achievements.push(newAchievement);
    });

    await this.achievementRepository.save(achievements);
  }

}
