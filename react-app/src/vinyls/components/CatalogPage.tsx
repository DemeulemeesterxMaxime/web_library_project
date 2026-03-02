import { useState } from 'react'
import { Col, Empty, Input, Row, Select } from 'antd'
import { useVinylProvider } from '../providers/useVinylProvider'
import { CatalogCard } from './CatalogCard'
import type { VinylModel } from '../VinylModel'

type SortKey =
  | 'title-asc'
  | 'title-desc'
  | 'year-desc'
  | 'year-asc'
  | 'sales-desc'

const sortOptions: { label: string; value: SortKey }[] = [
  { label: 'Titre (A → Z)', value: 'title-asc' },
  { label: 'Titre (Z → A)', value: 'title-desc' },
  { label: 'Année (récent → ancien)', value: 'year-desc' },
  { label: 'Année (ancien → récent)', value: 'year-asc' },
  { label: 'Ventes (plus vendus)', value: 'sales-desc' },
]

function sortVinyls(vinyls: VinylModel[], sortKey: SortKey): VinylModel[] {
  const sorted = [...vinyls]

  switch (sortKey) {
    case 'title-asc':
      sorted.sort((a, b) => a.title.localeCompare(b.title))
      break
    case 'title-desc':
      sorted.sort((a, b) => b.title.localeCompare(a.title))
      break
    case 'year-desc':
      sorted.sort((a, b) => b.yearReleased - a.yearReleased)
      break
    case 'year-asc':
      sorted.sort((a, b) => a.yearReleased - b.yearReleased)
      break
    case 'sales-desc':
      sorted.sort((a, b) => (b.salesCount ?? 0) - (a.salesCount ?? 0))
      break
  }

  return sorted
}

function filterVinyls(vinyls: VinylModel[], query: string): VinylModel[] {
  if (query.trim().length === 0) {
    return vinyls
  }

  const lowerQuery = query.toLowerCase()

  return vinyls.filter(vinyl => {
    const artistFullName =
      `${vinyl.artist.firstName} ${vinyl.artist.lastName}`.toLowerCase()
    const titleMatch = vinyl.title.toLowerCase().includes(lowerQuery)
    const artistMatch = artistFullName.includes(lowerQuery)

    return titleMatch || artistMatch
  })
}

export function CatalogPage(): React.JSX.Element {
  const { vinyls, loadVinyls } = useVinylProvider()
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [sortKey, setSortKey] = useState<SortKey>('title-asc')

  const filteredVinyls = filterVinyls(vinyls, searchQuery)
  const sortedVinyls = sortVinyls(filteredVinyls, sortKey)

  return (
    <section className="home-page">
      <h1
        style={{
          margin: '0 0 0.5rem',
          color: '#39FF14',
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: '3rem',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
        }}
      >
        Sillon
      </h1>
      <p style={{ color: '#888888', fontSize: '1rem', marginBottom: '1.5rem' }}>
        Parcourez notre catalogue de vinyles et trouvez votre prochaine
        pépite.
      </p>

      <div className="catalog-toolbar">
        <Input.Search
          placeholder="Rechercher un vinyle ou un artiste…"
          value={searchQuery}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSearchQuery(e.target.value)
          }
          allowClear
          style={{ maxWidth: '400px', flex: 1 }}
        />
        <Select<SortKey>
          value={sortKey}
          onChange={(value: SortKey) => setSortKey(value)}
          options={sortOptions}
          style={{ width: '220px' }}
        />
      </div>

      {sortedVinyls.length === 0 ? (
        <Empty
          description="Aucun vinyle trouvé"
          style={{ marginTop: '3rem' }}
        />
      ) : (
        <Row gutter={[16, 16]} className="catalog-grid">
          {sortedVinyls.map(vinyl => (
            <Col key={vinyl.id} xs={24} sm={12} md={8} lg={6}>
              <CatalogCard
                vinyl={vinyl}
                onSaleCreated={() => loadVinyls()}
              />
            </Col>
          ))}
        </Row>
      )}
    </section>
  )
}
