import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  Matches,
} from 'class-validator';

export class SigninDto {
  @IsEmail({}, { message: 'Please enter a valid email address' })
  @IsString()
  @IsNotEmpty()
  readonly email: string;
}
