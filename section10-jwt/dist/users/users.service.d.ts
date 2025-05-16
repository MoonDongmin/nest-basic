import { Repository } from 'typeorm';
import { UsersModel } from './entities/users.entity';
export declare class UsersService {
    private readonly usersRepository;
    constructor(usersRepository: Repository<UsersModel>);
    createUser(user: Pick<UsersModel, 'nickname' | 'email' | 'password'>): Promise<UsersModel>;
    getAllUsers(): Promise<UsersModel[]>;
    getUserByEmail(email: string): Promise<UsersModel>;
}
