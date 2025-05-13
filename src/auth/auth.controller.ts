import { Body, Controller, Post } from '@nestjs/common';
import { SigninDto } from './dto/signin.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
	constructor(private readonly service: AuthService) {}
	@Post()
	signIn(@Body() signInDto: SigninDto) {
		return this.service.authenticate(signInDto);
	}
}
