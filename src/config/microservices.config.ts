import { ClientProviderOptions, Transport } from '@nestjs/microservices';

const AccountServiceConfig: ClientProviderOptions = {
  name: 'ACCOUNT_SERVICE',
  transport: Transport.TCP,
  options: {
    host: 'localhost',
    port: 8081,
  },
};

const QuestionServiceConfig: ClientProviderOptions = {
  name: 'QUESTION_SERVICE',
  transport: Transport.TCP,
  options: {
    host: 'localhost',
    port: 8084,
  },
};

export { AccountServiceConfig, QuestionServiceConfig };
