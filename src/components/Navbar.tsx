import { useState } from 'react'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'

const links = [
  { label: 'Innovations', href: '#innovations' },
  { label: 'Smart Waste', href: '#smart-waste' },
  { label: 'Build Log', href: '#build-log' },
  { label: 'Vision', href: '#vision' }
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const reduceMotion = useReducedMotion()

  return (
    <header className="nav-wrap">
      <nav className="nav container" aria-label="Main navigation">
        <a className="brand" href="#top" aria-label="Boopathi home">
          BOOPATHI<span>®</span>
        </a>

        {/* Desktop Navigation */}
        <div className="nav-links desktop-only">
          {links.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
          <a className="nav-contact" href="#collaborate">
            Let's Collaborate <ArrowUpRight size={15} />
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="menu-toggle"
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Close navigation' : 'Open navigation'}
          aria-expanded={open}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Drawer */}
        <AnimatePresence>
          {open && (
            <motion.div
              className="mobile-nav-drawer"
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -15, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -15, height: 0 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
            >
              <div className="mobile-nav-inner">
                {links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="mobile-nav-link"
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </a>
                ))}
                <a
                  className="mobile-nav-contact"
                  href="#collaborate"
                  onClick={() => setOpen(false)}
                >
                  Let's Collaborate <ArrowUpRight size={16} />
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  )
}
