import { Repository } from 'typeorm';
import { UsersModel } from './entities/users.entity';
export declare class UsersService {
    private readonly usersRepository;
    constructor(usersRepository: Repository<UsersModel>);
    createUser(nickname: string, email: string, password: string): Promise<UsersModel>;
    getAllUsers(): Promise<UsersModel[]>;
}
