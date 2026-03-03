import { createRootRoute, Outlet } from '@tanstack/react-router'
import { Layout } from '../Layout'

const RootLayout = (): React.JSX.Element => {
  return (
    <Layout>
      <Outlet />
    </Layout>
  )
}

export const Route = createRootRoute({ component: RootLayout })
