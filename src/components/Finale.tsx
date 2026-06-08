'use client'

import { useState, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const dedicationText = "Mi niñita, mi amor, mi vida entera. Este año ha sido el más hermoso de mi existencia porque lo he vivido a tu lado. Eres la dueña de mi corazón, la luz que guía mis pasos, la razón de cada sonrisa. Gracias por existir, gracias por ser tú, gracias por amarme. Esto es solo el comienzo de nuestra eternidad. Te amo más allá del tiempo, más allá de las palabras, más allá de todo. Para siempre, mi niñita. 💕"

function Particle({ type, index }: { type: 'petal' | 'heart', index: number }) {
  const size = type === 'petal'
    ? 8 + Math.random() * 18
    : 10 + Math.random() * 14

  const style: React.CSSProperties = {
    position: 'absolute',
    top: `${-5 - Math.random() * 10}%`,
    left: `${Math.random() * 100}%`,
    width: size,
    height: type === 'petal' ? size * 0.7 : size,
    background: type === 'petal'
      ? `hsl(${348 + Math.random() * 24}, ${55 + Math.random() * 35}%, ${22 + Math.random() * 32}%)`
      : 'transparent',
    borderRadius: type === 'petal' ? '50% 0 50% 0' : '50%',
    opacity: 0,
    animation: `particleFall ${5 + Math.random() * 7}s linear ${Math.random() * 4}s infinite`,
    transform: `rotate(${Math.random() * 360}deg)`,
    ...(type === 'heart' ? {
      clipPath: 'path("M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z")',
      background: `hsl(${348 + Math.random() * 20}, ${60 + Math.random() * 30}%, ${25 + Math.random() * 30}%)`,
    } : {}),
  }

  return <div style={style} />
}

export default function Finale() {
  const [showRain, setShowRain] = useState(false)
  const [displayedText, setDisplayedText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [stage, setStage] = useState<'message' | 'rain' | 'typing' | 'done'>('message')
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const sectionRef = useRef<HTMLDivElement>(null)

  const startTyping = useCallback(() => {
    setIsTyping(true)
    setStage('typing')
    let i = 0
    intervalRef.current = setInterval(() => {
      if (i < dedicationText.length) {
        setDisplayedText(dedicationText.slice(0, i + 1))
        i++
      } else {
        if (intervalRef.current) clearInterval(intervalRef.current)
        setIsTyping(false)
        setTimeout(() => setStage('done'), 500)
      }
    }, 35)
  }, [])

  const handleCelebrate = () => {
    setShowRain(true)
    setStage('rain')
    setTimeout(() => startTyping(), 1200)
  }

  const particles = Array.from({ length: 28 }, (_, i) => i)

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-night via-velvet to-night flex items-center justify-center py-24"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(139,32,32,0.12)_0%,_transparent_60%)]" />

      <AnimatePresence mode="wait">
        {stage === 'message' && (
          <motion.div
            key="message"
            className="relative z-10 text-center px-6 max-w-3xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            exit={{ opacity: 0, y: -30 }}
          >
            <motion.div
              className="inline-block mb-8"
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2, type: 'spring' }}
              viewport={{ once: true }}
            >
              <svg width="60" height="60" viewBox="0 0 60 60" className="mx-auto">
                <circle cx="30" cy="30" r="28" fill="none" stroke="rgba(200,150,80,0.2)" strokeWidth="0.5" />
                <circle cx="30" cy="30" r="20" fill="none" stroke="rgba(139,32,32,0.3)" strokeWidth="1" strokeDasharray="3 3">
                  <animateTransform attributeName="transform" type="rotate" from="0 30 30" to="360 30 30" dur="30s" repeatCount="indefinite" />
                </circle>
                <text x="30" y="36" textAnchor="middle" fill="#c94b4b" fontSize="16" fontFamily="serif">∞</text>
              </svg>
            </motion.div>

            <motion.p
              className="text-gold-400/60 text-sm tracking-[0.3em] uppercase mb-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 0.6 }}
              transition={{ duration: 1, delay: 0.3 }}
              viewport={{ once: true }}
            >
              Para siempre
            </motion.p>
            <motion.h2
              className="font-serif text-5xl md:text-7xl text-cream-100 mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              viewport={{ once: true }}
            >
              Mi <span className="text-crimson-300 italic">niñita</span>
            </motion.h2>
            <motion.p
              className="text-cream-200/60 text-base md:text-lg leading-relaxed max-w-xl mx-auto mb-12"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
              viewport={{ once: true }}
            >
              Un año de amor, un año de ti. Eres lo mejor que me ha pasado,
              y quiero pasar el resto de mi vida haciéndote feliz.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              viewport={{ once: true }}
            >
              <motion.button
                className="relative px-12 py-5 bg-gradient-to-r from-crimson-700 to-crimson-600 text-cream-100 rounded-full font-medium text-sm tracking-[0.2em] uppercase overflow-hidden group shadow-[0_4px_30px_rgba(139,32,32,0.3)]"
                onClick={handleCelebrate}
                whileHover={{ scale: 1.05, boxShadow: '0 8px 40px rgba(139,32,32,0.4)' }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10 flex items-center gap-3">
                  <span>🌹</span>
                  <span>Celebra conmigo</span>
                  <motion.span
                    className="inline-block"
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-gold-500/20 to-transparent"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.6 }}
                />
              </motion.button>
            </motion.div>
          </motion.div>
        )}

        {(stage === 'rain' || stage === 'typing' || stage === 'done') && (
          <motion.div
            key="particles"
            className="absolute inset-0 z-20 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
          >
            {showRain && particles.map((i) => (
              <Particle key={i} type={i % 7 === 0 ? 'heart' : 'petal'} index={i} />
            ))}
          </motion.div>
        )}

        {(stage === 'typing' || stage === 'done') && (
          <motion.div
            key="typing"
            className="relative z-30 px-6 max-w-3xl mx-auto text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="card-glow relative bg-gradient-to-b from-crimson-900/50 via-velvet/80 to-crimson-900/30 backdrop-blur-sm rounded-lg border border-gold-500/15 p-[1px]">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" />
              <div className="absolute top-0 left-[20%] right-[20%] h-[2px] bg-gradient-to-r from-transparent via-gold-500/40 to-transparent" />

              <div className="relative p-8 md:p-12">
                <motion.div
                  className="w-10 h-px bg-gold-500/30 mx-auto mb-8"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.5 }}
                />

                <p className="font-serif text-base md:text-lg text-cream-100/85 leading-[2.2] whitespace-pre-wrap text-center font-light px-2">
                  {displayedText}
                  {isTyping && (
                    <motion.span
                      className="inline-block w-[2px] h-[1em] bg-gold-400 ml-0.5 align-middle"
                      animate={{ opacity: [1, 0] }}
                      transition={{ duration: 0.8, repeat: Infinity }}
                    />
                  )}
                </p>

                {stage === 'done' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.5 }}
                  >
                    <div className="w-10 h-px bg-gold-500/30 mx-auto mt-8 mb-6" />
                    <p className="font-serif text-2xl md:text-3xl text-crimson-300 italic">
                      Te amo por siempre, mi niñita 💕
                    </p>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
