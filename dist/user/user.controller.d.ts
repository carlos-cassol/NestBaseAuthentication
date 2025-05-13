import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    create(user: CreateUserDto): Promise<{
        Id: string;
        Name: string;
        Email: string;
    } | undefined>;
}
