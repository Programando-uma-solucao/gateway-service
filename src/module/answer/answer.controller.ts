import { Body, Controller, Get, Post, Query, Request } from '@nestjs/common';

import { CreateAnswerDTO } from './dtos/CreateAnswer.dto';
import { AnswerService } from './answer.service';

@Controller('answer')
export class AnswerController {
  constructor(private readonly answerService: AnswerService) {}

  @Post()
  create(@Request() req, @Body() data: CreateAnswerDTO) {
    return this.answerService.create(data, req.user.id);
  }

  @Get()
  recoverAnswer(@Request() req, @Query('questionId') questionId: string) {
    return this.answerService.recoverAnswer(questionId, req.user.id);
  }
}
