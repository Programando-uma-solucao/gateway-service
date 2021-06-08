import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateQuestionDTO {
  @IsString()
  @IsNotEmpty()
  question: string;

  @IsString()
  @IsNotEmpty()
  accountId: string;

  @IsString({ each: true })
  @IsArray()
  @IsOptional()
  tags: Array<string>;
}
