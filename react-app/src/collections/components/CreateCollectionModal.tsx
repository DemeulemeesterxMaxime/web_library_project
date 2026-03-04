import { useState } from 'react'
import { Button, Modal, Input, Select, Space } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import type { CreateCollectionModel } from '../CollectionModel'
import type { ClientModel } from '../../clients/ClientModel'
import { useClientProvider } from '../../clients/providers/useClientProvider'

interface CreateCollectionModalProps {
  onCreate: (collection: CreateCollectionModel) => void
}

export function CreateCollectionModal({
  onCreate,
}: CreateCollectionModalProps): React.JSX.Element {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [name, setName] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [clientId, setClientId] = useState<string>('')
  const { clients } = useClientProvider()

  function onClose(): void {
    setName('')
    setDescription('')
    setClientId('')
    setIsOpen(false)
  }

  return (
    <>
      <Button
        icon={<PlusOutlined />}
        type="primary"
        onClick={() => setIsOpen(true)}
      >
        Nouvelle collection
      </Button>
      <Modal
        open={isOpen}
        onCancel={onClose}
        onOk={() => {
          onCreate({
            name,
            clientId,
            ...(description.length > 0 ? { description } : {}),
          })
          onClose()
        }}
        okButtonProps={{
          disabled: name.length === 0 || clientId.length === 0,
        }}
        title="Nouvelle collection"
      >
        <Space direction="vertical" style={{ width: '100%' }}>
          <Input
            type="text"
            placeholder="Nom de la collection"
            value={name}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setName(event.target.value)
            }
          />
          <Input
            type="text"
            placeholder="Description (optionnel)"
            value={description}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setDescription(event.target.value)
            }
          />
          <Select
            placeholder="Sélectionner un client"
            value={clientId.length > 0 ? clientId : undefined}
            onChange={(value: string) => setClientId(value)}
            style={{ width: '100%' }}
            options={clients.map((client: ClientModel) => ({
              label: `${client.firstName} ${client.lastName}`,
              value: client.id,
            }))}
          />
        </Space>
      </Modal>
    </>
  )
}
