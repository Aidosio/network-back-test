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
exports.ResidentialComplex = exports.ComplexStatus = void 0;
const typeorm_1 = require("typeorm");
const building_entity_1 = require("../../building/entities/building.entity");
var ComplexStatus;
(function (ComplexStatus) {
    ComplexStatus["UNDER_CONSTRUCTION"] = "under_construction";
    ComplexStatus["COMPLETED"] = "completed";
    ComplexStatus["SELLING"] = "selling";
})(ComplexStatus || (exports.ComplexStatus = ComplexStatus = {}));
let ResidentialComplex = class ResidentialComplex {
};
exports.ResidentialComplex = ResidentialComplex;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], ResidentialComplex.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], ResidentialComplex.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", Object)
], ResidentialComplex.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 500 }),
    __metadata("design:type", String)
], ResidentialComplex.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100 }),
    __metadata("design:type", String)
], ResidentialComplex.prototype, "city", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 500, nullable: true }),
    __metadata("design:type", Object)
], ResidentialComplex.prototype, "imageUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], ResidentialComplex.prototype, "developer", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', nullable: true }),
    __metadata("design:type", Object)
], ResidentialComplex.prototype, "completionDate", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: ComplexStatus,
        default: ComplexStatus.SELLING,
    }),
    __metadata("design:type", String)
], ResidentialComplex.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], ResidentialComplex.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], ResidentialComplex.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => building_entity_1.Building, (building) => building.complex, { cascade: true }),
    __metadata("design:type", Array)
], ResidentialComplex.prototype, "buildings", void 0);
exports.ResidentialComplex = ResidentialComplex = __decorate([
    (0, typeorm_1.Entity)('residential_complexes')
], ResidentialComplex);
//# sourceMappingURL=complex.entity.js.map