import { useEffect, useRef, useState } from 'react'
import { useInView, useReducedMotion } from 'motion/react'

interface CountUpProps {
  end: number
  duration?: number
  prefix?: string
  suffix?: string
  className?: string
}

export default function CountUp({
  end,
  duration = 1.2,
  prefix = '',
  suffix = '',
  className = ''
}: CountUpProps) {
  const [count, setCount] = useState<number>(0)
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.3 })
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    if (!inView) return
    if (reduceMotion) {
      setCount(end)
      return
    }

    let startTime: number | null = null
    let animationFrameId: number

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1)
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * end))

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step)
      } else {
        setCount(end)
      }
    }

    animationFrameId = requestAnimationFrame(step)
    return () => cancelAnimationFrame(animationFrameId)
  }, [inView, end, duration, reduceMotion])

  return (
    <span ref={ref} className={className}>
      {prefix}
      {count}
      {suffix}
    </span>
  )
}
