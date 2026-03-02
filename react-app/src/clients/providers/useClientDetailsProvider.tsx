import { useCallback, useState } from 'react'
import type { ClientModel, SaleModel } from '../ClientModel'
import httpClient from '../../api/httpClient'

type UseClientDetailsProviderReturn = {
  isLoading: boolean
  client: ClientModel | null
  sales: SaleModel[]
  loadClient: () => void
}

export function useClientDetailsProvider(
  id: string,
): UseClientDetailsProviderReturn {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [client, setClient] = useState<ClientModel | null>(null)
  const [sales, setSales] = useState<SaleModel[]>([])

  const loadClient = useCallback((): void => {
    setIsLoading(true)
    Promise.all([
      httpClient.get<ClientModel>(`/clients/${id}`),
      httpClient.get<SaleModel[]>('/sales', { params: { clientId: id } }),
    ])
      .then(([clientResponse, salesResponse]) => {
        setClient(clientResponse.data)
        setSales(salesResponse.data)
      })
      .catch(() => {
        setClient(null)
        setSales([])
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [id])

  return { isLoading, client, sales, loadClient }
}
