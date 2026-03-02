export type ClientModel = {
  id: string
  firstName: string
  lastName: string
  email: string | null
  photo: string | null
  salesCount?: number
}

export type CreateClientModel = {
  firstName: string
  lastName: string
  email?: string
  photo?: string
}

export type UpdateClientModel = Partial<CreateClientModel>

export type SaleModel = {
  id: string
  clientId: string
  vinylId: string
  date: string
  client: {
    firstName: string
    lastName: string
  }
  vinyl: {
    title: string
    artist: {
      firstName: string
      lastName: string
    }
  }
}

export type CreateSaleModel = {
  clientId: string
  vinylId: string
  date: string
}
