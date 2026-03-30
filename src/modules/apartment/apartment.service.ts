import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Apartment } from './entities/apartment.entity';
import { ApartmentFilterDto } from './dto/apartment-filter.dto';

@Injectable()
export class ApartmentService {
  constructor(
    @InjectRepository(Apartment)
    private readonly apartmentRepo: Repository<Apartment>,
  ) {}

  async findByComplexId(
    complexId: string,
    filter: ApartmentFilterDto,
  ): Promise<Apartment[]> {
    const qb = this.apartmentRepo
      .createQueryBuilder('apartment')
      .innerJoin('apartment.building', 'building')
      .addSelect(['building.id', 'building.name'])
      .where('building.complexId = :complexId', { complexId });

    if (filter.rooms !== undefined) {
      qb.andWhere('apartment.rooms = :rooms', { rooms: filter.rooms });
    }
    if (filter.minPrice !== undefined) {
      qb.andWhere('apartment.price >= :minPrice', { minPrice: filter.minPrice });
    }
    if (filter.maxPrice !== undefined) {
      qb.andWhere('apartment.price <= :maxPrice', { maxPrice: filter.maxPrice });
    }
    if (filter.minArea !== undefined) {
      qb.andWhere('apartment.area >= :minArea', { minArea: filter.minArea });
    }
    if (filter.maxArea !== undefined) {
      qb.andWhere('apartment.area <= :maxArea', { maxArea: filter.maxArea });
    }
    if (filter.floor !== undefined) {
      qb.andWhere('apartment.floor = :floor', { floor: filter.floor });
    }
    if (filter.status) {
      qb.andWhere('apartment.status = :status', { status: filter.status });
    }
    if (filter.buildingId) {
      qb.andWhere('apartment.buildingId = :buildingId', {
        buildingId: filter.buildingId,
      });
    }

    qb.orderBy('apartment.price', 'ASC');

    return qb.getMany();
  }

  async findOne(id: string): Promise<Apartment> {
    const apartment = await this.apartmentRepo.findOne({
      where: { id },
      relations: ['building', 'building.complex'],
    });

    if (!apartment) {
      throw new NotFoundException(`Квартира с ID ${id} не найдена`);
    }

    return apartment;
  }
}
