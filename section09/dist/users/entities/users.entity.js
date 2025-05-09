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
exports.UsersModel = void 0;
const typeorm_1 = require("typeorm");
const roles_const_1 = require("../const/roles.const");
let UsersModel = class UsersModel {
};
exports.UsersModel = UsersModel;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], UsersModel.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 20,
        unique: true,
    }),
    __metadata("design:type", String)
], UsersModel.prototype, "nickname", void 0);
__decorate([
    (0, typeorm_1.Column)({
        unique: true,
    }),
    __metadata("design:type", String)
], UsersModel.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], UsersModel.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({
        enum: Object.values(roles_const_1.RolesEnum),
        default: roles_const_1.RolesEnum.USER,
    }),
    __metadata("design:type", String)
], UsersModel.prototype, "role", void 0);
exports.UsersModel = UsersModel = __decorate([
    (0, typeorm_1.Entity)()
], UsersModel);
//# sourceMappingURL=users.entity.js.map