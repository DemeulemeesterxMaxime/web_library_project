import { IsDateString, IsOptional, IsUUID } from 'class-validator';

export class CreateSaleDto {
  @IsUUID(4)
  clientId: string;

  @IsUUID(4)
  vinylId: string;

  @IsDateString()
  date: string;
}

export class GetSalesDto {
  @IsUUID(4)
  @IsOptional()
  clientId?: string;

  @IsUUID(4)
  @IsOptional()
  vinylId?: string;
}
