import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { ForbiddenException } from "@nestjs/common";
import { LocusService } from "./locus.service";
import { RncLocus } from "./entities/rnc-locus.entity";
import { RncLocusMembers } from "./entities/rnc-locus-members.entity";
import { Role } from "../auth/enums/role.enum";
import { SideloadOption, SortField, SortOrder } from "./dto/locus-query.dto";

describe("LocusService", () => {
	let service: LocusService;

	const mockLocus: Partial<RncLocus> = {
		id: 1,
		assemblyId: "GRCh38",
		locusName: "test-locus",
		publicLocusName: "TEST123",
		chromosome: "1",
		strand: "+",
		locusStart: 1000,
		locusStop: 2000,
		memberCount: 5,
	};

	const mockLocusMember: Partial<RncLocusMembers> = {
		id: 1,
		regionId: 86118093,
		locusId: 1,
		membershipStatus: "member",
		ursTaxid: "URS123",
	};

	const mockQueryBuilder = {
		leftJoin: jest.fn().mockReturnThis(),
		andWhere: jest.fn().mockReturnThis(),
		distinct: jest.fn().mockReturnThis(),
		orderBy: jest.fn().mockReturnThis(),
		skip: jest.fn().mockReturnThis(),
		take: jest.fn().mockReturnThis(),
		getCount: jest.fn().mockResolvedValue(1),
		getMany: jest.fn().mockResolvedValue([mockLocus]),
	};

	const mockLocusRepository = {
		createQueryBuilder: jest.fn().mockReturnValue(mockQueryBuilder),
	};

	const mockLocusMembersRepository = {
		find: jest.fn().mockResolvedValue([mockLocusMember]),
	};

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				LocusService,
				{
					provide: getRepositoryToken(RncLocus),
					useValue: mockLocusRepository,
				},
				{
					provide: getRepositoryToken(RncLocusMembers),
					useValue: mockLocusMembersRepository,
				},
			],
		}).compile();

		service = module.get<LocusService>(LocusService);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	describe("findAll", () => {
		it("should return paginated results for admin", async () => {
			const query = {
				page: 1,
				limit: 10,
				sortBy: SortField.ID,
				sortOrder: SortOrder.ASC,
			};

			const result = await service.findAll(query, Role.ADMIN);

			expect(result).toHaveProperty("data");
			expect(result).toHaveProperty("total");
			expect(result).toHaveProperty("page");
			expect(result).toHaveProperty("limit");
			expect(result).toHaveProperty("totalPages");
			expect(result.data.length).toBe(1);
		});

		it("should return results with sideloading for admin", async () => {
			const query = {
				page: 1,
				limit: 10,
				sideload: SideloadOption.LOCUS_MEMBERS,
			};

			const result = await service.findAll(query, Role.ADMIN);

			expect(result.data[0]).toHaveProperty("locusMembers");
			expect(mockLocusMembersRepository.find).toHaveBeenCalled();
		});

		it("should throw ForbiddenException when normal user tries sideloading", async () => {
			const query = {
				sideload: SideloadOption.LOCUS_MEMBERS,
			};

			await expect(service.findAll(query, Role.NORMAL)).rejects.toThrow(
				ForbiddenException,
			);
		});

		it("should throw ForbiddenException when limited user tries sideloading", async () => {
			const query = {
				sideload: SideloadOption.LOCUS_MEMBERS,
			};

			await expect(service.findAll(query, Role.LIMITED)).rejects.toThrow(
				ForbiddenException,
			);
		});

		it("should throw ForbiddenException when limited user accesses invalid regionId", async () => {
			const query = {
				regionId: [12345],
			};

			await expect(service.findAll(query, Role.LIMITED)).rejects.toThrow(
				ForbiddenException,
			);
		});

		it("should allow limited user to access valid regionIds", async () => {
			const query = {
				regionId: [86118093],
				page: 1,
				limit: 10,
			};

			const result = await service.findAll(query, Role.LIMITED);
			expect(result).toHaveProperty("data");
		});

		it("should apply filters correctly", async () => {
			const query = {
				id: [1, 2, 3],
				assemblyId: "GRCh38",
				membershipStatus: "member",
			};

			await service.findAll(query, Role.ADMIN);

			expect(mockQueryBuilder.andWhere).toHaveBeenCalled();
		});

		it("should apply sorting correctly", async () => {
			const query = {
				sortBy: SortField.MEMBER_COUNT,
				sortOrder: SortOrder.DESC,
			};

			await service.findAll(query, Role.ADMIN);

			expect(mockQueryBuilder.orderBy).toHaveBeenCalledWith(
				"locus.member_count",
				"DESC",
			);
		});

		it("should apply pagination correctly", async () => {
			const query = {
				page: 2,
				limit: 50,
			};

			await service.findAll(query, Role.ADMIN);

			expect(mockQueryBuilder.skip).toHaveBeenCalledWith(50);
			expect(mockQueryBuilder.take).toHaveBeenCalledWith(50);
		});
	});
});
