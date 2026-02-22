import { IsOptional, IsString } from 'class-validator';

export class CreateArtistDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  @IsOptional()
  photo?: string;
}

export class UpdateArtistDto {
  @IsString()
  @IsOptional()
  firstName?: string;

  @IsString()
  @IsOptional()
  lastName?: string;

  @IsString()
  @IsOptional()
  photo?: string;
}
