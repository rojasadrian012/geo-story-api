import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';

import { initialData } from './data/seed-data';
import { User } from 'src/auth/entities/user.entity';

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async runSedd() {
    await this.deleteTables();
    const firstUser = await this.insertUsers();
    return 'SEED EXECUTED.';
  }

  private async deleteTables() {
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
    console.log({dbUsers, zero: dbUsers[0]});
    
    return dbUsers[0];
  }
}
