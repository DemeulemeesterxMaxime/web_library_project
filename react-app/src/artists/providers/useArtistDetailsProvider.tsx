import { useCallback, useState } from 'react'
import type { ArtistModel, ArtistStatsModel } from '../ArtistModel'
import httpClient from '../../api/httpClient'

type UseArtistDetailsProviderReturn = {
  isLoading: boolean
  artist: ArtistModel | null
  stats: ArtistStatsModel | null
  loadArtist: () => void
}

export function useArtistDetailsProvider(
  id: string,
): UseArtistDetailsProviderReturn {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [artist, setArtist] = useState<ArtistModel | null>(null)
  const [stats, setStats] = useState<ArtistStatsModel | null>(null)

  const loadArtist = useCallback((): void => {
    setIsLoading(true)
    Promise.all([
      httpClient.get<ArtistModel>(`/artists/${id}`),
      httpClient.get<ArtistStatsModel>(`/artists/${id}/stats`),
    ])
      .then(([artistResponse, statsResponse]) => {
        setArtist(artistResponse.data)
        setStats(statsResponse.data)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [id])

  return { isLoading, artist, stats, loadArtist }
}
