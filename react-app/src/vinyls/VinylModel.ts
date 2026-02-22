export type VinylModel = {
  id: string
  title: string
  yearReleased: number
  photo: string | null
  artist: {
    id: string
    firstName: string
    lastName: string
  }
}

export type CreateVinylModel = {
  artistId: string
  title: string
  yearReleased: number
  photo?: string
}

export type UpdateVinylModel = Partial<CreateVinylModel>
