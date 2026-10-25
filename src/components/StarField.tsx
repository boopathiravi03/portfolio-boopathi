import { useMemo } from 'react'
import { motion, useReducedMotion } from 'motion/react'

interface Star {
  id: number
  top: string
  left: string
  size: number
  opacity: number
  duration: number
  delay: number
}

export default function StarField() {
  const reduceMotion = useReducedMotion()

  const stars: Star[] = useMemo(() => {
    // Generate deterministic constellation of subtle star particles
    return Array.from({ length: 50 }).map((_, i) => {
      // Semi-random seeded values for stable rendering
      const pseudoX = ((i * 37) % 100)
      const pseudoY = ((i * 59) % 100)
      const size = i % 7 === 0 ? 2.5 : i % 3 === 0 ? 2 : 1.2
      const opacity = 0.2 + ((i % 5) * 0.12)
      const duration = 3 + ((i % 4) * 1.5)
      const delay = (i % 6) * 0.7

      return {
        id: i,
        top: `${pseudoY}%`,
        left: `${pseudoX}%`,
        size,
        opacity,
        duration,
        delay
      }
    })
  }, [])

  return (
    <div className="starfield-layer" aria-hidden="true">
      {/* Background ambient nebula glow */}
      <div className="nebula-glow nebula-top" />
      <div className="nebula-glow nebula-bottom" />

      {/* Futuristic orbital constellation rings */}
      <motion.div
        className="orbital-ring ring-outer"
        animate={reduceMotion ? undefined : { rotate: 360 }}
        transition={{ duration: 120, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="orbital-ring ring-middle"
        animate={reduceMotion ? undefined : { rotate: -360 }}
        transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
      />

      {/* Twinkling star particles */}
      {stars.map((star) => (
        <span
          key={star.id}
          className="star-particle"
          style={{
            top: star.top,
            left: star.left,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
            animationDuration: reduceMotion ? '0s' : `${star.duration}s`,
            animationDelay: `${star.delay}s`
          }}
        />
      ))}
    </div>
  )
}
