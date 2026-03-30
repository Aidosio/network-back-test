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
exports.Building = exports.BuildingStatus = void 0;
const typeorm_1 = require("typeorm");
const complex_entity_1 = require("../../complex/entities/complex.entity");
const apartment_entity_1 = require("../../apartment/entities/apartment.entity");
var BuildingStatus;
(function (BuildingStatus) {
    BuildingStatus["UNDER_CONSTRUCTION"] = "under_construction";
    BuildingStatus["COMPLETED"] = "completed";
})(BuildingStatus || (exports.BuildingStatus = BuildingStatus = {}));
let Building = class Building {
};
exports.Building = Building;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Building.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Building.prototype, "complexId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100 }),
    __metadata("design:type", String)
], Building.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], Building.prototype, "floors", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: BuildingStatus,
        default: BuildingStatus.COMPLETED,
    }),
    __metadata("design:type", String)
], Building.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Building.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Building.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => complex_entity_1.ResidentialComplex, (complex) => complex.buildings, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'complexId' }),
    __metadata("design:type", complex_entity_1.ResidentialComplex)
], Building.prototype, "complex", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => apartment_entity_1.Apartment, (apartment) => apartment.building, { cascade: true }),
    __metadata("design:type", Array)
], Building.prototype, "apartments", void 0);
exports.Building = Building = __decorate([
    (0, typeorm_1.Entity)('buildings')
], Building);
//# sourceMappingURL=building.entity.js.map