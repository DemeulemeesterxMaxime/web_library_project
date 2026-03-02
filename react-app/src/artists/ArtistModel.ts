export type ArtistModel = {
  id: string
  firstName: string
  lastName: string
  photo: string | null
  vinylCount?: number
}

export type ArtistStatsModel = {
  artistId: string
  totalVinyls: number
  totalSales: number
  averageSalesByVinyl: number
}

export type CreateArtistModel = {
  firstName: string
  lastName: string
  photo?: string
}

export type UpdateArtistModel = Partial<CreateArtistModel>
