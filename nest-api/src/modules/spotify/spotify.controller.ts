import { Controller, Get, Query } from '@nestjs/common';
import { SpotifyService } from './spotify.service';
import { SearchAlbumDto } from './spotify.dto';
import { SpotifyAlbumResult } from './spotify.model';

@Controller('spotify')
export class SpotifyController {
  constructor(private readonly spotifyService: SpotifyService) {}

  @Get('search')
  public async searchAlbum(
    @Query() input: SearchAlbumDto,
  ): Promise<SpotifyAlbumResult[]> {
    return this.spotifyService.searchAlbum(input.query, input.artist);
  }
}
