import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ComplexModule } from './modules/complex/complex.module';
import { BuildingModule } from './modules/building/building.module';
import { ApartmentModule } from './modules/apartment/apartment.module';
import { ApplicationModule } from './modules/application/application.module';
import { SeedModule } from './seed/seed.module';
import { AdminModule } from './modules/admin/admin.module';
import { CityModule } from './modules/city/city.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(
      process.env.DATABASE_URL
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
          },
    ),
    ComplexModule,
    BuildingModule,
    ApartmentModule,
    ApplicationModule,
    SeedModule,
    AdminModule,
    CityModule,
  ],
})
export class AppModule {}
