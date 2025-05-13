import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { HashingServiceProtocol } from 'src/auth/hash/hashing.service';
export declare class UserService {
    private prisma;
    private hasingService;
    constructor(prisma: PrismaService, hasingService: HashingServiceProtocol);
    create(userDto: CreateUserDto): Promise<{
        Id: string;
        Name: string;
        Email: string;
    } | undefined>;
}
