import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ClientService } from './client.service';
import { CreateClientDto, UpdateClientDto } from './client.dto';
import { ClientModel } from './client.model';

@Controller('clients')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Get()
  public async getAllClients(): Promise<ClientModel[]> {
    return this.clientService.getAllClients();
  }

  @Get(':id')
  public async getClientById(
    @Param('id') id: string,
  ): Promise<ClientModel | undefined> {
    return this.clientService.getClientById(id);
  }

  @Post()
  public async createClient(
    @Body() createClientDto: CreateClientDto,
  ): Promise<ClientModel> {
    return this.clientService.createClient(createClientDto);
  }

  @Patch(':id')
  public async updateClient(
    @Param('id') id: string,
    @Body() updateClientDto: UpdateClientDto,
  ): Promise<ClientModel | undefined> {
    return this.clientService.updateClient(id, updateClientDto);
  }

  @Delete(':id')
  public async deleteClient(@Param('id') id: string): Promise<void> {
    return this.clientService.deleteClient(id);
  }
}
