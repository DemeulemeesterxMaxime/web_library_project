import { Skeleton, Space, Tag, Typography } from 'antd'
import { useVinylDetailsProvider } from '../providers/useVinylDetailsProvider'
import { useEffect } from 'react'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { Link } from '@tanstack/react-router'
import { Route as vinylsRoute } from '../../routes/vinyls'
import { PurchaseModal } from '../../components/PurchaseModal'

interface VinylDetailsProps {
  id: string
}

export function VinylDetails({ id }: VinylDetailsProps): React.JSX.Element {
  const { isLoading, vinyl, loadVinyl } = useVinylDetailsProvider(id)

  useEffect(() => {
    loadVinyl()
  }, [loadVinyl])

  if (isLoading) {
    return <Skeleton active />
  }

  return (
    <Space direction="vertical" style={{ textAlign: 'left', width: '95%' }}>
      <Link to={vinylsRoute.to}>
        <ArrowLeftOutlined /> Retour aux vinyles
      </Link>
      {vinyl?.photo && (
        <img
          src={vinyl.photo}
          alt={vinyl.title}
          style={{ width: '200px', borderRadius: '4px' }}
        />
      )}
      <Typography.Title level={1}>{vinyl?.title}</Typography.Title>
      <Typography.Title level={4} style={{ margin: 0 }}>
        {vinyl?.yearReleased}
      </Typography.Title>
      {vinyl?.artist && (
        <Tag color="green">
          {vinyl.artist.firstName} {vinyl.artist.lastName}
        </Tag>
      )}
      <PurchaseModal vinylId={id} />
    </Space>
  )
}
