import type Lenis from 'lenis'
import { createContext, useContext } from 'react'

export type LenisContextValue = {
  lenis: Lenis | null
  scrollToTop: () => void
}

export const LenisContext = createContext<LenisContextValue>({
  lenis: null,
  scrollToTop: () => {},
})

export const useLenis = () => useContext(LenisContext)
