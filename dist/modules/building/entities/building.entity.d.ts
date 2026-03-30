import { ResidentialComplex } from '../../complex/entities/complex.entity';
import { Apartment } from '../../apartment/entities/apartment.entity';
export declare enum BuildingStatus {
    UNDER_CONSTRUCTION = "under_construction",
    COMPLETED = "completed"
}
export declare class Building {
    id: string;
    complexId: string;
    name: string;
    floors: number;
    status: BuildingStatus;
    createdAt: Date;
    updatedAt: Date;
    complex: ResidentialComplex;
    apartments: Apartment[];
}
