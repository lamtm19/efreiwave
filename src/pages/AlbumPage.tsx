import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import type { Album } from '../types/album'
import type { Track } from '../types/track'
import { getAlbum } from '../services/api'
import { formatDuration } from '../utils/format'
import { usePlayer } from '../context/PlayerContext'

function AlbumPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { play, toggleLike, liked } = usePlayer()
  const [loadedId, setLoadedId] = useState('')
  const [album, setAlbum] = useState<Album | null>(null)
  const [tracks, setTracks] = useState<Track[]>([])
  const [error, setError] = useState<string | null>(null)

  const loading = !!id && id !== loadedId

  useEffect(() => {
    if (!id) return
    const controller = new AbortController()

    getAlbum(id, controller.signal)
      .then((result) => {
        setAlbum(result?.album ?? null)
        setTracks(result?.tracks ?? [])
        setError(null)
        setLoadedId(id)
      })
      .catch((err: unknown) => {
        if (err instanceof Error && err.name === 'AbortError') return
        setError(err instanceof Error ? err.message : 'Erreur inconnue')
        setLoadedId(id)
      })

    return () => controller.abort()
  }, [id])

  if (loading) return <main><p>Chargement…</p></main>
  if (error) return <main><p>Erreur : {error}</p></main>
  if (!album) {
    return (
      <main>
        <p>Album introuvable.</p>
        <Link to="/">Retour à l'accueil</Link>
      </main>
    )
  }

  const year = album.releaseDate.slice(0, 4)

  return (
    <main>
      <button type="button" onClick={() => navigate(-1)}>← Retour</button>
      <img src={album.cover} alt={album.title} width={300} height={300} />
      <h1>{album.title}</h1>
      <p>
        <Link to={`/artist/${album.artistId}`}>{album.artist}</Link>
        {' — '}{year}
      </p>
      <ol>
        {tracks.map((track) => {
          const isLiked = liked.some((l) => l.id === track.id)
          return (
            <li key={track.id}>
              <button type="button" onClick={() => play(track)}>▶</button>
              <button type="button" onClick={() => toggleLike(track)}>
                {isLiked ? '❤️' : '🤍'}
              </button>
              <span>{track.trackNumber}. {track.title}</span>
              <span>{formatDuration(track.duration)}</span>
            </li>
          )
        })}
      </ol>
    </main>
  )
}

export default AlbumPage
