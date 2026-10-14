import { NavLink } from 'react-router-dom'

function Header() {
  return (
    <header>
      <span className="logo">🎵 Efrei Wave</span>
      <nav>
        <NavLink to="/" end>Accueil</NavLink>
        <NavLink to="/profile">Profil</NavLink>
      </nav>
    </header>
  )
}

export default Header
