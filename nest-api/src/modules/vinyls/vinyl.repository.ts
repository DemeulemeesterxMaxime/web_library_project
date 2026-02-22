import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { ArtistEntity } from '../artists/artist.entity';
import {
  VinylModel,
  CreateVinylModel,
  FilterVinylsModel,
  UpdateVinylModel,
} from './vinyl.model';
import { VinylEntity, VinylId } from './vinyl.entity';

@Injectable()
export class VinylRepository {
  constructor(
    @InjectRepository(ArtistEntity)
    private readonly artistRepository: Repository<ArtistEntity>,
    @InjectRepository(VinylEntity)
    private readonly vinylRepository: Repository<VinylEntity>,
    private readonly dataSource: DataSource,
  ) {}

  public async getAllVinyls(
    input?: FilterVinylsModel,
  ): Promise<[VinylModel[], number]> {
    const [vinyls, totalCount] = await this.vinylRepository.findAndCount({
      take: input?.limit,
      skip: input?.offset,
      relations: { artist: true },
      order: input?.sort,
    });

    return [vinyls, totalCount];
  }

  public async getVinylById(id: string): Promise<VinylModel | undefined> {
    const vinyl = await this.vinylRepository.findOne({
      where: { id: id as VinylId },
    });

    if (!vinyl) {
      return undefined;
    }

    const artist = await this.artistRepository.findOne({
      where: { id: vinyl.artistId },
    });

    if (!artist) {
      return undefined;
    }

    return {
      ...vinyl,
      artist,
    };
  }

  public async createVinyl(vinyl: CreateVinylModel): Promise<VinylModel> {
    const artist = await this.artistRepository.findOne({
      where: { id: vinyl.artistId },
    });

    if (!artist) {
      throw new Error('Artist not found');
    }

    return this.vinylRepository.save(this.vinylRepository.create(vinyl));
  }

  public async updateVinyl(
    id: string,
    vinyl: UpdateVinylModel,
  ): Promise<VinylModel | undefined> {
    const oldVinyl = await this.vinylRepository.findOne({
      where: { id: id as VinylId },
    });

    if (!oldVinyl) {
      return undefined;
    }

    await this.vinylRepository.update(id, vinyl);

    const updatedVinyl = await this.getVinylById(id);
    return updatedVinyl;
  }

  public async deleteVinyl(id: string): Promise<void> {
    await this.vinylRepository.delete(id);
  }

  public async deleteVinyls(ids: string[]): Promise<void> {
    await this.dataSource.transaction(async (transactionalEntityManager) => {
      await Promise.all(
        ids.map((id) => transactionalEntityManager.delete(VinylEntity, { id })),
      );
    });
  }
}
