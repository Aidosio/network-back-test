import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Application } from './entities/application.entity';
import { Apartment } from '../apartment/entities/apartment.entity';
import { ApplicationController } from './application.controller';
import { ApplicationService } from './application.service';

@Module({
  imports: [TypeOrmModule.forFeature([Application, Apartment])],
  controllers: [ApplicationController],
  providers: [ApplicationService],
  exports: [ApplicationService],
})
export class ApplicationModule {}
