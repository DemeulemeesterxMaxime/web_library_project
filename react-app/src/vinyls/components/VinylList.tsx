import { useVinylProvider } from '../providers/useVinylProvider'
import { CreateVinylModal } from './CreateVinylModal'
import { VinylListItem } from './VinylListItem'

export function VinylList(): React.JSX.Element {
  const { vinyls, deleteVinyl, updateVinyl, createVinyl } = useVinylProvider()

  return (
    <>
      <CreateVinylModal onCreate={createVinyl} />
      <div style={{ padding: '0 .5rem' }}>
        {vinyls.map(vinyl => (
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
