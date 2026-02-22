import { Injectable } from '@nestjs/common';
import {
  VinylModel,
  CreateVinylModel,
  FilterVinylsModel,
  UpdateVinylModel,
  VinylWithSalesCountModel,
} from './vinyl.model';
import { VinylRepository } from './vinyl.repository';
import { SaleService } from '../sales/sale.service';

@Injectable()
export class VinylService {
  constructor(
    private readonly vinylRepository: VinylRepository,
    private readonly saleService: SaleService,
  ) {}

  public async getAllVinyls(
    input?: FilterVinylsModel,
  ): Promise<[VinylWithSalesCountModel[], number]> {
    const [vinyls, totalCount] = await this.vinylRepository.getAllVinyls(input);

    const vinylsWithSalesCount = await Promise.all(
      vinyls.map(async (vinyl) => {
        const salesCount = await this.saleService.countSalesByVinylId(vinyl.id);

        return {
          ...vinyl,
          salesCount,
        };
      }),
    );

    return [vinylsWithSalesCount, totalCount];
  }

  public async getVinylById(id: string): Promise<VinylModel | undefined> {
    return this.vinylRepository.getVinylById(id);
  }

  public async createVinyl(vinyl: CreateVinylModel): Promise<VinylModel> {
    return this.vinylRepository.createVinyl(vinyl);
  }

  public async updateVinyl(
    id: string,
    vinyl: UpdateVinylModel,
  ): Promise<VinylModel | undefined> {
    const oldVinyl = await this.getVinylById(id);
    if (!oldVinyl) {
      return undefined;
    }

    return this.vinylRepository.updateVinyl(id, vinyl);
  }

  public async deleteVinyl(id: string): Promise<void> {
    await this.vinylRepository.deleteVinyl(id);
  }
}
