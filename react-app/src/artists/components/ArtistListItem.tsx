import { useState } from 'react'
import type { ArtistModel, UpdateArtistModel } from '../ArtistModel'
import { Button, Col, Modal, Row } from 'antd'
import {
  CheckOutlined,
  CloseOutlined,
  DeleteOutlined,
  EditOutlined,
} from '@ant-design/icons'
import { Link } from '@tanstack/react-router'

interface ArtistListItemProps {
  artist: ArtistModel
  onDelete: (id: string) => void
  onUpdate: (id: string, input: UpdateArtistModel) => void
}

export function ArtistListItem({
  artist,
  onDelete,
  onUpdate,
}: ArtistListItemProps): React.JSX.Element {
  const [firstName, setFirstName] = useState<string>(artist.firstName)
  const [lastName, setLastName] = useState<string>(artist.lastName)
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false)

  function onCancelEdit(): void {
    setIsEditing(false)
    setFirstName(artist.firstName)
    setLastName(artist.lastName)
  }

  function onValidateEdit(): void {
    onUpdate(artist.id, { firstName, lastName })
    setIsEditing(false)
  }

  function onConfirmDelete(): void {
    onDelete(artist.id)
    setIsDeleteModalOpen(false)
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
        }}
      >
        <Col span={18} style={{ margin: 'auto 0' }}>
          {isEditing ? (
            <span style={{ display: 'flex', gap: '.5rem' }}>
              <input
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
                placeholder="Prénom"
              />
              <input
                value={lastName}
                onChange={e => setLastName(e.target.value)}
                placeholder="Nom"
              />
            </span>
          ) : (
            <Link
              to="/artists/$artistId"
              params={{ artistId: artist.id }}
              style={{ margin: 'auto 0' }}
            >
              <span style={{ fontWeight: 'bold' }}>
                {artist.firstName} {artist.lastName}
              </span>
            </Link>
          )}
        </Col>
        <Col
          span={6}
          style={{
            display: 'flex',
            gap: '.25rem',
            margin: 'auto 0',
            justifyContent: 'flex-end',
          }}
        >
          {isEditing ? (
            <>
              <Button type="primary" onClick={onValidateEdit}>
                <CheckOutlined />
              </Button>
              <Button onClick={onCancelEdit}>
                <CloseOutlined />
              </Button>
            </>
          ) : (
            <Button type="primary" onClick={() => setIsEditing(true)}>
              <EditOutlined />
            </Button>
          )}
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
        Êtes-vous sûr de vouloir supprimer{' '}
        <strong>
          {artist.firstName} {artist.lastName}
        </strong>{' '}
        ?
      </Modal>
    </>
  )
}
