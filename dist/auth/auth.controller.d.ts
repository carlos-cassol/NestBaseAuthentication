import { SigninDto } from './dto/signin.dto';
import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly service;
    constructor(service: AuthService);
    signIn(signInDto: SigninDto): Promise<{
        id: string;
        name: string;
        email: string;
        token: string;
    }>;
}
