import {
  Body,
  Controller,
  Get,
  Query,
  Post,
  Request,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateQuestionDTO } from './dtos/CreateQuestion.dto';
import { RecoverQuestionQueryDTO } from './dtos/RecoverQuestionQuery.dto';
import { QuestionService } from './question.service';

@Controller('question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}
  @Post()
  create(@Request() req, @Body() data: CreateQuestionDTO) {
    if (req.user.id !== data.accountId)
      throw new UnauthorizedException(
        'You can not create a question for other user',
      );

    return this.questionService.create(data);
  }

  @Get()
  recoverQuestions(@Request() req, @Query() params: RecoverQuestionQueryDTO) {
    if (req.user.id !== params.accountId) {
      throw new UnauthorizedException(
        'You can not retrieve questions of other user',
      );
    }

    return this.questionService.recoverQuestions(params.accountId);
  }
}
