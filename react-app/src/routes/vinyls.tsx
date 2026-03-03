import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/vinyls')({
  component: (): React.JSX.Element => <Outlet />,
})
