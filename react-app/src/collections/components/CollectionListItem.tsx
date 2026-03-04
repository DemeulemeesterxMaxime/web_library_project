import { useState } from 'react'
import type { CollectionModel, UpdateCollectionModel } from '../CollectionModel'
import { Button, Col, Input, Modal, Row, Tag } from 'antd'
import {
  CheckOutlined,
  CloseOutlined,
  DeleteOutlined,
  EditOutlined,
  CustomerServiceOutlined,
} from '@ant-design/icons'
import { Link } from '@tanstack/react-router'

interface CollectionListItemProps {
  collection: CollectionModel
  onDelete: (id: string) => void
  onUpdate: (id: string, input: UpdateCollectionModel) => void
}

export function CollectionListItem({
  collection,
  onDelete,
  onUpdate,
}: CollectionListItemProps): React.JSX.Element {
  const [name, setName] = useState<string>(collection.name)
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false)

  function onCancelEdit(): void {
    setIsEditing(false)
    setName(collection.name)
  }

  function onValidateEdit(): void {
    onUpdate(collection.id, { name })
    setIsEditing(false)
  }

  function onConfirmDelete(): void {
    onDelete(collection.id)
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
        <Col
          span={14}
          style={{
            margin: 'auto 0',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          {collection.photo && (
            <img
              src={collection.photo}
              alt={collection.name}
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '4px',
                objectFit: 'cover',
              }}
            />
          )}
          {isEditing ? (
            <Input
              value={name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setName(e.target.value)
              }
              placeholder="Nom de la collection"
            />
          ) : (
            <Link
              to="/collections/$collectionId"
              params={{ collectionId: collection.id }}
              style={{ margin: 'auto 0' }}
            >
              <span style={{ fontWeight: 'bold' }}>{collection.name}</span>
              <Tag
                color="green"
                icon={<CustomerServiceOutlined />}
                style={{ marginLeft: '0.5rem' }}
              >
                {collection.vinyls.length}
              </Tag>
              <span
                style={{
                  color: '#888888',
                  fontSize: '0.85rem',
                  marginLeft: '0.5rem',
                }}
              >
                {collection.client.firstName} {collection.client.lastName}
              </span>
            </Link>
          )}
        </Col>
        <Col>
          {isEditing ? (
            <span style={{ display: 'flex', gap: '.5rem' }}>
              <Button type="primary" onClick={onValidateEdit}>
                <CheckOutlined />
              </Button>
              <Button onClick={onCancelEdit}>
                <CloseOutlined />
              </Button>
            </span>
          ) : (
            <span style={{ display: 'flex', gap: '.5rem' }}>
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
            </span>
          )}
        </Col>
      </Row>
      <Modal
        open={isDeleteModalOpen}
        onOk={onConfirmDelete}
        onCancel={() => setIsDeleteModalOpen(false)}
        title="Confirmer la suppression"
        okText="Supprimer"
        cancelText="Annuler"
        okButtonProps={{ danger: true }}
      >
        Êtes-vous sûr de vouloir supprimer la collection « {collection.name} » ?
      </Modal>
    </>
  )
}
