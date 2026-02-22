import { Injectable } from '@nestjs/common';
import { ArtistModel, CreateArtistModel, UpdateArtistModel } from './artist.model';
import { ArtistEntity, ArtistId } from './artist.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ArtistRepository {
  constructor(
    @InjectRepository(ArtistEntity)
    private readonly artistRepository: Repository<ArtistEntity>,
  ) {}

  public async getAllArtists(): Promise<ArtistModel[]> {
    return this.artistRepository.find();
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
}
