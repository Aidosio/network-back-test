import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
  Index,
} from 'typeorm';
import { Building } from '../../building/entities/building.entity';
import { Application } from '../../application/entities/application.entity';

export enum ApartmentStatus {
  AVAILABLE = 'available',
  RESERVED = 'reserved',
  SOLD = 'sold',
}

@Entity('apartments')
export class Apartment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  buildingId: string;

  @Column({ type: 'varchar', length: 20 })
  number: string;

  @Index()
  @Column({ type: 'int' })
  floor: number;

  @Index()
  @Column({ type: 'int' })
  rooms: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  area: number;

  @Index()
  @Column({ type: 'decimal', precision: 15, scale: 2 })
  price: number;

  @Index()
  @Column({
    type: 'enum',
    enum: ApartmentStatus,
    default: ApartmentStatus.AVAILABLE,
  })
  status: ApartmentStatus;

  @Column({ type: 'varchar', length: 50, nullable: true })
  layout: string | null;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @Column({ type: 'varchar', length: 500, nullable: true })
  imageUrl: string | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Building, (building) => building.apartments, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'buildingId' })
  building: Building;

  @OneToMany(() => Application, (application) => application.apartment)
  applications: Application[];
}
