import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';
import { RncLocusMembers } from './rnc-locus-members.entity';

@Entity('rnc_locus')
export class RncLocus {
  @PrimaryColumn({ type: 'bigint' })
  id: number;

  @Column({ name: 'assembly_id', type: 'varchar' })
  assemblyId: string;

  @Column({ name: 'locus_name', type: 'varchar' })
  locusName: string;

  @Column({ name: 'public_locus_name', type: 'varchar' })
  publicLocusName: string;

  @Column({ type: 'varchar' })
  chromosome: string;

  @Column({ type: 'varchar' })
  strand: string;

  @Column({ name: 'locus_start', type: 'bigint' })
  locusStart: number;

  @Column({ name: 'locus_stop', type: 'bigint' })
  locusStop: number;

  @Column({ name: 'member_count', type: 'int' })
  memberCount: number;

  @OneToMany(() => RncLocusMembers, (member) => member.locus)
  locusMembers: RncLocusMembers[];
}
