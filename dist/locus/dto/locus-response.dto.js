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
exports.PaginatedLocusResponseDto = exports.LocusResponseDto = exports.LocusMemberResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class LocusMemberResponseDto {
}
exports.LocusMemberResponseDto = LocusMemberResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Locus member ID' }),
    __metadata("design:type", Number)
], LocusMemberResponseDto.prototype, "locusMemberId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Region ID' }),
    __metadata("design:type", Number)
], LocusMemberResponseDto.prototype, "regionId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Locus ID' }),
    __metadata("design:type", Number)
], LocusMemberResponseDto.prototype, "locusId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Membership status' }),
    __metadata("design:type", String)
], LocusMemberResponseDto.prototype, "membershipStatus", void 0);
class LocusResponseDto {
}
exports.LocusResponseDto = LocusResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Locus ID' }),
    __metadata("design:type", Number)
], LocusResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Assembly ID' }),
    __metadata("design:type", String)
], LocusResponseDto.prototype, "assemblyId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Locus name' }),
    __metadata("design:type", String)
], LocusResponseDto.prototype, "locusName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Public locus name' }),
    __metadata("design:type", String)
], LocusResponseDto.prototype, "publicLocusName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Chromosome' }),
    __metadata("design:type", String)
], LocusResponseDto.prototype, "chromosome", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Strand' }),
    __metadata("design:type", String)
], LocusResponseDto.prototype, "strand", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Locus start position' }),
    __metadata("design:type", Number)
], LocusResponseDto.prototype, "locusStart", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Locus stop position' }),
    __metadata("design:type", Number)
], LocusResponseDto.prototype, "locusStop", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Member count' }),
    __metadata("design:type", Number)
], LocusResponseDto.prototype, "memberCount", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'URS Tax ID (from locus members)' }),
    __metadata("design:type", String)
], LocusResponseDto.prototype, "ursTaxid", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Locus members (when sideloading is enabled)',
        type: [LocusMemberResponseDto],
    }),
    __metadata("design:type", Array)
], LocusResponseDto.prototype, "locusMembers", void 0);
class PaginatedLocusResponseDto {
}
exports.PaginatedLocusResponseDto = PaginatedLocusResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: [LocusResponseDto] }),
    __metadata("design:type", Array)
], PaginatedLocusResponseDto.prototype, "data", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Total number of records' }),
    __metadata("design:type", Number)
], PaginatedLocusResponseDto.prototype, "total", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Current page' }),
    __metadata("design:type", Number)
], PaginatedLocusResponseDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Records per page' }),
    __metadata("design:type", Number)
], PaginatedLocusResponseDto.prototype, "limit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Total pages' }),
    __metadata("design:type", Number)
], PaginatedLocusResponseDto.prototype, "totalPages", void 0);
//# sourceMappingURL=locus-response.dto.js.map