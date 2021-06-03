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

  async login(req){
    return this.accountService
      .send('login', req)
      .toPromise();
  }
}

