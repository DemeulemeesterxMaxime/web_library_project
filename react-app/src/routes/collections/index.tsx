import { createFileRoute } from '@tanstack/react-router'
import { CollectionsPage } from '../../collections/pages/CollectionsPage'

export const Route = createFileRoute('/collections/')({
  component: CollectionsPage,
})
