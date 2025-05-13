import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { HashingServiceProtocol } from 'src/auth/hash/hashing.service';

@Injectable()
export class UserService {
	constructor(
		private prisma: PrismaService,
		private hasingService: HashingServiceProtocol,
	) {}
	async create(userDto: CreateUserDto) {
		if (userDto) {
			const passwordHash = await this.hasingService.hash(
				userDto.password,
			);
			console.log('antes de criar2');
			const createUser = await this.prisma.user.create({
				data: {
					Name: userDto.name,
					Email: userDto.email,
					Password: passwordHash,
				},
				select: { Id: true, Name: true, Email: true },
			});
			return createUser;
		}
	}
}
