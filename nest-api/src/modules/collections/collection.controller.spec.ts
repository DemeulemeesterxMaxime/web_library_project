import { Test, TestingModule } from '@nestjs/testing';
import { CollectionController } from './collection.controller';
import { CollectionService } from './collection.service';
import type { CollectionModel } from './collection.model';
import type { CollectionId } from './collection.entity';
import type { ClientId } from '../clients/client.entity';

describe('CollectionController', () => {
  let controller: CollectionController;
  let service: CollectionService;

  const mockCollection: CollectionModel = {
    id: 'coll-uuid-1' as CollectionId,
    name: 'Best of 2025',
    description: 'My favourite vinyls',
    isPublic: false,
    clientId: 'client-uuid-1' as ClientId,
    client: { firstName: 'Alice', lastName: 'Dupont' },
    vinyls: [],
    photo: null,
  };

  const mockCollectionService: Partial<CollectionService> = {
    getAllCollections: jest.fn().mockResolvedValue([mockCollection]),
    getCollectionsByClientId: jest.fn().mockResolvedValue([mockCollection]),
    getCollectionById: jest.fn().mockResolvedValue(mockCollection),
    createCollection: jest.fn().mockResolvedValue(mockCollection),
    updateCollection: jest.fn().mockResolvedValue(mockCollection),
    deleteCollection: jest.fn().mockResolvedValue(undefined),
    addVinylToCollection: jest.fn().mockResolvedValue(mockCollection),
    removeVinylFromCollection: jest.fn().mockResolvedValue(mockCollection),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CollectionController],
      providers: [
        { provide: CollectionService, useValue: mockCollectionService },
      ],
    }).compile();

    controller = module.get<CollectionController>(CollectionController);
    service = module.get<CollectionService>(CollectionService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAllCollections', () => {
    it('should return all collections when no clientId', async () => {
      const result = await controller.getAllCollections();

      expect(result).toEqual([mockCollection]);
      expect(service.getAllCollections).toHaveBeenCalled();
    });

    it('should filter by clientId when provided', async () => {
      const result = await controller.getAllCollections('client-uuid-1');

      expect(result).toEqual([mockCollection]);
      expect(service.getCollectionsByClientId).toHaveBeenCalledWith(
        'client-uuid-1',
      );
    });
  });

  describe('getCollectionById', () => {
    it('should return a collection by id', async () => {
      const result = await controller.getCollectionById('coll-uuid-1');

      expect(result).toEqual(mockCollection);
      expect(service.getCollectionById).toHaveBeenCalledWith('coll-uuid-1');
    });
  });

  describe('createCollection', () => {
    it('should create and return a collection', async () => {
      const createDto = {
        name: 'Best of 2025',
        clientId: 'client-uuid-1',
        description: 'My favourite vinyls',
      };

      const result = await controller.createCollection(createDto);

      expect(result).toEqual(mockCollection);
      expect(service.createCollection).toHaveBeenCalledWith(createDto);
    });
  });

  describe('updateCollection', () => {
    it('should update and return the collection', async () => {
      const updateDto = { name: 'Best of 2026' };

      const result = await controller.updateCollection(
        'coll-uuid-1',
        updateDto,
      );

      expect(result).toEqual(mockCollection);
      expect(service.updateCollection).toHaveBeenCalledWith(
        'coll-uuid-1',
        updateDto,
      );
    });
  });

  describe('deleteCollection', () => {
    it('should delete the collection', async () => {
      await controller.deleteCollection('coll-uuid-1');

      expect(service.deleteCollection).toHaveBeenCalledWith('coll-uuid-1');
    });
  });

  describe('addVinylToCollection', () => {
    it('should add a vinyl to the collection', async () => {
      const addDto = { vinylId: 'vinyl-uuid-1' };

      const result = await controller.addVinylToCollection(
        'coll-uuid-1',
        addDto,
      );

      expect(result).toEqual(mockCollection);
      expect(service.addVinylToCollection).toHaveBeenCalledWith(
        'coll-uuid-1',
        'vinyl-uuid-1',
      );
    });
  });

  describe('removeVinylFromCollection', () => {
    it('should remove a vinyl from the collection', async () => {
      const result = await controller.removeVinylFromCollection(
        'coll-uuid-1',
        'vinyl-uuid-1',
      );

      expect(result).toEqual(mockCollection);
      expect(service.removeVinylFromCollection).toHaveBeenCalledWith(
        'coll-uuid-1',
        'vinyl-uuid-1',
      );
    });
  });
});
