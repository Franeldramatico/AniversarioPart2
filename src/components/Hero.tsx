'use client'

import { useRef, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'

const RoseScene = dynamic(() => import('./RoseScene'), { ssr: false })

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const parallaxRef = useRef<HTMLDivElement>(null)

  /* Use refs to directly update DOM — avoids setState re-renders on every mousemove */
  const handleMouse = useCallback((e: MouseEvent) => {
    if (!parallaxRef.current) return
    const x = (e.clientX / window.innerWidth - 0.5) * 2
    const y = (e.clientY / window.innerHeight - 0.5) * 2
    parallaxRef.current.style.transform = `translate(${x * -10}px, ${y * -10}px)`
  }, [])

  useEffect(() => {
    window.addEventListener('mousemove', handleMouse, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouse)
  }, [handleMouse])

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden bg-night flex items-center justify-center"
    >
      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-night/80 z-10" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(139,32,32,0.15)_0%,_transparent_70%)] z-10" />

      {/* Parallax background — transformed via ref, no re-renders */}
      <div
        ref={parallaxRef}
        className="absolute inset-0 z-0"
        style={{ transition: 'transform 0.15s ease-out' }}
      >
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: 'radial-gradient(circle at 30% 40%, rgba(139, 32, 32, 0.15) 0%, transparent 50%), radial-gradient(circle at 70% 60%, rgba(184, 146, 50, 0.08) 0%, transparent 40%)'
        }} />
      </div>

      <RoseScene />

      {/* Main content */}
      <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        >
          <motion.p
            className="text-gold-400 text-sm md:text-base tracking-[0.4em] uppercase mb-6 font-light"
            initial={{ opacity: 0, letterSpacing: '1em' }}
            animate={{ opacity: 0.7, letterSpacing: '0.4em' }}
            transition={{ duration: 2, delay: 0.3 }}
          >
            Para mi niñita
          </motion.p>

          <motion.h1
            className="font-serif text-5xl md:text-7xl lg:text-8xl text-cream-100 leading-tight mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 0.5 }}
          >
            Un año en la
            <br />
            <span className="text-crimson-300 italic">eternidad</span>
          </motion.h1>

          <motion.div
            className="flex items-center justify-center gap-4 my-8"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 1.5, delay: 1 }}
          >
            <div className="h-px w-16 md:w-24 bg-gradient-to-r from-transparent to-gold-500/50" />
            <motion.span
              className="font-serif text-2xl md:text-3xl text-gold-400"
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              08.06.2025
            </motion.span>
            <div className="h-px w-16 md:w-24 bg-gradient-to-l from-transparent to-gold-500/50" />
          </motion.div>

          <motion.p
            className="text-cream-200/50 text-sm tracking-[0.2em] uppercase font-light"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ duration: 1.5, delay: 1.5 }}
          >
            — Mi niñita, mi todo —
          </motion.p>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(232,196,106,0.5)" strokeWidth="1.5">
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </motion.div>
    </section>
  )
}
