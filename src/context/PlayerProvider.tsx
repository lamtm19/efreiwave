import { useState, useEffect } from 'react'
import type { Track } from '../types/track'
import { PlayerContext } from './PlayerContext'

function loadLiked(): Track[] {
  try {
    const raw = localStorage.getItem('wave.liked')
    return raw ? (JSON.parse(raw) as Track[]) : []
  } catch {
    return []
  }
}

function PlayerProvider({ children }: { children: React.ReactNode }) {
  const [track, setTrack] = useState<Track | null>(null)
  const [playing, setPlaying] = useState(false)
  const [liked, setLiked] = useState<Track[]>(loadLiked)

  useEffect(() => {
    try {
      localStorage.setItem('wave.liked', JSON.stringify(liked))
    } catch {
      // ignore
    }
  }, [liked])

  function play(t: Track) {
    setTrack(t)
    setPlaying(true)
  }

  function toggle() {
    setPlaying((p) => !p)
  }

  function toggleLike(t: Track) {
    setLiked((prev) =>
      prev.some((l) => l.id === t.id)
        ? prev.filter((l) => l.id !== t.id)
        : [...prev, t],
    )
  }

  return (
    <PlayerContext value={{ track, playing, liked, play, toggle, toggleLike }}>
      {children}
    </PlayerContext>
  )
}

export default PlayerProvider
