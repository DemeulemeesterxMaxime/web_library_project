import { useEffect } from 'react'
import { List, Skeleton, Space, Typography } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { Link } from '@tanstack/react-router'
import { useClientDetailsProvider } from '../providers/useClientDetailsProvider'

interface ClientDetailsProps {
  id: string
}

export function ClientDetails({ id }: ClientDetailsProps): React.JSX.Element {
  const { isLoading, client, sales, loadClient } = useClientDetailsProvider(id)

  useEffect(() => {
    loadClient()
  }, [loadClient])

  if (isLoading) {
    return <Skeleton active />
  }

  return (
    <Space direction="vertical" style={{ textAlign: 'left', width: '95%' }}>
      <Link to="/clients">
        <ArrowLeftOutlined /> Retour aux clients
      </Link>
      {client?.photo && (
        <img
          src={client.photo}
          alt={`${client.firstName} ${client.lastName}`}
          style={{ width: '200px', borderRadius: '4px' }}
        />
      )}
      <Typography.Title level={1}>
        {client?.firstName} {client?.lastName}
      </Typography.Title>
      {client?.email && (
        <Typography.Text type="secondary">{client.email}</Typography.Text>
      )}
      <Typography.Title level={3} style={{ marginTop: '1.5rem' }}>
        Achats
      </Typography.Title>
      {sales.length === 0 ? (
        <Typography.Text type="secondary">
          Aucun achat enregistré.
        </Typography.Text>
      ) : (
        <List
          dataSource={sales}
          renderItem={sale => (
            <List.Item>
              <Link to="/vinyls/$vinylId" params={{ vinylId: sale.vinylId }}>
                {sale.vinyl.title}
              </Link>
              <Typography.Text type="secondary" style={{ marginLeft: '1rem' }}>
                {new Date(sale.date).toLocaleDateString('fr-FR')}
              </Typography.Text>
            </List.Item>
          )}
        />
      )}
    </Space>
  )
}
