import { gsap } from 'gsap'
import { useEffect, useRef, useState } from 'react'
import { hexagonClipPath, keyholePath, preloadAssets } from '../data/site'
import { useLenis } from '../lenis-context'
import Button from './ui/Button'

const Digit = ({ value }: { value: string }) => {
  const digitRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (!digitRef.current) return
    gsap.to(digitRef.current, {
      yPercent: -(Number(value) * 10),
      duration: 0.12,
      ease: 'power2.out',
    })
  }, [value])

  return (
    <span className="relative inline-block overflow-hidden h-[1em] w-[0.6em]">
      <span
        ref={digitRef}
        className="absolute top-0 left-0 right-0 flex flex-col items-center"
        style={{ height: '1000%' }}
      >
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((digit) => (
          <span
            key={digit}
            className="h-[10%] flex items-center justify-center select-none"
          >
            {digit}
          </span>
        ))}
      </span>
    </span>
  )
}

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const { lenis } = useLenis()
  const [unlocking, setUnlocking] = useState(false)
  const [opening, setOpening] = useState(false)
  const [visible, setVisible] = useState(true)
  const [progress, setProgress] = useState(0)
  const progressMap = useRef<Record<string, number>>({})
  const [keyhole, setKeyhole] = useState({ x: 0, y: 0, width: 0, height: 0 })
  const overlayRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<SVGSVGElement>(null)
  const revealRef = useRef<HTMLDivElement>(null)
  const keybarRef = useRef<HTMLDivElement>(null)
  const buttonsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const measure = () => {
      const vw = window.innerWidth
      const vh = window.innerHeight
      const width = vw >= 1280 ? vw * 0.3 : vw * 0.7
      const height = (768 / 1376) * width
      setKeyhole({ x: (vw - width) / 2, y: (vh - height) / 2, width, height })
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  useEffect(() => {
    if (visible) {
      lenis?.stop()
      window.scrollTo(0, 0)
      document.body.style.overflow = 'hidden'
    } else {
      lenis?.start()
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [visible, lenis])

  useEffect(() => {
    let cancelled = false

    const track = async (url: string) => {
      const controller = new AbortController()
      const timeout = setTimeout(() => controller.abort(), 15000)
      try {
        const response = await fetch(url, { signal: controller.signal })
        clearTimeout(timeout)
        const length = Number(response.headers.get('content-length') ?? 0)
        const reader = length ? response.body?.getReader() : null
        if (!reader) {
          await response.blob()
          if (!cancelled) progressMap.current[url] = 100
          return
        }
        let received = 0
        for (;;) {
          const { done, value } = await reader.read()
          if (done) break
          received += value?.length ?? 0
          if (!cancelled) {
            progressMap.current[url] = Math.min(
              100,
              Math.round((received / length) * 100),
            )
          }
        }
        if (!cancelled) progressMap.current[url] = 100
      } catch {
        clearTimeout(timeout)
        if (!cancelled) progressMap.current[url] = 100
      }
    }

    preloadAssets.forEach((asset) => {
      progressMap.current[asset] = 0
      void track(asset)
    })

    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      const values = Object.values(progressMap.current)
      const loaded = values.length
        ? Math.round(
            values.reduce((total, value) => total + value, 0) /
              preloadAssets.length,
          )
        : 0
      setProgress((current) => {
        if (current >= 100) {
          clearInterval(interval)
          return 100
        }
        return Math.min(current + 1, loaded)
      })
    }, 20)
    return () => clearInterval(interval)
  }, [])


  useEffect(() => {
    if (!overlayRef.current) return

    gsap.to(overlayRef.current, {
      opacity: opening ? 0 : 1,
      duration: 1,
      delay: opening ? 0 : 1.2,
      ease: 'power2.inOut',
      onComplete: () => {
        if (opening) {
          setVisible(false)
          onComplete()
        }
      },
    })
  }, [opening, onComplete])

  useEffect(() => {
    if (!logoRef.current) return

    gsap.to(logoRef.current, {
      scale: opening ? 25 : 1,
      duration: 2.8,
      ease: 'power3.out',
    })
  }, [opening])

  useEffect(() => {
    if (!revealRef.current) return

    gsap.to(revealRef.current, {
      scale: opening ? 25 : 1,
      opacity: 1,
      duration: 2.8,
      ease: 'power3.out',
    })
  }, [opening])

  useEffect(() => {
    if (!keybarRef.current) return

    gsap.to(keybarRef.current, {
      rotate: unlocking ? 90 : 0,
      duration: 3.6,
      ease: 'elastic.out(1, 0.25)',
      transformOrigin: 'top right',
    })
  }, [unlocking])

  const loaded = progress >= 100

  useEffect(() => {
    if (!buttonsRef.current) return

    gsap.fromTo(
      buttonsRef.current,
      { opacity: 0, y: 20 },
      {
        opacity: loaded ? 1 : 0,
        y: loaded ? 0 : 20,
        duration: 0.6,
        ease: 'power2.out',
        display: loaded ? 'flex' : 'none',
      },
    )
  }, [loaded])

  const enter = () => {
    setUnlocking(true)
    setTimeout(() => setOpening(true), 900)
  }

  if (!visible) return null

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-250 bg-transparent flex flex-col items-center justify-center overflow-hidden select-none"
    >
      <svg className="pointer-events-none absolute inset-0 w-full h-full z-0">
        <defs>
          <mask
            id="keyhole-punch"
            maskUnits="userSpaceOnUse"
            maskContentUnits="userSpaceOnUse"
          >
            <rect x="0" y="0" width="100%" height="100%" fill="white" />
            <svg
              viewBox="0 0 1376 768"
              x={keyhole.x}
              y={keyhole.y}
              width={keyhole.width}
              height={keyhole.height}
              preserveAspectRatio="none"
              className="overflow-visible"
            >
              <path d={keyholePath} fill="black" />
            </svg>
          </mask>
          <clipPath id="hexagon-clip" clipPathUnits="objectBoundingBox">
            <path d={hexagonClipPath} />
          </clipPath>
        </defs>
      </svg>

      <svg
        ref={logoRef}
        className="absolute inset-0 w-full h-full z-0 pointer-events-none"
      >
        <rect
          width="100%"
          height="100%"
          fill="#f3dfc1"
          mask={loaded ? 'url(#keyhole-punch)' : undefined}
        />
      </svg>

      <div
        ref={revealRef}
        className="relative flex items-center justify-center w-full h-full z-10 pointer-events-none"
      >
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] xl:w-[30vw] pointer-events-none"
          style={{ aspectRatio: '1376/768' }}
        >
          <div
            className="absolute inset-0 z-10"
            style={{ clipPath: 'url(#hexagon-clip)' }}
          >
            <div
              ref={keybarRef}
              className="absolute bg-black z-10 origin-top-right"
              style={{
                top: '24.089%',
                left: '43.314%',
                width: '13.445%',
                height: '53.906%',
              }}
            />
          </div>
          <div className="absolute inset-0 z-20 pointer-events-none">
            <img
              src="/images/key-hole-1.webp"
              alt="Sculpted brass keyhole cover plate"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {!loaded && (
        <div className="absolute inset-0 flex items-end z-30 pointer-events-none bg-[#F3DFC1]">
          <div className="flex items-center justify-center text-[20vw] md:text-[15vw] xl:text-[10vw] font-display font-light text-primary leading-none tracking-tight">
            {String(progress)
              .padStart(3, '0')
              .split('')
              .map((digit, index) => (
                <Digit key={index} value={digit} />
              ))}
            <span className="select-none">%</span>
          </div>
        </div>
      )}

      <div className="absolute bottom-[10vh] z-40 flex flex-col items-center justify-center min-h-[120px] w-full">
        {loaded && !opening && (
          <div
            ref={buttonsRef}
            className="flex flex-col items-center gap-4"
          >
            <Button
              label="Discover the Stay"
              onClick={enter}
              className="xl:px-12!"
            />
            <Button
              label="Silent Entrance"
              variant="outline"
              onClick={enter}
              className="px-14! xl:px-14! xl:py-1.5!"
            />
          </div>
        )}
      </div>
    </div>
  )
}
