import { Injectable } from '@nestjs/common';
import {
  VinylModel,
  CreateVinylModel,
  FilterVinylsModel,
  UpdateVinylModel,
} from './vinyl.model';
import { VinylRepository } from './vinyl.repository';

@Injectable()
export class VinylService {
  constructor(private readonly vinylRepository: VinylRepository) {}

  public async getAllVinyls(
    input?: FilterVinylsModel,
  ): Promise<[VinylModel[], number]> {
    return this.vinylRepository.getAllVinyls(input);
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
