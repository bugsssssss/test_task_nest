import { LocusService } from './locus.service';
import { LocusQueryDto } from './dto/locus-query.dto';
import { PaginatedLocusResponseDto } from './dto/locus-response.dto';
import { Role } from '../auth/enums/role.enum';
interface AuthenticatedUser {
    id: number;
    username: string;
    role: Role;
}
export declare class LocusController {
    private readonly locusService;
    constructor(locusService: LocusService);
    findAll(query: LocusQueryDto, user: AuthenticatedUser): Promise<PaginatedLocusResponseDto>;
}
export {};
