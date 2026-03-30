"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComplexModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const complex_entity_1 = require("./entities/complex.entity");
const complex_controller_1 = require("./complex.controller");
const complex_service_1 = require("./complex.service");
const apartment_module_1 = require("../apartment/apartment.module");
let ComplexModule = class ComplexModule {
};
exports.ComplexModule = ComplexModule;
exports.ComplexModule = ComplexModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([complex_entity_1.ResidentialComplex]),
            apartment_module_1.ApartmentModule,
        ],
        controllers: [complex_controller_1.ComplexController],
        providers: [complex_service_1.ComplexService],
        exports: [complex_service_1.ComplexService],
    })
], ComplexModule);
//# sourceMappingURL=complex.module.js.map