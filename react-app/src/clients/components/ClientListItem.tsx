import { useState } from 'react'
import type { ClientModel, UpdateClientModel } from '../ClientModel'
import { Button, Col, Modal, Row, Tag } from 'antd'
import {
  CheckOutlined,
  CloseOutlined,
  DeleteOutlined,
  EditOutlined,
  ShoppingOutlined,
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
              {client.salesCount !== undefined && client.salesCount > 0 && (
                <Tag
                  color="green"
                  icon={<ShoppingOutlined />}
                  style={{ marginLeft: '0.5rem' }}
                >
                  {client.salesCount}
                </Tag>
              )}
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
        Êtes-vous sûr de vouloir supprimer le client « {client.firstName}{' '}
        {client.lastName} » ?
      </Modal>
    </>
  )
}
