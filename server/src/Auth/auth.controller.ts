import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  CreateAccountResponseDto,
  CreateUserResponseDto,
  LoginResponseDto,
} from './dto/auth.response.dto';
import {
  CreateAccountRequestDto,
  CreateUserRequestDto,
  LoginRequestDto,
} from './dto/auth.request.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('create-user')
  async createUser(
    @Body() data: CreateUserRequestDto,
  ): Promise<CreateUserResponseDto> {
    return this.authService.createUser(data);
  }

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
