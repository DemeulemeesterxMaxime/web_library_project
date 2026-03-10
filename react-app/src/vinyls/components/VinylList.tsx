import { useEffect } from 'react'
import type { VinylModel } from '../VinylModel'
import { useVinylProvider } from '../providers/useVinylProvider'
import { useVinylArtistsProvider } from '../providers/useVinylArtistsProvider'
import { CreateVinylModal } from './CreateVinylModal'
import { VinylListItem } from './VinylListItem'

export function VinylList(): React.JSX.Element {
  const { vinyls, deleteVinyl, updateVinyl, createVinyl } = useVinylProvider()
  const { artists, loadArtists } = useVinylArtistsProvider()

  useEffect(() => {
    loadArtists()
  }, [loadArtists])

  return (
    <>
      <CreateVinylModal onCreate={createVinyl} />
      <div style={{ padding: '0 .5rem' }}>
        {vinyls.map((vinyl: VinylModel) => (
          <VinylListItem
            key={vinyl.id}
            vinyl={vinyl}
            artists={artists}
            onDelete={deleteVinyl}
            onUpdate={updateVinyl}
          />
        ))}
      </div>
    </>
  )
}
