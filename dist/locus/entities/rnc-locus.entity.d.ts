import { RncLocusMembers } from './rnc-locus-members.entity';
export declare class RncLocus {
    id: number;
    assemblyId: string;
    locusName: string;
    publicLocusName: string;
    chromosome: string;
    strand: string;
    locusStart: number;
    locusStop: number;
    memberCount: number;
    locusMembers: RncLocusMembers[];
}
