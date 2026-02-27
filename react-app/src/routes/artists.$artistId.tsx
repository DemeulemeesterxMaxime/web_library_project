import { createFileRoute } from '@tanstack/react-router'
import { ArtistDetails } from '../artists/components/ArtistDetails'

export const Route = createFileRoute('/artists/$artistId')({
  component: ArtistDetailsPage,
})

function ArtistDetailsPage(): React.JSX.Element {
  const { artistId } = Route.useParams()

  return <ArtistDetails id={artistId} />
}
