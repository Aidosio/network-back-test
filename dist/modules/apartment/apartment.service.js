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
exports.ApartmentService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const apartment_entity_1 = require("./entities/apartment.entity");
let ApartmentService = class ApartmentService {
    constructor(apartmentRepo) {
        this.apartmentRepo = apartmentRepo;
    }
    async findByComplexId(complexId, filter) {
        const qb = this.apartmentRepo
            .createQueryBuilder('apartment')
            .innerJoin('apartment.building', 'building')
            .addSelect(['building.id', 'building.name'])
            .where('building.complexId = :complexId', { complexId });
        if (filter.rooms !== undefined) {
            qb.andWhere('apartment.rooms = :rooms', { rooms: filter.rooms });
        }
        if (filter.minPrice !== undefined) {
            qb.andWhere('apartment.price >= :minPrice', { minPrice: filter.minPrice });
        }
        if (filter.maxPrice !== undefined) {
            qb.andWhere('apartment.price <= :maxPrice', { maxPrice: filter.maxPrice });
        }
        if (filter.minArea !== undefined) {
            qb.andWhere('apartment.area >= :minArea', { minArea: filter.minArea });
        }
        if (filter.maxArea !== undefined) {
            qb.andWhere('apartment.area <= :maxArea', { maxArea: filter.maxArea });
        }
        if (filter.floor !== undefined) {
            qb.andWhere('apartment.floor = :floor', { floor: filter.floor });
        }
        if (filter.status) {
            qb.andWhere('apartment.status = :status', { status: filter.status });
        }
        if (filter.buildingId) {
            qb.andWhere('apartment.buildingId = :buildingId', {
                buildingId: filter.buildingId,
            });
        }
        qb.orderBy('apartment.price', 'ASC');
        return qb.getMany();
    }
    async findOne(id) {
        const apartment = await this.apartmentRepo.findOne({
            where: { id },
            relations: ['building', 'building.complex'],
        });
        if (!apartment) {
            throw new common_1.NotFoundException(`Квартира с ID ${id} не найдена`);
        }
        return apartment;
    }
};
exports.ApartmentService = ApartmentService;
exports.ApartmentService = ApartmentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(apartment_entity_1.Apartment)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ApartmentService);
//# sourceMappingURL=apartment.service.js.map