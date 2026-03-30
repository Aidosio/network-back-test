import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResidentialComplex } from './entities/complex.entity';
import { ComplexController } from './complex.controller';
import { ComplexService } from './complex.service';
import { ApartmentModule } from '../apartment/apartment.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ResidentialComplex]),
    ApartmentModule,
  ],
  controllers: [ComplexController],
  providers: [ComplexService],
  exports: [ComplexService],
})
export class ComplexModule {}
