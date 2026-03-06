export type CollectionVinylModel = {
  id: string
  title: string
  photo: string | null
}

export type CollectionModel = {
  id: string
  name: string
  description: string | null
  isPublic: boolean
  clientId: string
  client: {
    firstName: string
    lastName: string
  }
  vinyls: CollectionVinylModel[]
  photo: string | null
}

export type CreateCollectionModel = {
  name: string
  description?: string
  clientId: string
  isPublic?: boolean
}

export type UpdateCollectionModel = {
  name?: string
  description?: string
  isPublic?: boolean
}
