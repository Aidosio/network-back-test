import { Repository } from 'typeorm';
import { ResidentialComplex } from '../modules/complex/entities/complex.entity';
import { Building } from '../modules/building/entities/building.entity';
import { Apartment } from '../modules/apartment/entities/apartment.entity';
import { Application } from '../modules/application/entities/application.entity';
import { City } from '../modules/city/entities/city.entity';
export declare class SeedService {
    private complexRepo;
    private buildingRepo;
    private apartmentRepo;
    private applicationRepo;
    private cityRepo;
    constructor(complexRepo: Repository<ResidentialComplex>, buildingRepo: Repository<Building>, apartmentRepo: Repository<Apartment>, applicationRepo: Repository<Application>, cityRepo: Repository<City>);
    run(): Promise<void>;
}
