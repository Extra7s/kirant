import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useRef } from 'react'

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const wrapper = useRef<HTMLDivElement>(null)
  const backRef = useRef<HTMLDivElement>(null)
  const frontRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!wrapper.current || !backRef.current || !frontRef.current) return

      gsap.fromTo(
        backRef.current,
        { scale: 1 },
        {
          scale: 1.6,
          transformOrigin: '50% 70%',
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
        frontRef.current,
        { yPercent: 100 },
        {
          yPercent: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: wrapper.current,
            start: 'top top',
            end: 'bottom bottom',
            scrub: true,
          },
        },
      )
    }, wrapper)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={wrapper} className="relative h-[280vh] w-full">
      <section className="sticky top-0 h-dvh w-full overflow-hidden bg-black z-10">
        <div
          ref={backRef}
          className="absolute inset-0 w-full h-full will-change-transform"
          style={{ zIndex: 0 }}
        >
          <img
            src="/images/home/hotel-front-view-6.webp"
            alt="hotel view 1"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
        <div
          ref={frontRef}
          className="absolute inset-0 w-full h-full will-change-transform"
          style={{ zIndex: 1 }}
        >
          <img
            src="/images/home/reception-1.webp"
            alt="hotel view 2"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      </section>
    </div>
  )
}
