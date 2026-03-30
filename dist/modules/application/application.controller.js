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
exports.ApplicationController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const application_service_1 = require("./application.service");
const create_application_dto_1 = require("./dto/create-application.dto");
let ApplicationController = class ApplicationController {
    constructor(applicationService) {
        this.applicationService = applicationService;
    }
    create(dto) {
        return this.applicationService.create(dto);
    }
    findOne(id) {
        return this.applicationService.findOne(id);
    }
};
exports.ApplicationController = ApplicationController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Создание заявки на бронирование' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Заявка создана' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Ошибка валидации' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Квартира не найдена' }),
    (0, swagger_1.ApiResponse)({ status: 409, description: 'Квартира уже забронирована' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_application_dto_1.CreateApplicationDto]),
    __metadata("design:returntype", void 0)
], ApplicationController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Статус заявки' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Информация о заявке' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Заявка не найдена' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ApplicationController.prototype, "findOne", null);
exports.ApplicationController = ApplicationController = __decorate([
    (0, swagger_1.ApiTags)('Заявки'),
    (0, common_1.Controller)('applications'),
    __metadata("design:paramtypes", [application_service_1.ApplicationService])
], ApplicationController);
//# sourceMappingURL=application.controller.js.map