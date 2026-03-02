import { useEffect, useState } from 'react'
import { Button, Input, List, Skeleton, Space, Typography } from 'antd'
import {
  ArrowLeftOutlined,
  CheckOutlined,
  CloseOutlined,
  EditOutlined,
} from '@ant-design/icons'
import { Link } from '@tanstack/react-router'
import { useClientDetailsProvider } from '../providers/useClientDetailsProvider'
import httpClient from '../../api/httpClient'
import type { UpdateClientModel } from '../ClientModel'

interface ClientDetailsProps {
  id: string
}

export function ClientDetails({ id }: ClientDetailsProps): React.JSX.Element {
  const { isLoading, client, sales, loadClient } = useClientDetailsProvider(id)
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [editFirstName, setEditFirstName] = useState<string>('')
  const [editLastName, setEditLastName] = useState<string>('')
  const [editEmail, setEditEmail] = useState<string>('')
  const [editPhoto, setEditPhoto] = useState<string>('')

  useEffect(() => {
    loadClient()
  }, [loadClient])

  function startEditing(): void {
    if (client) {
      setEditFirstName(client.firstName)
      setEditLastName(client.lastName)
      setEditEmail(client.email ?? '')
      setEditPhoto(client.photo ?? '')
      setIsEditing(true)
    }
  }

  function cancelEditing(): void {
    setIsEditing(false)
  }

  function saveEditing(): void {
    const updateData: UpdateClientModel = {
      firstName: editFirstName,
      lastName: editLastName,
      ...(editEmail.length > 0 ? { email: editEmail } : {}),
      ...(editPhoto.length > 0 ? { photo: editPhoto } : {}),
    }
    httpClient
      .patch(`/clients/${id}`, updateData)
      .then(() => {
        setIsEditing(false)
        loadClient()
      })
      .catch(() => undefined)
  }

  if (isLoading) {
    return <Skeleton active />
  }

  return (
    <Space direction="vertical" style={{ textAlign: 'left', width: '95%' }}>
      <Link to="/clients">
        <ArrowLeftOutlined /> Retour aux clients
      </Link>
      {client?.photo && (
        <img
          src={client.photo}
          alt={`${client.firstName} ${client.lastName}`}
          style={{ width: '200px', borderRadius: '4px' }}
        />
      )}
      {isEditing ? (
        <Space direction="vertical" style={{ width: '100%' }}>
          <Input
            value={editFirstName}
            onChange={e => setEditFirstName(e.target.value)}
            placeholder="Prénom"
          />
          <Input
            value={editLastName}
            onChange={e => setEditLastName(e.target.value)}
            placeholder="Nom"
          />
          <Input
            value={editEmail}
            onChange={e => setEditEmail(e.target.value)}
            placeholder="Email (optionnel)"
          />
          <Input
            value={editPhoto}
            onChange={e => setEditPhoto(e.target.value)}
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
        <>
          <Space align="center">
            <Typography.Title level={1} style={{ margin: 0 }}>
              {client?.firstName} {client?.lastName}
            </Typography.Title>
            <Button
              type="text"
              icon={<EditOutlined />}
              onClick={startEditing}
            />
          </Space>
          {client?.email && (
            <Typography.Text type="secondary">{client.email}</Typography.Text>
          )}
        </>
      )}
      <Typography.Title level={3} style={{ marginTop: '1.5rem' }}>
        Achats
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
              <Space>
                <Link to="/vinyls/$vinylId" params={{ vinylId: sale.vinylId }}>
                  {sale.vinyl.title}
                </Link>
                {sale.vinyl.artist && (
                  <Typography.Text type="secondary">
                    par {sale.vinyl.artist.firstName}{' '}
                    {sale.vinyl.artist.lastName}
                  </Typography.Text>
                )}
              </Space>
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
