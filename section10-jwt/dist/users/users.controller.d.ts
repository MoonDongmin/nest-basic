import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    postUSer(nickname: string, email: string, password: string): Promise<import("./entities/users.entity").UsersModel>;
    getUsers(): Promise<import("./entities/users.entity").UsersModel[]>;
}
