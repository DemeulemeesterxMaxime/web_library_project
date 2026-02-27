import { useEffect } from 'react'
import { Skeleton, Space, Statistic, Typography } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { Link } from '@tanstack/react-router'
import { useArtistDetailsProvider } from '../providers/useArtistDetailsProvider'

interface ArtistDetailsProps {
  id: string
}

export function ArtistDetails({ id }: ArtistDetailsProps): React.JSX.Element {
  const { isLoading, artist, stats, loadArtist } = useArtistDetailsProvider(id)

  useEffect(() => {
    loadArtist()
  }, [loadArtist])

  if (isLoading) {
    return <Skeleton active />
  }

  return (
    <Space direction="vertical" style={{ textAlign: 'left', width: '95%' }}>
      <Link to="/artists">
        <ArrowLeftOutlined /> Retour aux artistes
      </Link>
      {artist?.photo && (
        <img
          src={artist.photo}
          alt={`${artist.firstName} ${artist.lastName}`}
          style={{ width: '200px', borderRadius: '4px' }}
        />
      )}
      <Typography.Title level={1}>
        {artist?.firstName} {artist?.lastName}
      </Typography.Title>
      {stats && (
        <Space>
          <Statistic title="Vinyles" value={stats.totalVinyls} />
          <Statistic title="Ventes totales" value={stats.totalSales} />
          <Statistic
            title="Moyenne ventes / vinyle"
            value={stats.averageSalesByVinyl.toFixed(1)}
          />
        </Space>
      )}
    </Space>
  )
}
