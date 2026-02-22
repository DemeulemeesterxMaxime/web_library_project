import { useState } from 'react'
import type { VinylModel, UpdateVinylModel } from '../VinylModel'
import { Button, Col, Row } from 'antd'
import {
  CheckOutlined,
  CloseOutlined,
  DeleteOutlined,
  EditOutlined,
} from '@ant-design/icons'
import { Link } from '@tanstack/react-router'

interface VinylListItemProps {
  vinyl: VinylModel
  onDelete: (id: string) => void
  onUpdate: (id: string, input: UpdateVinylModel) => void
}

export function VinylListItem({ vinyl, onDelete, onUpdate }: VinylListItemProps): React.JSX.Element {
  const [title, setTitle] = useState<string>(vinyl.title)
  const [isEditing, setIsEditing] = useState<boolean>(false)

  function onCancelEdit(): void {
    setIsEditing(false)
    setTitle(vinyl.title)
  }

  function onValidateEdit(): void {
    onUpdate(vinyl.id, { title })
    setIsEditing(false)
  }

  return (
    <Row
      style={{
        width: '100%',
        height: '50px',
        borderRadius: '10px',
        backgroundColor: '#1A1A1A',
        margin: '1rem 0',
        padding: '.25rem',
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <Col span={12} style={{ margin: 'auto 0' }}>
        {isEditing ? (
          <input value={title} onChange={(e) => setTitle(e.target.value)} />
        ) : (
          <Link
            to={'/vinyls/$vinylId'}
            params={{ vinylId: vinyl.id }}
            style={{
              margin: 'auto 0',
              textAlign: 'left',
            }}
          >
            <span style={{ fontWeight: 'bold' }}>{vinyl.title}</span> -{' '}
            {vinyl.yearReleased}
          </Link>
        )}
      </Col>
      <Col span={9} style={{ margin: 'auto 0' }}>
        par <span style={{ fontWeight: 'bold' }}>{vinyl.artist.firstName}</span>{' '}
        <span style={{ fontWeight: 'bold' }}>{vinyl.artist.lastName}</span>
      </Col>
      <Col
        span={3}
        style={{
          alignItems: 'right',
          display: 'flex',
          gap: '.25rem',
          margin: 'auto 0',
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
        <Button type="primary" danger onClick={() => onDelete(vinyl.id)}>
          <DeleteOutlined />
        </Button>
      </Col>
    </Row>
  )
}
