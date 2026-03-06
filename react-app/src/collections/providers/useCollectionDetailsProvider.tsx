import { useCallback, useEffect, useState } from 'react'
import type { AxiosResponse } from 'axios'
import type { CollectionModel, UpdateCollectionModel } from '../CollectionModel'
import type { VinylModel } from '../../vinyls/VinylModel'
import type { SaleModel } from '../../clients/ClientModel'
import httpClient from '../../api/httpClient'

interface GetVinylsResponse {
  data: VinylModel[]
  totalCount: number
}

type UseCollectionDetailsProviderReturn = {
  isLoading: boolean
  collection: CollectionModel | null
  availableVinyls: VinylModel[]
  loadCollection: () => void
  updateCollection: (data: UpdateCollectionModel) => void
  addVinyl: (vinylId: string) => void
  removeVinyl: (vinylId: string) => void
}

export function useCollectionDetailsProvider(
  id: string,
): UseCollectionDetailsProviderReturn {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [collection, setCollection] = useState<CollectionModel | null>(null)
  const [allVinyls, setAllVinyls] = useState<VinylModel[]>([])
  const [soldVinylIds, setSoldVinylIds] = useState<string[]>([])
  const [purchasedByOwnerIds, setPurchasedByOwnerIds] = useState<string[]>([])

  useEffect(() => {
    httpClient
      .get<GetVinylsResponse>('/vinyls')
      .then((response: AxiosResponse<GetVinylsResponse>) => {
        setAllVinyls(response.data.data)
      })
      .catch(() => undefined)
  }, [])

  useEffect(() => {
    if (!collection) return

    if (collection.isPublic) {
      httpClient
        .get<SaleModel[]>('/sales')
        .then((response: AxiosResponse<SaleModel[]>) => {
          const ids = [
            ...new Set(response.data.map((s: SaleModel) => s.vinylId)),
          ]
          setSoldVinylIds(ids)
        })
        .catch(() => undefined)
    } else {
      httpClient
        .get<SaleModel[]>(`/sales?clientId=${collection.clientId}`)
        .then((response: AxiosResponse<SaleModel[]>) => {
          const ids = response.data.map((s: SaleModel) => s.vinylId)
          setPurchasedByOwnerIds(ids)
        })
        .catch(() => undefined)
    }
  }, [collection])

  const availableVinyls = collection
    ? collection.isPublic
      ? allVinyls.filter((v: VinylModel) => soldVinylIds.includes(v.id))
      : allVinyls.filter((v: VinylModel) => purchasedByOwnerIds.includes(v.id))
    : allVinyls

  const loadCollection = useCallback((): void => {
    setIsLoading(true)
    httpClient
      .get<CollectionModel>(`/collections/${id}`)
      .then((response: AxiosResponse<CollectionModel>) => {
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

  const updateCollection = useCallback(
    (data: UpdateCollectionModel): void => {
      httpClient
        .patch(`/collections/${id}`, data)
        .then(() => {
          loadCollection()
        })
        .catch(() => undefined)
    },
    [id, loadCollection],
  )

  return {
    isLoading,
    collection,
    availableVinyls,
    loadCollection,
    updateCollection,
    addVinyl,
    removeVinyl,
  }
}
