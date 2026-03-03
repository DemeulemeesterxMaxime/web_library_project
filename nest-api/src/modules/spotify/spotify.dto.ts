import { IsOptional, IsString } from 'class-validator';

export class SearchAlbumDto {
  @IsString()
  query: string;

  @IsString()
  @IsOptional()
  artist?: string;
}
