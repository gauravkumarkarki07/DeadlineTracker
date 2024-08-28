import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  CreateAccountResponseDto,
  LoginResponseDto,
} from './dto/auth.response.dto';
import {
  CreateAccountRequestDto,
  LoginRequestDto,
} from './dto/auth.request.dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

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
}
