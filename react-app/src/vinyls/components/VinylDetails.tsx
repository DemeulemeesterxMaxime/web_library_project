import { Skeleton, Space, Typography } from 'antd'
import { useVinylDetailsProvider } from '../providers/useVinylDetailsProvider'
import { useEffect } from 'react'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { Link } from '@tanstack/react-router'
import { Route as vinylsRoute } from '../../routes/vinyls'

interface VinylDetailsProps {
  id: string
}

export function VinylDetails({ id }: VinylDetailsProps): React.JSX.Element {
  const { isLoading, vinyl, loadVinyl } = useVinylDetailsProvider(id)

  useEffect(() => {
    loadVinyl()
  }, [id])

  if (isLoading) {
    return <Skeleton active />
  }

  return (
    <Space direction="vertical" style={{ textAlign: 'left', width: '95%' }}>
      <Link to={vinylsRoute.to}>
        <ArrowLeftOutlined />
      </Link>
      <Typography.Title level={1}>{vinyl?.title}</Typography.Title>
      <Typography.Title level={3}>{vinyl?.yearReleased}</Typography.Title>
    </Space>
  )
}
