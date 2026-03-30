"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const complex_module_1 = require("./modules/complex/complex.module");
const building_module_1 = require("./modules/building/building.module");
const apartment_module_1 = require("./modules/apartment/apartment.module");
const application_module_1 = require("./modules/application/application.module");
const seed_module_1 = require("./seed/seed.module");
const admin_module_1 = require("./modules/admin/admin.module");
const city_module_1 = require("./modules/city/city.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            typeorm_1.TypeOrmModule.forRoot(process.env.DATABASE_URL
                ? {
                    type: 'postgres',
                    url: process.env.DATABASE_URL,
                    autoLoadEntities: true,
                    synchronize: true,
                    ssl: { rejectUnauthorized: false },
                }
                : {
                    type: 'postgres',
                    host: process.env.DB_HOST || 'localhost',
                    port: parseInt(process.env.DB_PORT || '5432', 10),
                    username: process.env.DB_USERNAME || 'postgres',
                    password: process.env.DB_PASSWORD || 'postgres',
                    database: process.env.DB_NAME || 'capital_network',
                    autoLoadEntities: true,
                    synchronize: true,
                }),
            complex_module_1.ComplexModule,
            building_module_1.BuildingModule,
            apartment_module_1.ApartmentModule,
            application_module_1.ApplicationModule,
            seed_module_1.SeedModule,
            admin_module_1.AdminModule,
            city_module_1.CityModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map