import {
  BadRequestException,
  Inject,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateQuestionDTO } from './dtos/CreateQuestion.dto';
import {
  QuestionServiceConfig,
  CipherServiceConfig,
} from '../../config/microservices.config';
import { AccountService } from '../account/account.service';
import { Account } from '../account/interfaces/Account';
import { RecoverQuestionResponseDTO } from './dtos/RecoverQuestionResponse.dto';
@Injectable()
export class QuestionService {
  private logger = new Logger();

  constructor(
    @Inject(QuestionServiceConfig.name)
    private readonly questionService: ClientProxy,
    private readonly accountService: AccountService,
    @Inject(CipherServiceConfig.name)
    private readonly cipherService: ClientProxy,
  ) {}

  async create(data: CreateQuestionDTO) {
    return this.questionService
      .send('createQuestion', data)
      .toPromise()
      .catch((err) => {
        this.logger.error(err);
        if (err.httpCode === 400) {
          throw new BadRequestException(err.message);
        }
        throw new InternalServerErrorException();
      });
  }

  async recoverQuestions(accountId: string) {
    const account: Account = await this.accountService.getAccount({
      _id: accountId,
    });

    console.log(account);

    const encryptedQuestions = await this.questionService
      .send<RecoverQuestionResponseDTO[]>('recoverQuestions', {
        role: account.role,
        tags: account.tags,
        id: account._id,
      })
      .toPromise()
      .catch((err) => {
        this.logger.error(err);

        throw new InternalServerErrorException();
      });

    const questions = Promise.all(
      encryptedQuestions.map(async (item) => {
        const questioner: Account = await this.accountService.getAccount({
          _id: item.accountId,
        });

        return {
          ...item,
          question: await this.cipherService
            .send('decryptOne', item.question)
            .toPromise(),
          questionerName: await this.cipherService
            .send('decryptOne', questioner.name)
            .toPromise(),
        };
      }),
    );

    return questions;
  }
}
