import { useState } from 'react'
import {
  ArrowDown,
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Check,
  Compass,
  Copy,
  Github,
  Linkedin,
  Mail,
  MoveUpRight,
  Sparkles,
  Terminal
} from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import CountUp from './components/CountUp'
import CustomCursor from './components/CustomCursor'
import Navbar from './components/Navbar'
import ProjectModal from './components/ProjectModal'
import Reveal from './components/Reveal'
import ScrollProgress from './components/ScrollProgress'
import { projects, type Project } from './data/projects'
import { useGitHubData } from './hooks/useGitHubData'
import GitHubSection from './sections/GitHubSection'
import ProjectCard from './sections/ProjectCard'

/**
 * 1. HERO SECTION
 * Masked dramatic text entrance, subtle floating geometry, electric lime accents
 */
function Hero() {
  const reduceMotion = useReducedMotion()

  return (
    <section className="hero container" id="top">
      {/* Background subtle floating geometry */}
      <div className="hero-bg-shapes" aria-hidden="true">
        <motion.div
          className="hero-floating-circle"
          animate={
            reduceMotion
              ? undefined
              : {
                  y: [-12, 12, -12],
                  x: [-6, 6, -6],
                  rotate: [0, 45, 0]
                }
          }
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="hero-floating-ring"
          animate={
            reduceMotion
              ? undefined
              : {
                  y: [10, -10, 10],
                  rotate: [0, 180, 360]
                }
          }
          transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      <div className="hero-meta">
        <span className="hero-status-pill">
          <i className="status-dot" />
          <span>OPEN TO COLLABORATION</span>
        </span>
        <span className="hero-location">DEVELOPER / INNOVATOR / BUILDER</span>
      </div>

      <div className="hero-title-wrap">
        <motion.p
          className="hero-kicker"
          initial={reduceMotion ? false : { opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          HELLO, I'M BOOPATHI.
        </motion.p>

        {/* Masked heading reveals */}
        <h1 className="hero-title">
          <span className="mask-wrapper">
            <motion.span
              className="mask-inner"
              initial={reduceMotion ? false : { y: '105%' }}
              animate={{ y: 0 }}
              transition={{ duration: 0.85, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
            >
              BUILDING
            </motion.span>
          </span>
          <span className="mask-wrapper title-second">
            <motion.span
              className="mask-inner"
              initial={reduceMotion ? false : { y: '105%' }}
              animate={{ y: 0 }}
              transition={{ duration: 0.85, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
            >
              WHAT'S <em>NEXT.</em>
            </motion.span>
          </span>
        </h1>
      </div>

      <div className="hero-bottom">
        <p>
          I turn curiosity into working software, hardware prototypes into practical solutions, and real-world
          constraints into opportunities to build resilient systems.
        </p>

        <a className="round-link" href="#work" aria-label="Scroll to selected work">
          <ArrowDown size={20} />
        </a>

        <span className="hero-index">
          PORTFOLIO — 2026<br />
          MADE WITH INTENTION.
        </span>
      </div>

      <motion.div
        className="hero-decoration"
        aria-hidden="true"
        animate={reduceMotion ? undefined : { rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
      >
        <span>IDEAS</span>
        <span>×</span>
        <span>EXECUTION</span>
      </motion.div>
    </section>
  )
}

/**
 * 2. ABOUT / THE MINDSET
 * Live animated counters, philosophy, and learning trajectory
 */
function About({ repoCount }: { repoCount: number }) {
  return (
    <section className="section about-section" id="about">
      <div className="container">
        <div className="section-label">
          <span>01 / THE MINDSET</span>
          <span>ABOUT ME & APPROACH</span>
        </div>

        <div className="about-grid">
          <Reveal>
            <h2 className="manifesto">
              CURIOUS BY<br />
              NATURE. <span>BUILDER</span><br />
              BY CHOICE.
            </h2>
          </Reveal>

          <Reveal delay={0.12} className="about-aside">
            <p className="lead">
              I focus on the intersection of embedded IoT hardware, modern web systems, and applied AI.
            </p>
            <p>
              Rather than waiting for ideal conditions, I prototype rapidly: hooking up ultrasonic sensors to
              ESP32 microcontrollers, wiring FastAPI services to natural language models, and developing responsive
              mobile interfaces in Flutter and Kotlin.
            </p>
            <p>
              Every project is a transparent experiment in solving real-world friction.
            </p>
            <a className="text-link" href="#journey">
              Explore my trajectory <ArrowDownRight size={16} />
            </a>
          </Reveal>
        </div>

        {/* Animated metrics */}
        <div className="about-stats">
          <div>
            <strong>
              <CountUp end={repoCount || 14} duration={1.2} />
              <span>+</span>
            </strong>
            <small>PUBLIC GITHUB REPOSITORIES</small>
          </div>
          <div>
            <strong>
              <CountUp end={4} duration={1.2} />
              <span>+</span>
            </strong>
            <small>SPECIALIZED TECH DOMAINS</small>
          </div>
          <div>
            <strong>
              <CountUp end={100} duration={1.2} />
              <span>%</span>
            </strong>
            <small>TRANSPARENT & VERIFIED WORK</small>
          </div>
        </div>
      </div>
    </section>
  )
}

/**
 * 3. SELECTED WORK
 * Authentic projects with distinct status matrixes and deep case study modal
 */
function Work({ onOpenProject }: { onOpenProject: (p: Project) => void }) {
  return (
    <section className="section work-section" id="work">
      <div className="container">
        <div className="section-label">
          <span>02 / SELECTED WORK</span>
          <span>VERIFIED ARCHITECTURES & PROTOTYPES</span>
        </div>

        <div className="work-heading">
          <Reveal>
            <h2>
              REAL PROBLEMS.<br />
              <span>TESTED CODE.</span>
            </h2>
          </Reveal>
          <p>
            Featured implementations across IoT hardware, conversational AI, and educational technology. Every
            feature status is accurately documented.
          </p>
        </div>

        <div className="project-grid">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onOpenDetails={onOpenProject}
            />
          ))}
        </div>

        <div className="project-note-banner">
          <span className="note-star">✳</span>
          <p>
            <strong>INTEGRITY NOTE:</strong> Hardware specifications (ESP32 ultrasonic time-of-flight) and software
            capabilities are documented according to actual bench testing. No exaggerated municipal scale or
            fabricated telemetry claims.
          </p>
        </div>
      </div>
    </section>
  )
}

/**
 * 4. JOURNEY TIMELINE
 * Step-by-step evolution with animated timeline connector
 */
function Journey() {
  const steps = [
    {
      num: '01',
      phase: 'FOUNDATIONS & LOGIC',
      title: 'Programming, Data Structures & Systems',
      text: 'Deep dive into C/C++, Python, database design, and algorithmic problem-solving to build rock-solid engineering foundations.',
      status: 'Continuous'
    },
    {
      num: '02',
      phase: 'HARDWARE & PHYSICAL COMPUTING',
      title: 'Microcontrollers & Sensor Integration',
      text: 'Prototyping with ESP32, ultrasonic fill sensors, and breadboard circuitry for real-world environmental monitoring.',
      status: 'Active Prototyping'
    },
    {
      num: '03',
      phase: 'FULL-STACK & CONVERSATIONAL AI',
      title: 'FastAPI, Modern React & Language Models',
      text: 'Architecting end-to-end applications that bridge relational databases with natural language query interfaces and cross-platform clients.',
      status: 'Active Development'
    },
    {
      num: '04',
      phase: 'APPLIED IMPACT & DEPLOYMENT',
      title: 'Real Solutions for Real Communities',
      text: 'Creating mother-tongue educational assistants (Santali/Hindi) and agricultural marketplace platforms with offline-first architectures.',
      status: 'Iterative Testing'
    }
  ]

  return (
    <section className="section journey-section" id="journey">
      <div className="container">
        <div className="section-label">
          <span>04 / THE JOURNEY</span>
          <span>SYSTEMATIC DEVELOPMENT</span>
        </div>

        <div className="journey-head">
          <Reveal>
            <h2>
              NOT A FINISH LINE.<br />
              <span>A STARTING POINT.</span>
            </h2>
          </Reveal>
          <p>
            Engineering is an ongoing experiment. Here is the path I am following, connecting low-level hardware
            to modern cloud platforms.
          </p>
        </div>

        <div className="journey-list">
          {steps.map((step, i) => (
            <Reveal key={step.num} delay={i * 0.08}>
              <div className="journey-item">
                <span className="journey-num">{step.num}</span>
                <div>
                  <span className="journey-phase">{step.phase}</span>
                  <h3>{step.title}</h3>
                </div>
                <p>{step.text}</p>
                <span className="journey-status-tag">{step.status}</span>
                <ArrowUpRight size={19} className="journey-arrow" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/**
 * 5. TOOLKIT & ANIMATED SKILL BARS
 * Visual skill proficiency bars that fill up when in view
 */
function Toolkit() {
  const reduceMotion = useReducedMotion()

  const skillCategories = [
    {
      category: 'LANGUAGES & RUNTIMES',
      items: [
        { name: 'Python (FastAPI, Data, ML)', level: 85 },
        { name: 'TypeScript & JavaScript', level: 85 },
        { name: 'Kotlin (Android Native)', level: 75 },
        { name: 'Dart (Flutter SDK)', level: 75 },
        { name: 'C / C++ (Embedded & IoT)', level: 70 }
      ]
    },
    {
      category: 'SYSTEMS & FRAMEWORKS',
      items: [
        { name: 'React 19 & Vite Tooling', level: 88 },
        { name: 'ESP32 / Ultrasonic Hardware', level: 80 },
        { name: 'SQLAlchemy & Relational Databases', level: 80 },
        { name: 'Git & GitHub Collaboration', level: 90 },
        { name: 'REST APIs & Offline-First Sync', level: 82 }
      ]
    }
  ]

  return (
    <section className="section toolkit-section" id="toolkit">
      <div className="container">
        <div className="section-label">
          <span>05 / THE TOOLKIT</span>
          <span>VERIFIED TECHNICAL CAPABILITIES</span>
        </div>

        <div className="toolkit-grid">
          <div>
            <Reveal>
              <h2>
                LEARN THE<br />
                TOOLS. <span>QUESTION</span><br />
                THE RULES.
              </h2>
            </Reveal>
            <p className="toolkit-statement">
              I believe in choosing the right tool for the job — whether that is low-level C++ for microsecond
              sensor loops or high-performance FastAPI backends for real-time natural language query orchestration.
            </p>
            <div className="toolkit-callout">
              <Terminal size={18} />
              <span>Always exploring next-generation patterns and hardware integrations.</span>
            </div>
          </div>

          <div className="toolkit-content">
            {skillCategories.map((cat, catIdx) => (
              <div key={cat.category} className="skill-cat-block">
                <span className="cat-title">{cat.category}</span>
                <div className="skill-bars-list">
                  {cat.items.map((skill, i) => (
                    <div key={skill.name} className="skill-bar-row">
                      <div className="skill-bar-info">
                        <span className="skill-bar-name">{skill.name}</span>
                        <span className="skill-bar-pct">{skill.level}%</span>
                      </div>
                      <div className="skill-bar-track">
                        <motion.div
                          className="skill-bar-fill"
                          initial={reduceMotion ? { width: `${skill.level}%` } : { width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true, amount: 0.3 }}
                          transition={{
                            duration: 0.9,
                            delay: catIdx * 0.15 + i * 0.08,
                            ease: [0.16, 1, 0.3, 1]
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/**
 * 6. VISION SECTION
 * High-impact editorial design with rotating geometric emblem
 */
function Vision() {
  const reduceMotion = useReducedMotion()

  return (
    <section className="vision-section" id="vision">
      <div className="container vision-inner">
        <div className="section-label">
          <span>06 / LOOKING FORWARD</span>
          <span>THE BIGGER PICTURE</span>
        </div>

        <Reveal>
          <p className="vision-overline">THE NEXT BREAKTHROUGH STARTS WITH AN HONEST QUESTION.</p>
          <h2>
            WHAT IF WE<br />
            MADE IT <span>BETTER?</span>
          </h2>
          <div className="vision-bottom">
            <p>
              I build technology that solves practical friction: from preventing overflowing waste containers with
              smart sensor nodes, to empowering rural primary schools with mother-tongue AI assistants.
            </p>
            <a className="text-link" href="#contact">
              Have a problem to solve? Let's connect <ArrowUpRight size={16} />
            </a>
          </div>
        </Reveal>

        <motion.div
          className="vision-symbol"
          aria-hidden="true"
          animate={reduceMotion ? undefined : { rotate: 360 }}
          transition={{ duration: 32, repeat: Infinity, ease: 'linear' }}
        >
          ✳
        </motion.div>
      </div>
    </section>
  )
}

/**
 * 7. CONTACT SECTION & COPY-EMAIL INTERACTION
 * Interactive email copy with tooltip feedback, verified social links
 */
function Contact() {
  const [copied, setCopied] = useState(false)
  const contactEmail = 'boopathiravi03@gmail.com'

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(contactEmail)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    } catch {
      // Fallback
    }
  }

  return (
    <footer className="contact-section" id="contact">
      <div className="container">
        <div className="section-label">
          <span>07 / SAY HELLO</span>
          <span>GOOD THINGS START WITH A CONVERSATION</span>
        </div>

        <p className="contact-kicker">HAVE AN IDEA OR ENGINEERING CHALLENGE?</p>
        <h2>
          LET'S MAKE<br />
          <span>SOMETHING.</span>
        </h2>

        <div className="contact-bottom">
          <div className="contact-email-container">
            <a className="email-link" href={`mailto:${contactEmail}`}>
              {contactEmail} <MoveUpRight size={20} />
            </a>

            <button
              type="button"
              className="copy-email-btn"
              onClick={handleCopyEmail}
              aria-label="Copy email address to clipboard"
            >
              {copied ? (
                <>
                  <Check size={16} className="text-lime" />
                  <span>COPIED TO CLIPBOARD!</span>
                </>
              ) : (
                <>
                  <Copy size={16} />
                  <span>COPY EMAIL</span>
                </>
              )}
            </button>
          </div>

          <div className="contact-note">
            <Sparkles size={16} className="text-lime" />
            <p>
              Open to collaborative projects, technical discussions, and innovative prototype development.
            </p>
          </div>
        </div>

        <div className="footer-line">
          <a className="brand footer-brand" href="#top" aria-label="Boopathi Home">
            B<span>®</span>
          </a>

          <span className="footer-copyright">
            BOOPATHI CREATIVE PORTFOLIO © 2026<br />
            DESIGNED & ENGINEERED TO EVOLVE.
          </span>

          <div className="socials">
            <a
              href="https://github.com/boopathiravi03"
              target="_blank"
              rel="noreferrer"
              aria-label="Boopathi GitHub profile"
            >
              <Github size={18} />
            </a>
            <a
              href="https://www.linkedin.com/in/boopathi-ravi-740751336"
              target="_blank"
              rel="noreferrer"
              aria-label="Boopathi LinkedIn profile"
              title="LinkedIn Profile"
            >
              <Linkedin size={18} />
            </a>
            <a
              href="https://github.com/boopathiravi03/portfolio-boopathi"
              target="_blank"
              rel="noreferrer"
              aria-label="Source code for this portfolio repository"
              title="Portfolio Source Code"
            >
              <Compass size={18} />
            </a>
            <a
              href={`mailto:${contactEmail}`}
              aria-label="Send email directly"
              title="Send Email"
            >
              <Mail size={18} />
            </a>
          </div>

          <a className="back-top" href="#top" aria-label="Back to top">
            BACK TO TOP <ArrowRight size={14} />
          </a>
        </div>
      </div>
    </footer>
  )
}

/**
 * MAIN APP CONTAINER
 */
export default function App() {
  const github = useGitHubData()
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  return (
    <>
      <CustomCursor />
      <ScrollProgress />
      <Navbar />

      <main id="main-content">
        <Hero />

        {/* Dynamic ticker */}
        <div className="ticker" aria-hidden="true">
          <div className="ticker-track">
            {Array.from({ length: 4 }).map((_, i) => (
              <span key={i}>
                CURIOUS MINDS BUILD THINGS <b>✳</b> HARDWARE TO CLOUD <b>✳</b> IDEAS INTO ACTION <b>✳</b> VERIFIED CODE <b>✳</b>
              </span>
            ))}
          </div>
        </div>

        <About repoCount={github.profile.public_repos} />
        <Work onOpenProject={(proj) => setSelectedProject(proj)} />
        <GitHubSection github={github} />
        <Journey />
        <Toolkit />
        <Vision />
        <Contact />
      </main>

      {/* Case Study Detail Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </>
  )
}
