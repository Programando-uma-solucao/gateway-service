import {
  Body,
  Controller,
  Post,
  Get,
  Query,
  HttpCode,
  Param,
  Put,
} from '@nestjs/common';
import { AccountService } from './account.service';
import { CreateUserDTO, RecoverSecretQuestionDTO } from './dtos';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post()
  create(@Body() data: CreateUserDTO) {
    return this.accountService.create(data);
  }

  @Get()
  getAccount(@Query() query: string) {
    return this.accountService.getAccount(query);
  }

  @Get('/recover-secret-question/:email')
  @HttpCode(200)
  recoverSecretQuestion(@Param() param: RecoverSecretQuestionDTO) {
    return this.accountService.recoverSecretQuestion(param);
  }

  @Post('/answer-secret-question')
  answerSecretQuestion(@Body() data: any) {
    return this.accountService.answerSecretQuestion(data);
  }

  @Put('/change-password')
  changePassword(@Body() data: any) {
    return this.accountService.changePassword(data);
  }
}
