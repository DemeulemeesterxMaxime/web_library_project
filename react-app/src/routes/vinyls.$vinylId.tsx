import { createFileRoute } from '@tanstack/react-router'
import { VinylDetails } from '../vinyls/components/VinylDetails'
import httpClient from '../api/httpClient'
import type { VinylModel } from '../vinyls/VinylModel'

export const Route = createFileRoute('/vinyls/$vinylId')({
  loader: async ({ params }): Promise<{ title: string }> => {
    const response = await httpClient.get<VinylModel>(
      `/vinyls/${params.vinylId}`,
    )
    return { title: response.data.title }
  },
  component: VinylDetailsPage,
})

function VinylDetailsPage(): React.JSX.Element {
  const { vinylId } = Route.useParams()

  return <VinylDetails id={vinylId} />
}
