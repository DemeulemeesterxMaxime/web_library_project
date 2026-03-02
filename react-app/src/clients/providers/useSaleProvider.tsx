import { useCallback } from 'react'
import type { CreateSaleModel } from '../ClientModel'
import httpClient from '../../api/httpClient'

type UseSaleProviderReturn = {
  createSale: (sale: CreateSaleModel) => Promise<void>
}

export function useSaleProvider(): UseSaleProviderReturn {
  const createSale = useCallback(
    async (sale: CreateSaleModel): Promise<void> => {
      await httpClient.post('/sales', sale)
    },
    [],
  )

  return { createSale }
}
