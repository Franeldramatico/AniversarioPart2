'use client'

import { useState, useEffect } from 'react'
import Preloader from '@/components/Preloader'
import Hero from '@/components/Hero'
import CrimsonVeil from '@/components/CrimsonVeil'
import Timeline from '@/components/Timeline'
import Letters from '@/components/Letters'
import SoobinCorner from '@/components/SoobinCorner'
import Finale from '@/components/Finale'

function SectionDivider() {
  return (
    <div className="section-divider" aria-hidden="true">
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="opacity-20">
          <path d="M12 2L14 10L22 12L14 14L12 22L10 14L2 12L10 10L12 2Z" fill="currentColor" className="text-gold-500" />
        </svg>
      </div>
    </div>
  )
}

export default function Home() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    document.body.style.overflow = loading ? 'hidden' : 'auto'
  }, [loading])

  return (
    <>
      {loading && <Preloader onComplete={() => setLoading(false)} />}
      <main className="relative">
        <Hero />
        <SectionDivider />
        <CrimsonVeil />
        <SectionDivider />
        <Timeline />
        <SectionDivider />
        <Letters />
        <SectionDivider />
        <SoobinCorner />
        <SectionDivider />
        <Finale />
        <footer className="relative z-10 py-12 text-center bg-gradient-to-t from-night to-velvet/50">
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-gold-500/20 to-transparent mx-auto mb-6" />
          <p className="text-crimson-700/50 text-xs tracking-[0.3em] uppercase mb-2">
            Eternal Crimson
          </p>
          <p className="text-gold-400/30 text-xs tracking-[0.15em]">
            Para Aranza, mi niñita 💕
          </p>
          <div className="w-8 h-px bg-gradient-to-r from-transparent via-crimson-500/20 to-transparent mx-auto mt-6" />
        </footer>
      </main>
    </>
  )
}
