import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtistController } from './artist.controller';
import { ArtistEntity } from './artist.entity';
import { ArtistRepository } from './artist.repository';
import { ArtistService } from './artist.service';
import { VinylEntity } from '../vinyls/vinyl.entity';
import { SaleEntity } from '../sales/sale.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ArtistEntity, VinylEntity, SaleEntity])],
  controllers: [ArtistController],
  providers: [ArtistRepository, ArtistService],
})
export class ArtistModule {}
