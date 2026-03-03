import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { SpotifyAlbumResult } from './spotify.model';

interface SpotifyTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

interface SpotifyImage {
  url: string;
  height: number;
  width: number;
}

interface SpotifyArtist {
  name: string;
}

interface SpotifyAlbumItem {
  id: string;
  name: string;
  images: SpotifyImage[];
  release_date: string;
  total_tracks: number;
  artists: SpotifyArtist[];
}

interface SpotifySearchResponse {
  albums: {
    items: SpotifyAlbumItem[];
  };
}

@Injectable()
export class SpotifyService {
  private accessToken: string | null = null;
  private tokenExpiresAt: number = 0;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  private async getAccessToken(): Promise<string> {
    const now = Date.now();

    if (this.accessToken && now < this.tokenExpiresAt) {
      return this.accessToken;
    }

    const clientId = this.configService.get<string>('SPOTIFY_CLIENT_ID');
    const clientSecret =
      this.configService.get<string>('SPOTIFY_CLIENT_SECRET');

    const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString(
      'base64',
    );

    const response = await firstValueFrom(
      this.httpService.post<SpotifyTokenResponse>(
        'https://accounts.spotify.com/api/token',
        'grant_type=client_credentials',
        {
          headers: {
            Authorization: `Basic ${credentials}`,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      ),
    );

    this.accessToken = response.data.access_token;
    this.tokenExpiresAt = now + response.data.expires_in * 1000 - 60000;

    return this.accessToken;
  }

  public async searchAlbum(
    query: string,
    artistName?: string,
  ): Promise<SpotifyAlbumResult[]> {
    const token = await this.getAccessToken();

    let searchQuery = `album:${query}`;
    if (artistName) {
      searchQuery += ` artist:${artistName}`;
    }

    const response = await firstValueFrom(
      this.httpService.get<SpotifySearchResponse>(
        'https://api.spotify.com/v1/search',
        {
          params: {
            q: searchQuery,
            type: 'album',
            limit: 5,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      ),
    );

    return response.data.albums.items.map(
      (item: SpotifyAlbumItem): SpotifyAlbumResult => {
        const photo =
          item.images.length > 0
            ? item.images[0].url
            : '';
        const year = parseInt(item.release_date.substring(0, 4), 10);

        return {
          spotifyId: item.id,
          name: item.name,
          photo,
          yearReleased: isNaN(year) ? 0 : year,
          totalTracks: item.total_tracks,
          artistName:
            item.artists.length > 0 ? item.artists[0].name : 'Unknown',
        };
      },
    );
  }
}
