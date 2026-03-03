import { Test, TestingModule } from '@nestjs/testing';
import { VinylController } from './vinyl.controller';
import { VinylService } from './vinyl.service';
import { VinylModel, VinylWithSalesCountModel } from './vinyl.model';
import { VinylId } from './vinyl.entity';
import { ArtistId } from '../artists/artist.entity';

describe('VinylController', () => {
  let controller: VinylController;
  let service: VinylService;

  const mockVinyl: VinylModel = {
    id: 'vinyl-uuid-1' as VinylId,
    title: 'Abbey Road',
    artist: { firstName: 'The', lastName: 'Beatles' },
    yearReleased: 1969,
    photo: null,
  };

  const mockVinylWithSales: VinylWithSalesCountModel = {
    ...mockVinyl,
    salesCount: 3,
  };

  const mockVinylService: Partial<VinylService> = {
    getAllVinyls: jest.fn().mockResolvedValue([[mockVinylWithSales], 1]),
    getVinylById: jest.fn().mockResolvedValue(mockVinyl),
    createVinyl: jest.fn().mockResolvedValue(mockVinyl),
    updateVinyl: jest.fn().mockResolvedValue(mockVinyl),
    deleteVinyl: jest.fn().mockResolvedValue(undefined),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VinylController],
      providers: [
        {
          provide: VinylService,
          useValue: mockVinylService,
        },
      ],
    }).compile();

    controller = module.get<VinylController>(VinylController);
    service = module.get<VinylService>(VinylService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getVinyls', () => {
    it('should return a list of vinyls with total count', async () => {
      const result = await controller.getVinyls({});

      expect(result.data).toEqual([mockVinylWithSales]);
      expect(result.totalCount).toBe(1);
      expect(service.getAllVinyls).toHaveBeenCalled();
    });

    it('should pass limit and offset to service', async () => {
      await controller.getVinyls({ limit: 10, offset: 5 });

      expect(service.getAllVinyls).toHaveBeenCalledWith({
        limit: 10,
        offset: 5,
        sort: { title: 'ASC' },
      });
    });
  });

  describe('getVinyl', () => {
    it('should return a single vinyl by id', async () => {
      const result = await controller.getVinyl('vinyl-uuid-1');

      expect(result).toEqual(mockVinyl);
      expect(service.getVinylById).toHaveBeenCalledWith('vinyl-uuid-1');
    });
  });

  describe('createVinyl', () => {
    it('should create and return a new vinyl', async () => {
      const createDto = {
        title: 'Abbey Road',
        artistId: 'artist-uuid-1',
        yearReleased: 1969,
        photo: undefined,
      };

      const result = await controller.createVinyl(createDto);

      expect(result).toEqual(mockVinyl);
      expect(service.createVinyl).toHaveBeenCalledWith({
        title: 'Abbey Road',
        artistId: 'artist-uuid-1' as ArtistId,
        yearReleased: 1969,
        photo: undefined,
      });
    });
  });

  describe('updateVinyl', () => {
    it('should update and return the vinyl', async () => {
      const updateDto = { title: 'Abbey Road (Remastered)' };

      const result = await controller.updateVinyl('vinyl-uuid-1', updateDto);

      expect(result).toEqual(mockVinyl);
      expect(service.updateVinyl).toHaveBeenCalledWith('vinyl-uuid-1', {
        title: 'Abbey Road (Remastered)',
        artistId: undefined,
      });
    });
  });

  describe('deleteVinyl', () => {
    it('should delete the vinyl', async () => {
      await controller.deleteVinyl('vinyl-uuid-1');

      expect(service.deleteVinyl).toHaveBeenCalledWith('vinyl-uuid-1');
    });
  });
});
