import { IsEmail, IsNotEmpty, IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty({ description: 'Email', example: 'email@email.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: 'Password', example: 'password' })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({ description: 'Name', example: 'name' })
  @IsString()
  name?: string;

  @ApiProperty({ description: 'Age', example: 20 })
  @IsNumber()
  age?: number;

  @ApiProperty({ description: 'Height', example: 'height' })
  @IsNumber()
  height?: number;

  @ApiProperty({ description: 'Weight', example: 'weight' })
  @IsNumber()
  weight?: number;
}

export class UserResponseDto {
  @ApiProperty({ description: 'Id', example: 1 })
  id: number;
  @ApiProperty({ description: 'Email', example: 'email@email.com' })
  email: string;
  @ApiProperty({ description: 'Name', example: 'name' })
  name?: string;
  @ApiProperty({ description: 'Age', example: 20 })
  age?: number;
  @ApiProperty({ description: 'Height', example: 'height' })
  height?: number;
  @ApiProperty({ description: 'Weight', example: 'weight' })
  weight?: number;
}
