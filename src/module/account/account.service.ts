import {
  Injectable,
  Inject,
  Logger,
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { CreateUserDTO } from './dtos/CreateUser.dto';
import { AccountServiceConfig } from '../../config/microservices.config';

@Injectable()
export class AccountService {
  private logger = new Logger();

  constructor(
    @Inject(AccountServiceConfig.name)
    private readonly accountService: ClientProxy,
  ) {}

  async create(data: CreateUserDTO) {
    return this.accountService
      .send<{ token: string }, CreateUserDTO>('createUser', data)
      .toPromise()
      .catch((err) => {
        this.logger.error(err);
        if (err.httpCode === 400) {
          throw new BadRequestException(err.message);
        }
        throw new InternalServerErrorException();
      });
  }

  async getAccount(data: any) {
    return await this.accountService
      .send('getAccount', data)
      .toPromise()
      .catch((err) => {
        if (err.httpCode === 404) throw new NotFoundException(err.message);
      });
  }

  async recoverSecretQuestion(data: any) {
    return await this.accountService
      .send('recoverSecretQuestion', data)
      .toPromise()
      .catch((err) => {
        if (err.httpCode === 404) throw new NotFoundException(err.message);
      });
  }

  async answerSecretQuestion(data: any) {
    return await this.accountService
      .send('answerSecretQuestion', data)
      .toPromise()
      .catch((err) => {
        if (err.httpCode === 400) throw new BadRequestException(err.message);
        if (err.httpCode === 404) throw new NotFoundException(err.message);
      });
  }

  async changePassword(data: any) {
    return await this.accountService
      .send('changePassword', data)
      .toPromise()
      .catch((err) => {
        if (err.httpCode == 401) throw new UnauthorizedException(err.message);
      });
  }
}
