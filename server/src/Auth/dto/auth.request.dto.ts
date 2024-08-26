export class CreateAccountRequestDto {
  readonly userId: number;
  readonly username: string;
  readonly password: string;
  readonly email: string;
  readonly firstName?: string;
  readonly lastName?: string;
}

export class LoginRequestDto {
  readonly usernameOrEmail: string;
  readonly password: string;
}
