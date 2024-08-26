import { Expose } from 'class-transformer';

export class CreateAccountResponseDto {
  @Expose()
  readonly Id: number;
  @Expose()
  readonly userId: number;
  @Expose()
  readonly username: string;
  @Expose()
  readonly email: string;
  @Expose()
  readonly firstName?: string;
  @Expose()
  readonly lastName?: string;
}

export class LoginResponseDto {
  @Expose()
  readonly username: string;
  @Expose()
  readonly email: string;
  @Expose()
  readonly userId: number;
  @Expose()
  readonly accessToken: string;
}
