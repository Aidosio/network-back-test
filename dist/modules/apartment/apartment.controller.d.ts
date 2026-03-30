import { ApartmentService } from './apartment.service';
export declare class ApartmentController {
    private readonly apartmentService;
    constructor(apartmentService: ApartmentService);
    findOne(id: string): Promise<import("./entities/apartment.entity").Apartment>;
}
