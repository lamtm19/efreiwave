import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import type { Album } from '../types/album'
import { getArtist } from '../services/api'
import AlbumGrid from '../components/AlbumGrid'

function ArtistPage() {
  const { id } = useParams<{ id: string }>()
  const [loadedId, setLoadedId] = useState('')
  const [artistName, setArtistName] = useState('')
  const [albums, setAlbums] = useState<Album[]>([])
  const [error, setError] = useState<string | null>(null)

  // loading dérivé
  const loading = !!id && id !== loadedId

  useEffect(() => {
    if (!id) return
    const controller = new AbortController()

    getArtist(id, controller.signal)
      .then((result) => {
        setArtistName(result.artistName)
        setAlbums(result.albums)
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

  return (
    <main>
      <h1>{artistName}</h1>
      <AlbumGrid albums={albums} />
    </main>
  )
}

export default ArtistPage
