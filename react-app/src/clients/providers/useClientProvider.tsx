import { useCallback, useEffect, useState } from 'react'
import type {
  ClientModel,
  CreateClientModel,
  UpdateClientModel,
} from '../ClientModel'
import httpClient from '../../api/httpClient'
import type { AxiosResponse } from 'axios'

type UseClientProviderReturn = {
  clients: ClientModel[]
  loadClients: () => void
  createClient: (client: CreateClientModel) => void
  updateClient: (id: string, input: UpdateClientModel) => void
  deleteClient: (id: string) => void
}

export function useClientProvider(): UseClientProviderReturn {
  const [clients, setClients] = useState<ClientModel[]>([])

  const loadClients = useCallback((): void => {
    httpClient
      .get<ClientModel[]>('/clients')
      .then((response: AxiosResponse<ClientModel[]>) => {
        setClients(response.data)
      })
      .catch(() => undefined)
  }, [])

  const createClient = useCallback(
    (client: CreateClientModel): void => {
      httpClient
        .post('/clients', client)
        .then(() => {
          loadClients()
        })
        .catch(() => undefined)
    },
    [loadClients],
  )

  const updateClient = useCallback(
    (id: string, input: UpdateClientModel): void => {
      httpClient
        .patch(`/clients/${id}`, input)
        .then(() => {
          loadClients()
        })
        .catch(() => undefined)
    },
    [loadClients],
  )

  const deleteClient = useCallback(
    (id: string): void => {
      httpClient
        .delete(`/clients/${id}`)
        .then(() => {
          loadClients()
        })
        .catch(() => undefined)
    },
    [loadClients],
  )

  useEffect(() => {
    loadClients()
  }, [loadClients])

  return { clients, loadClients, createClient, updateClient, deleteClient }
}
