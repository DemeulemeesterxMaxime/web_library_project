import { createFileRoute } from '@tanstack/react-router'
import { CollectionDetails } from '../collections/components/CollectionDetails'
import httpClient from '../api/httpClient'
import type { CollectionModel } from '../collections/CollectionModel'

export const Route = createFileRoute('/collections/$collectionId')({
  loader: async ({ params }): Promise<{ title: string }> => {
    const response = await httpClient.get<CollectionModel>(
      `/collections/${params.collectionId}`,
    )
    return {
      title: response.data.name,
    }
  },
  component: CollectionDetailsPage,
})

function CollectionDetailsPage(): React.JSX.Element {
  const { collectionId } = Route.useParams()

  return <CollectionDetails id={collectionId} />
}
