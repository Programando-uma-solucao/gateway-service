import {
  BadRequestException,
  Inject,
  InternalServerErrorException,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { CreateAnswerDTO } from './dtos/CreateAnswer.dto';
import { QuestionServiceConfig } from '../../config/microservices.config';
import { AccountService } from '../account/account.service';
import { Account } from '../account/interfaces/Account';

@Injectable()
export class AnswerService {
  private logger = new Logger();

  constructor(
    @Inject(QuestionServiceConfig.name)
    private readonly questionService: ClientProxy,
    private readonly accountService: AccountService,
  ) {}

  async create(data: CreateAnswerDTO, lawyerId: string) {

    this.questionService
      .emit('createAnswer', { ...data, lawyerId })
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
