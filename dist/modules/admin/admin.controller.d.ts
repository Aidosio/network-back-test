import { AdminService } from './admin.service';
import { SeedService } from '../../seed/seed.service';
import { CreateComplexDto } from './dto/create-complex.dto';
import { UpdateComplexDto } from './dto/update-complex.dto';
import { CreateBuildingDto } from './dto/create-building.dto';
import { CreateApartmentDto } from './dto/create-apartment.dto';
import { UpdateApplicationStatusDto } from './dto/update-application-status.dto';
import { ApplicationStatus, ApplicationType } from '../application/entities/application.entity';
export declare class AdminController {
    private readonly adminService;
    private readonly seedService;
    constructor(adminService: AdminService, seedService: SeedService);
    runSeed(): Promise<{
        message: string;
    }>;
    createCity(body: {
        name: string;
    }): Promise<import("../city/entities/city.entity").City>;
    deleteCity(id: string): Promise<void>;
    getComplexes(): Promise<any[]>;
    getComplexDetail(id: string): Promise<import("../complex/entities/complex.entity").ResidentialComplex>;
    createComplex(dto: CreateComplexDto): Promise<import("../complex/entities/complex.entity").ResidentialComplex>;
    updateComplex(id: string, dto: UpdateComplexDto): Promise<import("../complex/entities/complex.entity").ResidentialComplex>;
    deleteComplex(id: string): Promise<void>;
    createBuilding(complexId: string, dto: CreateBuildingDto): Promise<import("../building/entities/building.entity").Building>;
    getApartmentsByComplex(complexId: string): Promise<import("../apartment/entities/apartment.entity").Apartment[]>;
    createApartment(dto: CreateApartmentDto): Promise<import("../apartment/entities/apartment.entity").Apartment>;
    updateApartment(id: string, dto: Partial<CreateApartmentDto>): Promise<import("../apartment/entities/apartment.entity").Apartment>;
    deleteApartment(id: string): Promise<void>;
    getApplications(status?: ApplicationStatus, type?: ApplicationType, dateFrom?: string, dateTo?: string): Promise<import("../application/entities/application.entity").Application[]>;
    updateApplicationStatus(id: string, dto: UpdateApplicationStatusDto): Promise<import("../application/entities/application.entity").Application>;
}
