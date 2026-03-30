import { Building } from '../../building/entities/building.entity';
import { Application } from '../../application/entities/application.entity';
export declare enum ApartmentStatus {
    AVAILABLE = "available",
    RESERVED = "reserved",
    SOLD = "sold"
}
export declare class Apartment {
    id: string;
    buildingId: string;
    number: string;
    floor: number;
    rooms: number;
    area: number;
    price: number;
    status: ApartmentStatus;
    layout: string | null;
    description: string | null;
    imageUrl: string | null;
    createdAt: Date;
    updatedAt: Date;
    building: Building;
    applications: Application[];
}
