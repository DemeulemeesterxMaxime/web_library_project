import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientController } from './client.controller';
import { ClientEntity } from './client.entity';
import { ClientRepository } from './client.repository';
import { ClientService } from './client.service';
import { SaleModule } from '../sales/sale.module';

@Module({
  imports: [TypeOrmModule.forFeature([ClientEntity]), SaleModule],
  controllers: [ClientController],
  providers: [ClientRepository, ClientService],
})
export class ClientModule {}
