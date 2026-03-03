import { useEffect, useState } from 'react'
import {
  Button,
  InputNumber,
  Modal,
  Select,
  Space,
  Input,
  List,
  Avatar,
  Spin,
} from 'antd'
import { PlusOutlined, SearchOutlined } from '@ant-design/icons'
import type { CreateVinylModel } from '../VinylModel'
import { useVinylArtistsProvider } from '../providers/useVinylArtistsProvider'
import { useSpotifySearch } from '../providers/useSpotifySearch'
import type { SpotifyAlbumResult } from '../SpotifyModel'

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
  const [photo, setPhoto] = useState<string>('')
  const { artists, loadArtists } = useVinylArtistsProvider()
  const { results, isSearching, searchAlbum, clearResults } =
    useSpotifySearch()

  function onClose(): void {
    setTitle('')
    setYearReleased(null)
    setArtistId(undefined)
    setPhoto('')
    clearResults()
    setIsOpen(false)
  }

  function handleSpotifySearch(): void {
    const selectedArtist = artists.find((a) => a.id === artistId)
    const artistName = selectedArtist
      ? `${selectedArtist.firstName} ${selectedArtist.lastName}`
      : ''
    searchAlbum(title, artistName)
  }

  function handleSelectSpotifyResult(result: SpotifyAlbumResult): void {
    setPhoto(result.photo)
    setYearReleased(result.yearReleased)
    clearResults()
  }

  useEffect(() => {
    if (isOpen) {
      loadArtists()
    }
  }, [isOpen, loadArtists])

  const canSearch = title.trim().length > 0

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
              photo: photo || undefined,
            })
            onClose()
          }
        }}
        okButtonProps={{
          disabled: !artistId || title.length === 0 || !yearReleased,
        }}
        title="Nouveau vinyle"
        width={560}
      >
        <Space direction="vertical" style={{ width: '100%' }}>
          <Input
            placeholder="Titre"
            value={title}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setTitle(event.target.value)
            }
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
          <InputNumber
            style={{ width: '100%' }}
            placeholder="Année de sortie"
            min={1900}
            max={2100}
            value={yearReleased}
            onChange={(value: number | null) => setYearReleased(value)}
          />
          <Input
            placeholder="URL pochette (optionnel)"
            value={photo}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setPhoto(event.target.value)
            }
          />

          <Button
            icon={<SearchOutlined />}
            onClick={handleSpotifySearch}
            disabled={!canSearch}
            loading={isSearching}
            style={{ width: '100%' }}
          >
            Rechercher sur Spotify
          </Button>

          {isSearching && (
            <div style={{ textAlign: 'center', padding: '1rem' }}>
              <Spin size="small" />
            </div>
          )}

          {results.length > 0 && (
            <List
              size="small"
              bordered
              style={{
                backgroundColor: '#0A0A0A',
                borderColor: '#2A2A2A',
                maxHeight: '200px',
                overflowY: 'auto',
              }}
              dataSource={results}
              renderItem={(item: SpotifyAlbumResult) => (
                <List.Item
                  style={{
                    cursor: 'pointer',
                    padding: '0.5rem',
                    transition: 'background-color 0.2s ease',
                  }}
                  onClick={() => handleSelectSpotifyResult(item)}
                >
                  <List.Item.Meta
                    avatar={
                      <Avatar
                        shape="square"
                        size={40}
                        src={item.photo}
                      />
                    }
                    title={
                      <span style={{ color: '#E0E0E0' }}>{item.name}</span>
                    }
                    description={
                      <span style={{ color: '#888888' }}>
                        {item.artistName} &middot; {item.yearReleased}
                      </span>
                    }
                  />
                </List.Item>
              )}
            />
          )}
        </Space>
      </Modal>
    </>
  )
}
