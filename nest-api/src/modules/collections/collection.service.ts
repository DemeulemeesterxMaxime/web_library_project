import { BadRequestException, Injectable } from '@nestjs/common';
import { CollectionRepository } from './collection.repository';
import { SaleService } from '../sales/sale.service';
import type {
  CollectionModel,
  CreateCollectionModel,
  UpdateCollectionModel,
} from './collection.model';

@Injectable()
export class CollectionService {
  constructor(
    private readonly collectionRepository: CollectionRepository,
    private readonly saleService: SaleService,
  ) {}

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
    const collection = await this.getCollectionById(collectionId);
    if (!collection) {
      return undefined;
    }

    if (!collection.isPublic) {
      const clientSales = await this.saleService.getSales(
        collection.clientId,
        undefined,
      );
      const hasPurchased = clientSales.some((sale) => sale.vinylId === vinylId);
      if (!hasPurchased) {
        throw new BadRequestException(
          'Cette collection est privée : seuls les vinyles achetés par le propriétaire peuvent y être ajoutés.',
        );
      }
    }

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
