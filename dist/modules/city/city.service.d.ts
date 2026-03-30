import { Repository } from 'typeorm';
import { City } from './entities/city.entity';
export declare class CityService {
    private readonly cityRepo;
    constructor(cityRepo: Repository<City>);
    findAll(): Promise<City[]>;
    findOrCreate(name: string): Promise<City>;
    create(name: string): Promise<City>;
    delete(id: string): Promise<void>;
}
