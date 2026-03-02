import { useState } from 'react'
import { Button, Input, Modal, Space } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import type { CreateArtistModel } from '../ArtistModel'

interface CreateArtistModalProps {
  onCreate: (artist: CreateArtistModel) => void
}

export function CreateArtistModal({
  onCreate,
}: CreateArtistModalProps): React.JSX.Element {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [firstName, setFirstName] = useState<string>('')
  const [lastName, setLastName] = useState<string>('')
  const [photo, setPhoto] = useState<string>('')

  function onClose(): void {
    setFirstName('')
    setLastName('')
    setPhoto('')
    setIsOpen(false)
  }

  return (
    <>
      <Button
        icon={<PlusOutlined />}
        type="primary"
        onClick={() => setIsOpen(true)}
      >
        Ajouter un artiste
      </Button>
      <Modal
        open={isOpen}
        onCancel={onClose}
        onOk={() => {
          onCreate({
            firstName,
            lastName,
            ...(photo.length > 0 ? { photo } : {}),
          })
          onClose()
        }}
        okButtonProps={{
          disabled: firstName.length === 0 || lastName.length === 0,
        }}
        title="Nouvel artiste"
      >
        <Space direction="vertical" style={{ width: '100%' }}>
          <Input
            type="text"
            placeholder="Prénom"
            value={firstName}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setFirstName(event.target.value)
            }
          />
          <Input
            type="text"
            placeholder="Nom"
            value={lastName}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setLastName(event.target.value)
            }
          />
          <Input
            type="text"
            placeholder="URL photo (optionnel)"
            value={photo}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setPhoto(event.target.value)
            }
          />
        </Space>
      </Modal>
    </>
  )
}
