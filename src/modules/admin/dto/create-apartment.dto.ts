import {
  IsString,
  IsNotEmpty,
  IsInt,
  IsNumber,
  IsOptional,
  IsEnum,
  IsUUID,
} from 'class-validator';
import { ApartmentStatus } from '../../apartment/entities/apartment.entity';

export class CreateApartmentDto {
  @IsUUID()
  buildingId: string;

  @IsString()
  @IsNotEmpty()
  number: string;

  @IsInt()
  floor: number;

  @IsInt()
  rooms: number;

  @IsNumber()
  area: number;

  @IsNumber()
  price: number;

  @IsEnum(ApartmentStatus)
  @IsOptional()
  status?: ApartmentStatus;

  @IsString()
  @IsOptional()
  layout?: string;
}
