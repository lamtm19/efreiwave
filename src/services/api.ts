import type { Album } from '../types/album'
import type { Track } from '../types/track'

export const API_BASE_URL: string = import.meta.env.VITE_API_BASE_URL

type ItunesAlbum = {
  collectionId: number
  collectionName: string
  artistName: string
  artistId: number
  artworkUrl100: string
  releaseDate: string
  primaryGenreName: string
  trackCount: number
  collectionExplicitness: string
}

function toAlbum(item: ItunesAlbum): Album {
  return {
    id: item.collectionId,
    title: item.collectionName,
    artist: item.artistName,
    artistId: item.artistId,
    cover: item.artworkUrl100.replace('100x100', '600x600'),
    releaseDate: item.releaseDate,
    genre: item.primaryGenreName,
    trackCount: item.trackCount,
    explicit: item.collectionExplicitness === 'explicit',
  }
}

type ItunesTrack = {
  wrapperType: string
  trackId: number
  trackName: string
  artistName: string
  artistId: number
  artworkUrl100: string
  trackNumber: number
  trackTimeMillis: number
  previewUrl?: string
  trackExplicitness: string
}

function toTrack(item: ItunesTrack): Track {
  return {
    id: item.trackId,
    title: item.trackName,
    artist: item.artistName,
    artistId: item.artistId,
    cover: item.artworkUrl100.replace('100x100', '600x600'),
    trackNumber: item.trackNumber,
    duration: item.trackTimeMillis,
    previewUrl: item.previewUrl ?? null,
    explicit: item.trackExplicitness === 'explicit',
  }
}

type ItunesLookupResult = ItunesAlbum & ItunesTrack & { wrapperType: string }

export async function getAlbum(
  id: string,
  signal?: AbortSignal,
): Promise<{ album: Album; tracks: Track[] } | null> {
  const url = `${API_BASE_URL}/lookup?id=${id}&entity=song&country=FR`
  const response = await fetch(url, { signal })
  if (!response.ok) throw new Error(`Erreur HTTP ${response.status}`)
  const data = await response.json() as { results: ItunesLookupResult[] }
  if (data.results.length === 0) return null
  const albumData = data.results[0]
  const album = toAlbum(albumData as unknown as ItunesAlbum)
  const tracks = data.results
    .slice(1)
    .filter((r) => r.wrapperType === 'track')
    .map((r) => toTrack(r as unknown as ItunesTrack))
  return { album, tracks }
}

type ItunesArtistResult = ItunesAlbum & { wrapperType: string }

export async function getArtist(
  id: string,
  signal?: AbortSignal,
): Promise<{ artistName: string; albums: Album[] }> {
  const url = `${API_BASE_URL}/lookup?id=${id}&entity=album&country=FR`
  const response = await fetch(url, { signal })
  if (!response.ok) throw new Error(`Erreur HTTP ${response.status}`)
  const data = await response.json() as { results: ItunesArtistResult[] }
  const artistResult = data.results[0]
  const artistName: string = artistResult?.artistName ?? 'Artiste inconnu'
  const albums = data.results
    .filter((r) => r.wrapperType === 'collection')
    .map((r) => toAlbum(r as unknown as ItunesAlbum))
  return { artistName, albums }
}

export async function searchAlbums(term: string, signal?: AbortSignal): Promise<Album[]> {
  const url = `${API_BASE_URL}/search?term=${encodeURIComponent(term)}&entity=album&country=FR&limit=24`
  const response = await fetch(url, { signal })
  if (!response.ok) {
    throw new Error(`Erreur HTTP ${response.status}`)
  }
  const data = await response.json() as { results: ItunesAlbum[] }
  return data.results.map(toAlbum)
}
