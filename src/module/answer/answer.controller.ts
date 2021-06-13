import {
  Body,
  Controller,
  Post,
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
    if (req.user.id !== data.accountId)
      throw new UnauthorizedException(
        'You can not create a Answer for other user',
      );
    
    /*if (req.user.role !== "LAWYER")
      throw new UnauthorizedException(
        'You can not create a Answer',
      );*/

    return this.answerService.create(data);
  }
}
