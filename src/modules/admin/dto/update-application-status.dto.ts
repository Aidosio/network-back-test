import { IsEnum } from 'class-validator';
import { ApplicationStatus } from '../../application/entities/application.entity';

export class UpdateApplicationStatusDto {
  @IsEnum(ApplicationStatus)
  status: ApplicationStatus;
}
