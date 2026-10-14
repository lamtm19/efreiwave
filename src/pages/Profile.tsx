import { usePlayer } from '../context/PlayerContext'
import { formatDuration } from '../utils/format'

function Profile() {
  const { liked, play } = usePlayer()

  return (
    <main>
      <h1>Profil</h1>
      <h2>Titres likés</h2>
      {liked.length === 0 ? (
        <p>Aucun titre liké pour l'instant.</p>
      ) : (
        <ol>
          {liked.map((track) => (
            <li key={track.id}>
              <button type="button" onClick={() => play(track)}>▶</button>
              <span>{track.title}</span>
              <span>{track.artist}</span>
              <span>{formatDuration(track.duration)}</span>
            </li>
          ))}
        </ol>
      )}
    </main>
  )
}

export default Profile
