import { useState } from 'react'
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Check,
  Compass,
  Copy,
  Cpu,
  Github,
  Handshake,
  Lightbulb,
  Linkedin,
  Mail,
  MoveUpRight,
  Search,
  Sparkles,
  Users
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
import SmartWasteFlagship from './sections/SmartWasteFlagship'

/**
 * 1. HERO SECTION: FOUNDER INTRODUCTION
 * Masked dramatic text entrance, subtle floating geometry, dual CTAs
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
          <span>PROTOTYPE STAGE · OPEN TO COLLABORATION & PILOTS</span>
        </span>
        <span className="hero-location">TECHNOLOGY BUILDER · CHENNAI, INDIA</span>
      </div>

      <div className="hero-title-wrap">
        <motion.p
          className="hero-kicker"
          initial={reduceMotion ? false : { opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          FOUNDER-LED INNOVATION PORTFOLIO
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
              BUILDING IDEAS INTO
            </motion.span>
          </span>
          <span className="mask-wrapper title-second">
            <motion.span
              className="mask-inner"
              initial={reduceMotion ? false : { y: '105%' }}
              animate={{ y: 0 }}
              transition={{ duration: 0.85, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
            >
              REAL-WORLD <em>INNOVATIONS.</em>
            </motion.span>
          </span>
        </h1>
      </div>

      <div className="hero-bottom-founder">
        <p className="hero-supporting-copy">
          I’m Boopathi, a technology builder exploring AI, software, and connected systems to solve practical
          problems. I turn ideas into prototypes, learn through experimentation, and collaborate with people who
          want to build meaningful products.
        </p>

        {/* Dual CTAs */}
        <div className="hero-cta-group">
          <a href="#innovations" className="hero-cta-btn primary">
            EXPLORE MY INNOVATIONS <ArrowRight size={16} />
          </a>
          <a href="#collaborate" className="hero-cta-btn secondary">
            LET’S COLLABORATE <ArrowUpRight size={16} />
          </a>
        </div>
      </div>

      {/* Rotating editorial badge */}
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
 * 2. BUILDER MINDSET & APPROACH
 */
function About({ repoCount }: { repoCount: number }) {
  return (
    <section className="section about-section" id="mindset">
      <div className="container">
        <div className="section-label">
          <span>01 / THE BUILDER'S MINDSET</span>
          <span>EXECUTION THROUGH EXPERIMENTATION</span>
        </div>

        <div className="about-grid">
          <Reveal>
            <h2 className="manifesto">
              RAPID PROTOTYPES.<br />
              <span>HONEST</span><br />
              EXECUTION.
            </h2>
          </Reveal>

          <Reveal delay={0.12} className="about-aside">
            <p className="lead">
              I believe innovation is not about making unsubstantiated claims; it is about building working
              software and physical hardware that can be tested, critiqued, and refined.
            </p>
            <p>
              My portfolio is an open innovation workbench: connecting ESP32 ultrasonic sensors on a breadboard
              to solve municipal waste overflow, crafting natural language query pipelines on top of relational
              databases, and engineering offline-first educational tools for rural schools.
            </p>
            <p>
              I build to understand real-world friction and collaborate with mentors, technical partners, and
              domain experts who want to solve hard problems.
            </p>
            <a className="text-link" href="#vision">
              Read my startup vision <ArrowRight size={16} />
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
            <small>ACTIVE PROTOTYPE DOMAINS</small>
          </div>
          <div>
            <strong>
              <CountUp end={100} duration={1.2} />
              <span>%</span>
            </strong>
            <small>VERIFIED & TRANSPARENT CODEBASES</small>
          </div>
        </div>
      </div>
    </section>
  )
}

/**
 * 3. INNOVATION PORTFOLIO: ORGANIZED BY PROBLEM & PRODUCT
 */
function Innovations({ onOpenProject }: { onOpenProject: (p: Project) => void }) {
  return (
    <section className="section work-section" id="innovations">
      <div className="container">
        <div className="section-label">
          <span>02 / INNOVATION PORTFOLIO</span>
          <span>PROBLEM-DRIVEN WORKING PROTOTYPES</span>
        </div>

        <div className="work-heading">
          <Reveal>
            <h2>
              REAL PROBLEMS.<br />
              <span>WORKING SOLUTIONS.</span>
            </h2>
          </Reveal>
          <p>
            Each innovation is developed to solve tangible real-world friction. Every feature status is
            strictly classified into what works, what is in active development, and what is planned.
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
            <strong>INNOVATION TRANSPARENCY:</strong> Click any card to view the comprehensive 9-point technical
            matrix: the exact problem explored, target users, implemented solution, technology stack, working
            features, active development, roadmap, and verified repositories.
          </p>
        </div>
      </div>
    </section>
  )
}

/**
 * 4. STARTUP VISION: FROM PROTOTYPES TO PRODUCTS
 */
function Vision() {
  const reduceMotion = useReducedMotion()

  const stages = [
    {
      step: 'STAGE 01',
      title: 'EXPLORE',
      lead: 'Identify Real-World Friction',
      desc: 'Investigate underserved daily problems across civic management, regional education, and agricultural commerce where technology can remove systemic bottlenecks.',
      icon: Search
    },
    {
      step: 'STAGE 02',
      title: 'BUILD',
      lead: 'Create & Test Prototypes',
      desc: 'Build functional physical hardware and end-to-end software prototypes. Validate assumptions through bench testing, firmware calibration, and rapid iteration.',
      icon: Cpu
    },
    {
      step: 'STAGE 03',
      title: 'COLLABORATE',
      lead: 'Validate with Users & Partners',
      desc: 'Engage startup mentors, domain practitioners, and early pilot partners to stress-test prototypes against real operational conditions.',
      icon: Users
    }
  ]

  return (
    <section className="section vision-founder-section" id="vision">
      <div className="container">
        <div className="section-label">
          <span>05 / STARTUP VISION</span>
          <span>THE WORKING INNOVATION ROADMAP</span>
        </div>

        <div className="vision-head">
          <Reveal>
            <p className="vision-kicker">WHERE PROTOTYPES BECOME IMPACT</p>
            <h2 className="manifesto">
              FROM PROTOTYPES<br />
              TO <span>PRODUCTS.</span>
            </h2>
          </Reveal>
          <p className="vision-intro">
            I am exploring ideas, testing prototypes, and looking for opportunities to turn promising solutions
            into useful, scalable products. Here is the operational framework I use to move from concept to
            validation.
          </p>
        </div>

        <div className="vision-stages-grid">
          {stages.map((stg, i) => {
            const Icon = stg.icon
            return (
              <Reveal key={stg.step} delay={i * 0.1}>
                <div className="vision-stage-card">
                  <div className="stage-top">
                    <span className="stage-step-tag">{stg.step}</span>
                    <Icon size={20} className="text-lime" />
                  </div>
                  <h3>{stg.title}</h3>
                  <strong className="stage-lead">{stg.lead}</strong>
                  <p>{stg.desc}</p>
                </div>
              </Reveal>
            )
          })}
        </div>

        <div className="vision-disclaimer-card">
          <Lightbulb size={18} className="text-lime" />
          <p>
            <strong>FOUNDER TRANSPARENCY:</strong> This framework represents my working development approach as an
            independent technical builder—not an established corporation or validated business model. I am actively
            seeking mentors and collaborators to refine these ventures.
          </p>
        </div>

        <motion.div
          className="vision-symbol"
          aria-hidden="true"
          animate={reduceMotion ? undefined : { rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
        >
          ✳
        </motion.div>
      </div>
    </section>
  )
}

/**
 * 5. COLLABORATION SECTION (MAIN CONVERSION GOAL)
 * Tailored tracks for mentors, technical partners, domain experts, and pilot partners
 */
function Collaboration() {
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

  const tracks = [
    {
      role: 'STARTUP MENTORS',
      desc: 'Experienced operators and founders who can advise on product positioning, hardware scalability, and pilot roadmaps.'
    },
    {
      role: 'TECHNICAL COLLABORATORS',
      desc: 'Software engineers, firmware architects, and AI researchers interested in building and open-sourcing cutting-edge prototypes.'
    },
    {
      role: 'PRODUCT & DOMAIN EXPERTS',
      desc: 'Municipal sanitation specialists, rural educators, and agricultural experts who understand the nuances of the problems.'
    },
    {
      role: 'EARLY PILOT PARTNERS',
      desc: 'Organizations, campuses, or community groups open to trialing low-cost prototypes in controlled, low-stakes environments.'
    }
  ]

  return (
    <footer className="contact-section" id="collaborate">
      <div className="container">
        <div className="section-label">
          <span>06 / COLLABORATION</span>
          <span>MAIN CONVERSION & PARTNERSHIP CHANNELS</span>
        </div>

        <p className="contact-kicker">OPEN TO PILOTS, ADVICE & JOINT BUILDING</p>
        <h2>
          GOOD IDEAS GET BETTER<br />
          <span>WHEN WE BUILD TOGETHER.</span>
        </h2>

        {/* Tailored Audience Tracks */}
        <div className="collab-tracks-grid">
          {tracks.map((t, idx) => (
            <div key={idx} className="collab-track-card">
              <span className="track-role">
                <Handshake size={13} className="text-lime" /> {t.role}
              </span>
              <p>{t.desc}</p>
            </div>
          ))}
        </div>

        {/* Action Panel */}
        <div className="contact-bottom">
          <div className="contact-email-container">
            <a className="email-link" href={`mailto:${contactEmail}`}>
              {contactEmail} <MoveUpRight size={22} />
            </a>

            <button
              type="button"
              className="copy-email-btn"
              onClick={handleCopyEmail}
              aria-label="Copy verified email address to clipboard"
            >
              {copied ? (
                <>
                  <Check size={16} className="text-lime" />
                  <span>COPIED TO CLIPBOARD!</span>
                </>
              ) : (
                <>
                  <Copy size={16} />
                  <span>COPY EMAIL ADDRESS</span>
                </>
              )}
            </button>
          </div>

          <div className="contact-note">
            <Sparkles size={16} className="text-lime" />
            <p>
              Direct contact with Boopathi. Ready to discuss prototypes, hardware bench demos, code architectures,
              or exploratory partnership opportunities.
            </p>
          </div>
        </div>

        {/* Footer Meta Line */}
        <div className="footer-line">
          <a className="brand footer-brand" href="#top" aria-label="Boopathi Home">
            BOOPATHI<span>®</span>
          </a>

          <span className="footer-copyright">
            BOOPATHI CREATIVE PORTFOLIO © 2026<br />
            DESIGNED & ENGINEERED FOR FOUNDER-LED INNOVATION.
          </span>

          <div className="socials">
            <a
              href="https://github.com/boopathiravi03"
              target="_blank"
              rel="noreferrer"
              aria-label="Boopathi GitHub profile"
              title="Verified GitHub Account"
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
              title="Direct Email"
            >
              <Mail size={18} />
            </a>
          </div>

          <a className="back-top" href="#top" aria-label="Back to top">
            BACK TO TOP <ArrowDown size={14} style={{ transform: 'rotate(180deg)' }} />
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
                BUILDING IDEAS INTO REAL-WORLD INNOVATIONS <b>✳</b> HARDWARE TO CLOUD <b>✳</b> PROTOTYPING FOR PILOT PARTNERS <b>✳</b> VERIFIED OPEN CODE <b>✳</b>
              </span>
            ))}
          </div>
        </div>

        <About repoCount={github.profile.public_repos} />
        <Innovations onOpenProject={(proj) => setSelectedProject(proj)} />
        <SmartWasteFlagship />
        <GitHubSection github={github} />
        <Vision />
        <Collaboration />
      </main>

      {/* Case Study Detail Modal with 9-point matrix */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </>
  )
}
