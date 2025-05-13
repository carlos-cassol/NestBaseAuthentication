import { IsEmail, IsString, IsUUID } from 'class-validator';
import { BaseEntity } from 'src/commom/entity/base.entity';

export class UserEntity extends BaseEntity {
	@IsString()
	@IsUUID()
	id: string;

	@IsString()
	name: string;

	@IsEmail()
	email: string;

	@IsString()
	password: string;
}
