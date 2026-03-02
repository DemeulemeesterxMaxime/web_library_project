import {
  Button,
  Input,
  InputNumber,
  List,
  Skeleton,
  Space,
  Tag,
  Typography,
} from 'antd'
import { useVinylDetailsProvider } from '../providers/useVinylDetailsProvider'
import { useEffect, useState } from 'react'
import {
  ArrowLeftOutlined,
  CheckOutlined,
  CloseOutlined,
  EditOutlined,
} from '@ant-design/icons'
import { Link } from '@tanstack/react-router'
import { Route as vinylsRoute } from '../../routes/vinyls'
import { PurchaseModal } from '../../components/PurchaseModal'
import httpClient from '../../api/httpClient'
import type { UpdateVinylModel } from '../VinylModel'

interface VinylDetailsProps {
  id: string
}

export function VinylDetails({ id }: VinylDetailsProps): React.JSX.Element {
  const { isLoading, vinyl, sales, loadVinyl } = useVinylDetailsProvider(id)
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [editTitle, setEditTitle] = useState<string>('')
  const [editYear, setEditYear] = useState<number | null>(null)
  const [editPhoto, setEditPhoto] = useState<string>('')

  useEffect(() => {
    loadVinyl()
  }, [loadVinyl])

  function startEditing(): void {
    if (vinyl) {
      setEditTitle(vinyl.title)
      setEditYear(vinyl.yearReleased)
      setEditPhoto(vinyl.photo ?? '')
      setIsEditing(true)
    }
  }

  function cancelEditing(): void {
    setIsEditing(false)
  }

  function saveEditing(): void {
    const updateData: UpdateVinylModel = {
      title: editTitle,
      yearReleased: editYear ?? undefined,
      ...(editPhoto.length > 0 ? { photo: editPhoto } : {}),
    }
    httpClient
      .patch(`/vinyls/${id}`, updateData)
      .then(() => {
        setIsEditing(false)
        loadVinyl()
      })
      .catch(() => undefined)
  }

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
      {isEditing ? (
        <Space direction="vertical" style={{ width: '100%' }}>
          <Input
            value={editTitle}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditTitle(e.target.value)}
            placeholder="Titre"
          />
          <InputNumber
            style={{ width: '100%' }}
            value={editYear}
            onChange={(value: number | null) => setEditYear(value)}
            min={1900}
            max={2100}
            placeholder="Année"
          />
          <Input
            value={editPhoto}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditPhoto(e.target.value)}
            placeholder="URL photo (optionnel)"
          />
          <Space>
            <Button
              type="primary"
              icon={<CheckOutlined />}
              onClick={saveEditing}
              disabled={editTitle.length === 0 || editYear === null}
            >
              Sauvegarder
            </Button>
            <Button icon={<CloseOutlined />} onClick={cancelEditing}>
              Annuler
            </Button>
          </Space>
        </Space>
      ) : (
        <>
          <Space align="center">
            <Typography.Title level={1} style={{ margin: 0 }}>
              {vinyl?.title}
            </Typography.Title>
            <Button
              type="text"
              icon={<EditOutlined />}
              onClick={startEditing}
            />
          </Space>
          <Typography.Title level={4} style={{ margin: 0 }}>
            {vinyl?.yearReleased}
          </Typography.Title>
        </>
      )}
      {vinyl?.artist && (
        <Link to="/artists/$artistId" params={{ artistId: vinyl.artist.id }}>
          <Tag color="green">
            {vinyl.artist.firstName} {vinyl.artist.lastName}
          </Tag>
        </Link>
      )}
      <PurchaseModal vinylId={id} onSaleCreated={loadVinyl} />
      <Typography.Title level={3} style={{ marginTop: '1.5rem' }}>
        Clients acheteurs
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
              <Link
                to="/clients/$clientId"
                params={{ clientId: sale.clientId }}
              >
                {sale.client.firstName} {sale.client.lastName}
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
