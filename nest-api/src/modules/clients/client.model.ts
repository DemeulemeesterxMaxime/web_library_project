import { ClientId } from './client.entity';

export type ClientModel = {
  id: ClientId;
  firstName: string;
  lastName: string;
  email: string | null;
  photo: string | null;
};

export type ClientWithSalesCountModel = ClientModel & {
  salesCount: number;
};

export type CreateClientModel = {
  firstName: string;
  lastName: string;
  email?: string;
  photo?: string;
};

export type UpdateClientModel = Partial<CreateClientModel>;
