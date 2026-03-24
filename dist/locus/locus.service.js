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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocusService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const rnc_locus_entity_1 = require("./entities/rnc-locus.entity");
const rnc_locus_members_entity_1 = require("./entities/rnc-locus-members.entity");
const locus_query_dto_1 = require("./dto/locus-query.dto");
const role_enum_1 = require("../auth/enums/role.enum");
const LIMITED_REGION_IDS = [86118093, 86696489, 88186467];
const SORT_FIELD_MAP = {
    [locus_query_dto_1.SortField.ID]: "locus.id",
    [locus_query_dto_1.SortField.ASSEMBLY_ID]: "locus.assembly_id",
    [locus_query_dto_1.SortField.LOCUS_START]: "locus.locus_start",
    [locus_query_dto_1.SortField.LOCUS_STOP]: "locus.locus_stop",
    [locus_query_dto_1.SortField.MEMBER_COUNT]: "locus.member_count",
};
let LocusService = class LocusService {
    constructor(locusRepository, locusMembersRepository) {
        this.locusRepository = locusRepository;
        this.locusMembersRepository = locusMembersRepository;
    }
    async findAll(query, userRole) {
        this.validatePermissions(query, userRole);
        const { page = 1, limit = 1000, sortBy, sortOrder, sideload } = query;
        const skip = (page - 1) * limit;
        const queryBuilder = this.buildQuery(query, userRole);
        const total = await queryBuilder.getCount();
        const sortColumn = SORT_FIELD_MAP[sortBy || locus_query_dto_1.SortField.ID];
        queryBuilder.orderBy(sortColumn, sortOrder || "ASC");
        queryBuilder.skip(skip).take(limit);
        const results = await queryBuilder.getMany();
        const data = await this.transformResults(results, userRole, sideload);
        return {
            data,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        };
    }
    validatePermissions(query, userRole) {
        if (userRole === role_enum_1.Role.NORMAL && query.sideload) {
            throw new common_1.ForbiddenException("Normal users cannot use sideloading feature");
        }
        if (userRole === role_enum_1.Role.LIMITED) {
            if (query.sideload) {
                throw new common_1.ForbiddenException("Limited users cannot use sideloading feature");
            }
            if (query.regionId && query.regionId.length > 0) {
                const invalidRegions = query.regionId.filter((id) => !LIMITED_REGION_IDS.includes(id));
                if (invalidRegions.length > 0) {
                    throw new common_1.ForbiddenException(`Limited users can only access region IDs: ${LIMITED_REGION_IDS.join(", ")}`);
                }
            }
        }
    }
    buildQuery(query, userRole) {
        const queryBuilder = this.locusRepository
            .createQueryBuilder("locus")
            .leftJoin("locus.locusMembers", "members");
        if (query.id && query.id.length > 0) {
            queryBuilder.andWhere("locus.id IN (:...ids)", { ids: query.id });
        }
        if (query.assemblyId) {
            queryBuilder.andWhere("locus.assembly_id = :assemblyId", {
                assemblyId: query.assemblyId,
            });
        }
        if (query.regionId && query.regionId.length > 0) {
            queryBuilder.andWhere("members.region_id IN (:...regionIds)", {
                regionIds: query.regionId,
            });
        }
        if (query.membershipStatus) {
            queryBuilder.andWhere("members.membership_status = :status", {
                status: query.membershipStatus,
            });
        }
        if (userRole === role_enum_1.Role.LIMITED) {
            queryBuilder.andWhere("members.region_id IN (:...limitedRegions)", {
                limitedRegions: LIMITED_REGION_IDS,
            });
        }
        queryBuilder.distinct(true);
        return queryBuilder;
    }
    async transformResults(results, userRole, sideload) {
        const transformedResults = [];
        for (const locus of results) {
            const baseResponse = {
                id: Number(locus.id),
                assemblyId: locus.assemblyId,
                locusName: locus.locusName,
                publicLocusName: locus.publicLocusName,
                chromosome: locus.chromosome,
                strand: locus.strand,
                locusStart: Number(locus.locusStart),
                locusStop: Number(locus.locusStop),
                memberCount: locus.memberCount,
            };
            if (userRole === role_enum_1.Role.ADMIN &&
                sideload === locus_query_dto_1.SideloadOption.LOCUS_MEMBERS) {
                const members = await this.locusMembersRepository.find({
                    where: { locusId: locus.id },
                });
                if (members.length > 0) {
                    baseResponse.ursTaxid = members[0].ursTaxid;
                    baseResponse.locusMembers = members.map((member) => ({
                        locusMemberId: Number(member.id),
                        regionId: Number(member.regionId),
                        locusId: Number(member.locusId),
                        membershipStatus: member.membershipStatus,
                    }));
                }
            }
            transformedResults.push(baseResponse);
        }
        return transformedResults;
    }
};
exports.LocusService = LocusService;
exports.LocusService = LocusService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(rnc_locus_entity_1.RncLocus)),
    __param(1, (0, typeorm_1.InjectRepository)(rnc_locus_members_entity_1.RncLocusMembers)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], LocusService);
//# sourceMappingURL=locus.service.js.map