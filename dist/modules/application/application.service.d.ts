import { Repository, DataSource } from 'typeorm';
import { Application } from './entities/application.entity';
import { CreateApplicationDto } from './dto/create-application.dto';
import { Apartment } from '../apartment/entities/apartment.entity';
export declare class ApplicationService {
    private readonly applicationRepo;
    private readonly apartmentRepo;
    private readonly dataSource;
    constructor(applicationRepo: Repository<Application>, apartmentRepo: Repository<Apartment>, dataSource: DataSource);
    create(dto: CreateApplicationDto): Promise<Application>;
    findOne(id: string): Promise<Application>;
}
