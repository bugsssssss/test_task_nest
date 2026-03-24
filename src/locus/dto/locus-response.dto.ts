import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class LocusMemberResponseDto {
  @ApiProperty({ description: 'Locus member ID' })
  locusMemberId: number;

  @ApiProperty({ description: 'Region ID' })
  regionId: number;

  @ApiProperty({ description: 'Locus ID' })
  locusId: number;

  @ApiProperty({ description: 'Membership status' })
  membershipStatus: string;
}

export class LocusResponseDto {
  @ApiProperty({ description: 'Locus ID' })
  id: number;

  @ApiProperty({ description: 'Assembly ID' })
  assemblyId: string;

  @ApiProperty({ description: 'Locus name' })
  locusName: string;

  @ApiProperty({ description: 'Public locus name' })
  publicLocusName: string;

  @ApiProperty({ description: 'Chromosome' })
  chromosome: string;

  @ApiProperty({ description: 'Strand' })
  strand: string;

  @ApiProperty({ description: 'Locus start position' })
  locusStart: number;

  @ApiProperty({ description: 'Locus stop position' })
  locusStop: number;

  @ApiProperty({ description: 'Member count' })
  memberCount: number;

  @ApiPropertyOptional({ description: 'URS Tax ID (from locus members)' })
  ursTaxid?: string;

  @ApiPropertyOptional({
    description: 'Locus members (when sideloading is enabled)',
    type: [LocusMemberResponseDto],
  })
  locusMembers?: LocusMemberResponseDto[];
}

export class PaginatedLocusResponseDto {
  @ApiProperty({ type: [LocusResponseDto] })
  data: LocusResponseDto[];

  @ApiProperty({ description: 'Total number of records' })
  total: number;

  @ApiProperty({ description: 'Current page' })
  page: number;

  @ApiProperty({ description: 'Records per page' })
  limit: number;

  @ApiProperty({ description: 'Total pages' })
  totalPages: number;
}
