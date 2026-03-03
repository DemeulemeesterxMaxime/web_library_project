import type { CollectionId } from './collection.entity';
import type { ClientId } from '../clients/client.entity';
import type { VinylId } from '../vinyls/vinyl.entity';

export type CollectionVinylModel = {
  id: VinylId;
  title: string;
  photo: string | null;
};

export type CollectionModel = {
  id: CollectionId;
  name: string;
  description: string | null;
  clientId: ClientId;
  client: {
    firstName: string;
    lastName: string;
  };
  vinyls: CollectionVinylModel[];
  photo: string | null;
};

export type CreateCollectionModel = {
  name: string;
  description?: string;
  clientId: string;
};

export type UpdateCollectionModel = {
  name?: string;
  description?: string;
};
