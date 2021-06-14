import {
  BadRequestException,
  Inject,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { CreateAnswerDTO } from './dtos/CreateAnswer.dto';
import {
  CipherServiceConfig,
  QuestionServiceConfig,
} from '../../config/microservices.config';
import { AccountService } from '../account/account.service';
import { Account } from '../account/interfaces/Account';
import { Answer } from './interfaces/Answer';

@Injectable()
export class AnswerService {
  private logger = new Logger();

  constructor(
    @Inject(QuestionServiceConfig.name)
    private readonly questionService: ClientProxy,
    @Inject(CipherServiceConfig.name)
    private readonly cipherService: ClientProxy,
    private readonly accountService: AccountService,
  ) {}

  async create(data: CreateAnswerDTO, lawyerId: string) {
    const account: Account = await this.accountService.getAccount({
      _id: lawyerId,
    });

    if (account.role !== 'LAWYER') {
      throw new UnauthorizedException('Only lawyers users can create a answer');
    }

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

  async recoverAnswer(questionId: string, userId: string) {
    const { lawyerId, answer, question }: Answer = await this.questionService
      .send('getAnswer', questionId)
      .toPromise()
      .catch((err) => {
        if (err.httpCode === 404) {
          throw new NotFoundException(err.message);
        }

        throw new InternalServerErrorException();
      });

    if (userId !== lawyerId && userId !== question.accountId) {
      throw new UnauthorizedException('Not authorized to recover this answer');
    }

    const lawyer: Account = await this.accountService.getAccount({
      _id: lawyerId,
    });

    const decrypted = await this.cipherService
      .send('decrypt', {
        data: { answer, lawyerName: lawyer.name },
        ignore: [],
      })
      .toPromise();

    console.log(decrypted);

    return {
      response: decrypted.answer,
      lawyerName: decrypted.lawyerName,
      lawyerRegister: lawyer.oab,
    };
  }
}
