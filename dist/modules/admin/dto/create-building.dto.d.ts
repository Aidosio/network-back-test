import { BuildingStatus } from '../../building/entities/building.entity';
export declare class CreateBuildingDto {
    name: string;
    floors: number;
    status?: BuildingStatus;
}
