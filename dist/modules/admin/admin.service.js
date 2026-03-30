"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const complex_entity_1 = require("../complex/entities/complex.entity");
const building_entity_1 = require("../building/entities/building.entity");
const apartment_entity_1 = require("../apartment/entities/apartment.entity");
const application_entity_1 = require("../application/entities/application.entity");
const city_entity_1 = require("../city/entities/city.entity");
let AdminService = class AdminService {
    constructor(complexRepo, buildingRepo, apartmentRepo, applicationRepo, cityRepo, dataSource) {
        this.complexRepo = complexRepo;
        this.buildingRepo = buildingRepo;
        this.apartmentRepo = apartmentRepo;
        this.applicationRepo = applicationRepo;
        this.cityRepo = cityRepo;
        this.dataSource = dataSource;
    }
    async getComplexes() {
        const complexes = await this.complexRepo
            .createQueryBuilder('c')
            .loadRelationCountAndMap('c.buildingsCount', 'c.buildings')
            .getMany();
        const apartmentCounts = await this.dataSource
            .createQueryBuilder()
            .select('b."complexId"', 'complexId')
            .addSelect('COUNT(a.id)', 'count')
            .from('buildings', 'b')
            .leftJoin('apartments', 'a', 'a."buildingId" = b.id')
            .groupBy('b."complexId"')
            .getRawMany();
        const countMap = new Map();
        for (const row of apartmentCounts) {
            countMap.set(row.complexId, parseInt(row.count, 10));
        }
        return complexes.map((c) => ({
            ...c,
            buildingsCount: c.buildingsCount ?? 0,
            apartmentsCount: countMap.get(c.id) ?? 0,
        }));
    }
    async createComplex(dto) {
        const complex = this.complexRepo.create(dto);
        return this.complexRepo.save(complex);
    }
    async updateComplex(id, dto) {
        const complex = await this.complexRepo.findOneBy({ id });
        if (!complex)
            throw new common_1.NotFoundException('Complex not found');
        Object.assign(complex, dto);
        return this.complexRepo.save(complex);
    }
    async deleteComplex(id) {
        const result = await this.complexRepo.delete(id);
        if (result.affected === 0)
            throw new common_1.NotFoundException('Complex not found');
    }
    async createBuilding(complexId, dto) {
        const complex = await this.complexRepo.findOneBy({ id: complexId });
        if (!complex)
            throw new common_1.NotFoundException('Complex not found');
        const building = this.buildingRepo.create({ ...dto, complexId });
        return this.buildingRepo.save(building);
    }
    async getApartmentsByComplex(complexId) {
        return this.apartmentRepo
            .createQueryBuilder('a')
            .innerJoin('a.building', 'b')
            .where('b."complexId" = :complexId', { complexId })
            .leftJoinAndSelect('a.building', 'building')
            .orderBy('building.name', 'ASC')
            .addOrderBy('a.floor', 'ASC')
            .addOrderBy('a.number', 'ASC')
            .getMany();
    }
    async createApartment(dto) {
        const building = await this.buildingRepo.findOneBy({ id: dto.buildingId });
        if (!building)
            throw new common_1.NotFoundException('Building not found');
        const apartment = this.apartmentRepo.create(dto);
        return this.apartmentRepo.save(apartment);
    }
    async updateApartment(id, dto) {
        const apartment = await this.apartmentRepo.findOneBy({ id });
        if (!apartment)
            throw new common_1.NotFoundException('Apartment not found');
        Object.assign(apartment, dto);
        return this.apartmentRepo.save(apartment);
    }
    async deleteApartment(id) {
        const result = await this.apartmentRepo.delete(id);
        if (result.affected === 0)
            throw new common_1.NotFoundException('Apartment not found');
    }
    async getApplications(filters) {
        const qb = this.applicationRepo
            .createQueryBuilder('app')
            .leftJoinAndSelect('app.apartment', 'apartment')
            .leftJoinAndSelect('apartment.building', 'building')
            .leftJoinAndSelect('building.complex', 'complex');
        if (filters.status) {
            qb.andWhere('app.status = :status', { status: filters.status });
        }
        if (filters.type) {
            qb.andWhere('app.type = :type', { type: filters.type });
        }
        if (filters.dateFrom) {
            qb.andWhere('app."createdAt" >= :dateFrom', { dateFrom: filters.dateFrom });
        }
        if (filters.dateTo) {
            qb.andWhere('app."createdAt" <= :dateTo', { dateTo: filters.dateTo + ' 23:59:59' });
        }
        qb.orderBy('app."createdAt"', 'DESC');
        return qb.getMany();
    }
    async updateApplicationStatus(id, dto) {
        const application = await this.applicationRepo.findOneBy({ id });
        if (!application)
            throw new common_1.NotFoundException('Application not found');
        application.status = dto.status;
        return this.applicationRepo.save(application);
    }
    async createCity(name) {
        const city = this.cityRepo.create({ name });
        return this.cityRepo.save(city);
    }
    async deleteCity(id) {
        const result = await this.cityRepo.delete(id);
        if (result.affected === 0)
            throw new common_1.NotFoundException('City not found');
    }
    async getComplexDetail(id) {
        const complex = await this.complexRepo.findOne({
            where: { id },
            relations: ['buildings', 'buildings.apartments'],
        });
        if (!complex)
            throw new common_1.NotFoundException('Complex not found');
        return complex;
    }
};
exports.AdminService = AdminService;
exports.AdminService = AdminService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(complex_entity_1.ResidentialComplex)),
    __param(1, (0, typeorm_1.InjectRepository)(building_entity_1.Building)),
    __param(2, (0, typeorm_1.InjectRepository)(apartment_entity_1.Apartment)),
    __param(3, (0, typeorm_1.InjectRepository)(application_entity_1.Application)),
    __param(4, (0, typeorm_1.InjectRepository)(city_entity_1.City)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.DataSource])
], AdminService);
//# sourceMappingURL=admin.service.js.map