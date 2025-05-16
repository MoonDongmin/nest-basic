import { JwtService } from '@nestjs/jwt';
import { UsersModel } from '../users/entities/users.entity';
import { UsersService } from '../users/users.service';
export declare class AuthService {
    private readonly jwtService;
    private readonly usersService;
    constructor(jwtService: JwtService, usersService: UsersService);
    extractTokenFromHeader(header: string, isBearer: boolean): string;
    decodeBasicToken(base64String: string): {
        email: string;
        password: string;
    };
    verifyToken(token: string): any;
    rotateToken(token: string, isRefreshToken: boolean): string;
    signToken(user: Pick<UsersModel, 'email' | 'id'>, isRefreshToken: boolean): string;
    loginUser(user: Pick<UsersModel, 'email' | 'id'>): {
        accessToken: string;
        refreshToken: string;
    };
    authenticateWithEmailAndPassword(user: Pick<UsersModel, 'email' | 'password'>): Promise<UsersModel>;
    loginWithEmail(user: Pick<UsersModel, 'email' | 'password'>): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    registerWithEmail(user: Pick<UsersModel, 'nickname' | 'email' | 'password'>): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
}
