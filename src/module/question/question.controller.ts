import { Controller, Header, Post } from '@nestjs/common';
import { CreateQuestionDTO } from './dtos/CreateQuestion.dto';
import { QuestionService } from './question.service';

@Controller('question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}
  @Post()
  @Header('Authorization', 'Bearer ')
  create(data: CreateQuestionDTO) {
    return this.questionService.create(data);
  }
}
