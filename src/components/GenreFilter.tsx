import type { Album } from '../types/album'

interface GenreFilterProps {
  genre: string
  onGenreChange: (value: string) => void
  albums: Album[]
}

function GenreFilter({ genre, onGenreChange, albums }: GenreFilterProps) {
  const genres = ['Tous les genres', ...new Set(albums.map((a) => a.genre))]

  return (
    <div>
      <label htmlFor="genre">Genre</label>
      <select
        id="genre"
        value={genre}
        onChange={(e) => onGenreChange(e.target.value)}
      >
        {genres.map((g) => (
          <option key={g} value={g}>
            {g}
          </option>
        ))}
      </select>
    </div>
  )
}

export default GenreFilter
