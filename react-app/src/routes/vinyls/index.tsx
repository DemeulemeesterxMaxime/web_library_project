import { createFileRoute } from '@tanstack/react-router'
import { VinylsPage } from '../../vinyls/pages/VinylsPage'

export const Route = createFileRoute('/vinyls/')({
  component: VinylsPage,
})
