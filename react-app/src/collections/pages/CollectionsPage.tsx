import { Outlet } from '@tanstack/react-router'
import { CollectionList } from '../components/CollectionList'

export function CollectionsPage(): React.JSX.Element {
  return (
    <>
      <CollectionList />
      <Outlet />
    </>
  )
}
