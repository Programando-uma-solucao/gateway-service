import { Injectable } from '@nestjs/common';

@Injectable()
export class LawyerService {
  create(): string {
    return 'lawyer created!';
  }
}
