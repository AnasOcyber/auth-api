import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  Matches,
} from 'class-validator';

export class SignupDto {
  @IsEmail({}, { message: 'Please enter a valid email address' })
  @IsString()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @Length(8, 32)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Password is too week. Tip: StrongPass@51',
  })
  @IsNotEmpty()
  readonly password: string;

  readonly otp: string;
}
