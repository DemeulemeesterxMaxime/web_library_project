import type { CollectionModel } from '../CollectionModel'
import { useCollectionProvider } from '../providers/useCollectionProvider'
import { CreateCollectionModal } from './CreateCollectionModal'
import { CollectionListItem } from './CollectionListItem'

export function CollectionList(): React.JSX.Element {
  const { collections, deleteCollection, updateCollection, createCollection } =
    useCollectionProvider()

  return (
    <>
      <CreateCollectionModal onCreate={createCollection} />
      <div style={{ padding: '0 .5rem' }}>
        {collections.map((collection: CollectionModel) => (
          <CollectionListItem
            key={collection.id}
            collection={collection}
            onDelete={deleteCollection}
            onUpdate={updateCollection}
          />
        ))}
      </div>
    </>
  )
}
