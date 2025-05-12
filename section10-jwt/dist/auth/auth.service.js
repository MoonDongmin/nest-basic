"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const auth_const_1 = require("./const/auth.const");
const users_service_1 = require("../users/users.service");
const bcrypt = require("bcrypt");
let AuthService = class AuthService {
    constructor(jwtService, usersService) {
        this.jwtService = jwtService;
        this.usersService = usersService;
    }
    signToken(user, isRefreshToken) {
        const payload = {
            email: user.email,
            sub: user.id,
            type: isRefreshToken ? 'refresh' : 'access',
        };
        return this.jwtService.sign(payload, {
            secret: auth_const_1.JWT_SECRET,
            expiresIn: isRefreshToken ? 3600 : 300,
        });
    }
    loginUser(user) {
        return {
            accessToken: this.signToken(user, false),
            refreshToken: this.signToken(user, true),
        };
    }
    async authenticateWithEmailAndPassword(user) {
        const existingUser = await this.usersService.getUserByEmail(user.email);
        if (!existingUser) {
            throw new common_1.UnauthorizedException('존재하지 않는 사용자입니다.');
        }
        const passOk = await bcrypt.compare(user.password, existingUser.password);
        if (!passOk) {
            throw new common_1.UnauthorizedException('비밀번호가 틀렸습다.');
        }
        return existingUser;
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        users_service_1.UsersService])
], AuthService);
//# sourceMappingURL=auth.service.js.map