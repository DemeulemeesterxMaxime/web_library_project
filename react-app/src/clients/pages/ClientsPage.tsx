import { Outlet } from '@tanstack/react-router'
import { ClientList } from '../components/ClientList'

export function ClientsPage(): React.JSX.Element {
  return (
    <div>
      <ClientList />
      <Outlet />
    </div>
  )
}
