import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { ConfigProvider, theme } from 'antd'
import './index.css'

// Import the generated route tree
import { routeTree } from './routeTree.gen'

// Create a new router instance
const router = createRouter({ routeTree })

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

// Render the app
const rootElement = document.getElementById('root')!
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <StrictMode>
      <ConfigProvider
        theme={{
          algorithm: theme.darkAlgorithm,
          token: {
            colorPrimary: '#39FF14',
            colorBgBase: '#0A0A0A',
            colorBgContainer: '#1A1A1A',
            colorBorder: '#2A2A2A',
            borderRadius: 2,
            fontFamily: 'Inter, system-ui, sans-serif',
          },
        }}
      >
        <RouterProvider router={router} />
      </ConfigProvider>
    </StrictMode>,
  )
}
