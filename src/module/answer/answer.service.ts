import {
  BadRequestException,
  Inject,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateAnswerDTO } from './dtos/CreateAnswer.dto';
import { QuestionServiceConfig } from '../../config/microservices.config';

@Injectable()
export class AnswerService {
  private logger = new Logger();

  constructor(
    @Inject(QuestionServiceConfig.name)
    private readonly questionService: ClientProxy,
  ) {}

  async create(data: CreateAnswerDTO) {
    return this.questionService
      .send('createAnswer', data)
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
