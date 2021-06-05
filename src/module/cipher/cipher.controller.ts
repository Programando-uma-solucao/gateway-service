import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { CipherService } from './cipher.service';
import { LoginDTO } from './dtos/Login.dto';

@Controller('login')
export class CipherController {
  constructor(private readonly cipherService: CipherService) {}

  @Post()
  @HttpCode(200)
  login(@Body() request: LoginDTO) {
    return this.cipherService.login(request);
  }
}
