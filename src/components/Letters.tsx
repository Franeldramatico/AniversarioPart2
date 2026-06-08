'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const lettersData = [
  {
    id: 1,
    title: 'Mi niñita',
    preview: 'Para la niña más hermosa que mis ojos han visto...',
    content: `Mi niñita,

Hoy cumplimos un año. Un año desde que mi vida cambió para siempre.

Recuerdo como si fuera ayer cuando te vi por primera vez. No sabía que en ese momento estaba conociendo a la persona más importante de mi vida, a mi alma gemela, a mi futuro.

Eres luz en mi oscuridad, eres la razón por la que sonrío cada día, eres mi inspiración, mi fuerza, mi hogar.

Cada día a tu lado es un regalo. Tus ojitos, tu sonrisa, tu voz... todo de ti es perfecto. Me haces querer ser mejor persona, me haces querer darte todo de mí.

Gracias por este año maravilloso. Gracias por cada risa, cada abrazo, cada beso, cada "te amo". Gracias por estar conmigo en los momentos difíciles y por celebrar juntos los momentos felices.

Te amo más de lo que las palabras pueden expresar. Eres mi todo, mi niñita, mi amor eterno.

Para siempre,
Tu niño 💕`,
    sealColor: '#8b2020',
  },
  {
    id: 2,
    title: 'La carta de la luna',
    preview: 'Cada noche miro la luna y pienso en ti...',
    content: `Mi amor,

¿Sabes? Cada vez que veo la luna, pienso en ti. En cómo iluminas mi vida incluso en los días más oscuros.

Eres como la luna: bella, misteriosa, dulce, y con una luz que hipnotiza. Pero a diferencia de ella, tú estás siempre presente, siempre cálida, siempre mía.

Hay noches en las que me quedo despierto solo para pensar en ti, para recordar cada detalle de tu rostro, cada tono de tu voz, cada palabra tuya.

Eres mi luna personal, mi estrella favorita, mi universo entero.

Te amo,
Tu niño`,
    sealColor: '#6b1d1d',
  },
  {
    id: 3,
    title: 'Promesas de eternidad',
    preview: 'Frente al mundo y frente a ti, prometo...',
    content: `Mi niñita adorada,

Hoy, frente a este año que cumplimos, quiero hacerte algunas promesas.

Prometo amarte cada día más que el anterior.
Prometo estar a tu lado en las buenas y en las malas.
Prometo celebrar tus logros como si fueran míos.
Prometo sostenerte cuando sientas que caes.
Prometo reír contigo, soñar contigo, vivir contigo.
Prometo ser tu refugio, tu paz, tu hogar.
Prometo elegirte siempre, sin dudar, sin condiciones.
Prometo que esto no es solo un año, es el primero de muchos.
Prometo que cada día buscaré hacerte más feliz.

Te amo con todo mi ser. Eres mi vida entera.

Siempre tuyo,
Tu niño 💕`,
    sealColor: '#4a1515',
  },
]

export default function Letters() {
  const [openId, setOpenId] = useState<number | null>(null)

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-night via-crimson-900/20 to-night py-24">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(139,32,32,0.05)_0%,_transparent_50%)]" />

      <motion.h2
        className="text-center font-serif text-4xl md:text-6xl text-cream-100 mb-4"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        Las <span className="text-crimson-300 italic">Cartas</span>
      </motion.h2>
      <motion.p
        className="text-center text-gold-400/60 text-sm tracking-[0.3em] uppercase mb-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.6 }}
        transition={{ duration: 1, delay: 0.3 }}
        viewport={{ once: true }}
      >
        Palabras selladas con mi corazón
      </motion.p>

      <div className="flex justify-center w-full px-6">
        <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-3 gap-8">
          {lettersData.map((letter) => (
            <motion.div
              key={letter.id}
              className="relative cursor-pointer group"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: (letter.id - 1) * 0.2 }}
              viewport={{ once: true }}
              onClick={() => setOpenId(openId === letter.id ? null : letter.id)}
              whileHover={{ y: -8 }}
            >
              <div className="card-glow relative bg-gradient-to-b from-[#1a0d0d] to-[#0a0a0f] rounded-lg border border-crimson-700/30 p-[1px] h-full">
                <div className="absolute inset-0 rounded-lg bg-gradient-to-b from-gold-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/20 to-transparent" />

                <div className="relative p-8 flex flex-col items-center h-full min-h-[320px]">
                  {/* Wax seal */}
                  <div className="relative mb-6 flex-shrink-0">
                    <motion.div
                      className="relative z-10"
                      animate={openId === letter.id ? { rotateY: 180 } : { rotateY: 0 }}
                      transition={{ duration: 0.4 }}
                    >
                      <svg width="56" height="68" viewBox="0 0 56 68">
                        <defs>
                          <radialGradient id={`sealShine${letter.id}`} cx="35%" cy="35%" r="60%">
                            <stop offset="0%" stopColor="#c94b4b" stopOpacity="0.4" />
                            <stop offset="100%" stopColor={letter.sealColor} stopOpacity="0" />
                          </radialGradient>
                        </defs>
                        <ellipse cx="28" cy="38" rx="18" ry="24" fill={letter.sealColor} opacity="0.95" />
                        <ellipse cx="28" cy="38" rx="15" ry="20" fill={letter.sealColor} opacity="0.8" />
                        <ellipse cx="28" cy="38" rx="18" ry="24" fill={`url(#sealShine${letter.id})`} />
                        <circle cx="28" cy="38" r="14" fill="none" stroke="rgba(245,237,214,0.15)" strokeWidth="0.5" />
                        <text x="28" y="43" textAnchor="middle" fill="#f5edd6" fontSize="12" fontFamily="serif">♥</text>
                      </svg>
                    </motion.div>
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-12 h-px bg-gradient-to-r from-transparent via-gold-500/40 to-transparent" />
                  </div>

                  {/* Title and preview */}
                  <h3 className="font-serif text-lg text-cream-100 text-center mb-3 group-hover:text-gold-300 transition-colors duration-500">
                    {letter.title}
                  </h3>
                  <p className="text-cream-200/50 text-xs text-center leading-relaxed flex-1">
                    {letter.preview}
                  </p>

                  {/* CTA button */}
                  <div className="mt-6 pt-4 border-t border-crimson-700/20 w-full text-center flex-shrink-0">
                    <motion.span
                      className="inline-block text-gold-400/60 text-xs tracking-[0.2em] uppercase group-hover:text-gold-400 transition-colors"
                      animate={{ opacity: openId === letter.id ? 0.3 : 0.6 }}
                    >
                      <span className="mr-2">{openId === letter.id ? '✕' : '✧'}</span>
                      {openId === letter.id ? 'Cerrar' : 'Abrir carta'}
                    </motion.span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Letter modal */}
      <AnimatePresence>
        {openId && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpenId(null)}
          >
            <motion.div
              className="card-glow relative max-w-2xl w-full max-h-[85vh] overflow-y-auto bg-gradient-to-b from-[#1a0d0d] to-[#0a0a0f] rounded-lg border border-gold-500/20"
              initial={{ scale: 0.92, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 30 }}
              transition={{ type: 'spring', damping: 28, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold-500/40 to-transparent" />
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-crimson-700/60 via-gold-500/30 to-crimson-700/60" />

              <div className="p-8 md:p-12">
                {/* Close button */}
                <button
                  onClick={() => setOpenId(null)}
                  className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-cream-200/40 hover:text-cream-100 transition-colors rounded-full hover:bg-crimson-700/30"
                >
                  ✕
                </button>

                <div className="flex justify-center mb-8">
                  <div className="relative">
                    <svg width="40" height="48" viewBox="0 0 40 48">
                      <ellipse cx="20" cy="26" rx="14" ry="18" fill="#8b2020" opacity="0.85" />
                      <ellipse cx="20" cy="26" rx="11" ry="14" fill="#6b1d1d" opacity="0.7" />
                      <circle cx="20" cy="26" r="10" fill="none" stroke="rgba(245,237,214,0.12)" strokeWidth="0.5" />
                      <text x="20" y="30" textAnchor="middle" fill="#f5edd6" fontSize="9" fontFamily="serif">♥</text>
                    </svg>
                    <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-16 h-px bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" />
                  </div>
                </div>

                {lettersData
                  .filter((l) => l.id === openId)
                  .map((letter) => (
                    <div key={letter.id} className="relative">
                      <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none"
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E")`,
                        }}
                      />

                      <h3 className="font-serif text-2xl md:text-3xl text-cream-100 text-center mb-6">{letter.title}</h3>
                      <div className="w-16 h-px bg-gradient-to-r from-transparent via-gold-500/40 to-transparent mx-auto mb-8" />

                      <div className="relative px-4">
                        <p className="font-serif text-cream-200/80 text-sm md:text-base leading-[2] whitespace-pre-wrap text-center font-light tracking-wide">
                          {letter.content}
                        </p>
                      </div>

                      <div className="w-16 h-px bg-gradient-to-r from-transparent via-gold-500/40 to-transparent mx-auto mt-8 mb-4" />
                    </div>
                  ))}

                <motion.button
                  className="mt-8 mx-auto flex items-center gap-2 text-gold-400/60 text-xs tracking-[0.3em] uppercase hover:text-gold-300 transition-colors"
                  onClick={() => setOpenId(null)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>✧</span>
                  Cerrar carta
                  <span>✧</span>
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
