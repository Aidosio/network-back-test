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
exports.SeedService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const complex_entity_1 = require("../modules/complex/entities/complex.entity");
const building_entity_1 = require("../modules/building/entities/building.entity");
const apartment_entity_1 = require("../modules/apartment/entities/apartment.entity");
const application_entity_1 = require("../modules/application/entities/application.entity");
const city_entity_1 = require("../modules/city/entities/city.entity");
let SeedService = class SeedService {
    constructor(complexRepo, buildingRepo, apartmentRepo, applicationRepo, cityRepo) {
        this.complexRepo = complexRepo;
        this.buildingRepo = buildingRepo;
        this.apartmentRepo = apartmentRepo;
        this.applicationRepo = applicationRepo;
        this.cityRepo = cityRepo;
    }
    async run() {
        await this.applicationRepo.createQueryBuilder().delete().execute();
        await this.apartmentRepo.createQueryBuilder().delete().execute();
        await this.buildingRepo.createQueryBuilder().delete().execute();
        await this.complexRepo.createQueryBuilder().delete().execute();
        for (const cityName of ['Астана', 'Алматы']) {
            const exists = await this.cityRepo.findOneBy({ name: cityName });
            if (!exists) {
                await this.cityRepo.save({ name: cityName });
            }
        }
        const complex1 = await this.complexRepo.save({
            name: 'Алатау Residence',
            description: 'Современный жилой комплекс премиум-класса в предгорьях Алатау. Закрытая территория, подземный паркинг, детские площадки и зоны отдыха.',
            address: 'ул. Аль-Фараби, 100',
            city: 'Алматы',
            developer: 'Capital Group',
            completionDate: new Date('2025-06-01'),
            status: complex_entity_1.ComplexStatus.SELLING,
            imageUrl: null,
        });
        const b1_1 = await this.buildingRepo.save({
            complexId: complex1.id,
            name: 'Корпус A',
            floors: 16,
            status: building_entity_1.BuildingStatus.COMPLETED,
        });
        const b1_2 = await this.buildingRepo.save({
            complexId: complex1.id,
            name: 'Корпус B',
            floors: 20,
            status: building_entity_1.BuildingStatus.COMPLETED,
        });
        const apts1 = [
            { number: '101', floor: 1, rooms: 1, area: 42.5, price: 22500000, status: apartment_entity_1.ApartmentStatus.SOLD, layout: '1-комнатная' },
            { number: '205', floor: 2, rooms: 2, area: 68.0, price: 38000000, status: apartment_entity_1.ApartmentStatus.AVAILABLE, layout: '2-комнатная' },
            { number: '310', floor: 3, rooms: 0, area: 32.0, price: 18500000, status: apartment_entity_1.ApartmentStatus.AVAILABLE, layout: 'Студия' },
            { number: '412', floor: 4, rooms: 3, area: 95.0, price: 55000000, status: apartment_entity_1.ApartmentStatus.RESERVED, layout: '3-комнатная' },
            { number: '508', floor: 5, rooms: 1, area: 45.0, price: 24000000, status: apartment_entity_1.ApartmentStatus.AVAILABLE, layout: '1-комнатная' },
            { number: '615', floor: 6, rooms: 2, area: 72.0, price: 41000000, status: apartment_entity_1.ApartmentStatus.AVAILABLE, layout: '2-комнатная' },
        ];
        for (const apt of apts1) {
            await this.apartmentRepo.save({ ...apt, buildingId: b1_1.id });
        }
        const apts2 = [
            { number: '102', floor: 1, rooms: 0, area: 30.0, price: 17000000, status: apartment_entity_1.ApartmentStatus.AVAILABLE, layout: 'Студия' },
            { number: '203', floor: 2, rooms: 1, area: 48.0, price: 26000000, status: apartment_entity_1.ApartmentStatus.AVAILABLE, layout: '1-комнатная' },
            { number: '305', floor: 3, rooms: 2, area: 65.0, price: 36000000, status: apartment_entity_1.ApartmentStatus.SOLD, layout: '2-комнатная' },
            { number: '410', floor: 4, rooms: 3, area: 102.0, price: 62000000, status: apartment_entity_1.ApartmentStatus.AVAILABLE, layout: '3-комнатная' },
            { number: '512', floor: 5, rooms: 2, area: 70.0, price: 40000000, status: apartment_entity_1.ApartmentStatus.AVAILABLE, layout: '2-комнатная' },
            { number: '618', floor: 6, rooms: 1, area: 44.0, price: 25000000, status: apartment_entity_1.ApartmentStatus.AVAILABLE, layout: '1-комнатная' },
            { number: '720', floor: 7, rooms: 3, area: 110.0, price: 68000000, status: apartment_entity_1.ApartmentStatus.AVAILABLE, layout: '3-комнатная' },
            { number: '815', floor: 8, rooms: 0, area: 35.0, price: 20000000, status: apartment_entity_1.ApartmentStatus.RESERVED, layout: 'Студия' },
        ];
        for (const apt of apts2) {
            await this.apartmentRepo.save({ ...apt, buildingId: b1_2.id });
        }
        const complex2 = await this.complexRepo.save({
            name: 'Green Park',
            description: 'Экологичный жилой комплекс с парковой зоной. Энергоэффективные технологии, система умного дома в каждой квартире.',
            address: 'пр. Кабанбай Батыра, 58',
            city: 'Астана',
            developer: 'BI Group',
            completionDate: new Date('2026-12-01'),
            status: complex_entity_1.ComplexStatus.UNDER_CONSTRUCTION,
            imageUrl: null,
        });
        const b2_1 = await this.buildingRepo.save({
            complexId: complex2.id,
            name: 'Блок 1',
            floors: 12,
            status: building_entity_1.BuildingStatus.UNDER_CONSTRUCTION,
        });
        const b2_2 = await this.buildingRepo.save({
            complexId: complex2.id,
            name: 'Блок 2',
            floors: 14,
            status: building_entity_1.BuildingStatus.UNDER_CONSTRUCTION,
        });
        const apts3 = [
            { number: '101', floor: 1, rooms: 1, area: 40.0, price: 19500000, status: apartment_entity_1.ApartmentStatus.AVAILABLE, layout: '1-комнатная' },
            { number: '202', floor: 2, rooms: 2, area: 60.0, price: 32000000, status: apartment_entity_1.ApartmentStatus.AVAILABLE, layout: '2-комнатная' },
            { number: '303', floor: 3, rooms: 0, area: 28.0, price: 15000000, status: apartment_entity_1.ApartmentStatus.AVAILABLE, layout: 'Студия' },
            { number: '404', floor: 4, rooms: 3, area: 88.0, price: 48000000, status: apartment_entity_1.ApartmentStatus.AVAILABLE, layout: '3-комнатная' },
            { number: '505', floor: 5, rooms: 1, area: 43.0, price: 21000000, status: apartment_entity_1.ApartmentStatus.AVAILABLE, layout: '1-комнатная' },
        ];
        for (const apt of apts3) {
            await this.apartmentRepo.save({ ...apt, buildingId: b2_1.id });
        }
        const apts4 = [
            { number: '101', floor: 1, rooms: 2, area: 63.0, price: 33500000, status: apartment_entity_1.ApartmentStatus.AVAILABLE, layout: '2-комнатная' },
            { number: '202', floor: 2, rooms: 1, area: 46.0, price: 22000000, status: apartment_entity_1.ApartmentStatus.AVAILABLE, layout: '1-комнатная' },
            { number: '303', floor: 3, rooms: 3, area: 92.0, price: 50000000, status: apartment_entity_1.ApartmentStatus.AVAILABLE, layout: '3-комнатная' },
            { number: '404', floor: 4, rooms: 0, area: 31.0, price: 16500000, status: apartment_entity_1.ApartmentStatus.AVAILABLE, layout: 'Студия' },
            { number: '505', floor: 5, rooms: 2, area: 67.0, price: 35000000, status: apartment_entity_1.ApartmentStatus.AVAILABLE, layout: '2-комнатная' },
            { number: '606', floor: 6, rooms: 1, area: 41.0, price: 20000000, status: apartment_entity_1.ApartmentStatus.AVAILABLE, layout: '1-комнатная' },
        ];
        for (const apt of apts4) {
            await this.apartmentRepo.save({ ...apt, buildingId: b2_2.id });
        }
        const complex3 = await this.complexRepo.save({
            name: 'Capital Tower',
            description: 'Элитный жилой комплекс бизнес-класса в центре города. Панорамное остекление, консьерж-сервис, фитнес-центр и бассейн на крыше.',
            address: 'пр. Назарбаева, 240',
            city: 'Алматы',
            developer: 'Bazis-A',
            completionDate: new Date('2024-03-01'),
            status: complex_entity_1.ComplexStatus.COMPLETED,
            imageUrl: null,
        });
        const b3_1 = await this.buildingRepo.save({
            complexId: complex3.id,
            name: 'Башня 1',
            floors: 25,
            status: building_entity_1.BuildingStatus.COMPLETED,
        });
        const b3_2 = await this.buildingRepo.save({
            complexId: complex3.id,
            name: 'Башня 2',
            floors: 30,
            status: building_entity_1.BuildingStatus.COMPLETED,
        });
        const apts5 = [
            { number: '101', floor: 1, rooms: 2, area: 75.0, price: 45000000, status: apartment_entity_1.ApartmentStatus.SOLD, layout: '2-комнатная' },
            { number: '502', floor: 5, rooms: 3, area: 120.0, price: 85000000, status: apartment_entity_1.ApartmentStatus.AVAILABLE, layout: '3-комнатная' },
            { number: '1003', floor: 10, rooms: 1, area: 50.0, price: 32000000, status: apartment_entity_1.ApartmentStatus.AVAILABLE, layout: '1-комнатная' },
            { number: '1504', floor: 15, rooms: 2, area: 80.0, price: 52000000, status: apartment_entity_1.ApartmentStatus.RESERVED, layout: '2-комнатная' },
            { number: '2005', floor: 20, rooms: 3, area: 115.0, price: 78000000, status: apartment_entity_1.ApartmentStatus.AVAILABLE, layout: '3-комнатная' },
        ];
        for (const apt of apts5) {
            await this.apartmentRepo.save({ ...apt, buildingId: b3_1.id });
        }
        const apts6 = [
            { number: '201', floor: 2, rooms: 0, area: 38.0, price: 25000000, status: apartment_entity_1.ApartmentStatus.AVAILABLE, layout: 'Студия' },
            { number: '803', floor: 8, rooms: 1, area: 52.0, price: 35000000, status: apartment_entity_1.ApartmentStatus.SOLD, layout: '1-комнатная' },
            { number: '1205', floor: 12, rooms: 2, area: 78.0, price: 50000000, status: apartment_entity_1.ApartmentStatus.AVAILABLE, layout: '2-комнатная' },
            { number: '1807', floor: 18, rooms: 3, area: 105.0, price: 72000000, status: apartment_entity_1.ApartmentStatus.AVAILABLE, layout: '3-комнатная' },
            { number: '2510', floor: 25, rooms: 2, area: 85.0, price: 58000000, status: apartment_entity_1.ApartmentStatus.AVAILABLE, layout: '2-комнатная' },
            { number: '2812', floor: 28, rooms: 3, area: 130.0, price: 92000000, status: apartment_entity_1.ApartmentStatus.AVAILABLE, layout: '3-комнатная', description: 'Пентхаус с панорамным видом на горы' },
        ];
        for (const apt of apts6) {
            await this.apartmentRepo.save({ ...apt, buildingId: b3_2.id });
        }
        const allApartments = await this.apartmentRepo.find();
        const reservedApt = allApartments.find(a => a.status === apartment_entity_1.ApartmentStatus.RESERVED);
        if (reservedApt) {
            await this.applicationRepo.save({
                apartmentId: reservedApt.id,
                firstName: 'Алексей',
                lastName: 'Иванов',
                phone: '+77011234567',
                email: 'alexey@example.com',
                type: application_entity_1.ApplicationType.BOOKING,
                status: application_entity_1.ApplicationStatus.IN_PROGRESS,
            });
        }
        const soldApt = allApartments.find(a => a.status === apartment_entity_1.ApartmentStatus.SOLD);
        if (soldApt) {
            await this.applicationRepo.save({
                apartmentId: soldApt.id,
                firstName: 'Марина',
                lastName: 'Петрова',
                phone: '+77029876543',
                email: 'marina@example.com',
                type: application_entity_1.ApplicationType.PURCHASE,
                status: application_entity_1.ApplicationStatus.APPROVED,
            });
        }
        console.log('Seed data created successfully!');
        console.log(`- ${3} complexes`);
        console.log(`- ${6} buildings`);
        console.log(`- ${allApartments.length} apartments`);
        console.log(`- 2 applications`);
    }
};
exports.SeedService = SeedService;
exports.SeedService = SeedService = __decorate([
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
        typeorm_2.Repository])
], SeedService);
//# sourceMappingURL=seed.service.js.map