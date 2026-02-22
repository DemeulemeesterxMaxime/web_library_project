import { ArtistId } from '../artists/artist.entity';
import { VinylId } from './vinyl.entity';

export type VinylArtistModel = {
  firstName: string;
  lastName: string;
};

export type VinylModel = {
  id: VinylId;
  title: string;
  artist: VinylArtistModel;
  yearReleased: number;
  photo: string | null;
};

export type VinylWithSalesCountModel = VinylModel & {
  salesCount: number;
};

export type CreateVinylModel = {
  title: string;
  artistId: ArtistId;
  yearReleased: number;
  photo?: string;
};

export type UpdateVinylModel = Partial<CreateVinylModel>;

export type FilterVinylsModel = {
  limit: number;
  offset: number;
  sort?: Partial<Record<keyof VinylModel, 'ASC' | 'DESC'>>;
};

export type GetVinylsModel = {
  totalCount: number;
  data: VinylWithSalesCountModel[];
};
