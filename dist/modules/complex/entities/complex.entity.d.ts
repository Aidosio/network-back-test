import { Building } from '../../building/entities/building.entity';
export declare enum ComplexStatus {
    UNDER_CONSTRUCTION = "under_construction",
    COMPLETED = "completed",
    SELLING = "selling"
}
export declare class ResidentialComplex {
    id: string;
    name: string;
    description: string | null;
    address: string;
    city: string;
    imageUrl: string | null;
    developer: string;
    completionDate: Date | null;
    status: ComplexStatus;
    createdAt: Date;
    updatedAt: Date;
    buildings: Building[];
    minPrice?: number | null;
    maxPrice?: number | null;
    availableCount?: number;
}
