import { useCallback, useState } from 'react'
import type { AxiosResponse } from 'axios'
import type { VinylModel, UpdateVinylModel } from '../VinylModel'
import type { SaleModel } from '../../clients/ClientModel'
import httpClient from '../../api/httpClient'

type UseVinylDetailsProviderReturn = {
  isLoading: boolean
  vinyl: VinylModel | null
  sales: SaleModel[]
  loadVinyl: () => void
  updateVinyl: (data: UpdateVinylModel) => Promise<void>
}

export function useVinylDetailsProvider(
  id: string,
): UseVinylDetailsProviderReturn {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [vinyl, setVinyl] = useState<VinylModel | null>(null)
  const [sales, setSales] = useState<SaleModel[]>([])

  const loadVinyl = useCallback((): void => {
    setIsLoading(true)
    Promise.all([
      httpClient.get<VinylModel>(`/vinyls/${id}`),
      httpClient.get<SaleModel[]>('/sales', { params: { vinylId: id } }),
    ])
      .then(
        ([vinylResponse, salesResponse]: [
          AxiosResponse<VinylModel>,
          AxiosResponse<SaleModel[]>,
        ]) => {
          setVinyl(vinylResponse.data)
          setSales(salesResponse.data)
        },
      )
      .catch(() => {
        setVinyl(null)
        setSales([])
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [id])

  const updateVinyl = useCallback(
    async (data: UpdateVinylModel): Promise<void> => {
      await httpClient.patch(`/vinyls/${id}`, data)
      loadVinyl()
    },
    [id, loadVinyl],
  )

  return { isLoading, vinyl, sales, loadVinyl, updateVinyl }
}
