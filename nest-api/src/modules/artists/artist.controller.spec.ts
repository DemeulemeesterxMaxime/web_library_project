import { Test, TestingModule } from '@nestjs/testing';
import { ArtistController } from './artist.controller';
import { ArtistService } from './artist.service';
import { ArtistModel, ArtistStatsModel, ArtistWithVinylCountModel } from './artist.model';
import { ArtistId } from './artist.entity';

describe('ArtistController', () => {
  let controller: ArtistController;
  let service: ArtistService;

  const mockArtist: ArtistModel = {
    id: 'artist-uuid-1' as ArtistId,
    firstName: 'John',
    lastName: 'Lennon',
    photo: null,
  };

  const mockArtistWithCount: ArtistWithVinylCountModel = {
    ...mockArtist,
    vinylCount: 5,
  };

  const mockStats: ArtistStatsModel = {
    artistId: 'artist-uuid-1' as ArtistId,
    totalVinyls: 5,
    totalSales: 15,
    averageSalesByVinyl: 3,
  };

  const mockArtistService: Partial<ArtistService> = {
    getAllArtists: jest.fn().mockResolvedValue([mockArtistWithCount]),
    getArtistById: jest.fn().mockResolvedValue(mockArtist),
    getArtistStats: jest.fn().mockResolvedValue(mockStats),
    createArtist: jest.fn().mockResolvedValue(mockArtist),
    updateArtist: jest.fn().mockResolvedValue(mockArtist),
    deleteArtist: jest.fn().mockResolvedValue(undefined),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArtistController],
      providers: [
        {
          provide: ArtistService,
          useValue: mockArtistService,
        },
      ],
    }).compile();

    controller = module.get<ArtistController>(ArtistController);
    service = module.get<ArtistService>(ArtistService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAllArtists', () => {
    it('should return a list of artists with vinyl count', async () => {
      const result = await controller.getAllArtists();

      expect(result).toEqual([mockArtistWithCount]);
      expect(service.getAllArtists).toHaveBeenCalled();
    });
  });

  describe('getArtistById', () => {
    it('should return a single artist by id', async () => {
      const result = await controller.getArtistById('artist-uuid-1');

      expect(result).toEqual(mockArtist);
      expect(service.getArtistById).toHaveBeenCalledWith('artist-uuid-1');
    });
  });

  describe('getArtistStats', () => {
    it('should return artist stats', async () => {
      const result = await controller.getArtistStats('artist-uuid-1');

      expect(result).toEqual(mockStats);
      expect(service.getArtistStats).toHaveBeenCalledWith('artist-uuid-1');
    });
  });

  describe('createArtist', () => {
    it('should create and return a new artist', async () => {
      const createDto = {
        firstName: 'John',
        lastName: 'Lennon',
      };

      const result = await controller.createArtist(createDto);

      expect(result).toEqual(mockArtist);
      expect(service.createArtist).toHaveBeenCalledWith(createDto);
    });
  });

  describe('updateArtist', () => {
    it('should update and return the artist', async () => {
      const updateDto = { firstName: 'Paul' };

      const result = await controller.updateArtist('artist-uuid-1', updateDto);

      expect(result).toEqual(mockArtist);
      expect(service.updateArtist).toHaveBeenCalledWith('artist-uuid-1', updateDto);
    });
  });

  describe('deleteArtist', () => {
    it('should delete the artist', async () => {
      await controller.deleteArtist('artist-uuid-1');

      expect(service.deleteArtist).toHaveBeenCalledWith('artist-uuid-1');
    });
  });
});
