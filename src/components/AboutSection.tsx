import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useRef } from 'react'

gsap.registerPlugin(ScrollTrigger)

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!textRef.current || !imageRef.current) return

      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: textRef.current,
            start: 'top 82%',
            once: true,
          },
        },
      )

      gsap.fromTo(
        imageRef.current,
        { opacity: 0, clipPath: 'inset(0% 0% 100% 0%)' },
        {
          opacity: 1,
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: 1.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: imageRef.current,
            start: 'top 82%',
            once: true,
          },
        },
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="h-auto flex justify-center items-center">
      <div className="w-full grid grid-cols-1 xl:grid-cols-2 gap-8">
        <div ref={textRef} className="space-y-4">
          <div className="space-y-2">
            <h2 className="uppercase text-[9vw] md:text-[6vw] xl:text-[3vw] text-primary leading-[1.1]">
              A Legendary Welcome
              <br />
              Every Time
            </h2>
          </div>
          <div className="xl:w-[80%] space-y-4">
            <p className="text-[4vw] md:text-[3vw] xl:text-[1.2vw]">
              Welcome to Kirant Hotel, where creativity meets functionality to
              craft spaces that inspire. With a passion for design and a
              commitment to excellence, we transform ordinary spaces into
              extraordinary experiences.
            </p>
            <p className="text-[4vw] md:text-[3vw] xl:text-[1.2vw]">
              From our architectural spaces that honor local craft to our
              meticulously designed culinary and wellness journeys, we invite you
              to immerse yourself in a legacy of warmth and unforgettable
              elegance.
            </p>
          </div>
          <a
            href="/about"
            aria-label="About Us"
            className="w-fit px-12 xl:px-4! py-2 transition-all duration-500 cursor-pointer text-[4vw] md:text-[3vw] xl:text-[1vw] font-medium inline-flex items-center justify-center gap-2 bg-primary text-white hover:bg-primary/90 border-2 border-primary"
          >
            <span>About Us</span>
          </a>
        </div>

        <div
          ref={imageRef}
          className="relative min-h-[60vw] xl:min-h-full"
        >
          <img
            src="/images/home/reception-3.webp"
            alt="Kirant Hotel reception"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  )
}
