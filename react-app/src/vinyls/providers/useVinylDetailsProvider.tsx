import { useState } from 'react'
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

  function loadVinyl(): void {
    setIsLoading(true)
    httpClient
      .get<VinylModel>(`/vinyls/${id}`)
      .then(response => {
        setVinyl(response.data)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  return { isLoading, vinyl, loadVinyl }
}
