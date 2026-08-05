import { useEffect, useState } from 'react'

export default function useResponsive() {
  const [width, setWidth] = useState(() =>
    typeof window === 'undefined' ? 1440 : window.innerWidth,
  )

  useEffect(() => {
    const onResize = () => setWidth(window.innerWidth)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return {
    width,
    isSmallerDevice: width < 768,
    isMobile: width < 640,
    isDesktop: width >= 1280,
  }
}
