import { Controller, Post, Req } from '@nestjs/common';
import { CipherService } from './cipher.service';
import { Request } from 'express';

@Controller('login')
export class CipherController {
  constructor(private readonly cipherService: CipherService) {}

  @Post()
  login(@Req() request: Request): string {
    return this.cipherService.login();
  }
}
