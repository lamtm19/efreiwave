interface SearchBarProps {
  query: string
  onQueryChange: (value: string) => void
  onSubmit: () => void
}

function SearchBar({ query, onQueryChange, onSubmit }: SearchBarProps) {
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    onSubmit()
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="search">Recherche</label>
      <input
        id="search"
        type="text"
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
      />
      <button type="button" onClick={() => onQueryChange('')}>✕</button>
      <button type="submit">Rechercher</button>
    </form>
  )
}

export default SearchBar
