import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException, Param, ParseUUIDPipe } from '@nestjs/common';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Quiz } from './entities/quiz.entity';
import { Repository } from 'typeorm';

@Injectable()
export class QuizService {

  constructor(
    @InjectRepository(Quiz)
    private readonly quizRepository: Repository<Quiz>
  ) { }

  private handleDataBaseExceptions(error: any) {
    if (error.code === '23505')
      throw new BadRequestException('Registro ya existe. ' + error.detail)

    console.error(error);
    throw new InternalServerErrorException('Error no registrado, revisar logs del servidor.')
  }

  async create(createQuizDto: CreateQuizDto) {
    try {
      const quiz = this.quizRepository.create(createQuizDto);
      return this.quizRepository.save(quiz);
    } catch (error) {
      this.handleDataBaseExceptions(error)
    }
  }

  async findAll() {
    const quizs = this.quizRepository.find();
    return quizs;
  }

  async findOne(id: string) {
    return this.quizRepository.findOneBy({ id });
  }

  async update(id: string, updateQuizDto: UpdateQuizDto
  ) {
    const quiz = await this.quizRepository.preload({ id: id, ...updateQuizDto });

    if (!quiz)
      throw new NotFoundException(`Quiz con id: ${id} no se ha encontrado.`);

    return this.quizRepository.save(quiz);
  }

  async remove(id: string) {
    return this.quizRepository.delete(id);
  }
}
