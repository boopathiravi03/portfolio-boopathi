import { ArrowDown, ArrowDownRight, ArrowRight, ArrowUpRight, Github, Linkedin, Mail, MoveUpRight } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import Navbar from './components/Navbar'
import Reveal from './components/Reveal'
import ScrollProgress from './components/ScrollProgress'
import ProjectCard from './sections/ProjectCard'
import { projects } from './data/projects'

function Hero() {
  const reduceMotion = useReducedMotion()
  return <section className="hero container" id="top">
    <div className="hero-meta"><span><i className="status-dot"/> OPEN TO COLLABORATION</span><span>DEVELOPER / INNOVATOR / BUILDER</span></div>
    <div className="hero-title-wrap"><motion.p className="hero-kicker" initial={reduceMotion ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }}>HELLO, I'M BOOPATHI.</motion.p><h1 className="hero-title"><motion.span initial={reduceMotion ? false : { opacity: 0, y: 70 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.18 }}>BUILDING</motion.span><motion.span className="title-second" initial={reduceMotion ? false : { opacity: 0, y: 70 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.32 }}>WHAT'S <em>NEXT.</em></motion.span></h1></div>
    <div className="hero-bottom"><p>I turn curiosity into projects, ideas into prototypes, and real-world problems into opportunities to build something better.</p><a className="round-link" href="#work" aria-label="Scroll to selected work"><ArrowDown size={20}/></a><span className="hero-index">PORTFOLIO — 2026<br/>MADE WITH INTENTION.</span></div>
    <div className="hero-decoration" aria-hidden="true"><span>IDEAS</span><span>×</span><span>EXECUTION</span></div>
  </section>
}

function About() {
  return <section className="section about-section" id="about"><div className="container"><div className="section-label"><span>01 / THE MINDSET</span><span>ABOUT ME</span></div><div className="about-grid"><Reveal><h2 className="manifesto">CURIOUS BY<br/>NATURE. <span>BUILDER</span><br/>BY CHOICE.</h2></Reveal><Reveal delay={0.12} className="about-aside"><p className="lead">I’m interested in the space where technology meets everyday life.</p><p>I enjoy learning how systems work, experimenting with software, and exploring ideas that can make a practical difference. My portfolio is a living record of what I’m learning, building, and trying next.</p><a className="text-link" href="#journey">A little more about my journey <ArrowDownRight size={16}/></a></Reveal></div><div className="about-stats"><div><strong>01<span>+</span></strong><small>IDEAS IN MOTION</small></div><div><strong>∞</strong><small>THINGS TO LEARN</small></div><div><strong>100<span>%</span></strong><small>BUILT THROUGH CURIOSITY</small></div></div></div></section>
}

function Work() {
  return <section className="section work-section" id="work"><div className="container"><div className="section-label"><span>02 / SELECTED WORK</span><span>THINK → BUILD → LEARN</span></div><div className="work-heading"><Reveal><h2>SMALL STEPS.<br/><span>REAL PROBLEMS.</span></h2></Reveal><p>A few projects and experiments. Each one is a chance to ask better questions, test an idea, and make progress.</p></div><div className="project-grid">{projects.map((project, i) => <Reveal key={project.number} delay={i * 0.08}><ProjectCard project={project}/></Reveal>)}</div><p className="project-note"><span className="note-star">✳</span> THIS IS A WORK IN PROGRESS. THE BEST PARTS ARE STILL BEING BUILT.</p></div></section>
}

function Journey() {
  const items = [{ year: '01', title: 'LEARN THE FOUNDATIONS', text: 'Build strong fundamentals in programming, databases, and software engineering.' }, { year: '02', title: 'BUILD TO UNDERSTAND', text: 'Turn concepts into prototypes, test assumptions, and learn by solving real problems.' }, { year: '03', title: 'SHARE & COLLABORATE', text: 'Take ideas into competitions, work with teams, and learn from different perspectives.' }]
  return <section className="section journey-section" id="journey"><div className="container"><div className="section-label"><span>03 / THE JOURNEY</span><span>ALWAYS IN BETA</span></div><div className="journey-head"><h2>NOT A FINISH LINE.<br/><span>A STARTING POINT.</span></h2><p>Growth is a series of experiments. Here's the path I'm building, one step at a time.</p></div><div className="journey-list">{items.map((item, i) => <Reveal key={item.year} delay={i * 0.06}><div className="journey-item"><span className="journey-num">{item.year}</span><h3>{item.title}</h3><p>{item.text}</p><ArrowUpRight size={19}/></div></Reveal>)}</div></div></section>
}

function Toolkit() {
  const skills = ['C / C++', 'Python', 'JavaScript', 'React', 'HTML & CSS', 'SQL / DBMS', 'Git & GitHub', 'IoT Prototyping', 'Problem Solving', 'Rapid Learning']
  return <section className="section toolkit-section" id="toolkit"><div className="container"><div className="section-label"><span>04 / THE TOOLKIT</span><span>TOOLS IN PROGRESS</span></div><div className="toolkit-grid"><h2>LEARN THE<br/>TOOLS. <span>QUESTION</span><br/>THE RULES.</h2><div className="toolkit-content"><p>Technologies I use or am exploring. The list will evolve as I build more and go deeper.</p><div className="skill-cloud">{skills.map((skill, i) => <span key={skill} className={i === 2 || i === 3 || i === 5 ? 'skill-accent' : ''}>{skill}<ArrowUpRight size={13}/></span>)}</div></div></div></div></section>
}

function Vision() {
  return <section className="vision-section" id="vision"><div className="container vision-inner"><div className="section-label"><span>05 / LOOKING FORWARD</span><span>THE BIGGER PICTURE</span></div><Reveal><p className="vision-overline">THE NEXT BIG THING STARTS WITH A QUESTION.</p><h2>WHAT IF WE<br/>MADE IT <span>BETTER?</span></h2><div className="vision-bottom"><p>I want to keep exploring ideas at the intersection of technology, useful products, and real human needs. The long-term goal: build things that solve meaningful problems and create value.</p><a className="text-link" href="#contact">Have an idea? Let's connect <ArrowUpRight size={16}/></a></div></Reveal><div className="vision-symbol" aria-hidden="true">✳</div></div></section>
}

function Contact() {
  return <footer className="contact-section" id="contact"><div className="container"><div className="section-label"><span>06 / SAY HELLO</span><span>GOOD THINGS START WITH A CONVERSATION</span></div><p className="contact-kicker">HAVE A GOOD PROBLEM?</p><h2>LET'S MAKE<br/><span>SOMETHING.</span></h2><div className="contact-bottom"><a className="email-link" href="mailto:hello@example.com">hello@example.com <MoveUpRight size={18}/></a><p>Replace this starter email with your preferred contact address before publishing.</p></div><div className="footer-line"><a className="brand footer-brand" href="#top">B<span>®</span></a><span>DESIGNED TO EVOLVE. © 2026</span><div className="socials"><a href="https://github.com/" target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={17}/></a><a href="https://www.linkedin.com/" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={17}/></a><a href="mailto:hello@example.com" aria-label="Email"><Mail size={17}/></a></div><a className="back-top" href="#top">BACK TO TOP <ArrowRight size={14}/></a></div></div></footer>
}

export default function App() {
  return <><ScrollProgress/><Navbar/><main><Hero/><div className="ticker" aria-hidden="true"><div className="ticker-track">{Array.from({ length: 4 }).map((_, i) => <span key={i}>CURIOUS MINDS BUILD THINGS <b>✳</b> IDEAS INTO ACTION <b>✳</b> KEEP MOVING FORWARD <b>✳</b></span>)}</div></div><About/><Work/><Journey/><Toolkit/><Vision/><Contact/></main></>
}
