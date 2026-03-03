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
import { CollectionService } from './collection.service';
import {
  AddVinylToCollectionDto,
  CreateCollectionDto,
  UpdateCollectionDto,
} from './collection.dto';
import type { CollectionModel } from './collection.model';

@Controller('collections')
export class CollectionController {
  constructor(private readonly collectionService: CollectionService) {}

  @Get()
  public async getAllCollections(
    @Query('clientId') clientId?: string,
  ): Promise<CollectionModel[]> {
    if (clientId) {
      return this.collectionService.getCollectionsByClientId(clientId);
    }

    return this.collectionService.getAllCollections();
  }

  @Get(':id')
  public async getCollectionById(
    @Param('id') id: string,
  ): Promise<CollectionModel | undefined> {
    return this.collectionService.getCollectionById(id);
  }

  @Post()
  public async createCollection(
    @Body() createCollectionDto: CreateCollectionDto,
  ): Promise<CollectionModel> {
    return this.collectionService.createCollection(createCollectionDto);
  }

  @Patch(':id')
  public async updateCollection(
    @Param('id') id: string,
    @Body() updateCollectionDto: UpdateCollectionDto,
  ): Promise<CollectionModel | undefined> {
    return this.collectionService.updateCollection(id, updateCollectionDto);
  }

  @Delete(':id')
  public async deleteCollection(@Param('id') id: string): Promise<void> {
    return this.collectionService.deleteCollection(id);
  }

  @Post(':id/vinyls')
  public async addVinylToCollection(
    @Param('id') id: string,
    @Body() addVinylDto: AddVinylToCollectionDto,
  ): Promise<CollectionModel | undefined> {
    return this.collectionService.addVinylToCollection(id, addVinylDto.vinylId);
  }

  @Delete(':id/vinyls/:vinylId')
  public async removeVinylFromCollection(
    @Param('id') id: string,
    @Param('vinylId') vinylId: string,
  ): Promise<CollectionModel | undefined> {
    return this.collectionService.removeVinylFromCollection(id, vinylId);
  }
}
