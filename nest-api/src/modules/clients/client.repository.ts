import { Injectable } from '@nestjs/common';
import { ClientModel, CreateClientModel, UpdateClientModel } from './client.model';
import { ClientEntity, ClientId } from './client.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ClientRepository {
  constructor(
    @InjectRepository(ClientEntity)
    private readonly clientRepository: Repository<ClientEntity>,
  ) {}

  public async getAllClients(): Promise<ClientModel[]> {
    return this.clientRepository.find();
  }

  public async getClientById(id: string): Promise<ClientModel | undefined> {
    const client = await this.clientRepository.findOne({
      where: { id: id as ClientId },
    });

    if (!client) {
      return undefined;
    }

    return client;
  }

  public async createClient(client: CreateClientModel): Promise<ClientModel> {
    return this.clientRepository.save(this.clientRepository.create(client));
  }

  public async updateClient(
    id: string,
    client: UpdateClientModel,
  ): Promise<ClientModel | undefined> {
    const oldClient = await this.clientRepository.findOne({
      where: { id: id as ClientId },
    });

    if (!oldClient) {
      return undefined;
    }

    await this.clientRepository.update(id, client);

    const updatedClient = await this.clientRepository.findOne({
      where: { id: id as ClientId },
    });

    return updatedClient ?? undefined;
  }

  public async deleteClient(id: string): Promise<void> {
    await this.clientRepository.delete(id);
  }
}
