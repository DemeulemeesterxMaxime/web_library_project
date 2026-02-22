import { Injectable } from '@nestjs/common';
import { ArtistModel, CreateArtistModel, UpdateArtistModel } from './artist.model';
import { ArtistRepository } from './artist.repository';

@Injectable()
export class ArtistService {
  constructor(private readonly artistRepository: ArtistRepository) {}

  public async getAllArtists(): Promise<ArtistModel[]> {
    return this.artistRepository.getAllArtists();
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
}
