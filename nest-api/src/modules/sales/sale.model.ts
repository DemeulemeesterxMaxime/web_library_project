import { SaleId } from './sale.entity';
import { ClientId } from '../clients/client.entity';
import { VinylId } from '../vinyls/vinyl.entity';

export type SaleModel = {
  id: SaleId;
  clientId: ClientId;
  vinylId: VinylId;
  date: Date;
};

export type SaleWithDetailsModel = {
  id: SaleId;
  clientId: ClientId;
  vinylId: VinylId;
  date: Date;
  client: {
    firstName: string;
    lastName: string;
  };
  vinyl: {
    title: string;
  };
};

export type CreateSaleModel = {
  clientId: ClientId;
  vinylId: VinylId;
  date: Date;
};
