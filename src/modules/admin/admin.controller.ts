import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  Query,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { SeedService } from '../../seed/seed.service';
import { CreateComplexDto } from './dto/create-complex.dto';
import { UpdateComplexDto } from './dto/update-complex.dto';
import { CreateBuildingDto } from './dto/create-building.dto';
import { CreateApartmentDto } from './dto/create-apartment.dto';
import { UpdateApplicationStatusDto } from './dto/update-application-status.dto';
import { ApplicationStatus, ApplicationType } from '../application/entities/application.entity';

@Controller('admin')
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    private readonly seedService: SeedService,
  ) {}

  // ─── Seed ────────────────────────────────────────────────────

  @Post('seed')
  async runSeed() {
    try {
      await this.seedService.run();
      return { message: 'Тестовые данные успешно загружены' };
    } catch (error) {
      console.error('Seed error:', error);
      return { message: 'Ошибка: ' + (error as Error).message, error: true };
    }
  }

  // ─── Cities ──────────────────────────────────────────────────

  @Post('cities')
  createCity(@Body() body: { name: string }) {
    return this.adminService.createCity(body.name);
  }

  @Delete('cities/:id')
  deleteCity(@Param('id') id: string) {
    return this.adminService.deleteCity(id);
  }

  // ─── Complexes ───────────────────────────────────────────────

  @Get('complexes')
  getComplexes() {
    return this.adminService.getComplexes();
  }

  @Get('complexes/:id')
  getComplexDetail(@Param('id') id: string) {
    return this.adminService.getComplexDetail(id);
  }

  @Post('complexes')
  createComplex(@Body() dto: CreateComplexDto) {
    return this.adminService.createComplex(dto);
  }

  @Patch('complexes/:id')
  updateComplex(@Param('id') id: string, @Body() dto: UpdateComplexDto) {
    return this.adminService.updateComplex(id, dto);
  }

  @Delete('complexes/:id')
  deleteComplex(@Param('id') id: string) {
    return this.adminService.deleteComplex(id);
  }

  // ─── Buildings ───────────────────────────────────────────────

  @Post('complexes/:complexId/buildings')
  createBuilding(
    @Param('complexId') complexId: string,
    @Body() dto: CreateBuildingDto,
  ) {
    return this.adminService.createBuilding(complexId, dto);
  }

  // ─── Apartments ──────────────────────────────────────────────

  @Get('complexes/:complexId/apartments')
  getApartmentsByComplex(@Param('complexId') complexId: string) {
    return this.adminService.getApartmentsByComplex(complexId);
  }

  @Post('apartments')
  createApartment(@Body() dto: CreateApartmentDto) {
    return this.adminService.createApartment(dto);
  }

  @Patch('apartments/:id')
  updateApartment(@Param('id') id: string, @Body() dto: Partial<CreateApartmentDto>) {
    return this.adminService.updateApartment(id, dto);
  }

  @Delete('apartments/:id')
  deleteApartment(@Param('id') id: string) {
    return this.adminService.deleteApartment(id);
  }

  // ─── Applications ────────────────────────────────────────────

  @Get('applications')
  getApplications(
    @Query('status') status?: ApplicationStatus,
    @Query('type') type?: ApplicationType,
    @Query('dateFrom') dateFrom?: string,
    @Query('dateTo') dateTo?: string,
  ) {
    return this.adminService.getApplications({ status, type, dateFrom, dateTo });
  }

  @Patch('applications/:id/status')
  updateApplicationStatus(
    @Param('id') id: string,
    @Body() dto: UpdateApplicationStatusDto,
  ) {
    return this.adminService.updateApplicationStatus(id, dto);
  }
}
