import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthDto {
  @ApiProperty({ description: 'Email', example: 'email@email.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: 'Password', example: 'password' })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({ description: 'GoogleId', example: 'password' })
  @IsString()
  googleId?: string;
}

export class AuthResponseDto {
  @ApiProperty({ description: 'Id', example: 1 })
  id: number;
  @ApiProperty({ description: 'Email', example: 'email@email.com' })
  email: string;
  @ApiProperty({ description: 'Token', example: 'asdfghjkllkjhgfdsasdfghjk' })
  token: string;
}
