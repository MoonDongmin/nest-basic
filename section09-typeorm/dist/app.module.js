"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const posts_module_1 = require("./posts/posts.module");
const typeorm_1 = require("@nestjs/typeorm");
const process = require("node:process");
const config_1 = require("@nestjs/config");
const posts_entity_1 = require("./posts/entities/posts.entity");
const users_module_1 = require("./users/users.module");
const users_entity_1 = require("./users/entities/users.entity");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            posts_module_1.PostsModule,
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                host: '127.0.0.1',
                port: parseInt(process.env.DB_PORT),
                username: `${process.env.DB_USER}`,
                password: `${process.env.DB_PASS}`,
                database: `${process.env.DB_DB}`,
                entities: [posts_entity_1.PostsModel, users_entity_1.UsersModel],
                synchronize: true,
            }),
            users_module_1.UsersModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map