import { IsInt, IsOptional, IsString, IsUUID, Max, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateVinylDto {
  @IsString()
  title: string;

  @IsUUID()
  artistId: string;

  @Type(() => Number)
  @IsInt()
  @Min(1900)
  @Max(2100)
  yearReleased: number;

  @IsString()
  @IsOptional()
  photo?: string;
}

export class UpdateVinylDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsUUID()
  @IsOptional()
  artistId?: string;

  @Type(() => Number)
  @IsInt()
  @Min(1900)
  @Max(2100)
  @IsOptional()
  yearReleased?: number;

  @IsString()
  @IsOptional()
  photo?: string;
}

export class GetVinylsDto {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  @IsOptional()
  limit?: number;

  @Type(() => Number)
  @IsInt()
  @Min(0)
  @IsOptional()
  offset?: number;

  @IsString()
  @IsOptional()
  sort?: string;
}
