"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const jwt_1 = require("@nestjs/jwt");
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const role_enum_1 = require("./enums/role.enum");
describe('AuthService', () => {
    let service;
    let jwtService;
    const mockJwtService = {
        sign: jest.fn().mockReturnValue('mock-jwt-token'),
    };
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [
                auth_service_1.AuthService,
                {
                    provide: jwt_1.JwtService,
                    useValue: mockJwtService,
                },
            ],
        }).compile();
        service = module.get(auth_service_1.AuthService);
        jwtService = module.get(jwt_1.JwtService);
    });
    afterEach(() => {
        jest.clearAllMocks();
    });
    describe('validateUser', () => {
        it('should return user for valid admin credentials', async () => {
            const user = await service.validateUser('admin', 'admin123');
            expect(user).toBeDefined();
            expect(user?.username).toBe('admin');
            expect(user?.role).toBe(role_enum_1.Role.ADMIN);
        });
        it('should return user for valid normal credentials', async () => {
            const user = await service.validateUser('normal', 'normal123');
            expect(user).toBeDefined();
            expect(user?.username).toBe('normal');
            expect(user?.role).toBe(role_enum_1.Role.NORMAL);
        });
        it('should return user for valid limited credentials', async () => {
            const user = await service.validateUser('limited', 'limited123');
            expect(user).toBeDefined();
            expect(user?.username).toBe('limited');
            expect(user?.role).toBe(role_enum_1.Role.LIMITED);
        });
        it('should return null for invalid credentials', async () => {
            const user = await service.validateUser('admin', 'wrongpassword');
            expect(user).toBeNull();
        });
        it('should return null for non-existent user', async () => {
            const user = await service.validateUser('nonexistent', 'password');
            expect(user).toBeNull();
        });
    });
    describe('login', () => {
        it('should return access token for valid credentials', async () => {
            const result = await service.login('admin', 'admin123');
            expect(result).toHaveProperty('accessToken');
            expect(result.accessToken).toBe('mock-jwt-token');
            expect(jwtService.sign).toHaveBeenCalledWith({
                sub: 1,
                username: 'admin',
                role: role_enum_1.Role.ADMIN,
            });
        });
        it('should throw UnauthorizedException for invalid credentials', async () => {
            await expect(service.login('admin', 'wrongpassword')).rejects.toThrow(common_1.UnauthorizedException);
        });
    });
    describe('findUserById', () => {
        it('should return user by id', () => {
            const user = service.findUserById(1);
            expect(user).toBeDefined();
            expect(user?.username).toBe('admin');
        });
        it('should return undefined for non-existent id', () => {
            const user = service.findUserById(999);
            expect(user).toBeUndefined();
        });
    });
});
//# sourceMappingURL=auth.service.spec.js.map