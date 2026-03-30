import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Apartment } from '../../apartment/entities/apartment.entity';

export enum ApplicationType {
  INQUIRY = 'inquiry',
  BOOKING = 'booking',
  PURCHASE = 'purchase',
}

export enum ApplicationStatus {
  NEW = 'new',
  IN_PROGRESS = 'in_progress',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  CANCELLED = 'cancelled',
}

@Entity('applications')
export class Application {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  apartmentId: string;

  @Column({ type: 'varchar', length: 100 })
  firstName: string;

  @Column({ type: 'varchar', length: 100 })
  lastName: string;

  @Column({ type: 'varchar', length: 20 })
  phone: string;

  @Column({ type: 'varchar', length: 255 })
  email: string;

  @Column({
    type: 'enum',
    enum: ApplicationType,
    default: ApplicationType.BOOKING,
  })
  type: ApplicationType;

  @Column({
    type: 'enum',
    enum: ApplicationStatus,
    default: ApplicationStatus.NEW,
  })
  status: ApplicationStatus;

  @Column({ type: 'text', nullable: true })
  comment: string | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Apartment, (apartment) => apartment.applications)
  @JoinColumn({ name: 'apartmentId' })
  apartment: Apartment;
}
