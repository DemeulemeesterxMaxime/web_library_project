import { Module } from '@nestjs/common';
import { VinylController } from './vinyl.controller';
import { VinylService } from './vinyl.service';
import { VinylRepository } from './vinyl.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VinylEntity } from './vinyl.entity';
import { ArtistEntity } from '../artists/artist.entity';
import { SaleModule } from '../sales/sale.module';

@Module({
  imports: [TypeOrmModule.forFeature([VinylEntity, ArtistEntity]), SaleModule],
  controllers: [VinylController],
  providers: [VinylRepository, VinylService],
})
export class VinylModule {}
