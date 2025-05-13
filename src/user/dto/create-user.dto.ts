import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
	@IsString()
	@ApiProperty({ example: 'username' })
	name: string;

	@IsEmail()
	@ApiProperty({ example: 'email' })
	email: string;

	@IsString()
	@ApiProperty({ example: 'password' })
	password: string;
}
