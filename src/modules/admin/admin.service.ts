import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { ResidentialComplex } from '../complex/entities/complex.entity';
import { Building } from '../building/entities/building.entity';
import { Apartment } from '../apartment/entities/apartment.entity';
import { Application, ApplicationStatus, ApplicationType } from '../application/entities/application.entity';
import { City } from '../city/entities/city.entity';
import { CreateComplexDto } from './dto/create-complex.dto';
import { UpdateComplexDto } from './dto/update-complex.dto';
import { CreateBuildingDto } from './dto/create-building.dto';
import { CreateApartmentDto } from './dto/create-apartment.dto';
import { UpdateApplicationStatusDto } from './dto/update-application-status.dto';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(ResidentialComplex)
    private readonly complexRepo: Repository<ResidentialComplex>,
    @InjectRepository(Building)
    private readonly buildingRepo: Repository<Building>,
    @InjectRepository(Apartment)
    private readonly apartmentRepo: Repository<Apartment>,
    @InjectRepository(Application)
    private readonly applicationRepo: Repository<Application>,
    @InjectRepository(City)
    private readonly cityRepo: Repository<City>,
    private readonly dataSource: DataSource,
  ) {}

  // ─── Complexes ───────────────────────────────────────────────

  async getComplexes() {
    const complexes = await this.complexRepo
      .createQueryBuilder('c')
      .loadRelationCountAndMap('c.buildingsCount', 'c.buildings')
      .getMany();

    // Get apartments count per complex
    const apartmentCounts = await this.dataSource
      .createQueryBuilder()
      .select('b."complexId"', 'complexId')
      .addSelect('COUNT(a.id)', 'count')
      .from('buildings', 'b')
      .leftJoin('apartments', 'a', 'a."buildingId" = b.id')
      .groupBy('b."complexId"')
      .getRawMany();

    const countMap = new Map<string, number>();
    for (const row of apartmentCounts) {
      countMap.set(row.complexId, parseInt(row.count, 10));
    }

    return complexes.map((c: any) => ({
      ...c,
      buildingsCount: c.buildingsCount ?? 0,
      apartmentsCount: countMap.get(c.id) ?? 0,
    }));
  }

  async createComplex(dto: CreateComplexDto): Promise<ResidentialComplex> {
    const complex = this.complexRepo.create(dto);
    return this.complexRepo.save(complex);
  }

  async updateComplex(id: string, dto: UpdateComplexDto): Promise<ResidentialComplex> {
    const complex = await this.complexRepo.findOneBy({ id });
    if (!complex) throw new NotFoundException('Complex not found');
    Object.assign(complex, dto);
    return this.complexRepo.save(complex);
  }

  async deleteComplex(id: string): Promise<void> {
    const result = await this.complexRepo.delete(id);
    if (result.affected === 0) throw new NotFoundException('Complex not found');
  }

  // ─── Buildings ───────────────────────────────────────────────

  async createBuilding(complexId: string, dto: CreateBuildingDto): Promise<Building> {
    const complex = await this.complexRepo.findOneBy({ id: complexId });
    if (!complex) throw new NotFoundException('Complex not found');
    const building = this.buildingRepo.create({ ...dto, complexId });
    return this.buildingRepo.save(building);
  }

  // ─── Apartments ──────────────────────────────────────────────

  async getApartmentsByComplex(complexId: string) {
    return this.apartmentRepo
      .createQueryBuilder('a')
      .innerJoin('a.building', 'b')
      .where('b."complexId" = :complexId', { complexId })
      .leftJoinAndSelect('a.building', 'building')
      .orderBy('building.name', 'ASC')
      .addOrderBy('a.floor', 'ASC')
      .addOrderBy('a.number', 'ASC')
      .getMany();
  }

  async createApartment(dto: CreateApartmentDto): Promise<Apartment> {
    const building = await this.buildingRepo.findOneBy({ id: dto.buildingId });
    if (!building) throw new NotFoundException('Building not found');
    const apartment = this.apartmentRepo.create(dto);
    return this.apartmentRepo.save(apartment);
  }

  async updateApartment(id: string, dto: Partial<CreateApartmentDto>): Promise<Apartment> {
    const apartment = await this.apartmentRepo.findOneBy({ id });
    if (!apartment) throw new NotFoundException('Apartment not found');
    Object.assign(apartment, dto);
    return this.apartmentRepo.save(apartment);
  }

  async deleteApartment(id: string): Promise<void> {
    const result = await this.apartmentRepo.delete(id);
    if (result.affected === 0) throw new NotFoundException('Apartment not found');
  }

  // ─── Applications ────────────────────────────────────────────

  async getApplications(filters: {
    status?: ApplicationStatus;
    type?: ApplicationType;
    dateFrom?: string;
    dateTo?: string;
  }) {
    const qb = this.applicationRepo
      .createQueryBuilder('app')
      .leftJoinAndSelect('app.apartment', 'apartment')
      .leftJoinAndSelect('apartment.building', 'building')
      .leftJoinAndSelect('building.complex', 'complex');

    if (filters.status) {
      qb.andWhere('app.status = :status', { status: filters.status });
    }
    if (filters.type) {
      qb.andWhere('app.type = :type', { type: filters.type });
    }
    if (filters.dateFrom) {
      qb.andWhere('app."createdAt" >= :dateFrom', { dateFrom: filters.dateFrom });
    }
    if (filters.dateTo) {
      qb.andWhere('app."createdAt" <= :dateTo', { dateTo: filters.dateTo + ' 23:59:59' });
    }

    qb.orderBy('app."createdAt"', 'DESC');

    return qb.getMany();
  }

  async updateApplicationStatus(id: string, dto: UpdateApplicationStatusDto): Promise<Application> {
    const application = await this.applicationRepo.findOneBy({ id });
    if (!application) throw new NotFoundException('Application not found');
    application.status = dto.status;
    return this.applicationRepo.save(application);
  }

  // ─── Cities ──────────────────────────────────────────────────

  async createCity(name: string): Promise<City> {
    const city = this.cityRepo.create({ name });
    return this.cityRepo.save(city);
  }

  async deleteCity(id: string): Promise<void> {
    const result = await this.cityRepo.delete(id);
    if (result.affected === 0) throw new NotFoundException('City not found');
  }

  // ─── Detail view helper ──────────────────────────────────────

  async getComplexDetail(id: string) {
    const complex = await this.complexRepo.findOne({
      where: { id },
      relations: ['buildings', 'buildings.apartments'],
    });
    if (!complex) throw new NotFoundException('Complex not found');
    return complex;
  }
}
