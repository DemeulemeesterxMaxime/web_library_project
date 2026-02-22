import { Injectable } from '@nestjs/common';
import { SaleRepository } from './sale.repository';
import { CreateSaleModel, SaleWithDetailsModel } from './sale.model';

@Injectable()
export class SaleService {
  constructor(private readonly saleRepository: SaleRepository) {}

  public async getSales(
    clientId?: string,
    vinylId?: string,
  ): Promise<SaleWithDetailsModel[]> {
    if (clientId) {
      return this.saleRepository.getSalesByClientId(clientId);
    }

    if (vinylId) {
      return this.saleRepository.getSalesByVinylId(vinylId);
    }

    return this.saleRepository.getAllSales();
  }

  public async createSale(
    sale: CreateSaleModel,
  ): Promise<SaleWithDetailsModel> {
    return this.saleRepository.createSale(sale);
  }

  public async deleteSale(id: string): Promise<void> {
    await this.saleRepository.deleteSale(id);
  }

  public async countSalesByVinylId(vinylId: string): Promise<number> {
    return this.saleRepository.countSalesByVinylId(vinylId);
  }

  public async countSalesByClientId(clientId: string): Promise<number> {
    return this.saleRepository.countSalesByClientId(clientId);
  }
}
