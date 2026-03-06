import { useCallback, useState } from 'react'
import httpClient from '../../api/httpClient'
import type { AxiosResponse } from 'axios'
import type { ArtistModel, CreateArtistModel } from '../../artists/ArtistModel'

type UseVinylArtistsProviderReturn = {
  artists: ArtistModel[]
  loadArtists: () => void
  createArtist: (input: CreateArtistModel) => Promise<ArtistModel | null>
}

export function useVinylArtistsProvider(): UseVinylArtistsProviderReturn {
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
    async (input: CreateArtistModel): Promise<ArtistModel | null> => {
      try {
        const response = await httpClient.post<ArtistModel>('/artists', input)
        loadArtists()
        return response.data
      } catch {
        return null
      }
    },
    [loadArtists],
  )

  return { artists, loadArtists, createArtist }
}
