import { Injectable } from '@nestjs/common';
import { ClientModel, CreateClientModel, UpdateClientModel } from './client.model';
import { ClientRepository } from './client.repository';

@Injectable()
export class ClientService {
  constructor(private readonly clientRepository: ClientRepository) {}

  public async getAllClients(): Promise<ClientModel[]> {
    return this.clientRepository.getAllClients();
  }

  public async getClientById(id: string): Promise<ClientModel | undefined> {
    return this.clientRepository.getClientById(id);
  }

  public async createClient(client: CreateClientModel): Promise<ClientModel> {
    return this.clientRepository.createClient(client);
  }

  public async updateClient(
    id: string,
    client: UpdateClientModel,
  ): Promise<ClientModel | undefined> {
    const oldClient = await this.getClientById(id);
    if (!oldClient) {
      return undefined;
    }

    return this.clientRepository.updateClient(id, client);
  }

  public async deleteClient(id: string): Promise<void> {
    await this.clientRepository.deleteClient(id);
  }
}
