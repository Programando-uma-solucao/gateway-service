import {
  Injectable,
  Inject,
  Logger,
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { CipherServiceConfig } from '../../config/microservices.config';

@Injectable()
export class CipherService {
  private logger = new Logger();

  constructor(
    @Inject(CipherServiceConfig.name)
    private readonly cipherService: ClientProxy,
  ) {}

  async login(req) {
    return this.cipherService
      .send('login', req)
      .toPromise()
      .catch((err) => {
        this.logger.error(err);
        if (err.httpCode === 400) throw new BadRequestException(err.message);
        if (err.httpCode === 404) throw new NotFoundException(err.message);
        throw new InternalServerErrorException(err.message);
      });
  }
}
