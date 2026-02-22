import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export type ArtistId = string & { __brand: 'Artist' };

@Entity('artists')
export class ArtistEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: ArtistId;

  @Column({ name: 'first_name', type: 'varchar' })
  firstName: string;

  @Column({ name: 'last_name', type: 'varchar' })
  lastName: string;

  @Column({ nullable: true, type: 'varchar' })
  photo: string | null;
}
