import { useState } from 'react'
import type { ClientModel, UpdateClientModel } from '../ClientModel'
import { Button, Col, Modal, Row, Tag } from 'antd'
import {
  CheckOutlined,
  CloseOutlined,
  DeleteOutlined,
  EditOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons'
import { Link } from '@tanstack/react-router'

interface ClientListItemProps {
  client: ClientModel
  onDelete: (id: string) => void
  onUpdate: (id: string, input: UpdateClientModel) => void
}

export function ClientListItem({
  client,
  onDelete,
  onUpdate,
}: ClientListItemProps): React.JSX.Element {
  const [firstName, setFirstName] = useState<string>(client.firstName)
  const [lastName, setLastName] = useState<string>(client.lastName)
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false)

  function onCancelEdit(): void {
    setIsEditing(false)
    setFirstName(client.firstName)
    setLastName(client.lastName)
  }

  function onValidateEdit(): void {
    onUpdate(client.id, { firstName, lastName })
    setIsEditing(false)
  }

  function onConfirmDelete(): void {
    onDelete(client.id)
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
        <Col span={14} style={{ margin: 'auto 0' }}>
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
              to="/clients/$clientId"
              params={{ clientId: client.id }}
              style={{ margin: 'auto 0' }}
            >
              <span style={{ fontWeight: 'bold' }}>
                {client.firstName} {client.lastName}
              </span>
              {client.email && (
                <span style={{ color: '#888888', marginLeft: '.5rem' }}>
                  {client.email}
                </span>
              )}
            </Link>
          )}
        </Col>
        <Col span={4} style={{ margin: 'auto 0' }}>
          {client.salesCount !== undefined && (
            <Tag icon={<ShoppingCartOutlined />} color="green">
              {client.salesCount}
            </Tag>
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
          {client.firstName} {client.lastName}
        </strong>{' '}
        ?
      </Modal>
    </>
  )
}
