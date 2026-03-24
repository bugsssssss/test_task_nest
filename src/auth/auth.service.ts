import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Role } from "./enums/role.enum";
import { User, JwtPayload } from "./interfaces/user.interface";

@Injectable()
export class AuthService {
	private readonly users: User[] = [
		{
			id: 1,
			username: "admin",
			password: "admin123",
			role: Role.ADMIN,
		},
		{
			id: 2,
			username: "normal",
			password: "normal123",
			role: Role.NORMAL,
		},
		{
			id: 3,
			username: "limited",
			password: "limited123",
			role: Role.LIMITED,
		},
	];

	constructor(private readonly jwtService: JwtService) {}

	async validateUser(username: string, password: string): Promise<User | null> {
		const user = this.users.find(
			(u) => u.username === username && u.password === password,
		);
		return user || null;
	}

	async login(
		username: string,
		password: string,
	): Promise<{ accessToken: string }> {
		const user = await this.validateUser(username, password);

		if (!user) {
			throw new UnauthorizedException("Invalid credentials");
		}

		const payload: JwtPayload = {
			sub: user.id,
			username: user.username,
			role: user.role,
		};

		return {
			accessToken: this.jwtService.sign(payload),
		};
	}

	findUserById(id: number): User | undefined {
		return this.users.find((u) => u.id === id);
	}
}
