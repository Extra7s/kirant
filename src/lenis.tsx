import Lenis from 'lenis'
import { useEffect, useRef, useState, type ReactNode } from 'react'
import { LenisContext } from './lenis-context'

export function LenisProvider({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    const instance = new Lenis({
      duration: 1.2,
      smoothWheel: true,
      touchMultiplier: 1.5,
    })

    const raf = (time: number) => {
      instance.raf(time)
      rafRef.current = requestAnimationFrame(raf)
    }
    rafRef.current = requestAnimationFrame(raf)
    setLenis(instance)

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      instance.destroy()
      setLenis(null)
    }
  }, [])

  const scrollToTop = () => lenis?.scrollTo(0, { duration: 1.2 })

  return (
    <LenisContext.Provider value={{ lenis, scrollToTop }}>
      {children}
    </LenisContext.Provider>
  )
}
