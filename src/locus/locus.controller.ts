import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiQuery,
} from '@nestjs/swagger';
import { LocusService } from './locus.service';
import { LocusQueryDto, SideloadOption, SortField, SortOrder } from './dto/locus-query.dto';
import { PaginatedLocusResponseDto } from './dto/locus-response.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { Role } from '../auth/enums/role.enum';

interface AuthenticatedUser {
  id: number;
  username: string;
  role: Role;
}

@ApiTags('Locus')
@Controller('locus')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class LocusController {
  constructor(private readonly locusService: LocusService) {}

  @Get()
  @ApiOperation({
    summary: 'Get locus data',
    description: `
Retrieves locus data with filtering, pagination, sorting, and sideloading options.

**Role-based access:**
- **Admin**: Full access to all columns and sideloading
- **Normal**: Access to rl table columns only, no sideloading
- **Limited**: Access restricted to regionId in (86118093, 86696489, 88186467), no sideloading
    `,
  })
  @ApiQuery({
    name: 'id',
    required: false,
    description: 'Filter by locus IDs (comma-separated)',
    example: '1,2,3',
  })
  @ApiQuery({
    name: 'assemblyId',
    required: false,
    description: 'Filter by assembly ID',
    example: 'GRCh38',
  })
  @ApiQuery({
    name: 'regionId',
    required: false,
    description: 'Filter by region IDs (comma-separated)',
    example: '86118093,86696489',
  })
  @ApiQuery({
    name: 'membershipStatus',
    required: false,
    description: 'Filter by membership status',
    example: 'member',
  })
  @ApiQuery({
    name: 'sideload',
    required: false,
    enum: SideloadOption,
    description: 'Sideload related data (admin only)',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'Page number (default: 1)',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Items per page (default: 1000, max: 10000)',
  })
  @ApiQuery({
    name: 'sortBy',
    required: false,
    enum: SortField,
    description: 'Sort field',
  })
  @ApiQuery({
    name: 'sortOrder',
    required: false,
    enum: SortOrder,
    description: 'Sort order',
  })
  @ApiResponse({
    status: 200,
    description: 'Returns paginated locus data',
    type: PaginatedLocusResponseDto,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - insufficient permissions' })
  async findAll(
    @Query() query: LocusQueryDto,
    @CurrentUser() user: AuthenticatedUser,
  ): Promise<PaginatedLocusResponseDto> {
    return this.locusService.findAll(query, user.role);
  }
}
