import { useCallback, useState } from 'react'
import type { VinylModel } from '../VinylModel'
import httpClient from '../../api/httpClient'

type UseVinylDetailsProviderReturn = {
  isLoading: boolean
  vinyl: VinylModel | null
  loadVinyl: () => void
}

export function useVinylDetailsProvider(
  id: string,
): UseVinylDetailsProviderReturn {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [vinyl, setVinyl] = useState<VinylModel | null>(null)

  const loadVinyl = useCallback((): void => {
    setIsLoading(true)
    httpClient
      .get<VinylModel>(`/vinyls/${id}`)
      .then(response => {
        setVinyl(response.data)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [id])

  return { isLoading, vinyl, loadVinyl }
}
