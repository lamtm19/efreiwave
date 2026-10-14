import { createContext, useContext } from 'react'
import type { Track } from '../types/track'

export type PlayerContextValue = {
  track: Track | null
  playing: boolean
  liked: Track[]
  play: (track: Track) => void
  toggle: () => void
  toggleLike: (track: Track) => void
}

export const PlayerContext = createContext<PlayerContextValue | null>(null)

export function usePlayer(): PlayerContextValue {
  const ctx = useContext(PlayerContext)
  if (ctx === null) {
    throw new Error('usePlayer must be used inside PlayerProvider')
  }
  return ctx
}
