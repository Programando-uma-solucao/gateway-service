import {
  BadRequestException,
  Inject,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateQuestionDTO } from './dtos/CreateQuestion.dto';
import { QuestionServiceConfig } from '../../config/microservices.config';
@Injectable()
export class QuestionService {
  private logger = new Logger();

  constructor(
    @Inject(QuestionServiceConfig.name)
    private readonly questionService: ClientProxy,
  ) {}

  async create(data: CreateQuestionDTO) {
    return this.questionService
      .send<any, CreateQuestionDTO>('createQuation', data)
      .toPromise()
      .catch((err) => {
        this.logger.error(err);
        if (err.httpCode === 400) {
          throw new BadRequestException(err.message);
        }
        throw new InternalServerErrorException();
      });
  }
}
