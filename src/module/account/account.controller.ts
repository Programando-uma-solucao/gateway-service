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
import { AnswerSecretQuestionDTO } from './dtos/AnswerSecretQuestion.dto';
import { ChangePasswordDTO } from './dtos/ChangePassword.dto';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post()
  create(@Body() data: CreateUserDTO) {
    return this.accountService.create(data);
  }

  @Get('/:email')
  getAccountByEmail(@Param('email') email: string) {
    return this.accountService.getAccountByEmail(email);
  }

  @Get('/:id')
  getAccountById(@Param('id') id: string) {
    return this.accountService.getAccountById(id);
  }

  @Get('/recover-secret-question/:email')
  @HttpCode(200)
  recoverSecretQuestion(@Param() param: RecoverSecretQuestionDTO) {
    return this.accountService.recoverSecretQuestion(param);
  }

  @Post('/answer-secret-question')
  @HttpCode(200)
  answerSecretQuestion(@Body() data: AnswerSecretQuestionDTO) {
    return this.accountService.answerSecretQuestion(data);
  }

  @Put('/change-password')
  changePassword(@Body() data: ChangePasswordDTO) {
    return this.accountService.changePassword(data);
  }
}
