import { gsap } from 'gsap'
import { useEffect, useRef, useState, type PointerEvent } from 'react'
import { reels } from '../data/site'

export default function ReelsSection() {
  const [active, setActive] = useState(0)
  const [progress, setProgress] = useState(0)
  const [muted, setMuted] = useState(true)
  const [liked, setLiked] = useState<Record<number, boolean>>({})
  const [dragX, setDragX] = useState(0)
  const [dragging, setDragging] = useState(false)
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const startX = useRef(0)
  const moved = useRef(false)

  useEffect(() => {
    setProgress(0)
    videoRefs.current.forEach((video, index) => {
      if (!video) return
      if (index === active) {
        video.currentTime = 0
        video.muted = muted
        void video.play().catch(() => {})
      } else {
        video.pause()
      }
    })
  }, [active])

  useEffect(() => {
    const video = videoRefs.current[active]
    if (video) video.muted = muted
  }, [muted, active])

  const next = () => setActive((current) => (current + 1) % reels.length)
  const previous = () =>
    setActive((current) => (current - 1 + reels.length) % reels.length)

  useEffect(() => {
    cardRefs.current.forEach((card, index) => {
      if (!card) return

      let offset = index - active
      const half = Math.floor(reels.length / 2)
      if (offset < -half) offset += reels.length
      if (offset > half) offset -= reels.length
      const isActive = offset === 0
      const visible = Math.abs(offset) <= 2
      const zIndex = isActive ? 20 : Math.abs(offset) === 1 ? 10 : 5

      gsap.to(card, {
        x: `calc(${115 * offset}% + ${dragX}px)`,
        scale: isActive ? 1 : 0.88,
        opacity: visible ? 1 : 0,
        filter: isActive ? 'brightness(1)' : 'brightness(0.35)',
        duration: dragging ? 0.05 : 0.8,
        ease: dragging ? 'none' : 'power3.out',
        zIndex,
        overwrite: true,
      })
    })
  }, [active, dragX, dragging])

  const endDrag = (event: PointerEvent<HTMLDivElement>) => {
    if (!dragging) return
    setDragging(false)
    event.currentTarget.releasePointerCapture(event.pointerId)
    if (dragX < -60) next()
    else if (dragX > 60) previous()
    setDragX(0)
  }

  return (
    <div className="bg-black text-white">
      <div className="text-center pad-x py-8">
        <h1 className="text-[9vw] md:text-[6vw] xl:text-[3.5vw] leading-[1.1] xl:w-[60vw] mx-auto">
          Each moment is different and that makes them unique.
        </h1>
      </div>
      <section className="relative h-[90svh] md:h-[80svh] xl:h-svh w-full overflow-hidden flex items-center justify-center select-none py-8 !px-0">
        <div
          onPointerDown={(event) => {
            if (event.button !== 0 && event.pointerType === 'mouse') return
            setDragging(true)
            startX.current = event.clientX
            moved.current = false
            event.currentTarget.setPointerCapture(event.pointerId)
          }}
          onPointerMove={(event) => {
            if (!dragging) return
            const delta = event.clientX - startX.current
            setDragX(delta)
            if (Math.abs(delta) > 10) moved.current = true
          }}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          className="relative w-full h-[70vh] md:h-[60vh] xl:h-[80vh] flex items-center justify-center select-none cursor-grab active:cursor-grabbing touch-pan-y"
        >
          {reels.map((reel, index) => {
            let offset = index - active
            const half = Math.floor(reels.length / 2)
            if (offset < -half) offset += reels.length
            if (offset > half) offset -= reels.length
            const isActive = offset === 0
            const zIndex = isActive ? 20 : Math.abs(offset) === 1 ? 10 : 5

            return (
              <div
                key={reel}
                ref={(element) => {
                  cardRefs.current[index] = element
                }}
                onClick={() => {
                  if (moved.current) return
                  if (offset === -1) previous()
                  if (offset === 1) next()
                }}
                className={`absolute w-[65vw] md:w-[50vw] xl:w-[25vw] h-full overflow-hidden shrink-0 ${
                  isActive ? '' : 'cursor-pointer'
                }`}
                style={{ zIndex }}
              >
                <video
                  ref={(element) => {
                    videoRefs.current[index] = element
                  }}
                  src={reel}
                  playsInline
                  muted={muted}
                  onEnded={isActive ? next : undefined}
                  onTimeUpdate={
                    isActive
                      ? (event) => {
                          const video = event.currentTarget
                          if (video.duration) {
                            setProgress((video.currentTime / video.duration) * 100)
                          }
                        }
                      : undefined
                  }
                  className="w-full h-[111.11%] object-cover object-top absolute top-0 left-0 pointer-events-none"
                />

                {isActive && (
                  <>
                    <div
                      onPointerDown={(event) => event.stopPropagation()}
                      className="absolute bottom-4 inset-x-4 flex items-center gap-1.5 z-30"
                    >
                      {reels.map((bar, barIndex) => (
                        <div
                          key={bar}
                          onClick={(event) => {
                            event.stopPropagation()
                            setActive(barIndex)
                          }}
                          className="flex-1 h-[0.8vw] max-h-[3px] bg-white/30 rounded-full overflow-hidden relative cursor-pointer"
                        >
                          {barIndex === active ? (
                            <div
                              className="h-full bg-white transition-all duration-75"
                              style={{ width: `${progress}%` }}
                            />
                          ) : barIndex < active ? (
                            <div className="h-full bg-white/80" />
                          ) : null}
                        </div>
                      ))}
                    </div>

                    <div className="absolute bottom-8 right-4 space-y-4">
                      <button
                        onClick={(event) => {
                          event.stopPropagation()
                          setLiked((current) => ({
                            ...current,
                            [active]: !current[active],
                          }))
                        }}
                        onPointerDown={(event) => event.stopPropagation()}
                        aria-label={liked[active] ? 'Unlike Reel' : 'Like Reel'}
                        className="size-[8vw] md:size-[4.5vw] lg:size-[2.5vw] rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white transition-all duration-300 hover:bg-black/60 cursor-pointer group"
                      >
                        <svg
                          className={`size-[4.5vw] md:size-[3vw] lg:size-[1.2vw] transition-all duration-300 group-active:scale-90 ${
                            liked[active]
                              ? 'fill-red-500 text-red-500 scale-110'
                              : 'fill-none text-white'
                          }`}
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                          />
                        </svg>
                      </button>

                      <button
                        onClick={(event) => {
                          event.stopPropagation()
                          setMuted((current) => !current)
                        }}
                        onPointerDown={(event) => event.stopPropagation()}
                        aria-label={muted ? 'Unmute Video' : 'Mute Video'}
                        className="size-[8vw] md:size-[4.5vw] lg:size-[2.5vw] rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white transition-colors duration-200 hover:bg-black/60 cursor-pointer"
                      >
                        {muted ? (
                          <svg
                            className="size-[4.5vw] md:size-[3vw] lg:size-[1vw]"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"
                            />
                          </svg>
                        ) : (
                          <svg
                            className="size-[4.5vw] md:size-[3vw] lg:size-[1vw]"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                            />
                          </svg>
                        )}
                      </button>
                    </div>
                  </>
                )}
              </div>
            )
          })}
        </div>

        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex items-center gap-6 z-110">
          <button
            onClick={previous}
            aria-label="Previous Reel"
            className="size-12 rounded-full border border-white/30 bg-black/40 backdrop-blur-md flex items-center justify-center text-white hover:border-secondary hover:text-secondary hover:bg-black/60 transition-all duration-300 cursor-pointer shadow-lg"
          >
            <svg
              className="size-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            onClick={next}
            aria-label="Next Reel"
            className="size-12 rounded-full border border-white/30 bg-black/40 backdrop-blur-md flex items-center justify-center text-white hover:border-secondary hover:text-secondary hover:bg-black/60 transition-all duration-300 cursor-pointer shadow-lg"
          >
            <svg
              className="size-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </section>
    </div>
  )
}
