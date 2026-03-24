import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Role } from './enums/role.enum';

describe('AuthService', () => {
  let service: AuthService;
  let jwtService: JwtService;

  const mockJwtService = {
    sign: jest.fn().mockReturnValue('mock-jwt-token'),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    jwtService = module.get<JwtService>(JwtService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('validateUser', () => {
    it('should return user for valid admin credentials', async () => {
      const user = await service.validateUser('admin', 'admin123');
      expect(user).toBeDefined();
      expect(user?.username).toBe('admin');
      expect(user?.role).toBe(Role.ADMIN);
    });

    it('should return user for valid normal credentials', async () => {
      const user = await service.validateUser('normal', 'normal123');
      expect(user).toBeDefined();
      expect(user?.username).toBe('normal');
      expect(user?.role).toBe(Role.NORMAL);
    });

    it('should return user for valid limited credentials', async () => {
      const user = await service.validateUser('limited', 'limited123');
      expect(user).toBeDefined();
      expect(user?.username).toBe('limited');
      expect(user?.role).toBe(Role.LIMITED);
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
        role: Role.ADMIN,
      });
    });

    it('should throw UnauthorizedException for invalid credentials', async () => {
      await expect(service.login('admin', 'wrongpassword')).rejects.toThrow(
        UnauthorizedException,
      );
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
