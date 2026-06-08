'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

const quotes = [
  { text: '"El amor no se trata de encontrar a alguien perfecto, sino de aprender a ver imperfectamente a una persona perfecta."', author: '— Soobin' },
  { text: '"Los momentos brillantes son aquellos que compartimos con las personas que amamos."', author: '— Soobin' },
  { text: '"Cada día es una nueva oportunidad para sonreír gracias a ti."', author: '— Para Aranza' },
]

const songLyrics = [
  { line: 'Tú eres mi estrella', pause: 1200 },
  { line: 'La luz que me guía', pause: 1000 },
  { line: 'En cada amanecer', pause: 1000 },
  { line: 'Tu amor es mi razón', pause: 1400 },
  { line: 'Sweet, sweet love', pause: 800 },
  { line: 'Eres todo para mí', pause: 1200 },
]

export default function SoobinCorner() {
  const [currentQuote, setCurrentQuote] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentLyric, setCurrentLyric] = useState(-1)
  const [showLyrics, setShowLyrics] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (isPlaying) {
      setShowLyrics(true)
      setCurrentLyric(-1)
      let i = -1
      const playNext = () => {
        i++
        if (i < songLyrics.length) {
          setCurrentLyric(i)
          intervalRef.current = setTimeout(playNext, songLyrics[i].pause)
        } else {
          setCurrentLyric(-1)
          intervalRef.current = setTimeout(() => {
            setShowLyrics(false)
            setIsPlaying(false)
          }, 2000)
        }
      }
      playNext()
    } else {
      if (intervalRef.current) clearTimeout(intervalRef.current)
      setCurrentLyric(-1)
      setShowLyrics(false)
    }
    return () => {
      if (intervalRef.current) clearTimeout(intervalRef.current)
    }
  }, [isPlaying])

  /* Auto-rotate quotes */
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % quotes.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-night via-crimson-900/30 to-night py-24">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(139,32,32,0.08)_0%,_transparent_60%)]" />

      <motion.h2
        className="text-center font-serif text-4xl md:text-6xl text-cream-100 mb-4"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <span className="text-crimson-300 italic">Soobin</span>&apos;s Corner
      </motion.h2>
      <motion.p
        className="text-center text-gold-400/60 text-sm tracking-[0.3em] uppercase mb-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.6 }}
        transition={{ duration: 1, delay: 0.3 }}
        viewport={{ once: true }}
      >
        Un rincón especial para él
      </motion.p>

      <div className="max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-stretch">
          {/* Left column */}
          <motion.div
            className="flex flex-col gap-8"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            {/* Soobin profile card */}
            <div className="card-glow relative bg-gradient-to-br from-crimson-900/50 via-velvet to-crimson-900/30 rounded-lg border border-crimson-700/30 overflow-hidden flex-1">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/20 to-transparent" />
              <div className="relative p-8 md:p-10 text-center h-full flex flex-col items-center justify-center">
                {/* Soobin image */}
                <div className="relative mb-6 w-24 h-24 rounded-full overflow-hidden border-2 border-crimson-700/40">
                  <Image
                    src="/soobin_gothic.png"
                    alt="Soobin"
                    fill
                    className="object-cover object-top"
                    sizes="96px"
                  />
                  <div className="absolute inset-0 rounded-full ring-1 ring-gold-500/10 ring-inset" />
                </div>
                <motion.div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full border border-gold-500/8"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                />
                <h3 className="font-serif text-xl md:text-2xl text-cream-100 mb-2">Choi Soobin</h3>
                <p className="text-cream-200/50 text-sm">El cantante que alegra tu corazón</p>
                <div className="w-12 h-px bg-gold-500/30 mx-auto mt-6" />
              </div>
            </div>

            {/* Song player card */}
            <div className="card-glow relative bg-gradient-to-br from-crimson-900/30 to-velvet rounded-lg border border-crimson-700/20 overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,_rgba(200,150,80,0.03)_0%,_transparent_50%)]" />
              <div className="relative p-6">
                <div className="flex items-center justify-between mb-5">
                  <h4 className="text-cream-100 text-sm font-medium tracking-wider uppercase flex items-center gap-2">
                    <span className="text-gold-400">♫</span> Canción especial
                  </h4>
                  <span className="text-gold-400/40 text-xs tracking-[0.2em] uppercase">Para Aranza</span>
                </div>

                <div className="flex items-center gap-5">
                  <motion.button
                    className="w-14 h-14 rounded-full bg-gradient-to-br from-crimson-700/60 to-crimson-600/40 flex items-center justify-center hover:from-crimson-600/60 hover:to-crimson-500/40 transition-all border border-crimson-500/20 flex-shrink-0"
                    onClick={() => setIsPlaying(!isPlaying)}
                    whileHover={{ scale: 1.08, boxShadow: '0 0 25px rgba(139,32,32,0.3)' }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {isPlaying ? (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="#f5edd6">
                        <rect x="6" y="4" width="4" height="16" rx="1" />
                        <rect x="14" y="4" width="4" height="16" rx="1" />
                      </svg>
                    ) : (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="#f5edd6">
                        <polygon points="6,4 20,12 6,20" />
                      </svg>
                    )}
                  </motion.button>

                  <div className="flex-1 min-w-0">
                    {showLyrics && currentLyric >= 0 ? (
                      <motion.p
                        key={currentLyric}
                        className="font-serif text-cream-100/80 text-base italic"
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                      >
                        {songLyrics[currentLyric].line}
                      </motion.p>
                    ) : (
                      <>
                        <p className="text-cream-100 text-sm">Sweet</p>
                        <p className="text-cream-200/40 text-xs mt-0.5">— Soobin (presiona play)</p>
                      </>
                    )}
                  </div>
                </div>

                {isPlaying && (
                  <div className="mt-4 flex items-end gap-1 h-8">
                    {[1, 2, 3, 4, 5].map((bar) => (
                      <motion.div
                        key={bar}
                        className="w-1 bg-gradient-to-t from-crimson-500 to-gold-400 rounded-full"
                        animate={{ height: [8, 16 + Math.random() * 20, 8] }}
                        transition={{ duration: 0.4 + bar * 0.1, repeat: Infinity, ease: 'easeInOut' }}
                        style={{ height: 8 }}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Right column — Quotes */}
          <motion.div
            className="flex flex-col gap-6"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <div className="card-glow relative bg-gradient-to-br from-crimson-900/30 to-velvet rounded-lg border border-crimson-700/20 flex-1">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/20 to-transparent" />
              <div className="relative p-8 md:p-10 min-h-[320px] flex flex-col justify-center">
                <div className="absolute top-4 left-4 text-crimson-500/20 text-6xl font-serif leading-none">&ldquo;</div>
                <div className="absolute bottom-4 right-4 text-crimson-500/15 text-6xl font-serif leading-none">&rdquo;</div>
                <motion.div
                  key={currentQuote}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="relative z-10"
                >
                  <p className="font-serif text-lg md:text-xl text-cream-100/90 italic leading-[1.8] mb-6 px-4">
                    {quotes[currentQuote].text}
                  </p>
                  <p className="text-gold-400/60 text-sm text-right border-t border-crimson-700/20 pt-4 mx-4">
                    {quotes[currentQuote].author}
                  </p>
                </motion.div>
              </div>
            </div>

            {/* Quote navigation dots */}
            <div className="flex justify-center gap-3 pt-2">
              {quotes.map((_, i) => (
                <button
                  key={i}
                  className={`rounded-full transition-all duration-500 ${
                    i === currentQuote
                      ? 'bg-gold-500 w-8 h-2 shadow-[0_0_8px_rgba(232,196,106,0.3)]'
                      : 'bg-crimson-700/40 w-2 h-2 hover:bg-crimson-500/50'
                  }`}
                  onClick={() => setCurrentQuote(i)}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
