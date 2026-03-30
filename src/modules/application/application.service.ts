import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Application } from './entities/application.entity';
import { CreateApplicationDto } from './dto/create-application.dto';
import { Apartment, ApartmentStatus } from '../apartment/entities/apartment.entity';
import { ApplicationType } from './entities/application.entity';

@Injectable()
export class ApplicationService {
  constructor(
    @InjectRepository(Application)
    private readonly applicationRepo: Repository<Application>,
    @InjectRepository(Apartment)
    private readonly apartmentRepo: Repository<Apartment>,
    private readonly dataSource: DataSource,
  ) {}

  async create(dto: CreateApplicationDto): Promise<Application> {
    return this.dataSource.transaction(async (manager) => {
      const apartment = await manager.findOne(Apartment, {
        where: { id: dto.apartmentId },
      });

      if (!apartment) {
        throw new NotFoundException(
          `Квартира с ID ${dto.apartmentId} не найдена`,
        );
      }

      if (apartment.status !== ApartmentStatus.AVAILABLE) {
        throw new ConflictException('Квартира уже забронирована или продана');
      }

      if (
        dto.type === ApplicationType.BOOKING ||
        dto.type === ApplicationType.PURCHASE
      ) {
        apartment.status = ApartmentStatus.RESERVED;
        await manager.save(Apartment, apartment);
      }

      const application = manager.create(Application, {
        ...dto,
      });

      return manager.save(Application, application);
    });
  }

  async findOne(id: string): Promise<Application> {
    const application = await this.applicationRepo.findOne({
      where: { id },
      relations: ['apartment'],
    });

    if (!application) {
      throw new NotFoundException(`Заявка с ID ${id} не найдена`);
    }

    return application;
  }
}
