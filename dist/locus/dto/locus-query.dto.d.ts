export declare enum SideloadOption {
    LOCUS_MEMBERS = "locusMembers"
}
export declare enum SortField {
    ID = "id",
    ASSEMBLY_ID = "assemblyId",
    LOCUS_START = "locusStart",
    LOCUS_STOP = "locusStop",
    MEMBER_COUNT = "memberCount"
}
export declare enum SortOrder {
    ASC = "ASC",
    DESC = "DESC"
}
export declare class LocusQueryDto {
    id?: number[];
    assemblyId?: string;
    regionId?: number[];
    membershipStatus?: string;
    sideload?: SideloadOption;
    page?: number;
    limit?: number;
    sortBy?: SortField;
    sortOrder?: SortOrder;
}
