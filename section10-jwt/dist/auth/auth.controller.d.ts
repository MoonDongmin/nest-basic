import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    postTokenAccess(rawToken: string): {
        accessToken: string;
    };
    postTokenRefresh(rawToken: string): {
        refreshToken: string;
    };
    postLoginEmail(rawToken: string): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    postRegisterEmail(email: string, password: string, nickname: string): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
}
