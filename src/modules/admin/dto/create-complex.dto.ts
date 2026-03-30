import { IsString, IsNotEmpty, IsOptional, IsEnum, IsDateString } from 'class-validator';
import { ComplexStatus } from '../../complex/entities/complex.entity';

export class CreateComplexDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  developer: string;

  @IsDateString()
  @IsOptional()
  completionDate?: string;

  @IsEnum(ComplexStatus)
  @IsOptional()
  status?: ComplexStatus;
}
