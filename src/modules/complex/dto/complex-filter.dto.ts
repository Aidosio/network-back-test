import { IsOptional, IsString, IsEnum } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { ComplexStatus } from '../entities/complex.entity';

export class ComplexFilterDto {
  @ApiPropertyOptional({ description: 'Фильтр по городу' })
  @IsOptional()
  @IsString()
  city?: string;

  @ApiPropertyOptional({ enum: ComplexStatus, description: 'Фильтр по статусу' })
  @IsOptional()
  @IsEnum(ComplexStatus)
  status?: ComplexStatus;
}
