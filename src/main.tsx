import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './styles/base.css'
import PlayerProvider from './context/PlayerProvider'
import Layout from './components/Layout'
import Home from './pages/Home'
import Profile from './pages/Profile'
import AlbumPage from './pages/AlbumPage'
import ArtistPage from './pages/ArtistPage'
import NotFound from './pages/NotFound'

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: '/profile', element: <Profile /> },
      { path: '/album/:id', element: <AlbumPage /> },
      { path: '/artist/:id', element: <ArtistPage /> },
      { path: '*', element: <NotFound /> },
    ],
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PlayerProvider>
      <RouterProvider router={router} />
    </PlayerProvider>
  </StrictMode>,
)
