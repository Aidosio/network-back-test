import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { ResidentialComplex } from '../../complex/entities/complex.entity';
import { Apartment } from '../../apartment/entities/apartment.entity';

export enum BuildingStatus {
  UNDER_CONSTRUCTION = 'under_construction',
  COMPLETED = 'completed',
}

@Entity('buildings')
export class Building {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  complexId: string;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'int' })
  floors: number;

  @Column({
    type: 'enum',
    enum: BuildingStatus,
    default: BuildingStatus.COMPLETED,
  })
  status: BuildingStatus;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => ResidentialComplex, (complex) => complex.buildings, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'complexId' })
  complex: ResidentialComplex;

  @OneToMany(() => Apartment, (apartment) => apartment.building, { cascade: true })
  apartments: Apartment[];
}
