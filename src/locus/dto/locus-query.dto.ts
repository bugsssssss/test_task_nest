import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsOptional,
  IsInt,
  IsString,
  IsEnum,
  IsArray,
  Min,
  Max,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';

export enum SideloadOption {
  LOCUS_MEMBERS = 'locusMembers',
}

export enum SortField {
  ID = 'id',
  ASSEMBLY_ID = 'assemblyId',
  LOCUS_START = 'locusStart',
  LOCUS_STOP = 'locusStop',
  MEMBER_COUNT = 'memberCount',
}

export enum SortOrder {
  ASC = 'ASC',
  DESC = 'DESC',
}

export class LocusQueryDto {
  @ApiPropertyOptional({
    description: 'Filter by locus IDs (comma-separated)',
    example: '1,2,3',
  })
  @IsOptional()
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      return value.split(',').map((v) => parseInt(v.trim(), 10));
    }
    return value;
  })
  @IsArray()
  @IsInt({ each: true })
  id?: number[];

  @ApiPropertyOptional({
    description: 'Filter by assembly ID',
    example: 'GRCh38',
  })
  @IsOptional()
  @IsString()
  assemblyId?: string;

  @ApiPropertyOptional({
    description: 'Filter by region IDs (comma-separated)',
    example: '86118093,86696489',
  })
  @IsOptional()
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      return value.split(',').map((v) => parseInt(v.trim(), 10));
    }
    return value;
  })
  @IsArray()
  @IsInt({ each: true })
  regionId?: number[];

  @ApiPropertyOptional({
    description: 'Filter by membership status',
    example: 'member',
  })
  @IsOptional()
  @IsString()
  membershipStatus?: string;

  @ApiPropertyOptional({
    description: 'Sideload related data',
    enum: SideloadOption,
    example: SideloadOption.LOCUS_MEMBERS,
  })
  @IsOptional()
  @IsEnum(SideloadOption)
  sideload?: SideloadOption;

  @ApiPropertyOptional({
    description: 'Page number (1-based)',
    default: 1,
    minimum: 1,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @ApiPropertyOptional({
    description: 'Number of rows per page',
    default: 1000,
    minimum: 1,
    maximum: 10000,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(10000)
  limit?: number = 1000;

  @ApiPropertyOptional({
    description: 'Sort field',
    enum: SortField,
    default: SortField.ID,
  })
  @IsOptional()
  @IsEnum(SortField)
  sortBy?: SortField = SortField.ID;

  @ApiPropertyOptional({
    description: 'Sort order',
    enum: SortOrder,
    default: SortOrder.ASC,
  })
  @IsOptional()
  @IsEnum(SortOrder)
  sortOrder?: SortOrder = SortOrder.ASC;
}
