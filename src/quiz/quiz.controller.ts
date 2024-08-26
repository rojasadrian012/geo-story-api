import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  Query,
} from '@nestjs/common';

import { QuizService } from './quiz.service';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { CreateQuestionDto } from './dto/create-question.dto';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { User } from 'src/auth/entities/user.entity';
import { CreateSurveyDto } from './dto/create-survey.dto';
import { CreateUserSurveyDto } from './dto/create-user-survey.dto';

@Controller('quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

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

  @Get('ranking')
  @Auth()
  getTopUsers(@GetUser() user: User) {
    return this.quizService.rankingUsers(user);
  }

  @Get('achievements')
  @Auth()
  getAchievements(@GetUser() user: User) {
    return this.quizService.achievementsByUser(user);
  }

  @Get('surveys')
  @Auth()
  getSurveys(@Query('isFirst') isFirst: boolean) {
    return this.quizService.getSurveyList(isFirst);
  }

  @Get('config')
  @Auth()
  getConfigs() {
    return this.quizService.getConfigs();
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

  @Post('survey')
  @Auth()
  createUserSurvey(
    @GetUser() user: User,
    @Body() createUserSurveys: CreateUserSurveyDto[],
  ) {
    return this.quizService.createUserSurvey(user, createUserSurveys);
  }

  @Post('achievements/save')
  @Auth()
  savedAchievement(@GetUser() user: User, @Body() body: { code: string }) {
    return this.quizService.saveAchievementsUser(user, body);
  }

  @Post('survey/create')
  @Auth()
  createSurvey(@GetUser() user: User, @Body() surveys: CreateSurveyDto[]) {
    return this.quizService.createSurvey(user, surveys);
  }
}
