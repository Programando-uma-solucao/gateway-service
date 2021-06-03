import { ClientProviderOptions, Transport } from '@nestjs/microservices';

const AccountServiceConfig: ClientProviderOptions = {
  name: 'ACCOUNT_SERVICE',
  transport: Transport.TCP,
  options: {
    host: 'localhost',
    port: 8081,
  },
};

const CipherServiceConfig: ClientProviderOptions = {
  name: 'CIPHER_SERVICE',
  transport: Transport.TCP,
  options: {
    host: 'localhost',
    port: 8082,
  },
};

export { AccountServiceConfig, CipherServiceConfig };
