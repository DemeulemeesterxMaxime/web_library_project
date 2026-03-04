import { useState } from 'react'
import { Avatar, Button, Input, List, Modal, Space, Spin } from 'antd'
import { PlusOutlined, SearchOutlined } from '@ant-design/icons'
import type { CreateArtistModel } from '../ArtistModel'
import { useSpotifyArtistSearch } from '../providers/useSpotifyArtistSearch'
import type { SpotifyArtistResult } from '../../vinyls/SpotifyModel'

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
  const { results, isSearching, searchError, searchArtist, clearResults } =
    useSpotifyArtistSearch()

  function onClose(): void {
    setFirstName('')
    setLastName('')
    setPhoto('')
    clearResults()
    setIsOpen(false)
  }

  function handleSpotifySearch(): void {
    const query = `${firstName} ${lastName}`.trim()
    void searchArtist(query)
  }

  function handleSelectSpotifyResult(result: SpotifyArtistResult): void {
    setPhoto(result.photo)
    setFirstName(result.name)
    setLastName('')
    clearResults()
  }

  const canSearch = firstName.trim().length > 0 || lastName.trim().length > 0

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
          disabled: firstName.length === 0,
        }}
        title="Nouvel artiste"
        width={560}
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

          {searchError && (
            <div style={{ color: '#FF4444', padding: '0.5rem 0' }}>
              Erreur Spotify : {searchError}
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
              renderItem={(item: SpotifyArtistResult) => (
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
                      <Avatar shape="square" size={40} src={item.photo} />
                    }
                    title={
                      <span style={{ color: '#E0E0E0' }}>{item.name}</span>
                    }
                    description={
                      <span style={{ color: '#888888' }}>
                        {(item.genres ?? []).slice(0, 3).join(', ')}
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
