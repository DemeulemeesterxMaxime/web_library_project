import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ClientEntity, type ClientId } from '../clients/client.entity';
import { VinylEntity, type VinylId } from '../vinyls/vinyl.entity';

export type SaleId = string & { __brand: 'Sale' };

@Entity('sales')
export class SaleEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: SaleId;

  @Column({ name: 'client_id', type: 'uuid' })
  clientId: ClientId;

  @Column({ name: 'vinyl_id', type: 'uuid' })
  vinylId: VinylId;

  @Column({ name: 'date', type: 'datetime' })
  date: Date;

  @ManyToOne(() => ClientEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'client_id' })
  client: ClientEntity;

  @ManyToOne(() => VinylEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'vinyl_id' })
  vinyl: VinylEntity;
}
