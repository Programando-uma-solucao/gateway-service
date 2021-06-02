import {
  Injectable,
  Inject,
  Logger,
  BadRequestException,
  InternalServerErrorException,
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
      .send('createUser', data)
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
