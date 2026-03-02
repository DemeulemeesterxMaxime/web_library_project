import { Card, Tag } from 'antd'
import {
  CustomerServiceOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons'
import { Link } from '@tanstack/react-router'
import type { VinylModel } from '../VinylModel'
import { PurchaseModal } from '../../components/PurchaseModal'

interface CatalogCardProps {
  vinyl: VinylModel
  onSaleCreated: () => void
}

export function CatalogCard({
  vinyl,
  onSaleCreated,
}: CatalogCardProps): React.JSX.Element {
  const coverContent = vinyl.photo ? (
    <img
      alt={vinyl.title}
      src={vinyl.photo}
      style={{
        width: '100%',
        height: '220px',
        objectFit: 'cover',
        borderRadius: '2px 2px 0 0',
        backgroundColor: '#0A0A0A',
      }}
    />
  ) : (
    <div
      style={{
        width: '100%',
        height: '220px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0A0A0A',
        borderRadius: '2px 2px 0 0',
      }}
    >
      <CustomerServiceOutlined style={{ fontSize: '3rem', color: '#2A2A2A' }} />
    </div>
  )

  return (
    <Card
      className="catalog-card"
      cover={coverContent}
      actions={[
        <PurchaseModal
          key="buy"
          vinylId={vinyl.id}
          onSaleCreated={onSaleCreated}
        />,
      ]}
      style={{
        backgroundColor: '#1A1A1A',
        border: '1px solid #2A2A2A',
        borderRadius: '2px',
        transition: 'all 0.2s ease',
      }}
    >
      <Card.Meta
        title={
          <Link
            to="/vinyls/$vinylId"
            params={{ vinylId: vinyl.id }}
            style={{ color: '#E0E0E0', fontWeight: 'bold' }}
          >
            {vinyl.title}
          </Link>
        }
        description={
          <div>
            <span style={{ color: '#888888' }}>
              {vinyl.artist.firstName} {vinyl.artist.lastName} &middot;{' '}
              {vinyl.yearReleased}
            </span>
            {vinyl.salesCount !== undefined && vinyl.salesCount > 0 && (
              <div style={{ marginTop: '0.5rem' }}>
                <Tag icon={<ShoppingCartOutlined />} color="green">
                  {vinyl.salesCount} vente{vinyl.salesCount > 1 ? 's' : ''}
                </Tag>
              </div>
            )}
          </div>
        }
      />
    </Card>
  )
}
