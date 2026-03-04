import { useState } from 'react'
import httpClient from '../../api/httpClient'
import type { SpotifyArtistResult } from '../../vinyls/SpotifyModel'

type UseSpotifyArtistSearchReturn = {
  results: SpotifyArtistResult[]
  isSearching: boolean
  searchError: string | null
  searchArtist: (query: string) => Promise<void>
  clearResults: () => void
}

export function useSpotifyArtistSearch(): UseSpotifyArtistSearchReturn {
  const [results, setResults] = useState<SpotifyArtistResult[]>([])
  const [isSearching, setIsSearching] = useState<boolean>(false)
  const [searchError, setSearchError] = useState<string | null>(null)

  async function searchArtist(query: string): Promise<void> {
    if (query.trim().length === 0) {
      setResults([])
      return
    }

    setIsSearching(true)
    setSearchError(null)

    try {
      const response = await httpClient.get<SpotifyArtistResult[]>(
        '/spotify/search-artist',
        { params: { query } },
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

  return { results, isSearching, searchError, searchArtist, clearResults }
}
