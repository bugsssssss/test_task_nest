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
exports.RncLocus = void 0;
const typeorm_1 = require("typeorm");
const rnc_locus_members_entity_1 = require("./rnc-locus-members.entity");
let RncLocus = class RncLocus {
};
exports.RncLocus = RncLocus;
__decorate([
    (0, typeorm_1.PrimaryColumn)({ type: 'bigint' }),
    __metadata("design:type", Number)
], RncLocus.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'assembly_id', type: 'varchar' }),
    __metadata("design:type", String)
], RncLocus.prototype, "assemblyId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'locus_name', type: 'varchar' }),
    __metadata("design:type", String)
], RncLocus.prototype, "locusName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'public_locus_name', type: 'varchar' }),
    __metadata("design:type", String)
], RncLocus.prototype, "publicLocusName", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar' }),
    __metadata("design:type", String)
], RncLocus.prototype, "chromosome", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar' }),
    __metadata("design:type", String)
], RncLocus.prototype, "strand", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'locus_start', type: 'bigint' }),
    __metadata("design:type", Number)
], RncLocus.prototype, "locusStart", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'locus_stop', type: 'bigint' }),
    __metadata("design:type", Number)
], RncLocus.prototype, "locusStop", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'member_count', type: 'int' }),
    __metadata("design:type", Number)
], RncLocus.prototype, "memberCount", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => rnc_locus_members_entity_1.RncLocusMembers, (member) => member.locus),
    __metadata("design:type", Array)
], RncLocus.prototype, "locusMembers", void 0);
exports.RncLocus = RncLocus = __decorate([
    (0, typeorm_1.Entity)('rnc_locus')
], RncLocus);
//# sourceMappingURL=rnc-locus.entity.js.map