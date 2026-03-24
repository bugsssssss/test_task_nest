import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { RncLocus } from './rnc-locus.entity';

@Entity('rnc_locus_members')
export class RncLocusMembers {
  @PrimaryColumn({ type: 'bigint' })
  id: number;

  @Column({ name: 'region_id', type: 'bigint' })
  regionId: number;

  @Column({ name: 'locus_id', type: 'bigint' })
  locusId: number;

  @Column({ name: 'membership_status', type: 'varchar' })
  membershipStatus: string;

  @Column({ name: 'urs_taxid', type: 'varchar', nullable: true })
  ursTaxid: string;

  @ManyToOne(() => RncLocus, (locus) => locus.locusMembers)
  @JoinColumn({ name: 'locus_id' })
  locus: RncLocus;
}
