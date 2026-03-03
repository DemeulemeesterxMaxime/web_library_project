import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/artists')({
  component: (): React.JSX.Element => <Outlet />,
})
