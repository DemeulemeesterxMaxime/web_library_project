import { IsInt, IsOptional, IsString, IsUUID, Max, Min } from 'class-validator';

export class CreateVinylDto {
  @IsString()
  title: string;

  @IsUUID(4)
  artistId: string;

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

  @IsUUID(4)
  @IsOptional()
  artistId?: string;

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
  @IsInt()
  @Min(1)
  @Max(100)
  limit: number;

  @IsInt()
  @Min(0)
  offset: number;

  @IsString()
  @IsOptional()
  sort?: string;
}
