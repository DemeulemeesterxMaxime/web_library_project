import { useState } from 'react'
import type { VinylModel, CreateVinylModel, UpdateVinylModel } from '../VinylModel'
import httpClient from '../../api/httpClient'

type UseVinylProviderReturn = {
  vinyls: VinylModel[]
  loadVinyls: () => void
  createVinyl: (vinyl: CreateVinylModel) => void
  updateVinyl: (id: string, input: UpdateVinylModel) => void
  deleteVinyl: (id: string) => void
}

export function useVinylProvider(): UseVinylProviderReturn {
  const [vinyls, setVinyls] = useState<VinylModel[]>([])

  function loadVinyls(): void {
    httpClient
      .get<{ data: VinylModel[] }>('/vinyls')
      .then((response) => {
        setVinyls(response.data.data)
      })
      .catch((err: unknown) => console.error(err))
  }

  function createVinyl(vinyl: CreateVinylModel): void {
    httpClient
      .post('/vinyls', vinyl)
      .then(() => {
        loadVinyls()
      })
      .catch((err: unknown) => console.error(err))
  }

  function updateVinyl(id: string, input: UpdateVinylModel): void {
    httpClient
      .patch(`/vinyls/${id}`, input)
      .then(() => {
        loadVinyls()
      })
      .catch((err: unknown) => console.error(err))
  }

  function deleteVinyl(id: string): void {
    httpClient
      .delete(`/vinyls/${id}`)
      .then(() => {
        loadVinyls()
      })
      .catch((err: unknown) => console.error(err))
  }

  return { vinyls, loadVinyls, createVinyl, updateVinyl, deleteVinyl }
}
