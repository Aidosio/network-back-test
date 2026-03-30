import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import { ApartmentService } from './apartment.service';
import { Apartment, ApartmentStatus } from './entities/apartment.entity';

describe('ApartmentService', () => {
  let service: ApartmentService;

  const mockApartment: Partial<Apartment> = {
    id: '123e4567-e89b-12d3-a456-426614174001',
    number: '101',
    floor: 5,
    rooms: 2,
    area: 65,
    price: 35000000,
    status: ApartmentStatus.AVAILABLE,
    buildingId: 'building-id',
  };

  const mockQueryBuilder = {
    innerJoin: jest.fn().mockReturnThis(),
    addSelect: jest.fn().mockReturnThis(),
    where: jest.fn().mockReturnThis(),
    andWhere: jest.fn().mockReturnThis(),
    orderBy: jest.fn().mockReturnThis(),
    getMany: jest.fn().mockResolvedValue([mockApartment]),
  };

  const mockRepository = {
    createQueryBuilder: jest.fn().mockReturnValue(mockQueryBuilder),
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ApartmentService,
        {
          provide: getRepositoryToken(Apartment),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<ApartmentService>(ApartmentService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findByComplexId', () => {
    it('should return apartments for a complex', async () => {
      const result = await service.findByComplexId('complex-id', {});

      expect(result).toHaveLength(1);
      expect(mockQueryBuilder.where).toHaveBeenCalledWith(
        'building.complexId = :complexId',
        { complexId: 'complex-id' },
      );
    });

    it('should apply rooms filter', async () => {
      await service.findByComplexId('complex-id', { rooms: 2 });

      expect(mockQueryBuilder.andWhere).toHaveBeenCalledWith(
        'apartment.rooms = :rooms',
        { rooms: 2 },
      );
    });

    it('should apply price range filters', async () => {
      await service.findByComplexId('complex-id', {
        minPrice: 20000000,
        maxPrice: 50000000,
      });

      expect(mockQueryBuilder.andWhere).toHaveBeenCalledWith(
        'apartment.price >= :minPrice',
        { minPrice: 20000000 },
      );
      expect(mockQueryBuilder.andWhere).toHaveBeenCalledWith(
        'apartment.price <= :maxPrice',
        { maxPrice: 50000000 },
      );
    });
  });

  describe('findOne', () => {
    it('should return apartment with relations', async () => {
      mockRepository.findOne.mockResolvedValue(mockApartment);

      const result = await service.findOne(mockApartment.id!);

      expect(result).toEqual(mockApartment);
      expect(mockRepository.findOne).toHaveBeenCalledWith({
        where: { id: mockApartment.id },
        relations: ['building', 'building.complex'],
      });
    });

    it('should throw NotFoundException if apartment not found', async () => {
      mockRepository.findOne.mockResolvedValue(null);

      await expect(service.findOne('non-existent-id')).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
