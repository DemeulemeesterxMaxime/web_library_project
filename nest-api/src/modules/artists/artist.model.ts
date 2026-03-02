import { ArtistId } from './artist.entity';

export type ArtistModel = {
  id: ArtistId;
  firstName: string;
  lastName: string;
  photo: string | null;
};

export type CreateArtistModel = {
  firstName: string;
  lastName: string;
  photo?: string;
};

export type UpdateArtistModel = Partial<CreateArtistModel>;

export type ArtistWithVinylCountModel = ArtistModel & {
  vinylCount: number;
};

export type ArtistStatsModel = {
  artistId: ArtistId;
  totalVinyls: number;
  totalSales: number;
  averageSalesByVinyl: number;
};
