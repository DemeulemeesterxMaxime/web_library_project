import type { ArtistModel } from '../ArtistModel'
import { useArtistProvider } from '../providers/useArtistProvider'
import { CreateArtistModal } from './CreateArtistModal'
import { ArtistListItem } from './ArtistListItem'

export function ArtistList(): React.JSX.Element {
  const { artists, deleteArtist, updateArtist, createArtist } =
    useArtistProvider()

  return (
    <>
      <CreateArtistModal onCreate={createArtist} />
      <div style={{ padding: '0 .5rem' }}>
        {artists.map((artist: ArtistModel) => (
          <ArtistListItem
            key={artist.id}
            artist={artist}
            onDelete={deleteArtist}
            onUpdate={updateArtist}
          />
        ))}
      </div>
    </>
  )
}
