import { useEffect, useState } from 'react'
import { Button, InputNumber, Modal, Select, Space, Input } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import type { CreateVinylModel } from '../VinylModel'
import { useVinylArtistsProvider } from '../providers/useVinylArtistsProvider'

interface CreateVinylModalProps {
  onCreate: (vinyl: CreateVinylModel) => void
}

export function CreateVinylModal({
  onCreate,
}: CreateVinylModalProps): React.JSX.Element {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [title, setTitle] = useState<string>('')
  const [yearReleased, setYearReleased] = useState<number | null>(null)
  const [artistId, setArtistId] = useState<string | undefined>(undefined)
  const { artists, loadArtists } = useVinylArtistsProvider()

  function onClose(): void {
    setTitle('')
    setYearReleased(null)
    setArtistId(undefined)
    setIsOpen(false)
  }

  useEffect(() => {
    if (isOpen) {
      loadArtists()
    }
  }, [isOpen, loadArtists])

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
          if (artistId && yearReleased) {
            onCreate({
              title,
              yearReleased,
              artistId,
            })
            onClose()
          }
        }}
        okButtonProps={{
          disabled: !artistId || title.length === 0 || !yearReleased,
        }}
        title="Nouveau vinyle"
      >
        <Space direction="vertical" style={{ width: '100%' }}>
          <Input
            placeholder="Titre"
            value={title}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => setTitle(event.target.value)}
          />
          <Select
            style={{ width: '100%' }}
            placeholder="Artiste"
            options={artists.map(artist => ({
              label: `${artist.firstName} ${artist.lastName}`,
              value: artist.id,
            }))}
            onChange={(value: string) => setArtistId(value)}
          />
          <InputNumber
            style={{ width: '100%' }}
            placeholder="Année de sortie"
            min={1900}
            max={2100}
            value={yearReleased}
            onChange={(value: number | null) => setYearReleased(value)}
          />
        </Space>
      </Modal>
    </>
  )
}
