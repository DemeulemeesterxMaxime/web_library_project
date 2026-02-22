import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SaleController } from './sale.controller';
import { SaleEntity } from './sale.entity';
import { SaleRepository } from './sale.repository';
import { SaleService } from './sale.service';

@Module({
  imports: [TypeOrmModule.forFeature([SaleEntity])],
  controllers: [SaleController],
  providers: [SaleRepository, SaleService],
  exports: [SaleService],
})
export class SaleModule {}
