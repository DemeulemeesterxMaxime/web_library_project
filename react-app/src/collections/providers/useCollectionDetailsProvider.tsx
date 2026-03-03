import { useCallback, useState } from 'react'
import type { CollectionModel } from '../CollectionModel'
import httpClient from '../../api/httpClient'

type UseCollectionDetailsProviderReturn = {
  isLoading: boolean
  collection: CollectionModel | null
  loadCollection: () => void
  addVinyl: (vinylId: string) => void
  removeVinyl: (vinylId: string) => void
}

export function useCollectionDetailsProvider(
  id: string,
): UseCollectionDetailsProviderReturn {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [collection, setCollection] = useState<CollectionModel | null>(null)

  const loadCollection = useCallback((): void => {
    setIsLoading(true)
    httpClient
      .get<CollectionModel>(`/collections/${id}`)
      .then(response => {
        setCollection(response.data)
      })
      .catch(() => {
        setCollection(null)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [id])

  const addVinyl = useCallback(
    (vinylId: string): void => {
      httpClient
        .post(`/collections/${id}/vinyls`, { vinylId })
        .then(() => {
          loadCollection()
        })
        .catch(() => undefined)
    },
    [id, loadCollection],
  )

  const removeVinyl = useCallback(
    (vinylId: string): void => {
      httpClient
        .delete(`/collections/${id}/vinyls/${vinylId}`)
        .then(() => {
          loadCollection()
        })
        .catch(() => undefined)
    },
    [id, loadCollection],
  )

  return { isLoading, collection, loadCollection, addVinyl, removeVinyl }
}
