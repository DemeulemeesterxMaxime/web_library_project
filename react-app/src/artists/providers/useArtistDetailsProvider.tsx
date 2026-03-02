import { useCallback, useState } from 'react'
import type { ArtistModel, ArtistStatsModel } from '../ArtistModel'
import type { VinylModel } from '../../vinyls/VinylModel'
import httpClient from '../../api/httpClient'

type UseArtistDetailsProviderReturn = {
  isLoading: boolean
  artist: ArtistModel | null
  stats: ArtistStatsModel | null
  vinyls: VinylModel[]
  loadArtist: () => void
}

export function useArtistDetailsProvider(
  id: string,
): UseArtistDetailsProviderReturn {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [artist, setArtist] = useState<ArtistModel | null>(null)
  const [stats, setStats] = useState<ArtistStatsModel | null>(null)
  const [vinyls, setVinyls] = useState<VinylModel[]>([])

  const loadArtist = useCallback((): void => {
    setIsLoading(true)
    Promise.all([
      httpClient.get<ArtistModel>(`/artists/${id}`),
      httpClient.get<ArtistStatsModel>(`/artists/${id}/stats`),
      httpClient.get<{ data: VinylModel[] }>('/vinyls'),
    ])
      .then(([artistResponse, statsResponse, vinylsResponse]) => {
        setArtist(artistResponse.data)
        setStats(statsResponse.data)
        const artistVinyls = vinylsResponse.data.data.filter(
          (vinyl: VinylModel) => vinyl.artist.id === id,
        )
        setVinyls(artistVinyls)
      })
      .catch(() => {
        setArtist(null)
        setStats(null)
        setVinyls([])
      })
      .catch(() => {
        setArtist(null)
        setStats(null)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [id])

  return { isLoading, artist, stats, vinyls, loadArtist }
}
