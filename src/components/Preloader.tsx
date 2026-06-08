'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [stage, setStage] = useState<'candle' | 'name' | 'done'>('candle')
  const [flameSize, setFlameSize] = useState(0)

  useEffect(() => {
    const growTimer = setInterval(() => {
      setFlameSize(prev => {
        if (prev >= 100) {
          clearInterval(growTimer)
          return 100
        }
        return prev + 1.5
      })
    }, 30)
    return () => clearInterval(growTimer)
  }, [])

  useEffect(() => {
    if (flameSize >= 100) {
      const t1 = setTimeout(() => setStage('name'), 600)
      const t2 = setTimeout(() => setStage('done'), 2800)
      const t3 = setTimeout(() => onComplete(), 3600)
      return () => {
        clearTimeout(t1); clearTimeout(t2); clearTimeout(t3)
      }
    }
  }, [flameSize, onComplete])

  const flameScale = Math.min(flameSize / 100, 1)
  const flameOpacity = Math.min(flameSize / 30, 1)

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] flex items-center justify-center bg-night"
        exit={{ opacity: 0 }}
        transition={{ duration: 1.5, ease: 'easeInOut' }}
      >
        <AnimatePresence mode="wait">
          {stage === 'candle' && (
            <motion.div
              key="candle"
              className="relative flex flex-col items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative mb-6">
                <svg width="60" height="130" viewBox="0 0 60 130" className="drop-shadow-[0_0_40px_rgba(139,32,32,0.2)]">
                  <defs>
                    <linearGradient id="candleBody" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#f5edd6" />
                      <stop offset="40%" stopColor="#e8dbb8" />
                      <stop offset="100%" stopColor="#d4aa4a" stopOpacity="0.4" />
                    </linearGradient>
                    <linearGradient id="waxDrip" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#f5edd6" stopOpacity="0.9" />
                      <stop offset="100%" stopColor="#e8dbb8" stopOpacity="0.4" />
                    </linearGradient>
                  </defs>
                  <rect x="18" y="45" width="24" height="80" rx="3" fill="url(#candleBody)" />
                  <path d="M18,55 Q15,60 16,65 Q17,68 18,65" fill="url(#waxDrip)" />
                  <path d="M42,60 Q46,65 44,72 Q43,75 42,70" fill="url(#waxDrip)" />
                  <ellipse cx="30" cy="45" rx="14" ry="5" fill="#f5edd6" />
                  <ellipse cx="30" cy="45" rx="10" ry="3" fill="#e8dbb8" opacity="0.5" />
                </svg>

                <motion.div
                  className="absolute -top-2 left-1/2 -translate-x-1/2 origin-bottom"
                  style={{
                    width: 20 + flameScale * 16,
                    height: 10 + flameScale * 40,
                    opacity: flameOpacity,
                  }}
                >
                  <svg viewBox="0 0 40 60" className="w-full h-full" style={{ filter: 'url(#flameGlow)' }}>
                    <defs>
                      <filter id="flameGlow">
                        <feGaussianBlur stdDeviation="2" result="blur" />
                        <feMerge>
                          <feMergeNode in="blur" />
                          <feMergeNode in="SourceGraphic" />
                        </feMerge>
                      </filter>
                      <radialGradient id="flameGrad3" cx="50%" cy="65%" r="55%">
                        <stop offset="0%" stopColor="#fff" />
                        <stop offset="25%" stopColor="#faeab0" />
                        <stop offset="55%" stopColor="#e8c46a" />
                        <stop offset="80%" stopColor="#c94b4b" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#8b2020" stopOpacity="0.3" />
                      </radialGradient>
                    </defs>
                    <ellipse cx="20" cy="35" rx="10" ry="24" fill="url(#flameGrad3)" opacity={0.9}>
                      <animate attributeName="ry" values="24;26;23;25;24" dur="0.8s" repeatCount="indefinite" />
                      <animate attributeName="rx" values="10;9;11;9.5;10" dur="1.1s" repeatCount="indefinite" />
                    </ellipse>
                    <ellipse cx="20" cy="28" rx="4" ry="14" fill="#fff" opacity="0.5">
                      <animate attributeName="ry" values="14;16;13;15;14" dur="0.6s" repeatCount="indefinite" />
                    </ellipse>
                  </svg>
                </motion.div>

                <motion.div
                  className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-crimson-300/60 text-xs tracking-[0.3em] uppercase"
                  animate={{ opacity: flameSize > 50 ? 0.6 : 0 }}
                >
                  <motion.span
                    animate={{ opacity: [0.4, 0.8, 0.4] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    Encendiendo...
                  </motion.span>
                </motion.div>
              </div>
            </motion.div>
          )}

          {stage === 'name' && (
            <motion.div
              key="name"
              className="flex flex-col items-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <div className="relative mb-8">
                <motion.svg
                  width="36" height="72" viewBox="0 0 36 72"
                  className="mx-auto mb-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <rect x="10" y="25" width="16" height="44" rx="3" fill="#f5edd6" opacity="0.8" />
                  <ellipse cx="18" cy="25" rx="10" ry="3" fill="#f5edd6" />
                </motion.svg>
                <motion.div
                  className="absolute -top-2 left-1/2 -translate-x-1/2 w-5 h-14"
                  animate={{ opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 1.8, repeat: Infinity }}
                >
                  <svg viewBox="0 0 40 60" className="w-full h-full">
                    <ellipse cx="20" cy="35" rx="7" ry="18" fill="url(#flameGrad3)" opacity="0.7">
                      <animate attributeName="ry" values="18;20;17;19;18" dur="0.9s" repeatCount="indefinite" />
                    </ellipse>
                  </svg>
                </motion.div>

                <motion.div
                  className="absolute -top-6 left-1/2 -translate-x-1/2 w-20 h-20 rounded-full"
                  style={{
                    background: 'radial-gradient(circle, rgba(232,196,106,0.08) 0%, transparent 70%)',
                  }}
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
              </div>

              <motion.h1
                className="font-serif text-5xl md:text-8xl text-cream-100 tracking-wider"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, delay: 0.2, ease: 'easeOut' }}
              >
                Aranza
              </motion.h1>
              <motion.div
                className="w-20 h-px bg-gradient-to-r from-transparent via-gold-500/50 to-transparent mt-6 mb-4"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.5, delay: 0.8 }}
              />
              <motion.p
                className="text-gold-400/60 text-sm tracking-[0.35em] uppercase font-light"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 0.7, y: 0 }}
                transition={{ duration: 1, delay: 1.2 }}
              >
                Mi niñita
              </motion.p>

              <motion.div
                className="mt-10 flex gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }}
                transition={{ duration: 1, delay: 1.8 }}
              >
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-1 h-1 rounded-full bg-gold-500"
                    animate={{ opacity: [0.2, 0.8, 0.2] }}
                    transition={{ duration: 1.5, delay: i * 0.3, repeat: Infinity }}
                  />
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  )
}
