import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CollectionEntity, type CollectionId } from './collection.entity';
import type {
  CollectionModel,
  CreateCollectionModel,
  UpdateCollectionModel,
} from './collection.model';
import type { ClientId } from '../clients/client.entity';
import { VinylEntity, type VinylId } from '../vinyls/vinyl.entity';

@Injectable()
export class CollectionRepository {
  constructor(
    @InjectRepository(CollectionEntity)
    private readonly collectionRepository: Repository<CollectionEntity>,
  ) {}

  public async getAllCollections(): Promise<CollectionModel[]> {
    const collections = await this.collectionRepository.find({
      relations: ['client', 'vinyls'],
    });

    return collections.map((collection) => this.toModel(collection));
  }

  public async getCollectionsByClientId(
    clientId: string,
  ): Promise<CollectionModel[]> {
    const collections = await this.collectionRepository.find({
      where: { clientId: clientId as ClientId },
      relations: ['client', 'vinyls'],
    });

    return collections.map((collection) => this.toModel(collection));
  }

  public async getCollectionById(
    id: string,
  ): Promise<CollectionModel | undefined> {
    const collection = await this.collectionRepository.findOne({
      where: { id: id as CollectionId },
      relations: ['client', 'vinyls'],
    });

    if (!collection) {
      return undefined;
    }

    return this.toModel(collection);
  }

  public async createCollection(
    input: CreateCollectionModel,
  ): Promise<CollectionModel> {
    const entity = this.collectionRepository.create({
      name: input.name,
      description: input.description ?? null,
      clientId: input.clientId as ClientId,
    });

    const saved = await this.collectionRepository.save(entity);

    const full = await this.collectionRepository.findOne({
      where: { id: saved.id },
      relations: ['client', 'vinyls'],
    });

    return this.toModel(full!);
  }

  public async updateCollection(
    id: string,
    input: UpdateCollectionModel,
  ): Promise<CollectionModel | undefined> {
    const collection = await this.collectionRepository.findOne({
      where: { id: id as CollectionId },
    });

    if (!collection) {
      return undefined;
    }

    await this.collectionRepository.update(id, input);

    const updated = await this.collectionRepository.findOne({
      where: { id: id as CollectionId },
      relations: ['client', 'vinyls'],
    });

    return updated ? this.toModel(updated) : undefined;
  }

  public async deleteCollection(id: string): Promise<void> {
    await this.collectionRepository.delete(id);
  }

  public async addVinylToCollection(
    collectionId: string,
    vinylId: string,
  ): Promise<CollectionModel | undefined> {
    const collection = await this.collectionRepository.findOne({
      where: { id: collectionId as CollectionId },
      relations: ['client', 'vinyls'],
    });

    if (!collection) {
      return undefined;
    }

    const alreadyExists = collection.vinyls.some(
      (v) => v.id === (vinylId as VinylId),
    );

    if (!alreadyExists) {
      collection.vinyls.push({ id: vinylId as VinylId } as VinylEntity);
      await this.collectionRepository.save(collection);
    }

    const updated = await this.collectionRepository.findOne({
      where: { id: collectionId as CollectionId },
      relations: ['client', 'vinyls'],
    });

    return updated ? this.toModel(updated) : undefined;
  }

  public async removeVinylFromCollection(
    collectionId: string,
    vinylId: string,
  ): Promise<CollectionModel | undefined> {
    const collection = await this.collectionRepository.findOne({
      where: { id: collectionId as CollectionId },
      relations: ['client', 'vinyls'],
    });

    if (!collection) {
      return undefined;
    }

    collection.vinyls = collection.vinyls.filter(
      (v) => v.id !== (vinylId as VinylId),
    );
    await this.collectionRepository.save(collection);

    const updated = await this.collectionRepository.findOne({
      where: { id: collectionId as CollectionId },
      relations: ['client', 'vinyls'],
    });

    return updated ? this.toModel(updated) : undefined;
  }

  private toModel(entity: CollectionEntity): CollectionModel {
    const vinylsWithPhotos = entity.vinyls.filter((v) => v.photo);
    const randomPhoto =
      vinylsWithPhotos.length > 0
        ? vinylsWithPhotos[Math.floor(Math.random() * vinylsWithPhotos.length)]
            .photo
        : null;

    return {
      id: entity.id,
      name: entity.name,
      description: entity.description,
      clientId: entity.clientId,
      client: {
        firstName: entity.client.firstName,
        lastName: entity.client.lastName,
      },
      vinyls: entity.vinyls.map((v) => ({
        id: v.id,
        title: v.title,
        photo: v.photo,
      })),
      photo: randomPhoto,
    };
  }
}
