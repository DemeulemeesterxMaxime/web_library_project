import { useState } from 'react'
import type { VinylModel } from '../VinylModel'
import httpClient from '../../api/httpClient'

type ArtistModel = VinylModel['artist']

type UseVinylArtistsProviderReturn = {
  artists: ArtistModel[]
  loadArtists: () => void
}

export function useVinylArtistsProvider(): UseVinylArtistsProviderReturn {
  const [artists, setArtists] = useState<ArtistModel[]>([])

  function loadArtists(): void {
    httpClient
      .get<ArtistModel[]>('/artists')
      .then((response) => {
        setArtists(response.data)
      })
      .catch((err: unknown) => console.error(err))
  }

  return { artists, loadArtists }
}
