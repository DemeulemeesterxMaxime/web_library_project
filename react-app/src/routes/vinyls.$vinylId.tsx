import { createFileRoute } from '@tanstack/react-router'
import { VinylDetails } from '../vinyls/components/VinylDetails'

export const Route = createFileRoute('/vinyls/$vinylId')({
  component: VinylDetailsPage,
})

function VinylDetailsPage(): React.JSX.Element {
  const { vinylId } = Route.useParams()

  return <VinylDetails id={vinylId} />
}
