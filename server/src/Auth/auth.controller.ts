import { Body, Controller, Post, Req, Res, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  CreateAccountResponseDto,
  LoginResponseDto,
} from './dto/auth.response.dto';
import {
  CreateAccountRequestDto,
  LoginRequestDto,
} from './dto/auth.request.dto';
import { Request, Response } from 'express';
import { JwtService } from './jwt.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('create-account')
  async createAccount(
    @Body() data: CreateAccountRequestDto,
  ): Promise<CreateAccountResponseDto> {
    return this.authService.createAccount(data);
  }

  @Post('login')
  async login(
    @Body() data: LoginRequestDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<LoginResponseDto> {
    return this.authService.Login(data, res);
  }

  @Get('verifytoken')
  async verifyToken(@Req() req: Request) {
    return this.jwtService.verifyToken(req);
  }

  @Post('logout')
  async logout(@Res() res: Response) {
    return this.authService.Logout(res);
  }
}
