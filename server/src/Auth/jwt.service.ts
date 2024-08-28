import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { verify } from 'jsonwebtoken';

@Injectable()
export class JwtService {
  private readonly jwtSecret = process.env.JWT_SECRET_KEY;
  async verifyToken(req: Request) {
    const token = req.cookies.accessToken;
    try {
      const decoded = verify(token, this.jwtSecret);
      return decoded;
    } catch (error) {
      throw new UnauthorizedException(
        'Please login with authorized credentials',
      );
    }
  }
}
