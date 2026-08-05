import { gsap } from 'gsap'
import { useEffect, useRef, useState } from 'react'
import { rooms } from '../data/site'
import Button from './ui/Button'

export default function RoomShowcase() {
  const [index, setIndex] = useState(0)
  const active = rooms[index]
  const slideRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    const currentSlide = slideRef.current
    const currentImage = imageRef.current
    const currentTitle = titleRef.current

    const tl = gsap.timeline()
    tl.fromTo(
      currentSlide,
      { clipPath: 'inset(100% 0% 0% 0%)' },
      {
        clipPath: 'inset(0% 0% 0% 0%)',
        duration: 1.2,
        ease: 'power3.out',
      },
    )
    tl.fromTo(
      currentImage,
      { scale: 1.1 },
      { scale: 1, duration: 1.2, ease: 'power3.out' },
      '<',
    )
    tl.fromTo(
      currentTitle,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.6, delay: 0.4, ease: 'power2.out' },
      '-=0.4',
    )

    return () => {
      tl.kill()
    }
  }, [index])

  const go = (direction: number) =>
    setIndex((current) => (current + direction + rooms.length) % rooms.length)

  return (
    <section className="h-[60svh] xl:h-svh w-full relative overflow-hidden !p-0">
      <div
        ref={slideRef}
        className="absolute inset-0 w-full h-full overflow-hidden"
      >
        <img
          ref={imageRef}
          src={active.image}
          alt={active.title}
          className="absolute inset-0 object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10" />
      </div>

      <div className="absolute bottom-4 md:bottom-8 lg:bottom-16 left-4 md:left-8 lg:left-16 xl:left-24 z-30 max-w-[90vw] md:max-w-[50vw] xl:max-w-[30vw] w-full">
        <div className="bg-accent p-4 flex flex-col justify-between">
          <div>
            <h3
              ref={titleRef}
              className="text-[4.5vw] md:text-[2.5vw] xl:text-[1.75vw] text-primary tracking-wide"
            >
              {active.title}
            </h3>
          </div>

          <div className="mt-6 pt-4 border-t border-gray-200 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => go(-1)}
                aria-label="Previous Slide"
                className="size-[8vw] md:size-[4vw] xl:size-[2vw] rotate-45 border border-zinc-400 flex items-center justify-center transition-colors duration-200 hover:border-primary hover:bg-primary/5 hover:text-primary cursor-pointer text-gray-700"
              >
                <svg
                  className="size-[4vw] md:size-[2vw] xl:size-[1vw] -rotate-45"
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
                onClick={() => go(1)}
                aria-label="Next Slide"
                className="size-[8vw] md:size-[4vw] xl:size-[2vw] rotate-45 border border-zinc-400 flex items-center justify-center transition-colors duration-200 hover:border-primary hover:bg-primary/5 hover:text-primary cursor-pointer text-gray-700"
              >
                <svg
                  className="size-[4vw] md:size-[2vw] xl:size-[1vw] -rotate-45"
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
              <div className="flex items-center gap-1.5 ml-2">
                {rooms.map((room, dot) => (
                  <div
                    key={room.title}
                    className={`h-1.5 transition-all duration-300 ${
                      dot === index ? 'w-4 bg-primary' : 'w-1.5 bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>

            <Button
              label="Reserve Now"
              variant="outline"
              className="px-6! text-[3.5vw]! md:text-[2vw]! xl:text-[0.8vw]!"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
