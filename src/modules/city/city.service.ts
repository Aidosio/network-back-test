import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { City } from './entities/city.entity';

@Injectable()
export class CityService {
  constructor(
    @InjectRepository(City)
    private readonly cityRepo: Repository<City>,
  ) {}

  async findAll(): Promise<City[]> {
    return this.cityRepo.find({ order: { name: 'ASC' } });
  }

  async findOrCreate(name: string): Promise<City> {
    const existing = await this.cityRepo.findOneBy({ name });
    if (existing) return existing;
    const city = this.cityRepo.create({ name });
    return this.cityRepo.save(city);
  }

  async create(name: string): Promise<City> {
    const city = this.cityRepo.create({ name });
    return this.cityRepo.save(city);
  }

  async delete(id: string): Promise<void> {
    await this.cityRepo.delete(id);
  }
}
