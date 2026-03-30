import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ResidentialComplex } from './entities/complex.entity';
import { ComplexFilterDto } from './dto/complex-filter.dto';

@Injectable()
export class ComplexService {
  constructor(
    @InjectRepository(ResidentialComplex)
    private readonly complexRepo: Repository<ResidentialComplex>,
  ) {}

  async findAll(filter: ComplexFilterDto): Promise<ResidentialComplex[]> {
    const qb = this.complexRepo
      .createQueryBuilder('complex')
      .leftJoin('complex.buildings', 'building')
      .leftJoin('building.apartments', 'apartment')
      .select([
        'complex.id',
        'complex.name',
        'complex.description',
        'complex.address',
        'complex.city',
        'complex.imageUrl',
        'complex.developer',
        'complex.completionDate',
        'complex.status',
        'complex.createdAt',
        'complex.updatedAt',
      ])
      .addSelect('MIN(apartment.price)', 'minPrice')
      .addSelect('MAX(apartment.price)', 'maxPrice')
      .addSelect(
        `COUNT(CASE WHEN apartment.status = 'available' THEN 1 END)`,
        'availableCount',
      )
      .groupBy('complex.id');

    if (filter.city) {
      qb.andWhere('complex.city = :city', { city: filter.city });
    }
    if (filter.status) {
      qb.andWhere('complex.status = :status', { status: filter.status });
    }

    qb.orderBy('complex.createdAt', 'DESC');

    const rawResults = await qb.getRawAndEntities();

    return rawResults.entities.map((entity, index) => {
      const raw = rawResults.raw[index];
      entity.minPrice = raw.minPrice ? Number(raw.minPrice) : null;
      entity.maxPrice = raw.maxPrice ? Number(raw.maxPrice) : null;
      entity.availableCount = Number(raw.availableCount) || 0;
      return entity;
    });
  }

  async findOne(id: string): Promise<ResidentialComplex> {
    const complex = await this.complexRepo.findOne({
      where: { id },
      relations: ['buildings'],
    });

    if (!complex) {
      throw new NotFoundException(`Жилой комплекс с ID ${id} не найден`);
    }

    return complex;
  }
}
