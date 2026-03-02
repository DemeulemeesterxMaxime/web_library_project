import { createFileRoute } from '@tanstack/react-router'
import { ClientDetails } from '../clients/components/ClientDetails'
import httpClient from '../api/httpClient'
import type { ClientModel } from '../clients/ClientModel'

export const Route = createFileRoute('/clients/$clientId')({
  loader: async ({ params }): Promise<{ title: string }> => {
    const response = await httpClient.get<ClientModel>(
      `/clients/${params.clientId}`,
    )
    return {
      title: `${response.data.firstName} ${response.data.lastName}`,
    }
  },
  component: ClientDetailsPage,
})

function ClientDetailsPage(): React.JSX.Element {
  const { clientId } = Route.useParams()

  return <ClientDetails id={clientId} />
}
