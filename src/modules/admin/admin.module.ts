import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { ResidentialComplex } from '../complex/entities/complex.entity';
import { Building } from '../building/entities/building.entity';
import { Apartment } from '../apartment/entities/apartment.entity';
import { Application } from '../application/entities/application.entity';
import { City } from '../city/entities/city.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ResidentialComplex,
      Building,
      Apartment,
      Application,
      City,
    ]),
  ],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
