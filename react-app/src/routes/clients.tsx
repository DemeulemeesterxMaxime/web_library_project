import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/clients')({
  component: (): React.JSX.Element => <Outlet />,
})
