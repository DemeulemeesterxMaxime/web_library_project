import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CollectionController } from './collection.controller';
import { CollectionEntity } from './collection.entity';
import { CollectionRepository } from './collection.repository';
import { CollectionService } from './collection.service';
import { SaleModule } from '../sales/sale.module';

@Module({
  imports: [TypeOrmModule.forFeature([CollectionEntity]), SaleModule],
  controllers: [CollectionController],
  providers: [CollectionRepository, CollectionService],
  exports: [CollectionService],
})
export class CollectionModule {}
