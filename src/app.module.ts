import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { AccountController } from './module/account/account.controller';
import { LawyerController } from './module/lawyer/lawyer.controller';
import { QuestionController } from './module/question/question.controller';
import { CipherController } from './module/cipher/cipher.controller';

import { AccountService } from './module/account/account.service';
import { LawyerService } from './module/lawyer/lawyer.service';
import { QuestionService } from './module/question/question.service';
import { CipherService } from './module/cipher/cipher.service';
import { ClientsModule } from '@nestjs/microservices';

import { AuthService } from './middleware/auth.service';
import { AuthMiddleware } from './middleware/auth.middleware';
import {
  AccountServiceConfig,
  QuestionServiceConfig,
  CipherServiceConfig,
} from './config/microservices.config';

@Module({
  imports: [
    ClientsModule.register([
      AccountServiceConfig,
      CipherServiceConfig,
      QuestionServiceConfig,
    ]),
  ],
  controllers: [
    AccountController,
    LawyerController,
    QuestionController,
    CipherController,
  ],
  providers: [
    AccountService,
    LawyerService,
    QuestionService,
    AuthService,
    CipherService,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude(
        { path: 'account', method: RequestMethod.POST },
        { path: 'login', method: RequestMethod.POST },
      )
      .forRoutes(AccountController, LawyerController, QuestionController);
  }
}
