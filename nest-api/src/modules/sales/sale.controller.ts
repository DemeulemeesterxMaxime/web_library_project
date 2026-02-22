import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { SaleService } from './sale.service';
import { CreateSaleDto, GetSalesDto } from './sale.dto';
import { CreateSaleModel, SaleWithDetailsModel } from './sale.model';
import { ClientId } from '../clients/client.entity';
import { VinylId } from '../vinyls/vinyl.entity';

@Controller('sales')
export class SaleController {
  constructor(private readonly saleService: SaleService) {}

  @Get()
  public async getSales(
    @Query() query: GetSalesDto,
  ): Promise<SaleWithDetailsModel[]> {
    return this.saleService.getSales(query.clientId, query.vinylId);
  }

  @Post()
  public async createSale(
    @Body() createSaleDto: CreateSaleDto,
  ): Promise<SaleWithDetailsModel> {
    const saleData: CreateSaleModel = {
      clientId: createSaleDto.clientId as ClientId,
      vinylId: createSaleDto.vinylId as VinylId,
      date: new Date(createSaleDto.date),
    };

    return this.saleService.createSale(saleData);
  }

  @Delete(':id')
  public async deleteSale(@Param('id') id: string): Promise<void> {
    return this.saleService.deleteSale(id);
  }
}
