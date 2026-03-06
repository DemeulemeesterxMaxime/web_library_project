import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ClientEntity, type ClientId } from '../clients/client.entity';
import { VinylEntity } from '../vinyls/vinyl.entity';

export type CollectionId = string & { __brand: 'Collection' };

@Entity('collections')
export class CollectionEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: CollectionId;

  @Column({ name: 'name', type: 'varchar' })
  name: string;

  @Column({ nullable: true, type: 'varchar' })
  description: string | null;

  @Column({ name: 'is_public', type: 'boolean', default: false })
  isPublic: boolean;

  @Column({ name: 'client_id', type: 'uuid' })
  clientId: ClientId;

  @ManyToOne(() => ClientEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'client_id' })
  client: ClientEntity;

  @ManyToMany(() => VinylEntity, { eager: true })
  @JoinTable({
    name: 'collection_vinyls',
    joinColumn: { name: 'collection_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'vinyl_id', referencedColumnName: 'id' },
  })
  vinyls: VinylEntity[];
}
