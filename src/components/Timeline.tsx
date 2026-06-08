'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const chapters = [
  { title: 'El Encuentro', desc: 'Dos almas que finalmente chocaron. El universo conspiró y nuestros caminos se cruzaron para siempre.', ornament: '✧' },
  { title: 'El Descubrimiento', desc: 'Cada conversación era un nuevo universo. Te descubría a ti y me descubría a mí mismo en tus ojos.', ornament: '✦' },
  { title: 'La Conexión', desc: 'Las llamadas nocturnas, las risas compartidas. El mundo exterior dejó de existir.', ornament: '∞' },
  { title: 'El Refugio', desc: 'Te convertiste en mi lugar seguro. Donde el ruido del mundo se apagaba y solo quedaba tu voz.', ornament: '♥' },
  { title: 'La Magia', desc: 'Cada día contigo era un hechizo nuevo. La rutina se volvió poesía.', ornament: '✧' },
  { title: 'La Confianza', desc: 'Las paredes cayeron. Te mostré mi alma y la envolviste con tu amor.', ornament: '✦' },
  { title: 'El Sueño', desc: 'Juntos imaginamos un futuro. Cada plan tenía tu nombre escrito.', ornament: '🌙' },
  { title: 'La Tormenta', desc: 'Hubo un silencio breve, pero el amor nunca se fue. A veces las pausas enseñan lo que las palabras no pueden.', ornament: '✦' },
  { title: 'El Reencuentro', desc: 'El silencio terminó y nos encontramos de nuevo. Más seguros, más conscientes de lo que significamos el uno para el otro.', ornament: '✧' },
  { title: 'La Promesa', desc: 'No necesitábamos un día especial. Cada día juntos era una celebración.', ornament: '♥' },
  { title: 'La Primavera', desc: 'Todo floreció a nuestro alrededor. El universo celebraba nuestro amor.', ornament: '✧' },
  { title: 'La Eternidad', desc: 'Doce meses. Una vida de amor. Esto es solo el principio...', ornament: '♥' },
]

export default function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center'],
  })

  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-night via-velvet to-night py-24"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(139,32,32,0.06)_0%,_transparent_50%)]" />

      <motion.h2
        className="text-center font-serif text-4xl md:text-6xl text-cream-100 mb-4"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        Nuestra Primera <span className="text-crimson-300 italic">Eternidad</span>
      </motion.h2>
      <motion.p
        className="text-center text-gold-400/60 text-sm tracking-[0.3em] uppercase mb-20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.6 }}
        transition={{ duration: 1, delay: 0.3 }}
        viewport={{ once: true }}
      >
        Los capítulos de nuestro amor
      </motion.p>

      <div className="flex justify-center w-full px-6">
        <div className="relative max-w-5xl w-full">
          {/* Background timeline line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-gold-500/15 to-transparent md:-translate-x-px" />
          {/* Animated progress line */}
          <motion.div
            className="absolute left-8 md:left-1/2 top-0 w-[1px] bg-gradient-to-b from-gold-500 via-gold-400 to-crimson-500 md:-translate-x-px shadow-[0_0_8px_rgba(232,196,106,0.15)]"
            style={{ height: lineHeight }}
          />

          {chapters.map((chapter, i) => {
            const isLeft = i % 2 === 0
            const isFirst = i === 0
            const isLast = i === chapters.length - 1

            return (
              <motion.div
                key={`chapter-${i}`}
                className={`relative flex items-start mb-16 md:mb-24 ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'} flex-row`}
                initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.05, ease: 'easeOut' }}
                viewport={{ once: true, margin: '-80px' }}
              >
                {/* Desktop content */}
                <div className={`hidden md:flex w-1/2 ${isLeft ? 'justify-end pr-16' : 'justify-start pl-16'}`}>
                  <div className={`relative max-w-sm ${isLeft ? 'text-right' : 'text-left'}`}>
                    {/* Ornament */}
                    <div className={`flex items-center gap-3 mb-2 ${isLeft ? 'justify-end' : 'justify-start'}`}>
                      <span className="text-gold-500/40 text-lg">{chapter.ornament}</span>
                    </div>
                    <h3 className="font-serif text-2xl md:text-3xl text-cream-100 mt-1 mb-3">{chapter.title}</h3>
                    <p className="text-cream-200/50 text-sm leading-relaxed">{chapter.desc}</p>
                    <div className={`mt-4 w-12 h-px bg-gradient-to-r ${isLeft ? 'from-gold-500/40 ml-auto' : 'to-gold-500/40'}`} />
                  </div>
                </div>

                {/* Timeline dot — centered on the line */}
                <div className="absolute left-8 md:left-1/2 z-10 flex items-center justify-center -translate-x-1/2 top-1.5 md:top-3">
                  <motion.div
                    className={`w-4 h-4 rounded-full border-[2px] border-night shadow-[0_0_15px_rgba(232,196,106,0.2)] ${
                      isFirst || isLast
                        ? 'bg-gradient-to-br from-crimson-400 to-gold-400 w-5 h-5'
                        : 'bg-gradient-to-br from-gold-500 to-gold-400'
                    }`}
                    whileInView={{ scale: [0, 1], boxShadow: ['0 0 0px rgba(232,196,106,0)', '0 0 15px rgba(232,196,106,0.3)'] }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    viewport={{ once: true }}
                  />
                </div>

                {/* Mobile content */}
                <div className="ml-10 md:hidden flex-1">
                  <span className="text-gold-500/60 text-xs tracking-[0.2em] uppercase">
                    {chapter.ornament}
                  </span>
                  <h3 className="font-serif text-xl text-cream-100 mt-1 mb-2">{chapter.title}</h3>
                  <p className="text-cream-200/50 text-sm leading-relaxed">{chapter.desc}</p>
                  <div className="mt-3 w-8 h-px bg-gold-500/30" />
                </div>
              </motion.div>
            )
          })}

          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="w-px h-8 bg-gradient-to-b from-gold-500/30 to-transparent mx-auto mb-4" />
            <p className="font-serif text-gold-400/40 text-sm italic">...y la historia continúa</p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
