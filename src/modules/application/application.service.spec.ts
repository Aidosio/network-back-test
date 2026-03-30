import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { NotFoundException, ConflictException } from '@nestjs/common';
import { ApplicationService } from './application.service';
import { Application, ApplicationType } from './entities/application.entity';
import { Apartment, ApartmentStatus } from '../apartment/entities/apartment.entity';

describe('ApplicationService', () => {
  let service: ApplicationService;

  const mockApartment: Partial<Apartment> = {
    id: 'apartment-id',
    number: '101',
    status: ApartmentStatus.AVAILABLE,
  };

  const mockApplication: Partial<Application> = {
    id: 'application-id',
    apartmentId: 'apartment-id',
    firstName: 'Иван',
    lastName: 'Петров',
    phone: '+77011234567',
    email: 'ivan@example.com',
    type: ApplicationType.BOOKING,
  };

  const mockTransactionManager = {
    findOne: jest.fn(),
    save: jest.fn(),
    create: jest.fn(),
  };

  const mockDataSource = {
    transaction: jest.fn((cb) => cb(mockTransactionManager)),
  };

  const mockApplicationRepo = {
    findOne: jest.fn(),
  };

  const mockApartmentRepo = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ApplicationService,
        {
          provide: getRepositoryToken(Application),
          useValue: mockApplicationRepo,
        },
        {
          provide: getRepositoryToken(Apartment),
          useValue: mockApartmentRepo,
        },
        {
          provide: DataSource,
          useValue: mockDataSource,
        },
      ],
    }).compile();

    service = module.get<ApplicationService>(ApplicationService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    const createDto = {
      apartmentId: 'apartment-id',
      firstName: 'Иван',
      lastName: 'Петров',
      phone: '+77011234567',
      email: 'ivan@example.com',
      type: ApplicationType.BOOKING,
    };

    it('should create application and reserve apartment', async () => {
      mockTransactionManager.findOne.mockResolvedValue({ ...mockApartment });
      mockTransactionManager.create.mockReturnValue(mockApplication);
      mockTransactionManager.save.mockResolvedValue(mockApplication);

      const result = await service.create(createDto);

      expect(mockTransactionManager.save).toHaveBeenCalledWith(
        Apartment,
        expect.objectContaining({ status: ApartmentStatus.RESERVED }),
      );
      expect(result).toEqual(mockApplication);
    });

    it('should throw NotFoundException if apartment not found', async () => {
      mockTransactionManager.findOne.mockResolvedValue(null);

      await expect(service.create(createDto)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should throw ConflictException if apartment is not available', async () => {
      mockTransactionManager.findOne.mockResolvedValue({
        ...mockApartment,
        status: ApartmentStatus.RESERVED,
      });

      await expect(service.create(createDto)).rejects.toThrow(
        ConflictException,
      );
    });

    it('should not change apartment status for inquiry type', async () => {
      mockTransactionManager.findOne.mockResolvedValue({ ...mockApartment });
      mockTransactionManager.create.mockReturnValue(mockApplication);
      mockTransactionManager.save.mockResolvedValue(mockApplication);

      await service.create({ ...createDto, type: ApplicationType.INQUIRY });

      expect(mockTransactionManager.save).not.toHaveBeenCalledWith(
        Apartment,
        expect.objectContaining({ status: ApartmentStatus.RESERVED }),
      );
    });
  });

  describe('findOne', () => {
    it('should return application with apartment', async () => {
      mockApplicationRepo.findOne.mockResolvedValue(mockApplication);

      const result = await service.findOne('application-id');

      expect(result).toEqual(mockApplication);
    });

    it('should throw NotFoundException if application not found', async () => {
      mockApplicationRepo.findOne.mockResolvedValue(null);

      await expect(service.findOne('non-existent-id')).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
