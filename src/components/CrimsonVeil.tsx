'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const memories = [
  { title: 'Nuestro primer día', desc: 'El día que el tiempo se detuvo', icon: '♥' },
  { title: 'Tu sonrisa', desc: 'La luz que ilumina mi oscuridad', icon: '✦' },
  { title: 'Nuestras noches', desc: 'Conversaciones hasta el amanecer', icon: '🌙' },
  { title: 'Tu voz', desc: 'La melodía más hermosa', icon: '♫' },
  { title: 'Nuestro lugar', desc: 'Donde el mundo desaparecía', icon: '∞' },
  { title: 'Tu mirada', desc: 'El espejo donde perderme', icon: '✧' },
]

export default function CrimsonVeil() {
  const sectionRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  const veilOpacity = useTransform(scrollYProgress, [0, 0.3, 0.6, 1], [0.95, 0.5, 0.15, 0])

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[120vh] w-full overflow-hidden bg-night"
    >
      {/* Subtle ambient glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(139,32,32,0.08)_0%,_transparent_60%)]" />

      {/* Content */}
      <div className="relative z-10 py-32 px-4">
        <motion.h2
          className="text-center font-serif text-4xl md:text-6xl text-cream-100 mb-4"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          viewport={{ once: true }}
        >
          The <span className="text-crimson-300 italic">Crimson</span> Veil
        </motion.h2>
        <motion.p
          className="text-center text-gold-400/60 text-sm tracking-[0.3em] uppercase mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.6 }}
          transition={{ duration: 1, delay: 0.3 }}
          viewport={{ once: true }}
        >
          Detrás del velo, nuestros recuerdos
        </motion.p>

        <div className="flex justify-center w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl w-full">
            {memories.map((memory, i) => (
              <motion.div
                key={memory.title}
                className="relative group cursor-pointer"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: i * 0.12, ease: 'easeOut' }}
                viewport={{ once: true, margin: '-60px' }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
              >
                <div className="card-glow relative overflow-hidden rounded-lg bg-gradient-to-b from-crimson-900/60 to-velvet/80 min-h-[240px] p-[1px]">
                  {/* Hover glow overlay */}
                  <div className="absolute inset-0 bg-gradient-to-b from-crimson-700/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-lg" />
                  {/* Top edge highlight */}
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/40 to-transparent" />
                  {/* Bottom edge */}
                  <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-crimson-500/30 to-transparent" />
                  {/* Side edges */}
                  <div className="absolute top-0 bottom-0 left-0 w-px bg-gradient-to-b from-gold-500/20 via-transparent to-crimson-500/20" />
                  <div className="absolute top-0 bottom-0 right-0 w-px bg-gradient-to-b from-gold-500/20 via-transparent to-crimson-500/20" />

                  <div className="relative p-8 h-full flex flex-col justify-end">
                    <div className="mb-4 text-3xl opacity-70 group-hover:opacity-100 transition-opacity duration-500">
                      {memory.icon}
                    </div>
                    <div className="w-10 h-px bg-gold-500/40 mb-3 group-hover:w-20 transition-all duration-500" />
                    <h3 className="font-serif text-xl text-cream-100 mb-2 group-hover:text-gold-300 transition-colors duration-500">
                      {memory.title}
                    </h3>
                    <p className="text-cream-200/50 text-sm leading-relaxed">{memory.desc}</p>
                  </div>
                </div>

                {/* Hover border */}
                <div className="absolute -top-[1px] -left-[1px] -right-[1px] -bottom-[1px] rounded-lg border border-gold-500/0 group-hover:border-gold-500/25 transition-all duration-700 pointer-events-none" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Lightweight CSS curtain overlay — replaces heavy SVG filter */}
      <motion.div
        className="absolute inset-0 z-20 pointer-events-none"
        style={{ opacity: veilOpacity }}
      >
        <div
          className="absolute inset-0"
          style={{
            background: `
              linear-gradient(180deg,
                rgba(10, 10, 15, 0.97) 0%,
                rgba(26, 13, 13, 0.92) 30%,
                rgba(45, 15, 15, 0.8) 60%,
                rgba(26, 13, 13, 0.6) 100%
              )
            `,
          }}
        />
        {/* Subtle texture via repeating gradients instead of SVG turbulence */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `
              repeating-linear-gradient(
                0deg,
                transparent,
                transparent 2px,
                rgba(139, 32, 32, 0.3) 2px,
                rgba(139, 32, 32, 0.3) 3px
              )
            `,
          }}
        />
        {/* Vertical fabric lines */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              repeating-linear-gradient(
                90deg,
                transparent,
                transparent 40px,
                rgba(200, 150, 80, 0.2) 40px,
                rgba(200, 150, 80, 0.2) 41px
              )
            `,
          }}
        />
      </motion.div>
    </section>
  )
}
