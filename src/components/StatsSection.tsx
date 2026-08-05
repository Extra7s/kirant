import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useRef } from 'react'
import { stats } from '../data/site'

gsap.registerPlugin(ScrollTrigger)

export default function StatsSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>('.stat-card')

      cards.forEach((card, index) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            delay: index * 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 84%',
              once: true,
            },
          },
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="w-full py-8">
      <div className="w-full">
        <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-8">
          {stats.map((stat) => (
            <div
              key={stat.unit}
              className="stat-card group bg-accent p-6 border border-black/5 flex flex-col justify-between gap-4"
            >
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="font-display text-[8vw] md:text-[6vw] xl:text-[4vw] tracking-tight">
                    {stat.number}
                  </span>
                  <span className="text-[4vw] md:text-[2vw] xl:text-[1.25vw] text-gray-700 font-medium">
                    {stat.unit}
                  </span>
                </div>
              </div>
              <p className="text-[3.5vw] md:text-[2vw] xl:text-[1vw] text-gray-600 font-normal leading-relaxed">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
