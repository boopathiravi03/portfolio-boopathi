import { useState } from 'react'
import { ArrowUpRight, Menu, X } from 'lucide-react'

const links = [{ label: 'Work', href: '#work' }, { label: 'About', href: '#about' }, { label: 'Vision', href: '#vision' }]
export default function Navbar() {
  const [open, setOpen] = useState(false)
  return <header className="nav-wrap"><nav className="nav container" aria-label="Main navigation">
    <a className="brand" href="#top" aria-label="Boopathi home">B<span>®</span></a>
    <div className={`nav-links ${open ? 'is-open' : ''}`}>
      {links.map(link => <a key={link.href} href={link.href} onClick={() => setOpen(false)}>{link.label}</a>)}
      <a className="nav-contact" href="#contact" onClick={() => setOpen(false)}>Let's talk <ArrowUpRight size={15}/></a>
    </div>
    <button className="menu-toggle" onClick={() => setOpen(!open)} aria-label={open ? 'Close menu' : 'Open menu'}>{open ? <X/> : <Menu/>}</button>
  </nav></header>
}
