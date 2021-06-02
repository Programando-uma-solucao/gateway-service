import { Body, Controller, Post } from '@nestjs/common';
import { AccountService } from './account.service';
import { CreateUserDTO } from './dtos/CreateUser.dto';
@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post()
  create(@Body() data: CreateUserDTO) {
    return this.accountService.create(data);
  }
}
