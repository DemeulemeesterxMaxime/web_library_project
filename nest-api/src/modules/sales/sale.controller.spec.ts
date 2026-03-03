import { Test, TestingModule } from '@nestjs/testing';
import { SaleController } from './sale.controller';
import { SaleService } from './sale.service';
import { SaleWithDetailsModel } from './sale.model';
import { SaleId } from './sale.entity';
import { ClientId } from '../clients/client.entity';
import { VinylId } from '../vinyls/vinyl.entity';

describe('SaleController', () => {
  let controller: SaleController;
  let service: SaleService;

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

  const mockSaleService: Partial<SaleService> = {
    getSales: jest.fn().mockResolvedValue([mockSale]),
    createSale: jest.fn().mockResolvedValue(mockSale),
    deleteSale: jest.fn().mockResolvedValue(undefined),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SaleController],
      providers: [
        {
          provide: SaleService,
          useValue: mockSaleService,
        },
      ],
    }).compile();

    controller = module.get<SaleController>(SaleController);
    service = module.get<SaleService>(SaleService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getSales', () => {
    it('should return all sales when no filter is provided', async () => {
      const result = await controller.getSales({});

      expect(result).toEqual([mockSale]);
      expect(service.getSales).toHaveBeenCalledWith(undefined, undefined);
    });

    it('should filter sales by clientId', async () => {
      await controller.getSales({ clientId: 'client-uuid-1' });

      expect(service.getSales).toHaveBeenCalledWith('client-uuid-1', undefined);
    });

    it('should filter sales by vinylId', async () => {
      await controller.getSales({ vinylId: 'vinyl-uuid-1' });

      expect(service.getSales).toHaveBeenCalledWith(undefined, 'vinyl-uuid-1');
    });
  });

  describe('createSale', () => {
    it('should create and return a new sale', async () => {
      const createDto = {
        clientId: 'client-uuid-1',
        vinylId: 'vinyl-uuid-1',
        date: '2025-12-01',
      };

      const result = await controller.createSale(createDto);

      expect(result).toEqual(mockSale);
      expect(service.createSale).toHaveBeenCalledWith({
        clientId: 'client-uuid-1' as ClientId,
        vinylId: 'vinyl-uuid-1' as VinylId,
        date: new Date('2025-12-01'),
      });
    });
  });

  describe('deleteSale', () => {
    it('should delete the sale', async () => {
      await controller.deleteSale('sale-uuid-1');

      expect(service.deleteSale).toHaveBeenCalledWith('sale-uuid-1');
    });
  });
});
