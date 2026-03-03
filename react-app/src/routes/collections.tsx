import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/collections')({
  component: (): React.JSX.Element => <Outlet />,
})
