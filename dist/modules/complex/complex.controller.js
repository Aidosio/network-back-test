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
exports.ComplexController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const complex_service_1 = require("./complex.service");
const apartment_service_1 = require("../apartment/apartment.service");
const complex_filter_dto_1 = require("./dto/complex-filter.dto");
const apartment_filter_dto_1 = require("../apartment/dto/apartment-filter.dto");
let ComplexController = class ComplexController {
    constructor(complexService, apartmentService) {
        this.complexService = complexService;
        this.apartmentService = apartmentService;
    }
    findAll(filter) {
        return this.complexService.findAll(filter);
    }
    findOne(id) {
        return this.complexService.findOne(id);
    }
    findApartments(id, filter) {
        return this.apartmentService.findByComplexId(id, filter);
    }
};
exports.ComplexController = ComplexController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Список жилых комплексов' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Список ЖК с агрегированными данными' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [complex_filter_dto_1.ComplexFilterDto]),
    __metadata("design:returntype", void 0)
], ComplexController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Детали жилого комплекса' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'ЖК с корпусами' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'ЖК не найден' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ComplexController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)(':id/apartments'),
    (0, swagger_1.ApiOperation)({ summary: 'Квартиры в жилом комплексе' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Список квартир с фильтрацией' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, apartment_filter_dto_1.ApartmentFilterDto]),
    __metadata("design:returntype", void 0)
], ComplexController.prototype, "findApartments", null);
exports.ComplexController = ComplexController = __decorate([
    (0, swagger_1.ApiTags)('Жилые комплексы'),
    (0, common_1.Controller)('complexes'),
    __metadata("design:paramtypes", [complex_service_1.ComplexService,
        apartment_service_1.ApartmentService])
], ComplexController);
//# sourceMappingURL=complex.controller.js.map