export class ResetPasswordDto {
  readonly email: string;
}

export class UpdatePasswordDto {
  readonly token: string;
  readonly newPassword: string;
}
