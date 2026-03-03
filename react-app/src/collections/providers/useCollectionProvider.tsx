import { useCallback, useEffect, useState } from 'react'
import type {
  CollectionModel,
  CreateCollectionModel,
  UpdateCollectionModel,
} from '../CollectionModel'
import httpClient from '../../api/httpClient'
import type { AxiosResponse } from 'axios'

type UseCollectionProviderReturn = {
  collections: CollectionModel[]
  loadCollections: () => void
  createCollection: (collection: CreateCollectionModel) => void
  updateCollection: (id: string, input: UpdateCollectionModel) => void
  deleteCollection: (id: string) => void
}

export function useCollectionProvider(): UseCollectionProviderReturn {
  const [collections, setCollections] = useState<CollectionModel[]>([])

  const loadCollections = useCallback((): void => {
    httpClient
      .get<CollectionModel[]>('/collections')
      .then((response: AxiosResponse<CollectionModel[]>) => {
        setCollections(response.data)
      })
      .catch(() => undefined)
  }, [])

  const createCollection = useCallback(
    (collection: CreateCollectionModel): void => {
      httpClient
        .post('/collections', collection)
        .then(() => {
          loadCollections()
        })
        .catch(() => undefined)
    },
    [loadCollections],
  )

  const updateCollection = useCallback(
    (id: string, input: UpdateCollectionModel): void => {
      httpClient
        .patch(`/collections/${id}`, input)
        .then(() => {
          loadCollections()
        })
        .catch(() => undefined)
    },
    [loadCollections],
  )

  const deleteCollection = useCallback(
    (id: string): void => {
      httpClient
        .delete(`/collections/${id}`)
        .then(() => {
          loadCollections()
        })
        .catch(() => undefined)
    },
    [loadCollections],
  )

  useEffect(() => {
    loadCollections()
  }, [loadCollections])

  return {
    collections,
    loadCollections,
    createCollection,
    updateCollection,
    deleteCollection,
  }
}
