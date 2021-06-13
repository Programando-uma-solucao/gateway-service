import { Body, Controller, Post, Request } from '@nestjs/common';

import { CreateAnswerDTO } from './dtos/CreateAnswer.dto';
import { AnswerService } from './answer.service';

@Controller('answer')
export class AnswerController {
  constructor(private readonly answerService: AnswerService) {}

  @Post()
  create(@Request() req, @Body() data: CreateAnswerDTO) {
    return this.answerService.create(data, req.user.id);
  }
}
