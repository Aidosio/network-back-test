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
exports.ComplexService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const complex_entity_1 = require("./entities/complex.entity");
let ComplexService = class ComplexService {
    constructor(complexRepo) {
        this.complexRepo = complexRepo;
    }
    async findAll(filter) {
        const qb = this.complexRepo
            .createQueryBuilder('complex')
            .leftJoin('complex.buildings', 'building')
            .leftJoin('building.apartments', 'apartment')
            .select([
            'complex.id',
            'complex.name',
            'complex.description',
            'complex.address',
            'complex.city',
            'complex.imageUrl',
            'complex.developer',
            'complex.completionDate',
            'complex.status',
            'complex.createdAt',
            'complex.updatedAt',
        ])
            .addSelect('MIN(apartment.price)', 'minPrice')
            .addSelect('MAX(apartment.price)', 'maxPrice')
            .addSelect(`COUNT(CASE WHEN apartment.status = 'available' THEN 1 END)`, 'availableCount')
            .groupBy('complex.id');
        if (filter.city) {
            qb.andWhere('complex.city = :city', { city: filter.city });
        }
        if (filter.status) {
            qb.andWhere('complex.status = :status', { status: filter.status });
        }
        qb.orderBy('complex.createdAt', 'DESC');
        const rawResults = await qb.getRawAndEntities();
        return rawResults.entities.map((entity, index) => {
            const raw = rawResults.raw[index];
            entity.minPrice = raw.minPrice ? Number(raw.minPrice) : null;
            entity.maxPrice = raw.maxPrice ? Number(raw.maxPrice) : null;
            entity.availableCount = Number(raw.availableCount) || 0;
            return entity;
        });
    }
    async findOne(id) {
        const complex = await this.complexRepo.findOne({
            where: { id },
            relations: ['buildings'],
        });
        if (!complex) {
            throw new common_1.NotFoundException(`Жилой комплекс с ID ${id} не найден`);
        }
        return complex;
    }
};
exports.ComplexService = ComplexService;
exports.ComplexService = ComplexService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(complex_entity_1.ResidentialComplex)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ComplexService);
//# sourceMappingURL=complex.service.js.map