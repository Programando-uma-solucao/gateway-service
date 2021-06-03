import {
  Injectable,
  Inject,
  Logger,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { CipherServiceConfig } from '../../config/microservices.config';

@Injectable()
export class CipherService {
  private logger = new Logger();

  constructor(
    @Inject(CipherServiceConfig.name)
    private readonly accountService: ClientProxy,
  ) {}

  login() {
    this.accountService
      .send('login', 'data')
      .subscribe(
        (response) => console.log(response),
        (error) => console.error(error.message),
      );
    return "test";
  }
}

