import { useRef, useEffect } from 'react'
import { usePlayer } from '../context/PlayerContext'

function PlayerBar() {
  const { track, playing, toggle } = usePlayer()
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    if (playing) {
      audio.play().catch(() => {})
    } else {
      audio.pause()
    }
  }, [playing, track])

  if (track === null) return null

  return (
    <div className="player-bar">
      <img src={track.cover} alt={track.title} width={48} height={48} />
      <div>
        <p>{track.title}</p>
        <p>{track.artist}</p>
      </div>
      <button type="button" onClick={toggle}>
        {playing ? '⏸' : '▶'}
      </button>
      <audio
        ref={audioRef}
        src={track.previewUrl ?? undefined}
      />
    </div>
  )
}

export default PlayerBar
