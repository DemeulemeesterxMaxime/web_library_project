import { useCallback, useState } from 'react'
import type { ClientModel } from '../ClientModel'
import httpClient from '../../api/httpClient'

type UseSaleProviderReturn = {
  clients: ClientModel[]
  loadClients: () => void
  createSale: (clientId: string, vinylId: string, date: string) => void
}

export function useSaleProvider(): UseSaleProviderReturn {
  const [clients, setClients] = useState<ClientModel[]>([])

  const loadClients = useCallback((): void => {
    httpClient
      .get<ClientModel[]>('/clients')
      .then(response => {
        setClients(response.data)
      })
      .catch(() => undefined)
  }, [])

  const createSale = useCallback(
    (clientId: string, vinylId: string, date: string): void => {
      httpClient
        .post('/sales', { clientId, vinylId, date })
        .then(() => undefined)
        .catch(() => undefined)
    },
    [],
  )

  return { clients, loadClients, createSale }
}
