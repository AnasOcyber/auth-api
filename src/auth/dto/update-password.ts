import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  Matches,
} from 'class-validator';

export class UpdatePasswordDto {
  @IsEmail({}, { message: 'Please enter a valid email address' })
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @Length(8, 32)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Password is too week. Tip: StrongPass@51',
  })
  newPassword: string;

  @IsString()
  @IsNotEmpty()
  otp: string;
}
