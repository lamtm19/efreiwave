export type SortOption = 'date' | 'titre' | 'artiste' | 'titres'

interface SortSelectProps {
  sort: SortOption
  onSortChange: (value: SortOption) => void
}

function SortSelect({ sort, onSortChange }: SortSelectProps) {
  return (
    <div>
      <label htmlFor="sort">Trier par</label>
      <select
        id="sort"
        value={sort}
        onChange={(e) => onSortChange(e.target.value as SortOption)}
      >
        <option value="date">Date</option>
        <option value="titre">Titre</option>
        <option value="artiste">Artiste</option>
        <option value="titres">Nombre de titres</option>
      </select>
    </div>
  )
}

export default SortSelect
