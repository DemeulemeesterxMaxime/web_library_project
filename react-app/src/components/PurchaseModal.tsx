import { useState } from 'react'
import { Button, DatePicker, Modal, Select, Space } from 'antd'
import { ShoppingCartOutlined } from '@ant-design/icons'
import dayjs from 'dayjs'
import type { ClientModel } from '../clients/ClientModel'
import { useClientProvider } from '../clients/providers/useClientProvider'
import { useSaleProvider } from '../clients/providers/useSaleProvider'

interface PurchaseModalProps {
  vinylId: string
  onSaleCreated: () => void
}

export function PurchaseModal({
  vinylId,
  onSaleCreated,
}: PurchaseModalProps): React.JSX.Element {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null)
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs | null>(dayjs())
  const { clients } = useClientProvider()
  const { createSale } = useSaleProvider()

  function onClose(): void {
    setSelectedClientId(null)
    setSelectedDate(dayjs())
    setIsOpen(false)
  }

  function handleOk(): void {
    if (selectedClientId && selectedDate) {
      createSale({
        clientId: selectedClientId,
        vinylId,
        date: selectedDate.toISOString(),
      })
        .then(() => {
          onSaleCreated()
          onClose()
        })
        .catch(() => undefined)
    }
  }

  const clientOptions = clients.map((client: ClientModel) => ({
    label: `${client.firstName} ${client.lastName}`,
    value: client.id,
  }))

  return (
    <>
      <Button icon={<ShoppingCartOutlined />} onClick={() => setIsOpen(true)}>
        Enregistrer un achat
      </Button>
      <Modal
        open={isOpen}
        onCancel={onClose}
        onOk={handleOk}
        okButtonProps={{
          disabled: selectedClientId === null || selectedDate === null,
        }}
        title="Enregistrer un achat"
      >
        <Space direction="vertical" style={{ width: '100%' }}>
          <Select
            style={{ width: '100%' }}
            placeholder="Sélectionner un client"
            options={clientOptions}
            value={selectedClientId}
            onChange={(value: string) => setSelectedClientId(value)}
          />
          <DatePicker
            style={{ width: '100%' }}
            value={selectedDate}
            onChange={(date: dayjs.Dayjs | null) => setSelectedDate(date)}
            format="DD/MM/YYYY"
          />
        </Space>
      </Modal>
    </>
  )
}
