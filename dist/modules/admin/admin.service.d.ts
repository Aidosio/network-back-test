import { Repository, DataSource } from 'typeorm';
import { ResidentialComplex } from '../complex/entities/complex.entity';
import { Building } from '../building/entities/building.entity';
import { Apartment } from '../apartment/entities/apartment.entity';
import { Application, ApplicationStatus, ApplicationType } from '../application/entities/application.entity';
import { City } from '../city/entities/city.entity';
import { CreateComplexDto } from './dto/create-complex.dto';
import { UpdateComplexDto } from './dto/update-complex.dto';
import { CreateBuildingDto } from './dto/create-building.dto';
import { CreateApartmentDto } from './dto/create-apartment.dto';
import { UpdateApplicationStatusDto } from './dto/update-application-status.dto';
export declare class AdminService {
    private readonly complexRepo;
    private readonly buildingRepo;
    private readonly apartmentRepo;
    private readonly applicationRepo;
    private readonly cityRepo;
    private readonly dataSource;
    constructor(complexRepo: Repository<ResidentialComplex>, buildingRepo: Repository<Building>, apartmentRepo: Repository<Apartment>, applicationRepo: Repository<Application>, cityRepo: Repository<City>, dataSource: DataSource);
    getComplexes(): Promise<any[]>;
    createComplex(dto: CreateComplexDto): Promise<ResidentialComplex>;
    updateComplex(id: string, dto: UpdateComplexDto): Promise<ResidentialComplex>;
    deleteComplex(id: string): Promise<void>;
    createBuilding(complexId: string, dto: CreateBuildingDto): Promise<Building>;
    getApartmentsByComplex(complexId: string): Promise<Apartment[]>;
    createApartment(dto: CreateApartmentDto): Promise<Apartment>;
    updateApartment(id: string, dto: Partial<CreateApartmentDto>): Promise<Apartment>;
    deleteApartment(id: string): Promise<void>;
    getApplications(filters: {
        status?: ApplicationStatus;
        type?: ApplicationType;
        dateFrom?: string;
        dateTo?: string;
    }): Promise<Application[]>;
    updateApplicationStatus(id: string, dto: UpdateApplicationStatusDto): Promise<Application>;
    createCity(name: string): Promise<City>;
    deleteCity(id: string): Promise<void>;
    getComplexDetail(id: string): Promise<ResidentialComplex>;
}
