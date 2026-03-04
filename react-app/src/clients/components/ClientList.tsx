import type { ClientModel } from '../ClientModel'
import { useClientProvider } from '../providers/useClientProvider'
import { CreateClientModal } from './CreateClientModal'
import { ClientListItem } from './ClientListItem'

export function ClientList(): React.JSX.Element {
  const { clients, deleteClient, updateClient, createClient } =
    useClientProvider()

  return (
    <>
      <CreateClientModal onCreate={createClient} />
      <div style={{ padding: '0 .5rem' }}>
        {clients.map((client: ClientModel) => (
          <ClientListItem
            key={client.id}
            client={client}
            onDelete={deleteClient}
            onUpdate={updateClient}
          />
        ))}
      </div>
    </>
  )
}
