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
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocusQueryDto = exports.SortOrder = exports.SortField = exports.SideloadOption = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
var SideloadOption;
(function (SideloadOption) {
    SideloadOption["LOCUS_MEMBERS"] = "locusMembers";
})(SideloadOption || (exports.SideloadOption = SideloadOption = {}));
var SortField;
(function (SortField) {
    SortField["ID"] = "id";
    SortField["ASSEMBLY_ID"] = "assemblyId";
    SortField["LOCUS_START"] = "locusStart";
    SortField["LOCUS_STOP"] = "locusStop";
    SortField["MEMBER_COUNT"] = "memberCount";
})(SortField || (exports.SortField = SortField = {}));
var SortOrder;
(function (SortOrder) {
    SortOrder["ASC"] = "ASC";
    SortOrder["DESC"] = "DESC";
})(SortOrder || (exports.SortOrder = SortOrder = {}));
class LocusQueryDto {
    constructor() {
        this.page = 1;
        this.limit = 1000;
        this.sortBy = SortField.ID;
        this.sortOrder = SortOrder.ASC;
    }
}
exports.LocusQueryDto = LocusQueryDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Filter by locus IDs (comma-separated)',
        example: '1,2,3',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => {
        if (typeof value === 'string') {
            return value.split(',').map((v) => parseInt(v.trim(), 10));
        }
        return value;
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsInt)({ each: true }),
    __metadata("design:type", Array)
], LocusQueryDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Filter by assembly ID',
        example: 'GRCh38',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], LocusQueryDto.prototype, "assemblyId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Filter by region IDs (comma-separated)',
        example: '86118093,86696489',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => {
        if (typeof value === 'string') {
            return value.split(',').map((v) => parseInt(v.trim(), 10));
        }
        return value;
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsInt)({ each: true }),
    __metadata("design:type", Array)
], LocusQueryDto.prototype, "regionId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Filter by membership status',
        example: 'member',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], LocusQueryDto.prototype, "membershipStatus", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Sideload related data',
        enum: SideloadOption,
        example: SideloadOption.LOCUS_MEMBERS,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(SideloadOption),
    __metadata("design:type", String)
], LocusQueryDto.prototype, "sideload", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Page number (1-based)',
        default: 1,
        minimum: 1,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], LocusQueryDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Number of rows per page',
        default: 1000,
        minimum: 1,
        maximum: 10000,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(10000),
    __metadata("design:type", Number)
], LocusQueryDto.prototype, "limit", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Sort field',
        enum: SortField,
        default: SortField.ID,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(SortField),
    __metadata("design:type", String)
], LocusQueryDto.prototype, "sortBy", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Sort order',
        enum: SortOrder,
        default: SortOrder.ASC,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(SortOrder),
    __metadata("design:type", String)
], LocusQueryDto.prototype, "sortOrder", void 0);
//# sourceMappingURL=locus-query.dto.js.map