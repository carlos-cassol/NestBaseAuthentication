import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class SigninDto {
	@IsEmail()
	@ApiProperty({ example: 'email' })
	email: string;

	@IsString()
	@ApiProperty({ example: 'password' })
	password: string;
}
