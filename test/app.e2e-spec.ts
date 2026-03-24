import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import * as request from "supertest";
import { AppModule } from "../src/app.module";

describe("AppController (e2e)", () => {
	let app: INestApplication;
	let adminToken: string;
	let normalToken: string;
	let limitedToken: string;

	beforeAll(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		app = moduleFixture.createNestApplication();
		app.useGlobalPipes(
			new ValidationPipe({
				transform: true,
				whitelist: true,
				transformOptions: {
					enableImplicitConversion: true,
				},
			}),
		);
		await app.init();

		const adminLogin = await request(app.getHttpServer())
			.post("/auth/login")
			.send({ username: "admin", password: "admin123" });
		adminToken = adminLogin.body.accessToken;

		const normalLogin = await request(app.getHttpServer())
			.post("/auth/login")
			.send({ username: "normal", password: "normal123" });
		normalToken = normalLogin.body.accessToken;

		const limitedLogin = await request(app.getHttpServer())
			.post("/auth/login")
			.send({ username: "limited", password: "limited123" });
		limitedToken = limitedLogin.body.accessToken;
	});

	afterAll(async () => {
		await app.close();
	});

	describe("/auth/login (POST)", () => {
		it("should return access token for valid credentials", () => {
			return request(app.getHttpServer())
				.post("/auth/login")
				.send({ username: "admin", password: "admin123" })
				.expect(201)
				.expect((res) => {
					expect(res.body).toHaveProperty("accessToken");
				});
		});

		it("should return 401 for invalid credentials", () => {
			return request(app.getHttpServer())
				.post("/auth/login")
				.send({ username: "admin", password: "wrongpassword" })
				.expect(401);
		});
	});

	describe("/locus (GET)", () => {
		it("should return 401 without authentication", () => {
			return request(app.getHttpServer()).get("/locus").expect(401);
		});

		it("should return data for authenticated admin", () => {
			return request(app.getHttpServer())
				.get("/locus")
				.set("Authorization", `Bearer ${adminToken}`)
				.query({ limit: 10 })
				.expect(200)
				.expect((res) => {
					expect(res.body).toHaveProperty("data");
					expect(res.body).toHaveProperty("total");
					expect(res.body).toHaveProperty("page");
					expect(res.body).toHaveProperty("limit");
				});
		});

		it("should allow admin to use sideloading", () => {
			return request(app.getHttpServer())
				.get("/locus")
				.set("Authorization", `Bearer ${adminToken}`)
				.query({ limit: 10, sideload: "locusMembers" })
				.expect(200);
		});

		it("should reject sideloading for normal user", () => {
			return request(app.getHttpServer())
				.get("/locus")
				.set("Authorization", `Bearer ${normalToken}`)
				.query({ sideload: "locusMembers" })
				.expect(403);
		});

		it("should reject sideloading for limited user", () => {
			return request(app.getHttpServer())
				.get("/locus")
				.set("Authorization", `Bearer ${limitedToken}`)
				.query({ sideload: "locusMembers" })
				.expect(403);
		});

		it("should reject invalid regionId for limited user", () => {
			return request(app.getHttpServer())
				.get("/locus")
				.set("Authorization", `Bearer ${limitedToken}`)
				.query({ regionId: "12345" })
				.expect(403);
		});

		it("should allow valid regionId for limited user", () => {
			return request(app.getHttpServer())
				.get("/locus")
				.set("Authorization", `Bearer ${limitedToken}`)
				.query({ regionId: "86118093", limit: 10 })
				.expect(200);
		});

		it("should apply pagination correctly", () => {
			return request(app.getHttpServer())
				.get("/locus")
				.set("Authorization", `Bearer ${adminToken}`)
				.query({ page: 1, limit: 5 })
				.expect(200)
				.expect((res) => {
					expect(res.body.page).toBe(1);
					expect(res.body.limit).toBe(5);
				});
		});
	});
});
