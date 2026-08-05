import { useState } from 'react'
import AboutSection from './components/AboutSection'
import DiningSection from './components/DiningSection'
import Footer from './components/Footer'
import Hero from './components/Hero'
import IntroText from './components/IntroText'
import Navbar from './components/Navbar'
import Preloader from './components/Preloader'
import ReelsSection from './components/ReelsSection'
import ReviewsSection from './components/ReviewsSection'
import RoomShowcase from './components/RoomShowcase'
import ScrollIndicator from './components/ScrollIndicator'
import StatsSection from './components/StatsSection'
import { LenisProvider } from './lenis'

function Home() {
  const [loading, setLoading] = useState(true)

  return (
    <>
      <Preloader onComplete={() => setLoading(false)} />
      <Navbar />
      <ScrollIndicator hidden={loading} />

      <div className="relative z-10 bg-background">
        <Hero />
        <div className="bg-black">
          <IntroText />
          <RoomShowcase />
        </div>
        <AboutSection />
        <StatsSection />
        <div className="h-dvh relative">
          <div className="relative w-full h-full">
            <img
              src="/images/wellness/meditation-1.webp"
              alt="Wellness at Kirant"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 z-10 bg-black/30" />
          </div>
        </div>
        <DiningSection />
        <ReelsSection />
        <ReviewsSection />
      </div>

      <Footer />
    </>
  )
}

export default function App() {
  return (
    <LenisProvider>
      <Home />
    </LenisProvider>
  )
}
