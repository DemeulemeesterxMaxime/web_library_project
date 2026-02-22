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
