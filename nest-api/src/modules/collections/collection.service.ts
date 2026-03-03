import { Injectable } from '@nestjs/common';
import { CollectionRepository } from './collection.repository';
import type {
  CollectionModel,
  CreateCollectionModel,
  UpdateCollectionModel,
} from './collection.model';

@Injectable()
export class CollectionService {
  constructor(private readonly collectionRepository: CollectionRepository) {}

  public async getAllCollections(): Promise<CollectionModel[]> {
    return this.collectionRepository.getAllCollections();
  }

  public async getCollectionsByClientId(
    clientId: string,
  ): Promise<CollectionModel[]> {
    return this.collectionRepository.getCollectionsByClientId(clientId);
  }

  public async getCollectionById(
    id: string,
  ): Promise<CollectionModel | undefined> {
    return this.collectionRepository.getCollectionById(id);
  }

  public async createCollection(
    input: CreateCollectionModel,
  ): Promise<CollectionModel> {
    return this.collectionRepository.createCollection(input);
  }

  public async updateCollection(
    id: string,
    input: UpdateCollectionModel,
  ): Promise<CollectionModel | undefined> {
    const existing = await this.getCollectionById(id);
    if (!existing) {
      return undefined;
    }

    return this.collectionRepository.updateCollection(id, input);
  }

  public async deleteCollection(id: string): Promise<void> {
    await this.collectionRepository.deleteCollection(id);
  }

  public async addVinylToCollection(
    collectionId: string,
    vinylId: string,
  ): Promise<CollectionModel | undefined> {
    return this.collectionRepository.addVinylToCollection(
      collectionId,
      vinylId,
    );
  }

  public async removeVinylFromCollection(
    collectionId: string,
    vinylId: string,
  ): Promise<CollectionModel | undefined> {
    return this.collectionRepository.removeVinylFromCollection(
      collectionId,
      vinylId,
    );
  }
}
