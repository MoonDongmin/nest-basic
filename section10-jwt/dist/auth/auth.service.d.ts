import { JwtService } from '@nestjs/jwt';
import { UsersModel } from '../users/entities/users.entity';
export declare class AuthService {
    private readonly jwtService;
    constructor(jwtService: JwtService);
    signToken(user: Pick<UsersModel, 'email' | 'id'>, isRefreshToken: boolean): string;
}
