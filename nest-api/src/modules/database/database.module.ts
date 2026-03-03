import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtistEntity } from '../artists/artist.entity';
import { VinylEntity } from '../vinyls/vinyl.entity';
import { ClientEntity } from '../clients/client.entity';
import { SaleEntity } from '../sales/sale.entity';
import { CollectionEntity } from '../collections/collection.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db',
      entities: [
        ArtistEntity,
        VinylEntity,
        ClientEntity,
        SaleEntity,
        CollectionEntity,
      ],
      synchronize: true,
    }),
  ],
})
export class DatabaseModule {}
