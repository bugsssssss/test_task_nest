"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const typeorm_1 = require("@nestjs/typeorm");
const common_1 = require("@nestjs/common");
const locus_service_1 = require("./locus.service");
const rnc_locus_entity_1 = require("./entities/rnc-locus.entity");
const rnc_locus_members_entity_1 = require("./entities/rnc-locus-members.entity");
const role_enum_1 = require("../auth/enums/role.enum");
const locus_query_dto_1 = require("./dto/locus-query.dto");
describe("LocusService", () => {
    let service;
    const mockLocus = {
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
    const mockLocusMember = {
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
        const module = await testing_1.Test.createTestingModule({
            providers: [
                locus_service_1.LocusService,
                {
                    provide: (0, typeorm_1.getRepositoryToken)(rnc_locus_entity_1.RncLocus),
                    useValue: mockLocusRepository,
                },
                {
                    provide: (0, typeorm_1.getRepositoryToken)(rnc_locus_members_entity_1.RncLocusMembers),
                    useValue: mockLocusMembersRepository,
                },
            ],
        }).compile();
        service = module.get(locus_service_1.LocusService);
    });
    afterEach(() => {
        jest.clearAllMocks();
    });
    describe("findAll", () => {
        it("should return paginated results for admin", async () => {
            const query = {
                page: 1,
                limit: 10,
                sortBy: locus_query_dto_1.SortField.ID,
                sortOrder: locus_query_dto_1.SortOrder.ASC,
            };
            const result = await service.findAll(query, role_enum_1.Role.ADMIN);
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
                sideload: locus_query_dto_1.SideloadOption.LOCUS_MEMBERS,
            };
            const result = await service.findAll(query, role_enum_1.Role.ADMIN);
            expect(result.data[0]).toHaveProperty("locusMembers");
            expect(mockLocusMembersRepository.find).toHaveBeenCalled();
        });
        it("should throw ForbiddenException when normal user tries sideloading", async () => {
            const query = {
                sideload: locus_query_dto_1.SideloadOption.LOCUS_MEMBERS,
            };
            await expect(service.findAll(query, role_enum_1.Role.NORMAL)).rejects.toThrow(common_1.ForbiddenException);
        });
        it("should throw ForbiddenException when limited user tries sideloading", async () => {
            const query = {
                sideload: locus_query_dto_1.SideloadOption.LOCUS_MEMBERS,
            };
            await expect(service.findAll(query, role_enum_1.Role.LIMITED)).rejects.toThrow(common_1.ForbiddenException);
        });
        it("should throw ForbiddenException when limited user accesses invalid regionId", async () => {
            const query = {
                regionId: [12345],
            };
            await expect(service.findAll(query, role_enum_1.Role.LIMITED)).rejects.toThrow(common_1.ForbiddenException);
        });
        it("should allow limited user to access valid regionIds", async () => {
            const query = {
                regionId: [86118093],
                page: 1,
                limit: 10,
            };
            const result = await service.findAll(query, role_enum_1.Role.LIMITED);
            expect(result).toHaveProperty("data");
        });
        it("should apply filters correctly", async () => {
            const query = {
                id: [1, 2, 3],
                assemblyId: "GRCh38",
                membershipStatus: "member",
            };
            await service.findAll(query, role_enum_1.Role.ADMIN);
            expect(mockQueryBuilder.andWhere).toHaveBeenCalled();
        });
        it("should apply sorting correctly", async () => {
            const query = {
                sortBy: locus_query_dto_1.SortField.MEMBER_COUNT,
                sortOrder: locus_query_dto_1.SortOrder.DESC,
            };
            await service.findAll(query, role_enum_1.Role.ADMIN);
            expect(mockQueryBuilder.orderBy).toHaveBeenCalledWith("locus.member_count", "DESC");
        });
        it("should apply pagination correctly", async () => {
            const query = {
                page: 2,
                limit: 50,
            };
            await service.findAll(query, role_enum_1.Role.ADMIN);
            expect(mockQueryBuilder.skip).toHaveBeenCalledWith(50);
            expect(mockQueryBuilder.take).toHaveBeenCalledWith(50);
        });
    });
});
//# sourceMappingURL=locus.service.spec.js.map