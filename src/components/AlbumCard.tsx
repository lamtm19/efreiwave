import { Link } from 'react-router-dom'
import type { Album } from '../types/album'

interface AlbumCardProps {
  album: Album
}

function Badge({ explicit }: { explicit: boolean }) {
  return explicit ? <span>E</span> : null
}

function AlbumCard({ album }: AlbumCardProps) {
  const cover = album.cover || 'https://placehold.co/300x300'

  return (
    <Link to={`/album/${album.id}`}>
      <img src={cover} alt={album.title} width={300} height={300} />
      <p>{album.title}</p>
      <p>{album.artist}</p>
      <Badge explicit={album.explicit} />
      {album.trackCount > 0 && <span>{album.trackCount} titres</span>}
    </Link>
  )
}

export default AlbumCard
