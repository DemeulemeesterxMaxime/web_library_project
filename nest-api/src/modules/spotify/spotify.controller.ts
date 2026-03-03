import { Controller, Get, Query } from '@nestjs/common';
import { SpotifyService } from './spotify.service';
import { SearchAlbumDto, SearchArtistDto } from './spotify.dto';
import { SpotifyAlbumResult, SpotifyArtistResult } from './spotify.model';

@Controller('spotify')
export class SpotifyController {
  constructor(private readonly spotifyService: SpotifyService) {}

  @Get('search')
  public async searchAlbum(
    @Query() input: SearchAlbumDto,
  ): Promise<SpotifyAlbumResult[]> {
    return this.spotifyService.searchAlbum(input.query, input.artist);
  }

  @Get('search-artist')
  public async searchArtist(
    @Query() input: SearchArtistDto,
  ): Promise<SpotifyArtistResult[]> {
    return this.spotifyService.searchArtist(input.query);
  }
}
