import { SigninDto } from './dto/signin.dto';
import { HashingServiceProtocol } from './hash/hashing.service';
import { PrismaService } from 'src/prisma/prisma.service';
import jwtConfig from './config/jwt.config';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private readonly hashService;
    private readonly prismaService;
    private readonly jwtConfiguration;
    private readonly jwtService;
    constructor(hashService: HashingServiceProtocol, prismaService: PrismaService, jwtConfiguration: ConfigType<typeof jwtConfig>, jwtService: JwtService);
    authenticate(credentials: SigninDto): Promise<{
        id: string;
        name: string;
        email: string;
        token: string;
    }>;
}
