import { useEffect, useState } from 'react'
import { Button, Input, List, Select, Skeleton, Space, Typography } from 'antd'
import {
  ArrowLeftOutlined,
  CheckOutlined,
  CloseOutlined,
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
} from '@ant-design/icons'
import { Link } from '@tanstack/react-router'
import { useCollectionDetailsProvider } from '../providers/useCollectionDetailsProvider'
import httpClient from '../../api/httpClient'
import type { AxiosResponse } from 'axios'
import type { UpdateCollectionModel } from '../CollectionModel'
import type { VinylModel } from '../../vinyls/VinylModel'

interface GetVinylsResponse {
  data: VinylModel[]
  totalCount: number
}

interface CollectionDetailsProps {
  id: string
}

export function CollectionDetails({
  id,
}: CollectionDetailsProps): React.JSX.Element {
  const { isLoading, collection, loadCollection, addVinyl, removeVinyl } =
    useCollectionDetailsProvider(id)
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [editName, setEditName] = useState<string>('')
  const [editDescription, setEditDescription] = useState<string>('')
  const [allVinyls, setAllVinyls] = useState<VinylModel[]>([])
  const [selectedVinylId, setSelectedVinylId] = useState<string>('')

  useEffect(() => {
    loadCollection()
  }, [loadCollection])

  useEffect(() => {
    httpClient
      .get<GetVinylsResponse>('/vinyls')
      .then((response: AxiosResponse<GetVinylsResponse>) => {
        setAllVinyls(response.data.data)
      })
      .catch(() => undefined)
  }, [])

  function startEditing(): void {
    if (collection) {
      setEditName(collection.name)
      setEditDescription(collection.description ?? '')
      setIsEditing(true)
    }
  }

  function cancelEditing(): void {
    setIsEditing(false)
  }

  function saveEditing(): void {
    const updateData: UpdateCollectionModel = {
      name: editName,
      ...(editDescription.length > 0 ? { description: editDescription } : {}),
    }
    httpClient
      .patch(`/collections/${id}`, updateData)
      .then(() => {
        setIsEditing(false)
        loadCollection()
      })
      .catch(() => undefined)
  }

  function handleAddVinyl(): void {
    if (selectedVinylId.length > 0) {
      addVinyl(selectedVinylId)
      setSelectedVinylId('')
    }
  }

  if (isLoading) {
    return <Skeleton active />
  }

  const existingVinylIds = collection?.vinyls.map(v => v.id) ?? []
  const availableVinyls = allVinyls.filter(
    v => !existingVinylIds.includes(v.id),
  )

  return (
    <Space direction="vertical" style={{ textAlign: 'left', width: '95%' }}>
      <Link to="/collections">
        <ArrowLeftOutlined /> Retour aux collections
      </Link>
      {collection?.photo && (
        <img
          src={collection.photo}
          alt={collection.name}
          style={{ width: '200px', borderRadius: '4px' }}
        />
      )}
      {isEditing ? (
        <Space direction="vertical" style={{ width: '100%' }}>
          <Input
            value={editName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEditName(e.target.value)
            }
            placeholder="Nom de la collection"
          />
          <Input
            value={editDescription}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEditDescription(e.target.value)
            }
            placeholder="Description (optionnel)"
          />
          <Space>
            <Button
              type="primary"
              icon={<CheckOutlined />}
              onClick={saveEditing}
              disabled={editName.length === 0}
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
              {collection?.name}
            </Typography.Title>
            <Button
              type="text"
              icon={<EditOutlined />}
              onClick={startEditing}
            />
          </Space>
          {collection?.description && (
            <Typography.Text type="secondary">
              {collection.description}
            </Typography.Text>
          )}
          <Typography.Text type="secondary">
            par {collection?.client.firstName} {collection?.client.lastName}
          </Typography.Text>
        </>
      )}

      <Typography.Title level={3} style={{ marginTop: '1.5rem' }}>
        Vinyles de la collection
      </Typography.Title>

      <Space>
        <Select
          placeholder="Ajouter un vinyle"
          value={selectedVinylId.length > 0 ? selectedVinylId : undefined}
          onChange={(value: string) => setSelectedVinylId(value)}
          style={{ width: '300px' }}
          options={availableVinyls.map(vinyl => ({
            label: `${vinyl.title} — ${vinyl.artist.firstName} ${vinyl.artist.lastName}`,
            value: vinyl.id,
          }))}
        />
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleAddVinyl}
          disabled={selectedVinylId.length === 0}
        >
          Ajouter
        </Button>
      </Space>

      {collection?.vinyls.length === 0 ? (
        <Typography.Text type="secondary">
          Aucun vinyle dans cette collection.
        </Typography.Text>
      ) : (
        <List
          dataSource={collection?.vinyls ?? []}
          renderItem={vinyl => (
            <List.Item
              actions={[
                <Button
                  key="remove"
                  type="text"
                  danger
                  icon={<DeleteOutlined />}
                  onClick={() => removeVinyl(vinyl.id)}
                >
                  Retirer
                </Button>,
              ]}
            >
              <Space>
                {vinyl.photo && (
                  <img
                    src={vinyl.photo}
                    alt={vinyl.title}
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '4px',
                      objectFit: 'cover',
                    }}
                  />
                )}
                <Link to="/vinyls/$vinylId" params={{ vinylId: vinyl.id }}>
                  {vinyl.title}
                </Link>
              </Space>
            </List.Item>
          )}
        />
      )}
    </Space>
  )
}
