import { useEffect, useRef, useState } from 'react'

export default function ScrollIndicator({ hidden = false }: { hidden?: boolean }) {
  const [isScrolling, setIsScrolling] = useState(false)
  const [atBottom, setAtBottom] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const timeout = useRef<number | null>(null)

  useEffect(() => {
    const onScroll = () => {
      setScrollY(window.scrollY)
      setIsScrolling(true)
      if (timeout.current) clearTimeout(timeout.current)
      timeout.current = window.setTimeout(() => setIsScrolling(false), 1000)

      const footer = document.getElementById('footer')
      const docHeight = document.documentElement.scrollHeight
      const footerHeight = footer?.getBoundingClientRect().height ?? 0
      setAtBottom(
        window.scrollY + window.innerHeight >= docHeight - footerHeight - 50,
      )
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    const initial = window.setTimeout(onScroll, 100)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (timeout.current) clearTimeout(timeout.current)
      clearTimeout(initial)
    }
  }, [])

  const invisible = hidden || (isScrolling && scrollY > 0) || atBottom

  return (
    <div
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-100 flex flex-col items-center gap-2 pointer-events-none mix-blend-difference transition-opacity duration-500 ${
        invisible ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <svg
        width="40"
        height="65"
        viewBox="0 0 40 65"
        fill="none"
        strokeWidth="1.5"
        className="w-10 h-[65px]"
      >
        <path
          d="M 20,2 L 8,9 L 8,23 L 20,30 L 32,23 L 32,9 Z M 20,30 L 20,60"
          className="stroke-white/50"
          strokeWidth="1"
        />
        <path
          d="M 20,2 L 8,9 L 8,23 L 20,30 L 20,60"
          className="stroke-secondary scroll-beam"
          strokeLinecap="round"
        />
        <path
          d="M 20,2 L 32,9 L 32,23 L 20,30 L 20,60"
          className="stroke-secondary scroll-beam"
          strokeLinecap="round"
        />
      </svg>
      <span className="text-white text-[3vw] md:text-[1.4vw] xl:text-[0.6vw] tracking-[0.25em] uppercase -mt-2 pointer-events-none">
        Scroll Down
      </span>
    </div>
  )
}
