import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Building } from '../../building/entities/building.entity';

export enum ComplexStatus {
  UNDER_CONSTRUCTION = 'under_construction',
  COMPLETED = 'completed',
  SELLING = 'selling',
}

@Entity('residential_complexes')
export class ResidentialComplex {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @Column({ type: 'varchar', length: 500 })
  address: string;

  @Column({ type: 'varchar', length: 100 })
  city: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  imageUrl: string | null;

  @Column({ type: 'varchar', length: 255 })
  developer: string;

  @Column({ type: 'date', nullable: true })
  completionDate: Date | null;

  @Column({
    type: 'enum',
    enum: ComplexStatus,
    default: ComplexStatus.SELLING,
  })
  status: ComplexStatus;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Building, (building) => building.complex, { cascade: true })
  buildings: Building[];

  // Virtual fields (populated by queries)
  minPrice?: number | null;
  maxPrice?: number | null;
  availableCount?: number;
}
