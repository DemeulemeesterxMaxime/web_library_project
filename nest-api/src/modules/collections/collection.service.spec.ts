import { Test, TestingModule } from '@nestjs/testing';
import { CollectionService } from './collection.service';
import { CollectionRepository } from './collection.repository';
import type { CollectionModel } from './collection.model';
import type { CollectionId } from './collection.entity';
import type { ClientId } from '../clients/client.entity';

describe('CollectionService', () => {
  let service: CollectionService;
  let repository: CollectionRepository;

  const mockCollection: CollectionModel = {
    id: 'coll-uuid-1' as CollectionId,
    name: 'Best of 2025',
    description: 'My favourite vinyls',
    clientId: 'client-uuid-1' as ClientId,
    client: { firstName: 'Alice', lastName: 'Dupont' },
    vinyls: [],
    photo: null,
  };

  const mockCollectionRepository: Partial<CollectionRepository> = {
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
      providers: [
        CollectionService,
        {
          provide: CollectionRepository,
          useValue: mockCollectionRepository,
        },
      ],
    }).compile();

    service = module.get<CollectionService>(CollectionService);
    repository = module.get<CollectionRepository>(CollectionRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAllCollections', () => {
    it('should return all collections', async () => {
      const result = await service.getAllCollections();

      expect(result).toEqual([mockCollection]);
      expect(repository.getAllCollections).toHaveBeenCalled();
    });
  });

  describe('getCollectionsByClientId', () => {
    it('should return collections for a client', async () => {
      const result = await service.getCollectionsByClientId('client-uuid-1');

      expect(result).toEqual([mockCollection]);
      expect(repository.getCollectionsByClientId).toHaveBeenCalledWith(
        'client-uuid-1',
      );
    });
  });

  describe('getCollectionById', () => {
    it('should return a collection by id', async () => {
      const result = await service.getCollectionById('coll-uuid-1');

      expect(result).toEqual(mockCollection);
      expect(repository.getCollectionById).toHaveBeenCalledWith('coll-uuid-1');
    });
  });

  describe('createCollection', () => {
    it('should create a collection', async () => {
      const createData = {
        name: 'Best of 2025',
        clientId: 'client-uuid-1',
        description: 'My favourite vinyls',
      };

      const result = await service.createCollection(createData);

      expect(result).toEqual(mockCollection);
      expect(repository.createCollection).toHaveBeenCalledWith(createData);
    });
  });

  describe('updateCollection', () => {
    it('should update when collection exists', async () => {
      const updateData = { name: 'Best of 2026' };

      const result = await service.updateCollection('coll-uuid-1', updateData);

      expect(result).toEqual(mockCollection);
      expect(repository.updateCollection).toHaveBeenCalledWith(
        'coll-uuid-1',
        updateData,
      );
    });

    it('should return undefined when collection does not exist', async () => {
      (repository.getCollectionById as jest.Mock).mockResolvedValueOnce(
        undefined,
      );

      const result = await service.updateCollection('unknown-id', {
        name: 'Test',
      });

      expect(result).toBeUndefined();
    });
  });

  describe('deleteCollection', () => {
    it('should delete the collection', async () => {
      await service.deleteCollection('coll-uuid-1');

      expect(repository.deleteCollection).toHaveBeenCalledWith('coll-uuid-1');
    });
  });

  describe('addVinylToCollection', () => {
    it('should add a vinyl to a collection', async () => {
      const result = await service.addVinylToCollection(
        'coll-uuid-1',
        'vinyl-uuid-1',
      );

      expect(result).toEqual(mockCollection);
      expect(repository.addVinylToCollection).toHaveBeenCalledWith(
        'coll-uuid-1',
        'vinyl-uuid-1',
      );
    });
  });

  describe('removeVinylFromCollection', () => {
    it('should remove a vinyl from a collection', async () => {
      const result = await service.removeVinylFromCollection(
        'coll-uuid-1',
        'vinyl-uuid-1',
      );

      expect(result).toEqual(mockCollection);
      expect(repository.removeVinylFromCollection).toHaveBeenCalledWith(
        'coll-uuid-1',
        'vinyl-uuid-1',
      );
    });
  });
});
