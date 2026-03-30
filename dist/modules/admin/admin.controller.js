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
exports.AdminController = void 0;
const common_1 = require("@nestjs/common");
const admin_service_1 = require("./admin.service");
const seed_service_1 = require("../../seed/seed.service");
const create_complex_dto_1 = require("./dto/create-complex.dto");
const update_complex_dto_1 = require("./dto/update-complex.dto");
const create_building_dto_1 = require("./dto/create-building.dto");
const create_apartment_dto_1 = require("./dto/create-apartment.dto");
const update_application_status_dto_1 = require("./dto/update-application-status.dto");
const application_entity_1 = require("../application/entities/application.entity");
let AdminController = class AdminController {
    constructor(adminService, seedService) {
        this.adminService = adminService;
        this.seedService = seedService;
    }
    async runSeed() {
        try {
            await this.seedService.run();
            return { message: 'Тестовые данные успешно загружены' };
        }
        catch (error) {
            console.error('Seed error:', error);
            return { message: 'Ошибка: ' + error.message, error: true };
        }
    }
    createCity(body) {
        return this.adminService.createCity(body.name);
    }
    deleteCity(id) {
        return this.adminService.deleteCity(id);
    }
    getComplexes() {
        return this.adminService.getComplexes();
    }
    getComplexDetail(id) {
        return this.adminService.getComplexDetail(id);
    }
    createComplex(dto) {
        return this.adminService.createComplex(dto);
    }
    updateComplex(id, dto) {
        return this.adminService.updateComplex(id, dto);
    }
    deleteComplex(id) {
        return this.adminService.deleteComplex(id);
    }
    createBuilding(complexId, dto) {
        return this.adminService.createBuilding(complexId, dto);
    }
    getApartmentsByComplex(complexId) {
        return this.adminService.getApartmentsByComplex(complexId);
    }
    createApartment(dto) {
        return this.adminService.createApartment(dto);
    }
    updateApartment(id, dto) {
        return this.adminService.updateApartment(id, dto);
    }
    deleteApartment(id) {
        return this.adminService.deleteApartment(id);
    }
    getApplications(status, type, dateFrom, dateTo) {
        return this.adminService.getApplications({ status, type, dateFrom, dateTo });
    }
    updateApplicationStatus(id, dto) {
        return this.adminService.updateApplicationStatus(id, dto);
    }
};
exports.AdminController = AdminController;
__decorate([
    (0, common_1.Post)('seed'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "runSeed", null);
__decorate([
    (0, common_1.Post)('cities'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "createCity", null);
__decorate([
    (0, common_1.Delete)('cities/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "deleteCity", null);
__decorate([
    (0, common_1.Get)('complexes'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "getComplexes", null);
__decorate([
    (0, common_1.Get)('complexes/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "getComplexDetail", null);
__decorate([
    (0, common_1.Post)('complexes'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_complex_dto_1.CreateComplexDto]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "createComplex", null);
__decorate([
    (0, common_1.Patch)('complexes/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_complex_dto_1.UpdateComplexDto]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "updateComplex", null);
__decorate([
    (0, common_1.Delete)('complexes/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "deleteComplex", null);
__decorate([
    (0, common_1.Post)('complexes/:complexId/buildings'),
    __param(0, (0, common_1.Param)('complexId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_building_dto_1.CreateBuildingDto]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "createBuilding", null);
__decorate([
    (0, common_1.Get)('complexes/:complexId/apartments'),
    __param(0, (0, common_1.Param)('complexId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "getApartmentsByComplex", null);
__decorate([
    (0, common_1.Post)('apartments'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_apartment_dto_1.CreateApartmentDto]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "createApartment", null);
__decorate([
    (0, common_1.Patch)('apartments/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "updateApartment", null);
__decorate([
    (0, common_1.Delete)('apartments/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "deleteApartment", null);
__decorate([
    (0, common_1.Get)('applications'),
    __param(0, (0, common_1.Query)('status')),
    __param(1, (0, common_1.Query)('type')),
    __param(2, (0, common_1.Query)('dateFrom')),
    __param(3, (0, common_1.Query)('dateTo')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "getApplications", null);
__decorate([
    (0, common_1.Patch)('applications/:id/status'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_application_status_dto_1.UpdateApplicationStatusDto]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "updateApplicationStatus", null);
exports.AdminController = AdminController = __decorate([
    (0, common_1.Controller)('admin'),
    __metadata("design:paramtypes", [admin_service_1.AdminService,
        seed_service_1.SeedService])
], AdminController);
//# sourceMappingURL=admin.controller.js.map