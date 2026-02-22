import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ArtistEntity, type ArtistId } from '../artists/artist.entity';

export type VinylId = string & { __brand: 'Vinyl' };

@Entity('vinyls')
export class VinylEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: VinylId;

  @Column({ name: 'title', type: 'varchar' })
  title: string;

  @Column({ name: 'year_released', type: 'int' })
  yearReleased: number;

  @Column({ name: 'artist_id', type: 'uuid' })
  artistId: ArtistId;

  @Column({ nullable: true, type: 'varchar' })
  photo: string | null;

  @ManyToOne(() => ArtistEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'artist_id' })
  artist: ArtistEntity;
}
