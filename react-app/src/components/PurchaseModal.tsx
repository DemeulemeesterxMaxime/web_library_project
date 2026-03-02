import { useEffect, useState } from 'react'
import { Button, DatePicker, Modal, Select, Space } from 'antd'
import { ShoppingCartOutlined } from '@ant-design/icons'
import { useSaleProvider } from '../clients/providers/useSaleProvider'
import type { Dayjs } from 'dayjs'

interface PurchaseModalProps {
  vinylId: string
  onSaleCreated?: () => void
}

export function PurchaseModal({
  vinylId,
  onSaleCreated,
}: PurchaseModalProps): React.JSX.Element {
  const { clients, loadClients, createSale } = useSaleProvider()
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null)
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null)

  useEffect(() => {
    if (isOpen) {
      loadClients()
    }
  }, [isOpen, loadClients])

  function onClose(): void {
    setSelectedClientId(null)
    setSelectedDate(null)
    setIsOpen(false)
  }

  function onConfirm(): void {
    if (selectedClientId && selectedDate) {
      createSale(selectedClientId, vinylId, selectedDate.toISOString())
      if (onSaleCreated) {
        onSaleCreated()
      }
      onClose()
    }
  }

  return (
    <>
      <Button
        icon={<ShoppingCartOutlined />}
        type="primary"
        onClick={() => setIsOpen(true)}
      >
        Enregistrer une vente
      </Button>
      <Modal
        open={isOpen}
        onCancel={onClose}
        onOk={onConfirm}
        okButtonProps={{
          disabled: selectedClientId === null || selectedDate === null,
        }}
        title="Enregistrer une vente"
        okText="Confirmer"
        cancelText="Annuler"
      >
        <Space direction="vertical" style={{ width: '100%' }}>
          <Select
            placeholder="Sélectionner un client"
            style={{ width: '100%' }}
            value={selectedClientId}
            onChange={(value: string) => setSelectedClientId(value)}
            options={clients.map(client => ({
              label: `${client.firstName} ${client.lastName}`,
              value: client.id,
            }))}
          />
          <DatePicker
            style={{ width: '100%' }}
            placeholder="Date d'achat"
            value={selectedDate}
            onChange={(date: Dayjs | null) => setSelectedDate(date)}
          />
        </Space>
      </Modal>
    </>
  )
}
