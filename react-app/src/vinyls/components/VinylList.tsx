import { useEffect } from 'react'
import { useVinylProvider } from '../providers/useVinylProvider'
import { VinylListItem } from './VinylListItem'
import { CreateVinylModal } from './CreateVinylModal'

export function VinylList(): React.JSX.Element {
  const { vinyls, loadVinyls, deleteVinyl, updateVinyl, createVinyl } =
    useVinylProvider()

  useEffect(() => {
    loadVinyls()
  }, [])

  return (
    <>
      <CreateVinylModal onCreate={createVinyl} />
      <div style={{ padding: '0 .5rem' }}>
        {vinyls.map((vinyl) => (
          <VinylListItem
            key={vinyl.id}
            vinyl={vinyl}
            onDelete={deleteVinyl}
            onUpdate={updateVinyl}
          />
        ))}
      </div>
    </>
  )
}
