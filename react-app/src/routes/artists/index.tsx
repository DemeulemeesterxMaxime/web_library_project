import { createFileRoute } from '@tanstack/react-router'
import { ArtistsPage } from '../../artists/pages/ArtistsPage'

export const Route = createFileRoute('/artists/')({
  component: ArtistsPage,
})
