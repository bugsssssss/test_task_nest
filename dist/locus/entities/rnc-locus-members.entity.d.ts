import { RncLocus } from './rnc-locus.entity';
export declare class RncLocusMembers {
    id: number;
    regionId: number;
    locusId: number;
    membershipStatus: string;
    ursTaxid: string;
    locus: RncLocus;
}
