import { Injectable } from '@nestjs/common';
import {
  ArtistModel,
  ArtistStatsModel,
  ArtistWithVinylCountModel,
  CreateArtistModel,
  UpdateArtistModel,
} from './artist.model';
import { ArtistRepository } from './artist.repository';

@Injectable()
export class ArtistService {
  constructor(private readonly artistRepository: ArtistRepository) {}

  public async getAllArtists(): Promise<ArtistWithVinylCountModel[]> {
    const artists = await this.artistRepository.getAllArtists();
    const artistsWithCount = await Promise.all(
      artists.map(async (artist) => {
        const vinylCount = await this.artistRepository.countVinylsByArtistId(
          artist.id,
        );
        return { ...artist, vinylCount };
      }),
    );
    return artistsWithCount;
  }

  public async getArtistById(id: string): Promise<ArtistModel | undefined> {
    return this.artistRepository.getArtistById(id);
  }

  public async createArtist(artist: CreateArtistModel): Promise<ArtistModel> {
    return this.artistRepository.createArtist(artist);
  }

  public async updateArtist(
    id: string,
    artist: UpdateArtistModel,
  ): Promise<ArtistModel | undefined> {
    const oldArtist = await this.getArtistById(id);
    if (!oldArtist) {
      return undefined;
    }

    return this.artistRepository.updateArtist(id, artist);
  }

  public async deleteArtist(id: string): Promise<void> {
    await this.artistRepository.deleteArtist(id);
  }

  public async getArtistStats(
    id: string,
  ): Promise<ArtistStatsModel | undefined> {
    return this.artistRepository.getArtistStats(id);
  }
}
