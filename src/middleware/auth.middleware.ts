import {
  UnauthorizedException,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

import { AuthService } from './auth.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly authService: AuthService) {}

  public async use(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;

    if (!authorization) {
      throw new UnauthorizedException('No token provided');
    }

    const tokenPayload = await this.authService.auth(authorization);
    console.log(tokenPayload);

    if (tokenPayload) {
      req.user = { id: tokenPayload.sub };
      next();
    } else {
      throw new UnauthorizedException('User not allowed to do this operation');
    }
  }
}
