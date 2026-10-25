import { useEffect, useState } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react'

export default function CustomCursor() {
  const reduceMotion = useReducedMotion()
  const [enabled, setEnabled] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [visible, setVisible] = useState(false)

  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)

  const springConfig = { damping: 25, stiffness: 350, mass: 0.5 }
  const cursorX = useSpring(mouseX, springConfig)
  const cursorY = useSpring(mouseY, springConfig)

  useEffect(() => {
    // Only activate on devices with fine pointer (mouse/trackpad), not touch screens
    const hasFinePointer = window.matchMedia('(pointer: fine)').matches
    if (!hasFinePointer || reduceMotion) {
      return
    }

    setEnabled(true)

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
      if (!visible) setVisible(true)
    }

    const handleMouseLeave = () => {
      setVisible(false)
    }

    const handleMouseEnter = () => {
      setVisible(true)
    }

    // Detect interactive elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null
      if (
        target?.closest('a') ||
        target?.closest('button') ||
        target?.closest('[role="button"]') ||
        target?.closest('.project-card') ||
        target?.closest('.repo-card') ||
        target?.closest('.interactive')
      ) {
        setHovered(true)
      } else {
        setHovered(false)
      }
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)
    document.addEventListener('mouseover', handleMouseOver, { passive: true })

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
      document.removeEventListener('mouseover', handleMouseOver)
    }
  }, [mouseX, mouseY, reduceMotion, visible])

  if (!enabled || reduceMotion) return null

  return (
    <div className="custom-cursor-layer" aria-hidden="true">
      {/* Outer tracking ring */}
      <motion.div
        className={`custom-cursor-ring ${hovered ? 'is-hover' : ''}`}
        style={{
          x: cursorX,
          y: cursorY,
          opacity: visible ? 1 : 0
        }}
      />
      {/* Center sharp dot */}
      <motion.div
        className={`custom-cursor-dot ${hovered ? 'is-hover' : ''}`}
        style={{
          x: mouseX,
          y: mouseY,
          opacity: visible ? 1 : 0
        }}
      />
    </div>
  )
}
