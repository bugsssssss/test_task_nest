import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocusController } from './locus.controller';
import { LocusService } from './locus.service';
import { RncLocus } from './entities/rnc-locus.entity';
import { RncLocusMembers } from './entities/rnc-locus-members.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RncLocus, RncLocusMembers])],
  controllers: [LocusController],
  providers: [LocusService],
  exports: [LocusService],
})
export class LocusModule {}
