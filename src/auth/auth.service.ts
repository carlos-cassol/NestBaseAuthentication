import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { SigninDto } from './dto/signin.dto';
import { HashingServiceProtocol } from './hash/hashing.service';
import { PrismaService } from 'src/prisma/prisma.service';
import jwtConfig from './config/jwt.config';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
	constructor(
		private readonly hashService: HashingServiceProtocol,
		private readonly prismaService: PrismaService,

		@Inject(jwtConfig.KEY)
		private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
		private readonly jwtService: JwtService,
	) {}
	async authenticate(credentials: SigninDto) {
		try {
			const user = await this.prismaService.user.findFirst({
				where: { Email: credentials.email },
			});

			if (!user) {
				throw new HttpException(`User not found`, 404);
			}
			const isValidPassword = await this.hashService.compare(
				credentials.password,
				user.Password,
			);

			if (!isValidPassword) {
				throw new HttpException(`The email/password is incorrect`, 401);
			}

			const token = await this.jwtService.signAsync(
				{
					sub: user.Id,
					email: user.Email,
				},
				{
					secret: this.jwtConfiguration.secret,
					expiresIn: this.jwtConfiguration.jwtTtl,
					audience: this.jwtConfiguration.audience,
					issuer: this.jwtConfiguration.issuer,
				},
			);

			return {
				id: user.Id,
				name: user.Name,
				email: user.Email,
				token: token,
			};
		} catch (err) {
			throw new HttpException(
				`An error ocurred while trying to log in: ${err}`,
				HttpStatus.BAD_REQUEST,
			);
		}
	}
}
