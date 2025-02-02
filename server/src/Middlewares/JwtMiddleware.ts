import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const token = req.cookies.accessToken;
    if (!token) {
      throw new UnauthorizedException('Token not found');
    }
    try {
      const decoded = verify(token, process.env.JWT_SECRET_KEY);
      req['user'] = decoded;
      next();
    } catch (error) {
      throw new UnauthorizedException('Invalid Credentials');
    }
  }
}
