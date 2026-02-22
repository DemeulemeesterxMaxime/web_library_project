import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateVinylDto, GetVinylsDto, UpdateVinylDto } from './vinyl.dto';
import { CreateVinylModel, GetVinylsModel, VinylModel } from './vinyl.model';
import { VinylService } from './vinyl.service';
import { ArtistId } from '../artists/artist.entity';

@Controller('vinyls')
export class VinylController {
  constructor(private readonly vinylService: VinylService) {}

  @Get()
  async getVinyls(@Query() input: GetVinylsDto): Promise<GetVinylsModel> {
    const [property, direction] = input.sort
      ? input.sort.split(',')
      : ['title', 'ASC'];

    const [vinyls, totalCount] = await this.vinylService.getAllVinyls({
      ...input,
      sort: {
        [property]: direction,
      },
    });

    return {
      data: vinyls,
      totalCount,
    };
  }

  @Get(':id')
  public async getVinyl(
    @Param('id') id: string,
  ): Promise<VinylModel | undefined> {
    return this.vinylService.getVinylById(id);
  }

  @Post()
  public async createVinyl(
    @Body() createVinylDto: CreateVinylDto,
  ): Promise<VinylModel> {
    const vinylData: CreateVinylModel = {
      title: createVinylDto.title,
      artistId: createVinylDto.artistId as ArtistId,
      yearReleased: createVinylDto.yearReleased,
      photo: createVinylDto.photo,
    };

    return this.vinylService.createVinyl(vinylData);
  }

  @Patch(':id')
  public async updateVinyl(
    @Param('id') id: string,
    @Body() updateVinylDto: UpdateVinylDto,
  ): Promise<VinylModel | undefined> {
    const updateData: Partial<CreateVinylModel> = {
      ...updateVinylDto,
      artistId: updateVinylDto.artistId
        ? (updateVinylDto.artistId as ArtistId)
        : undefined,
    };

    return this.vinylService.updateVinyl(id, updateData);
  }

  @Delete(':id')
  public async deleteVinyl(@Param('id') id: string): Promise<void> {
    return this.vinylService.deleteVinyl(id);
  }
}
