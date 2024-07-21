import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
} from '@nestjs/common';
import { QuizService } from './quiz.service';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ValidRoles } from 'src/auth/interface/valid-roles';
import { CreateQuestionDto } from './dto/create-question.dto';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { User } from 'src/auth/entities/user.entity';

@Controller('quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) { }

  @Post()
  @Auth()
  create(@Body() createQuizDto: CreateQuizDto) {
    return this.quizService.create(createQuizDto);
  }

  @Get()
  @Auth()
  findAll() {
    return this.quizService.findAll();
  }

  @Get('levels-by-user')
  @Auth()
  getLevelsByUser(@GetUser() user: User) {
    return this.quizService.levelsByUser(user);
  }

  @Get(':id')
  @Auth()
  findOne(@Param('id') id: string) {
    return this.quizService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateQuizDto: UpdateQuizDto,
  ) {
    return this.quizService.update(id, updateQuizDto);
  }

  @Delete(':id')
  @Auth()
  remove(@Param('id') id: string) {
    return this.quizService.remove(id);
  }

  @Post('create-question')
  @Auth()
  createQuestion(@Body() createQuestionDto: CreateQuestionDto) {
    // return this.quizService.create(createQuestionDto);
  }

  @Get('questions/:idUserQuiz')
  @Auth()
  findByIdUserQuiz(@Param('idUserQuiz') idUserQuiz: string) {
    return this.quizService.findByIdUserQuiz(idUserQuiz);
  }

  @Post('save-points')
  @Auth()
  savePointsWinned(
    @GetUser() user: User,
    @Body() body: { points: number; title: string; userQuizId: string },
  ) {
    return this.quizService.savePointsWinned(user, body);
  }
}
