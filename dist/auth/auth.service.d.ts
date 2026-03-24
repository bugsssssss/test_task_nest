import { JwtService } from "@nestjs/jwt";
import { User } from "./interfaces/user.interface";
export declare class AuthService {
    private readonly jwtService;
    private readonly users;
    constructor(jwtService: JwtService);
    validateUser(username: string, password: string): Promise<User | null>;
    login(username: string, password: string): Promise<{
        accessToken: string;
    }>;
    findUserById(id: number): User | undefined;
}
