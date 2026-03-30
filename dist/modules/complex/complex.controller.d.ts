import { ComplexService } from './complex.service';
import { ApartmentService } from '../apartment/apartment.service';
import { ComplexFilterDto } from './dto/complex-filter.dto';
import { ApartmentFilterDto } from '../apartment/dto/apartment-filter.dto';
export declare class ComplexController {
    private readonly complexService;
    private readonly apartmentService;
    constructor(complexService: ComplexService, apartmentService: ApartmentService);
    findAll(filter: ComplexFilterDto): Promise<import("./entities/complex.entity").ResidentialComplex[]>;
    findOne(id: string): Promise<import("./entities/complex.entity").ResidentialComplex>;
    findApartments(id: string, filter: ApartmentFilterDto): Promise<import("../apartment/entities/apartment.entity").Apartment[]>;
}
