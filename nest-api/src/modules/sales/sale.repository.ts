import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SaleEntity } from './sale.entity';
import { CreateSaleModel, SaleWithDetailsModel } from './sale.model';
import { ClientId } from '../clients/client.entity';
import { VinylId } from '../vinyls/vinyl.entity';

@Injectable()
export class SaleRepository {
  constructor(
    @InjectRepository(SaleEntity)
    private readonly saleRepository: Repository<SaleEntity>,
  ) {}

  public async getSalesByClientId(
    clientId: string,
  ): Promise<SaleWithDetailsModel[]> {
    return this.saleRepository.find({
      where: { clientId: clientId as ClientId },
      relations: { client: true, vinyl: { artist: true } },
    });
  }

  public async getSalesByVinylId(
    vinylId: string,
  ): Promise<SaleWithDetailsModel[]> {
    return this.saleRepository.find({
      where: { vinylId: vinylId as VinylId },
      relations: { client: true, vinyl: { artist: true } },
    });
  }

  public async getAllSales(): Promise<SaleWithDetailsModel[]> {
    return this.saleRepository.find({
      relations: { client: true, vinyl: { artist: true } },
    });
  }

  public async createSale(
    sale: CreateSaleModel,
  ): Promise<SaleWithDetailsModel> {
    const created = await this.saleRepository.save(
      this.saleRepository.create(sale),
    );

    const saleWithDetails = await this.saleRepository.findOne({
      where: { id: created.id },
      relations: { client: true, vinyl: { artist: true } },
    });

    if (!saleWithDetails) {
      throw new Error('Sale not found after creation');
    }

    return saleWithDetails;
  }

  public async deleteSale(id: string): Promise<void> {
    await this.saleRepository.delete(id);
  }

  public async countSalesByVinylId(vinylId: string): Promise<number> {
    return this.saleRepository.count({
      where: { vinylId: vinylId as VinylId },
    });
  }

  public async countSalesByClientId(clientId: string): Promise<number> {
    return this.saleRepository.count({
      where: { clientId: clientId as ClientId },
    });
  }
}
