import { Controller, Post, Req } from '@nestjs/common';
import { AccountService } from './account.service';
import { Request } from 'express';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post()
  create(@Req() request: Request): string {
    return this.accountService.create();
  }
}
