import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/Database/database.service';
import {
  CreateAccountResponseDto,
  LoginResponseDto,
} from './dto/auth.response.dto';
import { DtoMapper } from 'src/Utils/dtoMapper';
import {
  CreateAccountRequestDto,
  LoginRequestDto,
} from './dto/auth.request.dto';
import { hashSync, compareSync } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { plainToInstance } from 'class-transformer';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(private readonly databaseService: DatabaseService) {}

  //Create Account
  async createAccount(
    data: CreateAccountRequestDto,
  ): Promise<CreateAccountResponseDto> {
    try {
      const existingAccount = await this.databaseService.account.findFirst({
        where: {
          OR: [{ username: data.username }, { email: data.email }],
        },
      });
      if (existingAccount) {
        throw new HttpException(
          'Username or email already exists',
          HttpStatus.BAD_REQUEST,
        );
      }
      const hashedPassword = hashSync(data.password, 10);
      const newAccount = await this.databaseService.account.create({
        data: {
          email: data.email,
          password: hashedPassword,
          username: data.username,
          firstName: data.firstName,
          lastName: data.lastName,
        },
      });
      if (!newAccount) {
        throw new Error('Account couldnt be created');
      }
      const response = DtoMapper.toDto(newAccount, CreateAccountResponseDto);
      return response;
    } catch (error) {
      throw error;
    }
  }

  //Login
  async Login(data: LoginRequestDto, res: Response): Promise<LoginResponseDto> {
    try {
      const validAccount = await this.databaseService.account.findFirst({
        where: {
          OR: [
            { username: data.usernameOrEmail },
            { email: data.usernameOrEmail },
          ],
        },
      });
      if (!validAccount) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      const validPassword = compareSync(data.password, validAccount.password);
      if (!validPassword) {
        throw new HttpException(
          'Password is incorrect',
          HttpStatus.UNAUTHORIZED,
        );
      }
      const token = sign({ id: validAccount.id }, process.env.JWT_SECRET_KEY, {
        expiresIn: '1h',
      });
      const response = plainToInstance(LoginResponseDto, {
        username: validAccount.username,
        email: validAccount.email,
      });
      res.cookie('accessToken', token, {
        httpOnly: true,
        secure: false,
        maxAge: 36 * 10000,
      });
      return response;
    } catch (error) {
      throw error;
    }
  }
}
