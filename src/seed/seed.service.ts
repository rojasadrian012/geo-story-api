import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';

import { initialData } from './data/seed-data';
import { User } from 'src/auth/entities/user.entity';
import { Quiz } from 'src/quiz/entities/quiz.entity';

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Quiz)
    private readonly quizRepository: Repository<Quiz>,
  ) { }

  async runSedd() {
    await this.deleteTables();
    await this.insertUsers();
    await this.insertQuizs();
    return 'SEED EXECUTED.';
  }

  private async deleteTables() {
    const queryBuilderUser = this.userRepository.createQueryBuilder();
    queryBuilderUser.delete().where({}).execute();

    //TODO: VER COMO ARREGLAR LO DE LAS RELACIONES EN ESTE METODO
    const queryBuilderQuiz = this.quizRepository.createQueryBuilder();
    queryBuilderQuiz.delete().where({}).execute();
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

  private async insertQuizs() {
    const seedQuizs = initialData.quizzes;
    const quizs: Quiz[] = [];

    seedQuizs.forEach((quiz) => {
      quizs.push(this.quizRepository.create(quiz));
    });
    await this.quizRepository.save(quizs);
  }
}
