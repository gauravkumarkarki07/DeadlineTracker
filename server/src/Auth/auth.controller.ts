import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  CreateAccountResponseDto,
  LoginResponseDto,
} from './dto/auth.response.dto';
import {
  CreateAccountRequestDto,
  LoginRequestDto,
} from './dto/auth.request.dto';

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
  async login(@Body() data: LoginRequestDto): Promise<LoginResponseDto> {
    return this.authService.Login(data);
  }
}
