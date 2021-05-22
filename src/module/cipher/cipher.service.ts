import { Injectable } from '@nestjs/common';

@Injectable()
export class CipherService {
  login(): string {
    return 'account logged in!';
  }
}
