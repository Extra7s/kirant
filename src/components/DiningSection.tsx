import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useRef } from 'react'

gsap.registerPlugin(ScrollTrigger)

export default function DiningSection() {
  const wrapper = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)
  const topWordRef = useRef<HTMLDivElement>(null)
  const bottomWordRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!wrapper.current || !imageRef.current || !topWordRef.current || !bottomWordRef.current) return

      gsap.fromTo(
        imageRef.current,
        { scale: 0 },
        {
          scale: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: wrapper.current,
            start: 'top top',
            end: 'bottom bottom',
            scrub: true,
          },
        },
      )

      gsap.fromTo(
        topWordRef.current,
        { yPercent: 0 },
        {
          yPercent: -120,
          ease: 'none',
          scrollTrigger: {
            trigger: wrapper.current,
            start: 'top top',
            end: 'center center',
            scrub: true,
          },
        },
      )

      gsap.fromTo(
        bottomWordRef.current,
        { yPercent: 0 },
        {
          yPercent: 120,
          ease: 'none',
          scrollTrigger: {
            trigger: wrapper.current,
            start: 'top top',
            end: 'center center',
            scrub: true,
          },
        },
      )
    }, wrapper)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={wrapper} className="relative h-[250vh] w-full bg-black">
      <section className="sticky top-0 w-full h-svh overflow-hidden flex items-center justify-center !p-0">
        <div className="absolute inset-0 w-full h-full overflow-hidden z-10 pointer-events-none">
          <div className="relative w-full h-full">
            <img
              ref={imageRef}
              src="/images/dining/dining-1.webp"
              alt="Exquisite Dining"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-8 z-20 pointer-events-none select-none text-center">
          <div className="overflow-hidden">
            <div
              ref={topWordRef}
              className="text-[12vw] sm:text-[8vw] xl:text-[5.5vw] font-display uppercase tracking-[0.25em] leading-none text-white"
            >
              Exquisite
            </div>
          </div>
          <div className="overflow-hidden">
            <div
              ref={bottomWordRef}
              className="text-[12vw] sm:text-[8vw] xl:text-[5.5vw] font-display uppercase tracking-[0.25em] leading-none text-white"
            >
              Dining
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
