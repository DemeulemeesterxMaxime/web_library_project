import { useEffect, useState } from 'react'
import {
  Button,
  Input,
  List,
  Skeleton,
  Space,
  Statistic,
  Typography,
} from 'antd'
import {
  ArrowLeftOutlined,
  CheckOutlined,
  CloseOutlined,
  EditOutlined,
} from '@ant-design/icons'
import { Link } from '@tanstack/react-router'
import { useArtistDetailsProvider } from '../providers/useArtistDetailsProvider'
import type { UpdateArtistModel } from '../ArtistModel'

interface ArtistDetailsProps {
  id: string
}

export function ArtistDetails({ id }: ArtistDetailsProps): React.JSX.Element {
  const { isLoading, artist, stats, vinyls, loadArtist, updateArtist } =
    useArtistDetailsProvider(id)
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [editFirstName, setEditFirstName] = useState<string>('')
  const [editLastName, setEditLastName] = useState<string>('')
  const [editPhoto, setEditPhoto] = useState<string>('')

  useEffect(() => {
    loadArtist()
  }, [loadArtist])

  function startEditing(): void {
    if (artist) {
      setEditFirstName(artist.firstName)
      setEditLastName(artist.lastName)
      setEditPhoto(artist.photo ?? '')
      setIsEditing(true)
    }
  }

  function cancelEditing(): void {
    setIsEditing(false)
  }

  function saveEditing(): void {
    const updateData: UpdateArtistModel = {
      firstName: editFirstName,
      lastName: editLastName,
      ...(editPhoto.length > 0 ? { photo: editPhoto } : {}),
    }
    updateArtist(updateData)
      .then(() => {
        setIsEditing(false)
      })
      .catch(() => undefined)
  }

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
      {isEditing ? (
        <Space direction="vertical" style={{ width: '100%' }}>
          <Input
            value={editFirstName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEditFirstName(e.target.value)
            }
            placeholder="Prénom"
          />
          <Input
            value={editLastName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEditLastName(e.target.value)
            }
            placeholder="Nom"
          />
          <Input
            value={editPhoto}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEditPhoto(e.target.value)
            }
            placeholder="URL photo (optionnel)"
          />
          <Space>
            <Button
              type="primary"
              icon={<CheckOutlined />}
              onClick={saveEditing}
              disabled={editFirstName.length === 0 || editLastName.length === 0}
            >
              Sauvegarder
            </Button>
            <Button icon={<CloseOutlined />} onClick={cancelEditing}>
              Annuler
            </Button>
          </Space>
        </Space>
      ) : (
        <Space align="center">
          <Typography.Title level={1} style={{ margin: 0 }}>
            {artist?.firstName} {artist?.lastName}
          </Typography.Title>
          <Button type="text" icon={<EditOutlined />} onClick={startEditing} />
        </Space>
      )}
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
      <Typography.Title level={3} style={{ marginTop: '1.5rem' }}>
        Vinyles
      </Typography.Title>
      {vinyls.length === 0 ? (
        <Typography.Text type="secondary">
          Aucun vinyle enregistré.
        </Typography.Text>
      ) : (
        <List
          dataSource={vinyls}
          renderItem={vinyl => (
            <List.Item>
              <Link to="/vinyls/$vinylId" params={{ vinylId: vinyl.id }}>
                {vinyl.title}
              </Link>
              <Typography.Text type="secondary" style={{ marginLeft: '1rem' }}>
                {vinyl.yearReleased}
              </Typography.Text>
            </List.Item>
          )}
        />
      )}
    </Space>
  )
}
