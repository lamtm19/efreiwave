import type { Album } from '../types/album'
import AlbumCard from './AlbumCard'

interface AlbumGridProps {
  albums: Album[]
}

function AlbumGrid({ albums }: AlbumGridProps) {
  if (albums.length === 0) {
    return <p>Aucun album</p>
  }

  return (
    <div className="album-grid">
      {albums.map((album) => (
        <AlbumCard key={album.id} album={album} />
      ))}
    </div>
  )
}

export default AlbumGrid
