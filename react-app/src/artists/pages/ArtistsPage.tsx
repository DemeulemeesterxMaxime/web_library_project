import { Outlet } from '@tanstack/react-router'
import { ArtistList } from '../components/ArtistList'

export function ArtistsPage(): React.JSX.Element {
  return (
    <div>
      <ArtistList />
      <Outlet />
    </div>
  )
}
