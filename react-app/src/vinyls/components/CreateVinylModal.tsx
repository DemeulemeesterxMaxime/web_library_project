import { useEffect, useState } from 'react'
import type { CreateVinylModel } from '../VinylModel'
import { Button, Input, Modal, Select, Space } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { useVinylArtistsProvider } from '../providers/useVinylArtistsProvider'

interface CreateVinylModalProps {
  onCreate: (vinyl: CreateVinylModel) => void
}

export function CreateVinylModal({ onCreate }: CreateVinylModalProps): React.JSX.Element {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [title, setTitle] = useState<string>('')
  const [yearReleased, setYearReleased] = useState<number>(0)
  const [artistId, setArtistId] = useState<string | undefined>(undefined)
  const { artists, loadArtists } = useVinylArtistsProvider()

  function onClose(): void {
    setTitle('')
    setYearReleased(0)
    setArtistId(undefined)
    setIsOpen(false)
  }

  useEffect(() => {
    if (isOpen) {
      loadArtists()
    }
  }, [isOpen])

  return (
    <>
      <Button
        icon={<PlusOutlined />}
        type="primary"
        onClick={() => setIsOpen(true)}
      >
        Ajouter un vinyle
      </Button>
      <Modal
        open={isOpen}
        onCancel={onClose}
        onOk={() => {
          if (artistId) {
            onCreate({
              title,
              yearReleased,
              artistId,
            })
            onClose()
          }
        }}
        okButtonProps={{
          disabled: !artistId || !title?.length || !yearReleased,
        }}
      >
        <Space direction="vertical" style={{ width: '100%' }}>
          <Input
            type="text"
            placeholder="Titre"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Select
            style={{ width: '100%' }}
            placeholder="Artiste"
            options={artists.map((artist) => ({
              label: `${artist.firstName} ${artist.lastName}`,
              value: artist.id,
            }))}
            onChange={(value: string) => setArtistId(value)}
          />
          <Input
            type="number"
            placeholder="Année de sortie"
            value={yearReleased}
            onChange={(e) => setYearReleased(Number(e.target.value))}
          />
        </Space>
      </Modal>
    </>
  )
}
