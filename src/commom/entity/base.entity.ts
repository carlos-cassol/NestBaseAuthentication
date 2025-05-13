import { IsBoolean, IsDate, IsString } from 'class-validator';

export class BaseEntity {
	@IsDate()
	createdAt: Date;
	@IsString()
	createdBy: string;
	@IsBoolean()
	isDeleted: boolean;
	@IsDate()
	deletedAt?: Date | null;
	@IsString()
	deletedBy?: string | null;
	@IsDate()
	updatedAt?: Date | null;
	@IsString()
	updatedBy?: string | null;
}
