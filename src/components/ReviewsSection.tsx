import { gsap } from 'gsap'
import { useEffect, useRef, useState } from 'react'
import { reviews } from '../data/site'

export default function ReviewsSection() {
  const [index, setIndex] = useState(0)
  const review = reviews[index]
  const imageRef = useRef<HTMLDivElement>(null)
  const quoteRef = useRef<HTMLParagraphElement>(null)
  const nameRef = useRef<HTMLDivElement>(null)
  const metaRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const tl = gsap.timeline()

    tl.fromTo(
      imageRef.current,
      { clipPath: 'inset(0% 0% 100% 0%)', y: -40, opacity: 0.85 },
      { clipPath: 'inset(0% 0% 0% 0%)', y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
    )

    if (quoteRef.current) {
      const characters = Array.from(quoteRef.current.children)
      tl.fromTo(
        characters,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.01,
          stagger: 0.004,
          ease: 'none',
        },
        '<',
      )
    }

    tl.fromTo(
      nameRef.current,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' },
      '-=0.15',
    )
    tl.fromTo(
      metaRef.current,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' },
      '-=0.1',
    )

    if (progressRef.current) {
      gsap.to(progressRef.current, {
        width: `${((index + 1) / reviews.length) * 100}%`,
        duration: 0.4,
        ease: 'power2.inOut',
      })
    }

    return () => {
      tl.kill()
    }
  }, [index])

  return (
    <section className="bg-black overflow-hidden">
      <div className="text-[8vw] md:text-[6vw] xl:text-[3.5vw] leading-[1.1] xl:w-[70%] mx-auto text-center py-8 space-y-2 text-white">
        <h2>
          What Our Guests <br /> Are Saying
        </h2>
      </div>

      <div className="flex flex-col md:flex-row items-stretch justify-between gap-8 lg:gap-16">
        <div className="w-[30%] xl:w-[45%] mx-auto md:mr-auto relative aspect-square md:aspect-4/5 xl:aspect-6/5 bg-zinc-900 overflow-hidden shrink-0">
          <div
            ref={imageRef}
            className="absolute inset-0 w-full h-full z-10"
          >
            <img
              src={review.image}
              alt={review.name}
              className={`absolute inset-0 w-full h-full object-cover ${
                index === 3 ? 'object-center' : 'object-[center_10%]'
              }`}
            />
          </div>
        </div>

        <div className="w-full lg:w-[55%] flex flex-col text-center md:text-left justify-between py-2 lg:py-6">
          <div>
            <p
              ref={quoteRef}
              key={`quote-${index}`}
              className="text-[4vw] md:text-[2.2vw] xl:text-[1.5vw] leading-relaxed text-white/95"
            >
              {review.quote.split('').map((character, position) => (
                <span key={position}>{character}</span>
              ))}
            </p>

            <div className="mt-8">
              <div
                ref={nameRef}
                className="text-[4vw] md:text-[2.4vw] xl:text-[1.2vw] font-medium text-white tracking-wide"
              >
                {review.name}
              </div>
              <div
                ref={metaRef}
                className="text-[3.5vw] md:text-[2vw] xl:text-[0.8vw] text-zinc-400 mt-1"
              >
                {review.date}
              </div>
            </div>
          </div>

          <div className="mt-12 lg:mt-auto pt-6 flex flex-col gap-6">
            <div className="flex justify-center md:justify-start items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              {reviews.map((thumbnail, position) => {
                const isActive = position === index
                return (
                  <button
                    key={thumbnail.name}
                    onClick={() => setIndex(position)}
                    className={`relative group shrink-0 flex items-center justify-center transition-all duration-500 cursor-pointer ${
                      isActive ? 'p-1.5' : 'p-0'
                    }`}
                  >
                    {isActive && (
                      <div className="absolute inset-0 border border-white pointer-events-none" />
                    )}
                    <div
                      className={`relative overflow-hidden transition-all duration-500 ${
                        isActive
                          ? 'size-[8vw] md:size-[5vw] xl:size-[3.5vw] opacity-100'
                          : 'size-[7vw] md:size-[4vw] xl:size-[3vw] opacity-50 hover:opacity-90'
                      }`}
                    >
                      <img
                        src={thumbnail.image}
                        alt={thumbnail.name}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    </div>
                  </button>
                )
              })}
            </div>

            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between text-zinc-400">
                <div className="text-[3.5vw] md:text-[2vw] xl:text-[0.8vw] font-mono tracking-widest">
                  {String(index + 1).padStart(2, '0')} /{' '}
                  {String(reviews.length).padStart(2, '0')}
                </div>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() =>
                      setIndex(
                        (current) => (current - 1 + reviews.length) % reviews.length,
                      )
                    }
                    aria-label="Previous Review"
                    className="text-white hover:text-secondary transition-colors text-[3.5vw] md:text-[2vw] xl:text-[1vw] px-2 py-1 cursor-pointer"
                  >
                    ←
                  </button>
                  <button
                    onClick={() =>
                      setIndex((current) => (current + 1) % reviews.length)
                    }
                    aria-label="Next Review"
                    className="text-white hover:text-secondary transition-colors text-[3.5vw] md:text-[2vw] xl:text-[1vw] px-2 py-1 cursor-pointer"
                  >
                    →
                  </button>
                </div>
              </div>
              <div className="w-full h-[1px] bg-zinc-800 relative overflow-hidden">
                <div
                  ref={progressRef}
                  className="absolute top-0 left-0 h-full bg-white"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
