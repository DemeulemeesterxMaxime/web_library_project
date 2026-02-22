import { Link } from '@tanstack/react-router'
import { Route as indexRoute } from './routes/index'
import { Route as aboutRoute } from './routes/about'
import { Route as vinylsRoute } from './routes/vinyls'
import { Space, type MenuProps } from 'antd'
import { CustomerServiceOutlined, HomeOutlined, InfoOutlined } from '@ant-design/icons'
import Menu from 'antd/es/menu/menu'

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps): React.JSX.Element {
  const items: Required<MenuProps>['items'] = [
    {
      label: <Link to={indexRoute.to}>Accueil</Link>,
      key: 'home',
      icon: <HomeOutlined />,
    },
    {
      label: <Link to={vinylsRoute.to}>Vinyles</Link>,
      key: 'vinyls',
      icon: <CustomerServiceOutlined />,
    },
    {
      label: <Link to={aboutRoute.to}>À propos</Link>,
      key: 'about',
      icon: <InfoOutlined />,
    },
  ]

  return (
    <Space
      direction="vertical"
      style={{
        width: '100%',
        height: '100vh',
      }}
    >
      <div
        style={{
          textAlign: 'left',
          width: '100%',
          backgroundColor: '#0A0A0A',
          color: '#E0E0E0',
        }}
      >
        <h2 style={{ marginTop: '0' }}>Sillon</h2>
        <Menu mode="horizontal" items={items} />
      </div>
      <div style={{ width: '100%', overflowY: 'scroll' }}>{children}</div>
    </Space>
  )
}
