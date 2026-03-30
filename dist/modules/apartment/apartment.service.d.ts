import { Repository } from 'typeorm';
import { Apartment } from './entities/apartment.entity';
import { ApartmentFilterDto } from './dto/apartment-filter.dto';
export declare class ApartmentService {
    private readonly apartmentRepo;
    constructor(apartmentRepo: Repository<Apartment>);
    findByComplexId(complexId: string, filter: ApartmentFilterDto): Promise<Apartment[]>;
    findOne(id: string): Promise<Apartment>;
}
