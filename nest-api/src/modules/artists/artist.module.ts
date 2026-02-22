import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtistController } from './artist.controller';
import { ArtistEntity } from './artist.entity';
import { ArtistRepository } from './artist.repository';
import { ArtistService } from './artist.service';

@Module({
  imports: [TypeOrmModule.forFeature([ArtistEntity])],
  controllers: [ArtistController],
  providers: [ArtistRepository, ArtistService],
})
export class ArtistModule {}
