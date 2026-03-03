import { Test, TestingModule } from '@nestjs/testing';
import { VinylService } from './vinyl.service';
import { VinylRepository } from './vinyl.repository';
import { SaleService } from '../sales/sale.service';
import { VinylModel } from './vinyl.model';
import { VinylId } from './vinyl.entity';
import { ArtistId } from '../artists/artist.entity';

describe('VinylService', () => {
  let service: VinylService;
  let vinylRepository: VinylRepository;
  let saleService: SaleService;

  const mockVinyl: VinylModel = {
    id: 'vinyl-uuid-1' as VinylId,
    title: 'Abbey Road',
    artist: { firstName: 'The', lastName: 'Beatles' },
    yearReleased: 1969,
    photo: null,
  };

  const mockVinylRepository: Partial<VinylRepository> = {
    getAllVinyls: jest.fn().mockResolvedValue([[mockVinyl], 1]),
    getVinylById: jest.fn().mockResolvedValue(mockVinyl),
    createVinyl: jest.fn().mockResolvedValue(mockVinyl),
    updateVinyl: jest.fn().mockResolvedValue(mockVinyl),
    deleteVinyl: jest.fn().mockResolvedValue(undefined),
  };

  const mockSaleService: Partial<SaleService> = {
    countSalesByVinylId: jest.fn().mockResolvedValue(3),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VinylService,
        { provide: VinylRepository, useValue: mockVinylRepository },
        { provide: SaleService, useValue: mockSaleService },
      ],
    }).compile();

    service = module.get<VinylService>(VinylService);
    vinylRepository = module.get<VinylRepository>(VinylRepository);
    saleService = module.get<SaleService>(SaleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAllVinyls', () => {
    it('should return vinyls with salesCount', async () => {
      const [vinyls, totalCount] = await service.getAllVinyls();

      expect(totalCount).toBe(1);
      expect(vinyls).toHaveLength(1);
      expect(vinyls[0].salesCount).toBe(3);
      expect(vinylRepository.getAllVinyls).toHaveBeenCalled();
      expect(saleService.countSalesByVinylId).toHaveBeenCalledWith(
        'vinyl-uuid-1',
      );
    });
  });

  describe('getVinylById', () => {
    it('should return a vinyl by id', async () => {
      const result = await service.getVinylById('vinyl-uuid-1');

      expect(result).toEqual(mockVinyl);
      expect(vinylRepository.getVinylById).toHaveBeenCalledWith(
        'vinyl-uuid-1',
      );
    });
  });

  describe('createVinyl', () => {
    it('should create a vinyl', async () => {
      const createData = {
        title: 'Abbey Road',
        artistId: 'artist-uuid-1' as ArtistId,
        yearReleased: 1969,
      };

      const result = await service.createVinyl(createData);

      expect(result).toEqual(mockVinyl);
      expect(vinylRepository.createVinyl).toHaveBeenCalledWith(createData);
    });
  });

  describe('updateVinyl', () => {
    it('should update the vinyl when it exists', async () => {
      const updateData = { title: 'Abbey Road (Remastered)' };

      const result = await service.updateVinyl('vinyl-uuid-1', updateData);

      expect(result).toEqual(mockVinyl);
      expect(vinylRepository.updateVinyl).toHaveBeenCalledWith(
        'vinyl-uuid-1',
        updateData,
      );
    });

    it('should return undefined when vinyl does not exist', async () => {
      (vinylRepository.getVinylById as jest.Mock).mockResolvedValueOnce(
        undefined,
      );

      const result = await service.updateVinyl('unknown-id', {
        title: 'Test',
      });

      expect(result).toBeUndefined();
    });
  });

  describe('deleteVinyl', () => {
    it('should delete the vinyl', async () => {
      await service.deleteVinyl('vinyl-uuid-1');

      expect(vinylRepository.deleteVinyl).toHaveBeenCalledWith('vinyl-uuid-1');
    });
  });
});
