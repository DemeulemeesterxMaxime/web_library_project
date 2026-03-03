import { useState } from 'react'
import httpClient from '../../api/httpClient'
import type { SpotifyAlbumResult } from '../SpotifyModel'

type UseSpotifySearchReturn = {
  results: SpotifyAlbumResult[]
  isSearching: boolean
  searchAlbum: (query: string, artist: string) => void
  clearResults: () => void
}

export function useSpotifySearch(): UseSpotifySearchReturn {
  const [results, setResults] = useState<SpotifyAlbumResult[]>([])
  const [isSearching, setIsSearching] = useState<boolean>(false)

  function searchAlbum(query: string, artist: string): void {
    if (query.trim().length === 0) {
      setResults([])
      return
    }

    setIsSearching(true)

    httpClient
      .get<SpotifyAlbumResult[]>('/spotify/search', {
        params: { query, artist },
      })
      .then(response => {
        setResults(response.data)
      })
      .catch(() => {
        setResults([])
      })
      .finally(() => {
        setIsSearching(false)
      })
  }

  function clearResults(): void {
    setResults([])
  }

  return { results, isSearching, searchAlbum, clearResults }
}
