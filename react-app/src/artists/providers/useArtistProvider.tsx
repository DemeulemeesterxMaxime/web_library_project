import { useCallback, useEffect, useState } from 'react'
import type {
  ArtistModel,
  CreateArtistModel,
  UpdateArtistModel,
} from '../ArtistModel'
import httpClient from '../../api/httpClient'
import type { AxiosResponse } from 'axios'

type UseArtistProviderReturn = {
  artists: ArtistModel[]
  loadArtists: () => void
  createArtist: (artist: CreateArtistModel) => void
  updateArtist: (id: string, input: UpdateArtistModel) => void
  deleteArtist: (id: string) => void
}

export function useArtistProvider(): UseArtistProviderReturn {
  const [artists, setArtists] = useState<ArtistModel[]>([])

  const loadArtists = useCallback((): void => {
    httpClient
      .get<ArtistModel[]>('/artists')
      .then((response: AxiosResponse<ArtistModel[]>) => {
        setArtists(response.data)
      })
      .catch(() => undefined)
  }, [])

  const createArtist = useCallback(
    (artist: CreateArtistModel): void => {
      httpClient
        .post('/artists', artist)
        .then(() => {
          loadArtists()
        })
        .catch(() => undefined)
    },
    [loadArtists],
  )

  const updateArtist = useCallback(
    (id: string, input: UpdateArtistModel): void => {
      httpClient
        .patch(`/artists/${id}`, input)
        .then(() => {
          loadArtists()
        })
        .catch(() => undefined)
    },
    [loadArtists],
  )

  const deleteArtist = useCallback(
    (id: string): void => {
      httpClient
        .delete(`/artists/${id}`)
        .then(() => {
          loadArtists()
        })
        .catch(() => undefined)
    },
    [loadArtists],
  )

  useEffect(() => {
    loadArtists()
  }, [loadArtists])

  return { artists, loadArtists, createArtist, updateArtist, deleteArtist }
}
