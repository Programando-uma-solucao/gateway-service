import { IsEmail, IsNotEmpty } from 'class-validator';

export class RecoverSecretQuestionDTO {
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
