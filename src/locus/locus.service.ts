import { Injectable, ForbiddenException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, SelectQueryBuilder } from "typeorm";
import { RncLocus } from "./entities/rnc-locus.entity";
import { RncLocusMembers } from "./entities/rnc-locus-members.entity";
import {
	LocusQueryDto,
	SideloadOption,
	SortField,
} from "./dto/locus-query.dto";
import {
	LocusResponseDto,
	PaginatedLocusResponseDto,
	LocusMemberResponseDto,
} from "./dto/locus-response.dto";
import { Role } from "../auth/enums/role.enum";

const LIMITED_REGION_IDS = [86118093, 86696489, 88186467];

const SORT_FIELD_MAP: Record<SortField, string> = {
	[SortField.ID]: "locus.id",
	[SortField.ASSEMBLY_ID]: "locus.assembly_id",
	[SortField.LOCUS_START]: "locus.locus_start",
	[SortField.LOCUS_STOP]: "locus.locus_stop",
	[SortField.MEMBER_COUNT]: "locus.member_count",
};

@Injectable()
export class LocusService {
	constructor(
		@InjectRepository(RncLocus)
		private readonly locusRepository: Repository<RncLocus>,
		@InjectRepository(RncLocusMembers)
		private readonly locusMembersRepository: Repository<RncLocusMembers>,
	) {}

	async findAll(
		query: LocusQueryDto,
		userRole: Role,
	): Promise<PaginatedLocusResponseDto> {
		this.validatePermissions(query, userRole);

		const { page = 1, limit = 1000, sortBy, sortOrder, sideload } = query;
		const skip = (page - 1) * limit;

		const queryBuilder = this.buildQuery(query, userRole);

		const total = await queryBuilder.getCount();

		const sortColumn = SORT_FIELD_MAP[sortBy || SortField.ID];
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

	private validatePermissions(query: LocusQueryDto, userRole: Role): void {
		if (userRole === Role.NORMAL && query.sideload) {
			throw new ForbiddenException(
				"Normal users cannot use sideloading feature",
			);
		}

		if (userRole === Role.LIMITED) {
			if (query.sideload) {
				throw new ForbiddenException(
					"Limited users cannot use sideloading feature",
				);
			}

			if (query.regionId && query.regionId.length > 0) {
				const invalidRegions = query.regionId.filter(
					(id) => !LIMITED_REGION_IDS.includes(id),
				);
				if (invalidRegions.length > 0) {
					throw new ForbiddenException(
						`Limited users can only access region IDs: ${LIMITED_REGION_IDS.join(", ")}`,
					);
				}
			}
		}
	}

	private buildQuery(
		query: LocusQueryDto,
		userRole: Role,
	): SelectQueryBuilder<RncLocus> {
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

		if (userRole === Role.LIMITED) {
			queryBuilder.andWhere("members.region_id IN (:...limitedRegions)", {
				limitedRegions: LIMITED_REGION_IDS,
			});
		}

		queryBuilder.distinct(true);

		return queryBuilder;
	}

	private async transformResults(
		results: RncLocus[],
		userRole: Role,
		sideload?: SideloadOption,
	): Promise<LocusResponseDto[]> {
		const transformedResults: LocusResponseDto[] = [];

		for (const locus of results) {
			const baseResponse: LocusResponseDto = {
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

			if (
				userRole === Role.ADMIN &&
				sideload === SideloadOption.LOCUS_MEMBERS
			) {
				const members = await this.locusMembersRepository.find({
					where: { locusId: locus.id },
				});

				if (members.length > 0) {
					baseResponse.ursTaxid = members[0].ursTaxid;
					baseResponse.locusMembers = members.map(
						(member): LocusMemberResponseDto => ({
							locusMemberId: Number(member.id),
							regionId: Number(member.regionId),
							locusId: Number(member.locusId),
							membershipStatus: member.membershipStatus,
						}),
					);
				}
			}

			transformedResults.push(baseResponse);
		}

		return transformedResults;
	}
}
