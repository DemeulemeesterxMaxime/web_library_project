import { createFileRoute } from '@tanstack/react-router'
import { ArtistDetails } from '../artists/components/ArtistDetails'
import httpClient from '../api/httpClient'
import type { ArtistModel } from '../artists/ArtistModel'

export const Route = createFileRoute('/artists/$artistId')({
  loader: async ({ params }): Promise<{ title: string }> => {
    const response = await httpClient.get<ArtistModel>(
      `/artists/${params.artistId}`,
    )
    return {
      title: `${response.data.firstName} ${response.data.lastName}`,
    }
  },
  component: ArtistDetailsPage,
})

function ArtistDetailsPage(): React.JSX.Element {
  const { artistId } = Route.useParams()

  return <ArtistDetails id={artistId} />
}
