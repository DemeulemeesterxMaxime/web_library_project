import { Test, TestingModule } from '@nestjs/testing';
import { SaleService } from './sale.service';
import { SaleRepository } from './sale.repository';
import { SaleWithDetailsModel, CreateSaleModel } from './sale.model';
import { SaleId } from './sale.entity';
import { ClientId } from '../clients/client.entity';
import { VinylId } from '../vinyls/vinyl.entity';

describe('SaleService', () => {
  let service: SaleService;
  let saleRepository: SaleRepository;

  const mockSale: SaleWithDetailsModel = {
    id: 'sale-uuid-1' as SaleId,
    clientId: 'client-uuid-1' as ClientId,
    vinylId: 'vinyl-uuid-1' as VinylId,
    date: new Date('2025-12-01'),
    client: { firstName: 'Alice', lastName: 'Dupont' },
    vinyl: {
      title: 'Abbey Road',
      artist: { firstName: 'The', lastName: 'Beatles' },
    },
  };

  const mockSaleRepository: Partial<SaleRepository> = {
    getAllSales: jest.fn().mockResolvedValue([mockSale]),
    getSalesByClientId: jest.fn().mockResolvedValue([mockSale]),
    getSalesByVinylId: jest.fn().mockResolvedValue([mockSale]),
    createSale: jest.fn().mockResolvedValue(mockSale),
    deleteSale: jest.fn().mockResolvedValue(undefined),
    countSalesByVinylId: jest.fn().mockResolvedValue(3),
    countSalesByClientId: jest.fn().mockResolvedValue(2),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SaleService,
        { provide: SaleRepository, useValue: mockSaleRepository },
      ],
    }).compile();

    service = module.get<SaleService>(SaleService);
    saleRepository = module.get<SaleRepository>(SaleRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getSales', () => {
    it('should return all sales when no filter is provided', async () => {
      const result = await service.getSales();

      expect(result).toEqual([mockSale]);
      expect(saleRepository.getAllSales).toHaveBeenCalled();
    });

    it('should filter by clientId when provided', async () => {
      const result = await service.getSales('client-uuid-1');

      expect(result).toEqual([mockSale]);
      expect(saleRepository.getSalesByClientId).toHaveBeenCalledWith(
        'client-uuid-1',
      );
    });

    it('should filter by vinylId when provided', async () => {
      const result = await service.getSales(undefined, 'vinyl-uuid-1');

      expect(result).toEqual([mockSale]);
      expect(saleRepository.getSalesByVinylId).toHaveBeenCalledWith(
        'vinyl-uuid-1',
      );
    });
  });

  describe('createSale', () => {
    it('should create and return a sale', async () => {
      const createData: CreateSaleModel = {
        clientId: 'client-uuid-1' as ClientId,
        vinylId: 'vinyl-uuid-1' as VinylId,
        date: new Date('2025-12-01'),
      };

      const result = await service.createSale(createData);

      expect(result).toEqual(mockSale);
      expect(saleRepository.createSale).toHaveBeenCalledWith(createData);
    });
  });

  describe('deleteSale', () => {
    it('should delete the sale', async () => {
      await service.deleteSale('sale-uuid-1');

      expect(saleRepository.deleteSale).toHaveBeenCalledWith('sale-uuid-1');
    });
  });

  describe('countSalesByVinylId', () => {
    it('should return the count of sales for a vinyl', async () => {
      const result = await service.countSalesByVinylId('vinyl-uuid-1');

      expect(result).toBe(3);
      expect(saleRepository.countSalesByVinylId).toHaveBeenCalledWith(
        'vinyl-uuid-1',
      );
    });
  });

  describe('countSalesByClientId', () => {
    it('should return the count of sales for a client', async () => {
      const result = await service.countSalesByClientId('client-uuid-1');

      expect(result).toBe(2);
      expect(saleRepository.countSalesByClientId).toHaveBeenCalledWith(
        'client-uuid-1',
      );
    });
  });
});
