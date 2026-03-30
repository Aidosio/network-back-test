import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResidentialComplex } from '../modules/complex/entities/complex.entity';
import { Building } from '../modules/building/entities/building.entity';
import { Apartment } from '../modules/apartment/entities/apartment.entity';
import { Application } from '../modules/application/entities/application.entity';
import { City } from '../modules/city/entities/city.entity';
import { SeedService } from './seed.service';

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
  providers: [SeedService],
  exports: [SeedService],
})
export class SeedModule {}
