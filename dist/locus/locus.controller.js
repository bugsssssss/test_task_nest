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
exports.LocusController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const locus_service_1 = require("./locus.service");
const locus_query_dto_1 = require("./dto/locus-query.dto");
const locus_response_dto_1 = require("./dto/locus-response.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const current_user_decorator_1 = require("../auth/decorators/current-user.decorator");
let LocusController = class LocusController {
    constructor(locusService) {
        this.locusService = locusService;
    }
    async findAll(query, user) {
        return this.locusService.findAll(query, user.role);
    }
};
exports.LocusController = LocusController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Get locus data',
        description: `
Retrieves locus data with filtering, pagination, sorting, and sideloading options.

**Role-based access:**
- **Admin**: Full access to all columns and sideloading
- **Normal**: Access to rl table columns only, no sideloading
- **Limited**: Access restricted to regionId in (86118093, 86696489, 88186467), no sideloading
    `,
    }),
    (0, swagger_1.ApiQuery)({
        name: 'id',
        required: false,
        description: 'Filter by locus IDs (comma-separated)',
        example: '1,2,3',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'assemblyId',
        required: false,
        description: 'Filter by assembly ID',
        example: 'GRCh38',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'regionId',
        required: false,
        description: 'Filter by region IDs (comma-separated)',
        example: '86118093,86696489',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'membershipStatus',
        required: false,
        description: 'Filter by membership status',
        example: 'member',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'sideload',
        required: false,
        enum: locus_query_dto_1.SideloadOption,
        description: 'Sideload related data (admin only)',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'page',
        required: false,
        type: Number,
        description: 'Page number (default: 1)',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'limit',
        required: false,
        type: Number,
        description: 'Items per page (default: 1000, max: 10000)',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'sortBy',
        required: false,
        enum: locus_query_dto_1.SortField,
        description: 'Sort field',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'sortOrder',
        required: false,
        enum: locus_query_dto_1.SortOrder,
        description: 'Sort order',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Returns paginated locus data',
        type: locus_response_dto_1.PaginatedLocusResponseDto,
    }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden - insufficient permissions' }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [locus_query_dto_1.LocusQueryDto, Object]),
    __metadata("design:returntype", Promise)
], LocusController.prototype, "findAll", null);
exports.LocusController = LocusController = __decorate([
    (0, swagger_1.ApiTags)('Locus'),
    (0, common_1.Controller)('locus'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    __metadata("design:paramtypes", [locus_service_1.LocusService])
], LocusController);
//# sourceMappingURL=locus.controller.js.map