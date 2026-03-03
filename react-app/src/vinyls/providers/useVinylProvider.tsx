import { useCallback, useEffect, useState } from 'react'
import type {
  CreateVinylModel,
  UpdateVinylModel,
  VinylModel,
} from '../VinylModel'
import httpClient from '../../api/httpClient'
import type { AxiosResponse } from 'axios'

type UseVinylProviderReturn = {
  vinyls: VinylModel[]
  loadVinyls: () => void
  createVinyl: (vinyl: CreateVinylModel) => void
  updateVinyl: (id: string, input: UpdateVinylModel) => void
  deleteVinyl: (id: string) => void
}

export function useVinylProvider(): UseVinylProviderReturn {
  const [vinyls, setVinyls] = useState<VinylModel[]>([])

  const loadVinyls = useCallback((): void => {
    httpClient
      .get<{ data: VinylModel[] }>('/vinyls')
      .then((response: AxiosResponse<{ data: VinylModel[] }>) => {
        setVinyls(response.data.data)
      })
      .catch(() => undefined)
  }, [])

  const createVinyl = useCallback(
    (vinyl: CreateVinylModel): void => {
      httpClient
        .post('/vinyls', vinyl)
        .then(() => {
          loadVinyls()
        })
        .catch(() => undefined)
    },
    [loadVinyls],
  )

  const updateVinyl = useCallback(
    (id: string, input: UpdateVinylModel): void => {
      httpClient
        .patch(`/vinyls/${id}`, input)
        .then(() => {
          loadVinyls()
        })
        .catch(() => undefined)
    },
    [loadVinyls],
  )

  const deleteVinyl = useCallback(
    (id: string): void => {
      httpClient
        .delete(`/vinyls/${id}`)
        .then(() => {
          loadVinyls()
        })
        .catch(() => undefined)
    },
    [loadVinyls],
  )

  useEffect(() => {
    loadVinyls()
  }, [loadVinyls])

  return { vinyls, loadVinyls, createVinyl, updateVinyl, deleteVinyl }
}
