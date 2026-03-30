import { IsString, IsNotEmpty, IsInt, IsOptional, IsEnum } from 'class-validator';
import { BuildingStatus } from '../../building/entities/building.entity';

export class CreateBuildingDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  floors: number;

  @IsEnum(BuildingStatus)
  @IsOptional()
  status?: BuildingStatus;
}
