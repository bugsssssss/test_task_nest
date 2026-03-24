import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { LocusModule } from './locus/locus.module';
import { RncLocus } from './locus/entities/rnc-locus.entity';
import { RncLocusMembers } from './locus/entities/rnc-locus-members.entity';



@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'hh-pgsql-public.ebi.ac.uk',
      port: 5432,
      username: 'reader',
      password: 'NWDMCE5xdipIjRrp',
      database: 'pfmegrnargs',
      entities: [RncLocus, RncLocusMembers],
      synchronize: false, // Read-only database
      logging: false,
    }),
    AuthModule,
    LocusModule,
  ],
})
export class AppModule {}
