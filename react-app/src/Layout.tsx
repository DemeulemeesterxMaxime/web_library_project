import { Link, useMatches, useRouterState } from '@tanstack/react-router'
import { Route as indexRoute } from './routes/index'
import { Route as aboutRoute } from './routes/about'
import { Route as vinylsRoute } from './routes/vinyls'
import { Breadcrumb, Space, type MenuProps } from 'antd'
import {
  CustomerServiceOutlined,
  HomeOutlined,
  InfoOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons'
import Menu from 'antd/es/menu/menu'

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps): React.JSX.Element {
  const pathname = useRouterState({
    select: state => state.location.pathname,
  })

  const matches = useMatches()
  const lastMatch = matches[matches.length - 1]
  const loaderTitle =
    lastMatch?.loaderData &&
    typeof lastMatch.loaderData === 'object' &&
    'title' in lastMatch.loaderData
      ? (lastMatch.loaderData as { title: string }).title
      : undefined

  const breadcrumbItems = pathname
    .split('/')
    .filter(segment => segment.length > 0)
    .map((segment, index, segments) => {
      const path = `/${segments.slice(0, index + 1).join('/')}`

      if (segment === 'vinyls') {
        return { title: <Link to="/vinyls">Vinyles</Link> }
      }

      if (segment === 'artists') {
        return { title: <a href="/artists">Artistes</a> }
      }

      if (segment === 'clients') {
        return { title: <a href="/clients">Clients</a> }
      }

      if (path.startsWith('/vinyls/')) {
        return { title: loaderTitle ?? segment }
      }

      if (path.startsWith('/artists/')) {
        return { title: loaderTitle ?? segment }
      }

      if (path.startsWith('/clients/')) {
        return { title: loaderTitle ?? segment }
      }

      return { title: segment }
    })

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
      label: <a href="/artists">Artistes</a>,
      key: 'artists',
      icon: <TeamOutlined />,
    },
    {
      label: <a href="/clients">Clients</a>,
      key: 'clients',
      icon: <UserOutlined />,
    },
    {
      label: <Link to={aboutRoute.to}>À propos</Link>,
      key: 'about',
      icon: <InfoOutlined />,
    },
  ]

  return (
    <Space direction="vertical" className="layout-shell">
      <div className="layout-header">
        <h2 className="layout-title">Sillon</h2>
        <Menu mode="horizontal" items={items} />
      </div>
      <div className="layout-content">
        <Breadcrumb
          className="layout-breadcrumb"
          items={[
            { title: <Link to={indexRoute.to}>Accueil</Link> },
            ...breadcrumbItems,
          ]}
        />
        {children}
      </div>
    </Space>
  )
}
