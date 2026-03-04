import { useState } from 'react'
import httpClient from '../../api/httpClient'
import type { SpotifyAlbumResult } from '../SpotifyModel'

type UseSpotifySearchReturn = {
  results: SpotifyAlbumResult[]
  isSearching: boolean
  searchError: string | null
  searchAlbum: (query: string, artist: string) => Promise<void>
  clearResults: () => void
}

export function useSpotifySearch(): UseSpotifySearchReturn {
  const [results, setResults] = useState<SpotifyAlbumResult[]>([])
  const [isSearching, setIsSearching] = useState<boolean>(false)
  const [searchError, setSearchError] = useState<string | null>(null)

  async function searchAlbum(query: string, artist: string): Promise<void> {
    if (query.trim().length === 0) {
      setResults([])
      return
    }

    setIsSearching(true)
    setSearchError(null)

    try {
      const response = await httpClient.get<SpotifyAlbumResult[]>(
        '/spotify/search',
        { params: { query, artist } },
      )
      setResults(response.data)
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : 'Erreur inconnue'
      setSearchError(errorMessage)
      setResults([])
    } finally {
      setIsSearching(false)
    }
  }

  function clearResults(): void {
    setResults([])
    setSearchError(null)
  }

  return { results, isSearching, searchError, searchAlbum, clearResults }
}
