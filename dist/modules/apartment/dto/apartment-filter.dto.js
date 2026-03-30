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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApartmentFilterDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const apartment_entity_1 = require("../entities/apartment.entity");
class ApartmentFilterDto {
}
exports.ApartmentFilterDto = ApartmentFilterDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Количество комнат' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], ApartmentFilterDto.prototype, "rooms", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Минимальная цена' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], ApartmentFilterDto.prototype, "minPrice", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Максимальная цена' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], ApartmentFilterDto.prototype, "maxPrice", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Минимальная площадь' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], ApartmentFilterDto.prototype, "minArea", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Максимальная площадь' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], ApartmentFilterDto.prototype, "maxArea", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Этаж' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], ApartmentFilterDto.prototype, "floor", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: apartment_entity_1.ApartmentStatus, description: 'Статус квартиры' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(apartment_entity_1.ApartmentStatus),
    __metadata("design:type", String)
], ApartmentFilterDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'ID корпуса' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], ApartmentFilterDto.prototype, "buildingId", void 0);
//# sourceMappingURL=apartment-filter.dto.js.map