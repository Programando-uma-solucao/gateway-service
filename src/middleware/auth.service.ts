import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CipherServiceConfig } from 'src/config/microservices.config';

interface TokenDto {
  iat: number;
  exp: number;
  sub: string;
  // id: string;
  // name: string;
  // email: string;
  // role: string;
}

@Injectable()
export class AuthService {
  constructor(
    @Inject(CipherServiceConfig.name)
    private readonly cipherService: ClientProxy,
  ) {}

  public async auth(bearerToken: string): Promise<TokenDto> {
    const token = bearerToken.split(' ')[1];

    if (!token) return undefined;

    return this.cipherService
      .send('verifyJwt', token)
      .toPromise()
      .then((res) => res)
      .catch(() => undefined);
  }
}
