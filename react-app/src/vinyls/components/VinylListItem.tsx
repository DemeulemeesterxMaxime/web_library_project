import { useState } from 'react'
import type { VinylModel, UpdateVinylModel } from '../VinylModel'
import type { ArtistModel } from '../../artists/ArtistModel'
import {
  Button,
  Col,
  Input,
  InputNumber,
  Modal,
  Row,
  Select,
  Space,
  Tag,
} from 'antd'
import {
  CheckOutlined,
  CloseOutlined,
  DeleteOutlined,
  EditOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons'
import { Link } from '@tanstack/react-router'

interface VinylListItemProps {
  vinyl: VinylModel
  artists: ArtistModel[]
  onDelete: (id: string) => void
  onUpdate: (id: string, input: UpdateVinylModel) => void
}

export function VinylListItem({
  vinyl,
  artists,
  onDelete,
  onUpdate,
}: VinylListItemProps): React.JSX.Element {
  const [title, setTitle] = useState<string>(vinyl.title)
  const [yearReleased, setYearReleased] = useState<number>(vinyl.yearReleased)
  const [photo, setPhoto] = useState<string>(vinyl.photo ?? '')
  const [artistId, setArtistId] = useState<string>(vinyl.artist.id)
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false)

  function onCancelEdit(): void {
    setIsEditing(false)
    setTitle(vinyl.title)
    setYearReleased(vinyl.yearReleased)
    setPhoto(vinyl.photo ?? '')
    setArtistId(vinyl.artist.id)
  }

  function onValidateEdit(): void {
    onUpdate(vinyl.id, {
      title,
      yearReleased,
      artistId,
      ...(photo.length > 0 ? { photo } : {}),
    })
    setIsEditing(false)
  }

  function onConfirmDelete(): void {
    onDelete(vinyl.id)
    setIsDeleteModalOpen(false)
  }

  if (isEditing) {
    return (
      <>
        <div
          style={{
            width: '100%',
            borderRadius: '10px',
            backgroundColor: '#1A1A1A',
            margin: '1rem 0',
            padding: '0.75rem',
          }}
        >
          <Space direction="vertical" style={{ width: '100%' }}>
            <Input
              value={title}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setTitle(e.target.value)
              }
              placeholder="Titre"
            />
            <InputNumber
              style={{ width: '100%' }}
              value={yearReleased}
              onChange={(value: number | null) =>
                setYearReleased(value ?? vinyl.yearReleased)
              }
              min={1900}
              max={2100}
              placeholder="Année"
            />
            <Input
              value={photo}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPhoto(e.target.value)
              }
              placeholder="URL photo (optionnel)"
            />
            <Select
              style={{ width: '100%' }}
              value={artistId}
              onChange={(value: string) => setArtistId(value)}
              placeholder="Artiste"
              options={artists.map((artist: ArtistModel) => ({
                value: artist.id,
                label: `${artist.firstName} ${artist.lastName}`,
              }))}
            />
            <Space>
              <Button
                type="primary"
                icon={<CheckOutlined />}
                onClick={onValidateEdit}
                disabled={title.length === 0}
              >
                Sauvegarder
              </Button>
              <Button icon={<CloseOutlined />} onClick={onCancelEdit}>
                Annuler
              </Button>
            </Space>
          </Space>
        </div>
        <Modal
          open={isDeleteModalOpen}
          onOk={onConfirmDelete}
          onCancel={() => setIsDeleteModalOpen(false)}
          title="Confirmer la suppression"
          okText="Supprimer"
          okButtonProps={{ danger: true }}
          cancelText="Annuler"
        >
          Êtes-vous sûr de vouloir supprimer <strong>{vinyl.title}</strong> ?
        </Modal>
      </>
    )
  }

  return (
    <>
      <Row
        style={{
          width: '100%',
          minHeight: '50px',
          borderRadius: '10px',
          backgroundColor: '#1A1A1A',
          margin: '1rem 0',
          padding: '.25rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Col span={10} style={{ margin: 'auto 0' }}>
          <Link
            to={'/vinyls/$vinylId'}
            params={{ vinylId: vinyl.id }}
            style={{
              margin: 'auto 0',
              textAlign: 'left',
            }}
          >
            <span style={{ fontWeight: 'bold' }}>{vinyl.title}</span> -{' '}
            {vinyl.yearReleased}
          </Link>
        </Col>
        <Col span={6} style={{ margin: 'auto 0' }}>
          par{' '}
          <span style={{ fontWeight: 'bold' }}>
            {vinyl.artist.firstName} {vinyl.artist.lastName}
          </span>
        </Col>
        <Col span={3} style={{ margin: 'auto 0' }}>
          {vinyl.salesCount !== undefined && (
            <Tag icon={<ShoppingCartOutlined />} color="green">
              {vinyl.salesCount}
            </Tag>
          )}
        </Col>
        <Col
          span={5}
          style={{
            display: 'flex',
            gap: '.25rem',
            margin: 'auto 0',
            justifyContent: 'flex-end',
          }}
        >
          <Button type="primary" onClick={() => setIsEditing(true)}>
            <EditOutlined />
          </Button>
          <Button
            type="primary"
            danger
            onClick={() => setIsDeleteModalOpen(true)}
          >
            <DeleteOutlined />
          </Button>
        </Col>
      </Row>
      <Modal
        open={isDeleteModalOpen}
        onOk={onConfirmDelete}
        onCancel={() => setIsDeleteModalOpen(false)}
        title="Confirmer la suppression"
        okText="Supprimer"
        okButtonProps={{ danger: true }}
        cancelText="Annuler"
      >
        Êtes-vous sûr de vouloir supprimer <strong>{vinyl.title}</strong> ?
      </Modal>
    </>
  )
}
