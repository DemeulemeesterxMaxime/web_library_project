import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VinylModule } from './modules/vinyls/vinyl.module';
import { DatabaseModule } from './modules/database/database.module';
import { ArtistModule } from './modules/artists/artist.module';
import { ClientModule } from './modules/clients/client.module';
import { SaleModule } from './modules/sales/sale.module';
import { SpotifyModule } from './modules/spotify/spotify.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    ArtistModule,
    VinylModule,
    ClientModule,
    SaleModule,
    SpotifyModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
