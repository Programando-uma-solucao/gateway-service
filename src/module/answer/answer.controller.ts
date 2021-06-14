import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Request,
  UnauthorizedException,
} from '@nestjs/common';

import { CreateAnswerDTO } from './dtos/CreateAnswer.dto';
import { AnswerService } from './answer.service';

@Controller('answer')
export class AnswerController {
  constructor(private readonly answerService: AnswerService) {}

  @Post()
  create(@Request() req, @Body() data: CreateAnswerDTO) {
    if (req.user.role !== 'LAWYER')
      throw new UnauthorizedException('You can not create a Answer');

    return this.answerService.create(data, req.user.id);
  }

  @Get()
  recoverAnswer(@Request() req, @Query('questionId') questionId: string) {
    return this.answerService.recoverAnswer(questionId, req.user.id);
  }
}
