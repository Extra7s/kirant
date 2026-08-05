import { gsap } from 'gsap'
import { useEffect, useRef, useState } from 'react'
import FloorPlanMenu from './FloorPlanMenu'

function AudioToggle({ className = '' }: { className?: string }) {
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    const enabled = localStorage.getItem('audioPreference') === 'on'
    setPlaying(enabled)
  }, [])

  const toggle = () => {
    const next = !playing
    setPlaying(next)
    localStorage.setItem('audioPreference', next ? 'on' : 'off')
  }

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <button
        onClick={toggle}
        aria-label={playing ? 'Mute Audio' : 'Unmute Audio'}
        className="cursor-pointer"
      >
        <img
          src={playing ? '/icons/volume.png' : '/icons/mute.png'}
          alt="sound-bar"
          width={32}
          height={32}
          className="size-[6vw] md:size-[3vw] xl:size-[1.2vw] invert"
        />
      </button>
    </div>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const navRef = useRef<HTMLElement>(null)
  const backdropRef = useRef<HTMLDivElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const topLineRef = useRef<HTMLSpanElement>(null)
  const middleLineRef = useRef<HTMLSpanElement>(null)
  const bottomLineRef = useRef<HTMLSpanElement>(null)
  const lastScrollY = useRef(0)

  useEffect(() => {
    const onScroll = () => {
      const latest = window.scrollY
      setHidden(latest > lastScrollY.current && latest > 20 && !menuOpen)
      setScrolled(latest > 100)
      lastScrollY.current = latest
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [menuOpen])

  useEffect(() => {
    if (!navRef.current) return
    gsap.to(navRef.current, {
      y: hidden ? '-100%' : 0,
      duration: 0.35,
      ease: 'power2.inOut',
    })
  }, [hidden])

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
      gsap.to(backdropRef.current, {
        autoAlpha: 1,
        duration: 0.3,
        ease: 'power2.out',
      })
      gsap.to(panelRef.current, {
        xPercent: 0,
        opacity: 1,
        duration: 0.55,
        ease: 'power3.out',
      })
    } else {
      document.body.style.overflow = ''
      gsap.to(backdropRef.current, {
        autoAlpha: 0,
        duration: 0.3,
        ease: 'power2.out',
      })
      gsap.to(panelRef.current, {
        xPercent: 100,
        opacity: 0,
        duration: 0.45,
        ease: 'power3.in',
      })
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  useEffect(() => {
    if (!topLineRef.current || !middleLineRef.current || !bottomLineRef.current) return

    gsap.to(topLineRef.current, {
      rotate: menuOpen ? 45 : 0,
      y: menuOpen ? 8 : 0,
      duration: 0.25,
      ease: 'power2.out',
    })
    gsap.to(middleLineRef.current, {
      opacity: menuOpen ? 0 : 1,
      duration: 0.18,
      ease: 'power2.out',
    })
    gsap.to(bottomLineRef.current, {
      rotate: menuOpen ? -45 : 0,
      y: menuOpen ? -8 : 0,
      duration: 0.25,
      ease: 'power2.out',
    })
  }, [menuOpen])

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 w-full z-210 py-3 pad-x transition-colors duration-500 ${
          scrolled && !menuOpen ? 'bg-black' : 'bg-transparent'
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex-1 flex justify-start items-center">
            <AudioToggle className="bg-transparent! border-none!" />
          </div>
          <div className="flex shrink-0 justify-center items-center">
            <a
              href="/"
              onClick={() => setMenuOpen(false)}
              className="relative size-[8vw] md:size-[5vw] xl:size-[2.5vw]"
            >
              <img
                src="/yellowIcon.png"
                alt="Kirant Logo"
                className="absolute inset-0 w-full h-full object-contain"
              />
            </a>
          </div>
          <div className="flex-1 flex justify-end items-center">
            <button
              onClick={() => setMenuOpen((open) => !open)}
              aria-label="Toggle Menu"
              className="flex flex-col gap-1.5 z-50 p-2 relative text-white cursor-pointer"
            >
              <span
                ref={topLineRef}
                className="block w-6 h-0.5 xl:w-[1.5vw] xl:h-[0.2vh] bg-white"
              />
              <span
                ref={middleLineRef}
                className="block w-6 h-0.5 xl:w-[1.5vw] xl:h-[0.2vh] bg-white"
              />
              <span
                ref={bottomLineRef}
                className="block w-6 h-0.5 xl:w-[1.5vw] xl:h-[0.2vh] bg-white"
              />
            </button>
          </div>
        </div>
      </nav>

      {menuOpen && (
        <>
          <div
            ref={backdropRef}
            onClick={() => setMenuOpen(false)}
            className="fixed inset-0 z-190 bg-black/10 cursor-pointer opacity-0"
            aria-hidden="true"
          />
          <div
            ref={panelRef}
            className="fixed inset-0 z-200 bg-black flex flex-col items-center justify-center p-8 shadow-2xl opacity-0 translate-x-full"
          >
            <FloorPlanMenu onClose={() => setMenuOpen(false)} />
          </div>
        </>
      )}
    </>
  )
}
