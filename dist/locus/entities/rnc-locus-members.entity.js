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
exports.RncLocusMembers = void 0;
const typeorm_1 = require("typeorm");
const rnc_locus_entity_1 = require("./rnc-locus.entity");
let RncLocusMembers = class RncLocusMembers {
};
exports.RncLocusMembers = RncLocusMembers;
__decorate([
    (0, typeorm_1.PrimaryColumn)({ type: 'bigint' }),
    __metadata("design:type", Number)
], RncLocusMembers.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'region_id', type: 'bigint' }),
    __metadata("design:type", Number)
], RncLocusMembers.prototype, "regionId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'locus_id', type: 'bigint' }),
    __metadata("design:type", Number)
], RncLocusMembers.prototype, "locusId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'membership_status', type: 'varchar' }),
    __metadata("design:type", String)
], RncLocusMembers.prototype, "membershipStatus", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'urs_taxid', type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], RncLocusMembers.prototype, "ursTaxid", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => rnc_locus_entity_1.RncLocus, (locus) => locus.locusMembers),
    (0, typeorm_1.JoinColumn)({ name: 'locus_id' }),
    __metadata("design:type", rnc_locus_entity_1.RncLocus)
], RncLocusMembers.prototype, "locus", void 0);
exports.RncLocusMembers = RncLocusMembers = __decorate([
    (0, typeorm_1.Entity)('rnc_locus_members')
], RncLocusMembers);
//# sourceMappingURL=rnc-locus-members.entity.js.map