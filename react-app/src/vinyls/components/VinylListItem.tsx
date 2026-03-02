import { useState } from 'react'
import type { VinylModel, UpdateVinylModel } from '../VinylModel'
import { Button, Col, Modal, Row, Tag } from 'antd'
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
  onDelete: (id: string) => void
  onUpdate: (id: string, input: UpdateVinylModel) => void
}

export function VinylListItem({
  vinyl,
  onDelete,
  onUpdate,
}: VinylListItemProps): React.JSX.Element {
  const [title, setTitle] = useState<string>(vinyl.title)
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false)

  function onCancelEdit(): void {
    setIsEditing(false)
    setTitle(vinyl.title)
  }

  function onValidateEdit(): void {
    onUpdate(vinyl.id, { title })
    setIsEditing(false)
  }

  function onConfirmDelete(): void {
    onDelete(vinyl.id)
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
          alignItems: 'center',
        }}
      >
        <Col span={10} style={{ margin: 'auto 0' }}>
          {isEditing ? (
            <input value={title} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)} />
          ) : (
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
          )}
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
        Êtes-vous sûr de vouloir supprimer <strong>{vinyl.title}</strong> ?
      </Modal>
    </>
  )
}
