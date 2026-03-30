import { ApartmentStatus } from '../../apartment/entities/apartment.entity';
export declare class CreateApartmentDto {
    buildingId: string;
    number: string;
    floor: number;
    rooms: number;
    area: number;
    price: number;
    status?: ApartmentStatus;
    layout?: string;
}
