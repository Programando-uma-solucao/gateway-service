import { Body, Controller, Post, Req } from '@nestjs/common';
import { CipherService } from './cipher.service';
import { LoginDTO } from './dtos/Login.dto';
import { Request } from 'express';

@Controller('login')
export class CipherController {
  constructor(private readonly cipherService: CipherService) {}

  @Post()
  login(@Body() request: LoginDTO) {
    return this.cipherService.login(request);
  }
}
