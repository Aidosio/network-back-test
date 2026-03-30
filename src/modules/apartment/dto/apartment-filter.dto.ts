import { IsOptional, IsInt, IsNumber, IsEnum, IsUUID, Min } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ApartmentStatus } from '../entities/apartment.entity';

export class ApartmentFilterDto {
  @ApiPropertyOptional({ description: 'Количество комнат' })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  rooms?: number;

  @ApiPropertyOptional({ description: 'Минимальная цена' })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  minPrice?: number;

  @ApiPropertyOptional({ description: 'Максимальная цена' })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  maxPrice?: number;

  @ApiPropertyOptional({ description: 'Минимальная площадь' })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  minArea?: number;

  @ApiPropertyOptional({ description: 'Максимальная площадь' })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  maxArea?: number;

  @ApiPropertyOptional({ description: 'Этаж' })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  floor?: number;

  @ApiPropertyOptional({ enum: ApartmentStatus, description: 'Статус квартиры' })
  @IsOptional()
  @IsEnum(ApartmentStatus)
  status?: ApartmentStatus;

  @ApiPropertyOptional({ description: 'ID корпуса' })
  @IsOptional()
  @IsUUID()
  buildingId?: string;
}
