import { ApartmentStatus } from '../entities/apartment.entity';
export declare class ApartmentFilterDto {
    rooms?: number;
    minPrice?: number;
    maxPrice?: number;
    minArea?: number;
    maxArea?: number;
    floor?: number;
    status?: ApartmentStatus;
    buildingId?: string;
}
