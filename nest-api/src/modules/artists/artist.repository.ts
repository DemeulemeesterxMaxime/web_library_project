import { Injectable } from '@nestjs/common';
import {
  ArtistModel,
  ArtistStatsModel,
  CreateArtistModel,
  UpdateArtistModel,
} from './artist.model';
import { ArtistEntity, ArtistId } from './artist.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VinylEntity } from '../vinyls/vinyl.entity';
import { SaleEntity } from '../sales/sale.entity';

@Injectable()
export class ArtistRepository {
  constructor(
    @InjectRepository(ArtistEntity)
    private readonly artistRepository: Repository<ArtistEntity>,
    @InjectRepository(VinylEntity)
    private readonly vinylRepository: Repository<VinylEntity>,
    @InjectRepository(SaleEntity)
    private readonly saleRepository: Repository<SaleEntity>,
  ) {}

  public async getAllArtists(): Promise<ArtistModel[]> {
    return this.artistRepository.find();
  }

  public async countVinylsByArtistId(artistId: string): Promise<number> {
    return this.vinylRepository.count({
      where: { artistId: artistId as ArtistId },
    });
  }

  public async getArtistById(id: string): Promise<ArtistModel | undefined> {
    const artist = await this.artistRepository.findOne({
      where: { id: id as ArtistId },
    });

    if (!artist) {
      return undefined;
    }

    return artist;
  }

  public async createArtist(artist: CreateArtistModel): Promise<ArtistModel> {
    return this.artistRepository.save(this.artistRepository.create(artist));
  }

  public async updateArtist(
    id: string,
    artist: UpdateArtistModel,
  ): Promise<ArtistModel | undefined> {
    const oldArtist = await this.artistRepository.findOne({
      where: { id: id as ArtistId },
    });

    if (!oldArtist) {
      return undefined;
    }

    await this.artistRepository.update(id, artist);

    const updatedArtist = await this.artistRepository.findOne({
      where: { id: id as ArtistId },
    });

    return updatedArtist ?? undefined;
  }

  public async deleteArtist(id: string): Promise<void> {
    await this.artistRepository.delete(id);
  }

  public async getArtistStats(
    id: string,
  ): Promise<ArtistStatsModel | undefined> {
    const artist = await this.artistRepository.findOne({
      where: { id: id as ArtistId },
    });

    if (!artist) {
      return undefined;
    }

    const totalVinyls = await this.vinylRepository.count({
      where: { artistId: id as ArtistId },
    });

    if (totalVinyls === 0) {
      return {
        artistId: id as ArtistId,
        totalVinyls: 0,
        totalSales: 0,
        averageSalesByVinyl: 0,
      };
    }

    const salesCountResult = await this.saleRepository
      .createQueryBuilder('sale')
      .innerJoin(VinylEntity, 'vinyl', 'vinyl.id = sale.vinyl_id')
      .where('vinyl.artist_id = :artistId', { artistId: id })
      .select('COUNT(sale.id)', 'totalSales')
      .getRawOne<{ totalSales: string }>();

    const totalSales = Number(salesCountResult?.totalSales ?? '0');

    return {
      artistId: id as ArtistId,
      totalVinyls,
      totalSales,
      averageSalesByVinyl: totalSales / totalVinyls,
    };
  }
}
