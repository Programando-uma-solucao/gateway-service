import { Controller, Post, Req } from '@nestjs/common';
import { LawyerService } from './lawyer.service';
import { Request } from 'express';

@Controller('lawyer')
export class LawyerController {
  constructor(private readonly lawyerService: LawyerService) {}

  @Post()
  create(@Req() request: Request): string {
    return this.lawyerService.create();
  }
}
