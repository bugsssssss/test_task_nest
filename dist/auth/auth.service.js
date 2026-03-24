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
const role_enum_1 = require("./enums/role.enum");
let AuthService = class AuthService {
    constructor(jwtService) {
        this.jwtService = jwtService;
        this.users = [
            {
                id: 1,
                username: "admin",
                password: "admin123",
                role: role_enum_1.Role.ADMIN,
            },
            {
                id: 2,
                username: "normal",
                password: "normal123",
                role: role_enum_1.Role.NORMAL,
            },
            {
                id: 3,
                username: "limited",
                password: "limited123",
                role: role_enum_1.Role.LIMITED,
            },
        ];
    }
    async validateUser(username, password) {
        const user = this.users.find((u) => u.username === username && u.password === password);
        return user || null;
    }
    async login(username, password) {
        const user = await this.validateUser(username, password);
        if (!user) {
            throw new common_1.UnauthorizedException("Invalid credentials");
        }
        const payload = {
            sub: user.id,
            username: user.username,
            role: user.role,
        };
        return {
            accessToken: this.jwtService.sign(payload),
        };
    }
    findUserById(id) {
        return this.users.find((u) => u.id === id);
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map