import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import PlayerBar from './PlayerBar'

function Layout() {
  return (
    <>
      <Header />
      <Outlet />
      <PlayerBar />
      <Footer />
    </>
  )
}

export default Layout
