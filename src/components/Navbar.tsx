import { useState } from 'react'
import { ArrowUpRight, Menu, Sparkles, X } from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Innovations', href: '#innovations' },
  { label: 'Innovation Lab', href: '#innovation-lab' },
  { label: 'Our Approach', href: '#approach' },
  { label: 'Contact', href: '#contact' }
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const reduceMotion = useReducedMotion()

  return (
    <header className="nav-wrap">
      <nav className="nav container" aria-label="Main navigation">
        {/* NEW STARS Brand Logo */}
        <a className="brand new-stars-brand" href="#top" aria-label="NEW STARS Home">
          <div className="brand-logo-icon">
            <Sparkles size={16} className="text-lime" />
          </div>
          <span className="brand-text">
            NEW STARS<span>®</span>
          </span>
        </a>

        {/* Desktop Links */}
        <div className="nav-links desktop-only">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="nav-link-item">
              {link.label}
            </a>
          ))}
          <a className="nav-contact" href="#contact">
            Partner With Us <ArrowUpRight size={15} />
          </a>
        </div>

        {/* Mobile menu toggle */}
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
                {navLinks.map((link) => (
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
                  href="#contact"
                  onClick={() => setOpen(false)}
                >
                  Partner With Us <ArrowUpRight size={16} />
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  )
}
