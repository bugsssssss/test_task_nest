import { Repository } from "typeorm";
import { RncLocus } from "./entities/rnc-locus.entity";
import { RncLocusMembers } from "./entities/rnc-locus-members.entity";
import { LocusQueryDto } from "./dto/locus-query.dto";
import { PaginatedLocusResponseDto } from "./dto/locus-response.dto";
import { Role } from "../auth/enums/role.enum";
export declare class LocusService {
    private readonly locusRepository;
    private readonly locusMembersRepository;
    constructor(locusRepository: Repository<RncLocus>, locusMembersRepository: Repository<RncLocusMembers>);
    findAll(query: LocusQueryDto, userRole: Role): Promise<PaginatedLocusResponseDto>;
    private validatePermissions;
    private buildQuery;
    private transformResults;
}
