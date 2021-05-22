import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  auth(): string {
    return 'account authenticated!';
  }
}
