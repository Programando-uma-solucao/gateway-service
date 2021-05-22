import { Controller, Post, Req } from '@nestjs/common';
import { QuestionService } from './question.service';
import { Request } from 'express';

@Controller('question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Post()
  create(@Req() request: Request): string {
    return this.questionService.create();
  }
}
