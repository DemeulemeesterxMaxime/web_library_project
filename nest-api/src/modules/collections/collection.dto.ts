import { IsBoolean, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateCollectionDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsUUID()
  clientId: string;

  @IsBoolean()
  @IsOptional()
  isPublic?: boolean;
}

export class UpdateCollectionDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsBoolean()
  @IsOptional()
  isPublic?: boolean;
}

export class AddVinylToCollectionDto {
  @IsUUID()
  vinylId: string;
}
