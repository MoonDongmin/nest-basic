import { JwtService } from '@nestjs/jwt';
import { UsersModel } from '../users/entities/users.entity';
import { UsersService } from '../users/users.service';
export declare class AuthService {
    private readonly jwtService;
    private readonly usersService;
    constructor(jwtService: JwtService, usersService: UsersService);
    signToken(user: Pick<UsersModel, 'email' | 'id'>, isRefreshToken: boolean): string;
    loginUser(user: Pick<UsersModel, 'email' | 'id'>): {
        accessToken: string;
        refreshToken: string;
    };
    authenticateWithEmailAndPassword(user: Pick<UsersModel, 'email' | 'password'>): Promise<UsersModel>;
}
