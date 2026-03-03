import { Test, TestingModule } from '@nestjs/testing';
import { ClientController } from './client.controller';
import { ClientService } from './client.service';
import { ClientModel, ClientWithSalesCountModel } from './client.model';
import { ClientId } from './client.entity';

describe('ClientController', () => {
  let controller: ClientController;
  let service: ClientService;

  const mockClient: ClientModel = {
    id: 'client-uuid-1' as ClientId,
    firstName: 'Alice',
    lastName: 'Dupont',
    email: 'alice@example.com',
    photo: null,
  };

  const mockClientWithSales: ClientWithSalesCountModel = {
    ...mockClient,
    salesCount: 2,
  };

  const mockClientService: Partial<ClientService> = {
    getAllClients: jest.fn().mockResolvedValue([mockClientWithSales]),
    getClientById: jest.fn().mockResolvedValue(mockClient),
    createClient: jest.fn().mockResolvedValue(mockClient),
    updateClient: jest.fn().mockResolvedValue(mockClient),
    deleteClient: jest.fn().mockResolvedValue(undefined),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClientController],
      providers: [
        {
          provide: ClientService,
          useValue: mockClientService,
        },
      ],
    }).compile();

    controller = module.get<ClientController>(ClientController);
    service = module.get<ClientService>(ClientService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAllClients', () => {
    it('should return a list of clients with sales count', async () => {
      const result = await controller.getAllClients();

      expect(result).toEqual([mockClientWithSales]);
      expect(service.getAllClients).toHaveBeenCalled();
    });
  });

  describe('getClientById', () => {
    it('should return a single client by id', async () => {
      const result = await controller.getClientById('client-uuid-1');

      expect(result).toEqual(mockClient);
      expect(service.getClientById).toHaveBeenCalledWith('client-uuid-1');
    });
  });

  describe('createClient', () => {
    it('should create and return a new client', async () => {
      const createDto = {
        firstName: 'Alice',
        lastName: 'Dupont',
        email: 'alice@example.com',
      };

      const result = await controller.createClient(createDto);

      expect(result).toEqual(mockClient);
      expect(service.createClient).toHaveBeenCalledWith(createDto);
    });
  });

  describe('updateClient', () => {
    it('should update and return the client', async () => {
      const updateDto = { firstName: 'Bob' };

      const result = await controller.updateClient('client-uuid-1', updateDto);

      expect(result).toEqual(mockClient);
      expect(service.updateClient).toHaveBeenCalledWith('client-uuid-1', updateDto);
    });
  });

  describe('deleteClient', () => {
    it('should delete the client', async () => {
      await controller.deleteClient('client-uuid-1');

      expect(service.deleteClient).toHaveBeenCalledWith('client-uuid-1');
    });
  });
});
