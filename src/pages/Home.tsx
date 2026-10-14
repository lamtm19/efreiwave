import { useState, useEffect } from 'react'
import AlbumGrid from '../components/AlbumGrid'
import SearchBar from '../components/SearchBar'
import GenreFilter from '../components/GenreFilter'
import SortSelect from '../components/SortSelect'
import type { SortOption } from '../components/SortSelect'
import type { Album } from '../types/album'
import { searchAlbums } from '../services/api'
import staticAlbums from '../data/albums'

const ALL_GENRES = 'Tous les genres'

function Home() {
  const [query, setQuery] = useState('')
  const [term, setTerm] = useState('')
  const [loadedTerm, setLoadedTerm] = useState('')
  const [genre, setGenre] = useState(ALL_GENRES)
  const [sort, setSort] = useState<SortOption>('date')
  const [albums, setAlbums] = useState<Album[]>([])
  const [error, setError] = useState<string | null>(null)

  // loading se déduit : vrai tant que term soumis ≠ term reçu (et pas d'erreur)
  const loading = term !== '' && term !== loadedTerm && error === null

  useEffect(() => {
    if (term === '') return

    const controller = new AbortController()

    searchAlbums(term, controller.signal)
      .then((results) => {
        setAlbums(results)
        setLoadedTerm(term)
      })
      .catch((err: unknown) => {
        if (err instanceof Error && err.name === 'AbortError') return
        setError(err instanceof Error ? err.message : 'Erreur inconnue')
        setLoadedTerm(term)
      })

    return () => controller.abort()
  }, [term])

  const source = term === '' ? staticAlbums : albums

  const filtered = [...source]
    .filter((album) => genre === ALL_GENRES || album.genre === genre)
    .sort((a, b) => {
      if (sort === 'titre') return a.title.localeCompare(b.title)
      if (sort === 'artiste') return a.artist.localeCompare(b.artist)
      if (sort === 'titres') return b.trackCount - a.trackCount
      return a.releaseDate.localeCompare(b.releaseDate)
    })

  function handleSearch() {
    setError(null)
    setLoadedTerm('')
    setTerm(query)
  }

  function reset() {
    setQuery('')
    setTerm('')
    setLoadedTerm('')
    setGenre(ALL_GENRES)
    setSort('date')
    setAlbums([])
    setError(null)
  }

  return (
    <main>
        <div>
          <SearchBar query={query} onQueryChange={setQuery} onSubmit={handleSearch} />
          <GenreFilter genre={genre} onGenreChange={setGenre} albums={source} />
          <SortSelect sort={sort} onSortChange={setSort} />
          <button type="button" onClick={reset}>Réinitialiser</button>
        </div>

        {loading && <p>Chargement…</p>}
        {error && <p>Erreur : {error}</p>}

        {!loading && !error && term !== '' && (
          <p>{filtered.length} album{filtered.length !== 1 ? 's' : ''} pour « {term} »</p>
        )}

        {!loading && !error && <AlbumGrid albums={filtered} />}
      </main>
  )
}

export default Home
