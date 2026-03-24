"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const auth_module_1 = require("./auth/auth.module");
const locus_module_1 = require("./locus/locus.module");
const rnc_locus_entity_1 = require("./locus/entities/rnc-locus.entity");
const rnc_locus_members_entity_1 = require("./locus/entities/rnc-locus-members.entity");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                host: 'hh-pgsql-public.ebi.ac.uk',
                port: 5432,
                username: 'reader',
                password: 'NWDMCE5xdipIjRrp',
                database: 'pfmegrnargs',
                entities: [rnc_locus_entity_1.RncLocus, rnc_locus_members_entity_1.RncLocusMembers],
                synchronize: false,
                logging: false,
            }),
            auth_module_1.AuthModule,
            locus_module_1.LocusModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map