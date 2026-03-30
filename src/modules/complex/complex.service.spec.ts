import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import { ComplexService } from './complex.service';
import { ResidentialComplex, ComplexStatus } from './entities/complex.entity';

describe('ComplexService', () => {
  let service: ComplexService;

  const mockComplex: Partial<ResidentialComplex> = {
    id: '123e4567-e89b-12d3-a456-426614174000',
    name: 'Test Complex',
    address: 'Test Address',
    city: 'Алматы',
    developer: 'Test Dev',
    status: ComplexStatus.SELLING,
    buildings: [],
  };

  const mockQueryBuilder = {
    leftJoin: jest.fn().mockReturnThis(),
    addSelect: jest.fn().mockReturnThis(),
    select: jest.fn().mockReturnThis(),
    groupBy: jest.fn().mockReturnThis(),
    andWhere: jest.fn().mockReturnThis(),
    orderBy: jest.fn().mockReturnThis(),
    getRawAndEntities: jest.fn().mockResolvedValue({
      entities: [mockComplex],
      raw: [{ minPrice: '15000000', maxPrice: '50000000', availableCount: '5' }],
    }),
  };

  const mockRepository = {
    createQueryBuilder: jest.fn().mockReturnValue(mockQueryBuilder),
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ComplexService,
        {
          provide: getRepositoryToken(ResidentialComplex),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<ComplexService>(ComplexService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findAll', () => {
    it('should return complexes with aggregated data', async () => {
      const result = await service.findAll({});

      expect(result).toHaveLength(1);
      expect(result[0].minPrice).toBe(15000000);
      expect(result[0].maxPrice).toBe(50000000);
      expect(result[0].availableCount).toBe(5);
    });

    it('should apply city filter', async () => {
      await service.findAll({ city: 'Алматы' });

      expect(mockQueryBuilder.andWhere).toHaveBeenCalledWith(
        'complex.city = :city',
        { city: 'Алматы' },
      );
    });

    it('should apply status filter', async () => {
      await service.findAll({ status: ComplexStatus.SELLING });

      expect(mockQueryBuilder.andWhere).toHaveBeenCalledWith(
        'complex.status = :status',
        { status: ComplexStatus.SELLING },
      );
    });
  });

  describe('findOne', () => {
    it('should return a complex with buildings', async () => {
      mockRepository.findOne.mockResolvedValue(mockComplex);

      const result = await service.findOne(mockComplex.id!);

      expect(result).toEqual(mockComplex);
      expect(mockRepository.findOne).toHaveBeenCalledWith({
        where: { id: mockComplex.id },
        relations: ['buildings'],
      });
    });

    it('should throw NotFoundException if complex not found', async () => {
      mockRepository.findOne.mockResolvedValue(null);

      await expect(service.findOne('non-existent-id')).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
