import { Outlet } from '@tanstack/react-router'
import { VinylList } from '../components/VinylList'

export function VinylsPage(): React.JSX.Element {
  return (
    <div>
      <VinylList />
      <Outlet />
    </div>
  )
}
