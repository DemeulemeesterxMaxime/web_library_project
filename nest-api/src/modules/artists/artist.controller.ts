import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ArtistService } from './artist.service';
import { CreateArtistDto, UpdateArtistDto } from './artist.dto';
import { ArtistModel } from './artist.model';

@Controller('artists')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Get()
  public async getAllArtists(): Promise<ArtistModel[]> {
    return this.artistService.getAllArtists();
  }

  @Get(':id')
  public async getArtistById(
    @Param('id') id: string,
  ): Promise<ArtistModel | undefined> {
    return this.artistService.getArtistById(id);
  }

  @Post()
  public async createArtist(
    @Body() createArtistDto: CreateArtistDto,
  ): Promise<ArtistModel> {
    return this.artistService.createArtist(createArtistDto);
  }

  @Patch(':id')
  public async updateArtist(
    @Param('id') id: string,
    @Body() updateArtistDto: UpdateArtistDto,
  ): Promise<ArtistModel | undefined> {
    return this.artistService.updateArtist(id, updateArtistDto);
  }

  @Delete(':id')
  public async deleteArtist(@Param('id') id: string): Promise<void> {
    return this.artistService.deleteArtist(id);
  }
}
