import { useEffect, useRef, useState } from 'react'
import { navLinks } from '../data/site'

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null)
  const [height, setHeight] = useState(0)

  useEffect(() => {
    const element = footerRef.current
    if (!element) return
    const measure = () => setHeight(element.getBoundingClientRect().height)
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(element)
    window.addEventListener('resize', measure)
    return () => {
      observer.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [])

  return (
    <>
      <div
        style={{ height: `${height}px` }}
        className="w-full pointer-events-none bg-transparent"
      />
      <footer
        id="footer"
        ref={footerRef}
        className="fixed bottom-0 left-0 z-0 w-full text-white select-none overflow-hidden bg-black flex flex-col pt-16 xl:pt-16 pb-0"
      >
        <div className="pad-x flex-1 flex flex-col justify-between">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr] gap-12 md:gap-4 xl:gap-8 items-start w-full">
            <div className="hidden xl:flex flex-col space-y-6 max-w-[90%]">
              <h2 className="text-2xl md:text-2xl xl:text-[2vw] text-white tracking-tight">
                See how we can help your hotel grow.
                <br className="hidden xl:block" />
                Get in touch today.
              </h2>
              <div className="pt-2">
                <a
                  href="/contact"
                  className="inline-flex items-center gap-3 border border-white/40 hover:border-white px-5 py-2.5 text-xs xl:text-[0.8vw] font-semibold tracking-widest uppercase bg-transparent hover:bg-white hover:text-black transition-all duration-300"
                >
                  <span>Contact Us</span>
                  <svg
                    className="size-4 xl:size-[1vw]"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M8 7v2h5.59L7 15.59 8.41 17 15 10.41V16h2V7H8z" />
                  </svg>
                </a>
              </div>
            </div>

            <div className="grid grid-cols-2 place-items-center md:place-items-start text-center md:text-left gap-4 gap-x-12">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-zinc-400 hover:text-white transition-colors duration-200 text-sm md:text-base xl:text-[1vw] font-medium"
                >
                  {link.name}
                </a>
              ))}
            </div>

            <div className="flex flex-col gap-4 text-center md:text-right md:justify-self-end">
              <span className="text-white font-semibold xl:text-[1vw] tracking-widest uppercase">
                Connect
              </span>
              <div className="text-zinc-400 space-y-1.5 text-sm md:text-base xl:text-[1vw] font-light leading-relaxed">
                <p>Nuwakot, Nepal</p>
                <p>contact@kirant.com</p>
                <p>+977 9876543210</p>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 mt-4 md:mt-16 pt-6 pb-6 flex flex-col md:flex-row items-center justify-between gap-4 w-full">
            <p className="text-xs xl:text-[0.8vw] text-zinc-500">
              © 2026 <span className="text-white font-medium">Kirant.</span> All
              rights reserved.
            </p>
            <div className="flex flex-col md:flex-row items-center gap-2">
              <p className="text-xs xl:text-[0.8vw] text-zinc-500">
                Designed &amp; Developed by
              </p>
              <a
                href="https://www.webxnepal.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                <div className="relative w-[12vw] md:w-[6vw] lg:w-[3vw]">
                  <img
                    src="/webx-logo.png"
                    alt="WebX Logo"
                    className="w-full h-auto md:mb-1"
                  />
                </div>
              </a>
            </div>
          </div>
        </div>

        <div
          className="relative w-full h-[15vh] sm:h-[22vh] md:h-[20vh] lg:h-[38vh] xl:h-[45vh] bg-black overflow-hidden flex items-end justify-center select-none pointer-events-none mt-auto"
          style={{
            transform: 'translate3d(0, 0, 0)',
            WebkitMaskImage: '-webkit-radial-gradient(white, black)',
          }}
        >
          <video
            src="/videos/golden.mp4"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-[-2px] bg-black text-white mix-blend-multiply flex items-end justify-center">
            <span className="text-[21vw] font-display font-black tracking-wide leading-[0.75] text-center block w-full select-none uppercase">
              KIRANT
            </span>
          </div>
        </div>
      </footer>
    </>
  )
}
