import { useCallback, useState } from 'react'
import type { VinylModel } from '../VinylModel'
import httpClient from '../../api/httpClient'
import type { CreateArtistModel } from '../../artists/ArtistModel'

type ArtistModel = VinylModel['artist']

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
      .then(response => {
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
