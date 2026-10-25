import { useState } from 'react'
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Check,
  CheckCircle2,
  Compass,
  Copy,
  Cpu,
  FlaskConical,
  Github,
  Handshake,
  Layers,
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
import StarField from './components/StarField'
import { projects, type Project } from './data/projects'
import { useGitHubData } from './hooks/useGitHubData'
import GitHubSection from './sections/GitHubSection'
import ProjectCard from './sections/ProjectCard'
import SmartWasteFlagship from './sections/SmartWasteFlagship'

/**
 * 1. HERO SECTION: NEW STARS OFFICIAL LAUNCH
 * Headline: "BIG IDEAS. REAL PROBLEMS. BOLD INNOVATIONS."
 * Tagline: "Ideas today. Innovations tomorrow."
 */
function Hero() {
  const reduceMotion = useReducedMotion()

  return (
    <section className="hero container" id="top">
      {/* Subtle star constellation and orbital rings background */}
      <StarField />

      <div className="hero-meta">
        <span className="hero-status-pill">
          <Sparkles size={13} className="text-lime" />
          <span>NEW STARS · EMERGING TECHNOLOGY & INNOVATION INITIATIVE</span>
        </span>
        <span className="hero-location">IDEAS TODAY. INNOVATIONS TOMORROW.</span>
      </div>

      <div className="hero-title-wrap">
        <motion.p
          className="hero-kicker"
          initial={reduceMotion ? false : { opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          AN EMERGING TECH & VENTURE INITIATIVE
        </motion.p>

        {/* Masked dramatic heading reveals */}
        <h1 className="hero-title new-stars-hero-title">
          <span className="mask-wrapper">
            <motion.span
              className="mask-inner"
              initial={reduceMotion ? false : { y: '105%' }}
              animate={{ y: 0 }}
              transition={{ duration: 0.85, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
            >
              BIG IDEAS.
            </motion.span>
          </span>
          <span className="mask-wrapper">
            <motion.span
              className="mask-inner"
              initial={reduceMotion ? false : { y: '105%' }}
              animate={{ y: 0 }}
              transition={{ duration: 0.85, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
            >
              REAL PROBLEMS.
            </motion.span>
          </span>
          <span className="mask-wrapper title-second">
            <motion.span
              className="mask-inner"
              initial={reduceMotion ? false : { y: '105%' }}
              animate={{ y: 0 }}
              transition={{ duration: 0.85, delay: 0.38, ease: [0.16, 1, 0.3, 1] }}
            >
              BOLD <em>INNOVATIONS.</em>
            </motion.span>
          </span>
        </h1>
      </div>

      <div className="hero-bottom-founder">
        <div className="hero-brand-statement">
          <p className="hero-tagline-lead">“Ideas today. Innovations tomorrow.”</p>
          <p className="hero-supporting-copy">
            <strong>NEW STARS</strong> is an emerging technology and innovation initiative exploring AI, connected
            IoT systems, and modern software architecture. Founded by Boopathi, we engineer functional prototypes
            that solve concrete operational problems across urban infrastructure, education, and commerce.
          </p>
        </div>

        {/* Dual CTAs */}
        <div className="hero-cta-group">
          <a href="#innovations" className="hero-cta-btn primary">
            EXPLORE INNOVATIONS <ArrowRight size={16} />
          </a>
          <a href="#contact" className="hero-cta-btn secondary">
            PARTNER WITH US <ArrowUpRight size={16} />
          </a>
        </div>
      </div>

      {/* Futuristic orbital emblem */}
      <motion.div
        className="hero-decoration new-stars-badge"
        aria-hidden="true"
        animate={reduceMotion ? undefined : { rotate: 360 }}
        transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
      >
        <span>NEW</span>
        <span>★</span>
        <span>STARS</span>
      </motion.div>
    </section>
  )
}

/**
 * 2. ABOUT: MISSION & VISION OF NEW STARS
 */
function About({ repoCount }: { repoCount: number }) {
  return (
    <section className="section about-section" id="about">
      <div className="container">
        <div className="section-label">
          <span>01 / ABOUT NEW STARS</span>
          <span>MISSION & STRATEGIC VISION</span>
        </div>

        <div className="about-grid">
          <Reveal>
            <h2 className="manifesto">
              PURPOSEFUL TECH.<br />
              <span>RADICAL</span><br />
              EXECUTION.
            </h2>
          </Reveal>

          <Reveal delay={0.12} className="about-aside">
            <p className="lead">
              At NEW STARS, we believe technological innovation should tackle genuine structural friction rather than
              chase speculative trends.
            </p>
            <div className="about-pillars">
              <div className="about-pillar-card">
                <span className="pillar-kicker">OUR MISSION</span>
                <h4>Solve Pragmatic Human Friction</h4>
                <p>
                  To design and build agile, resilient software and physical hardware systems—from ultrasonic civic
                  monitoring nodes to bilingual offline classroom assistants—that empower underserved communities.
                </p>
              </div>

              <div className="about-pillar-card">
                <span className="pillar-kicker">OUR VISION</span>
                <h4>From Prototypes to Viable Products</h4>
                <p>
                  To bridge the critical gap between bench-tested prototypes and deployable community solutions by
                  partnering with technical collaborators, research labs, mentors, and visionary pilot organizations.
                </p>
              </div>
            </div>

            <a className="text-link" href="#approach">
              Learn our 4-phase approach <ArrowRight size={16} />
            </a>
          </Reveal>
        </div>

        {/* Metrics Row */}
        <div className="about-stats">
          <div>
            <strong>
              <CountUp end={repoCount || 14} duration={1.2} />
              <span>+</span>
            </strong>
            <small>VERIFIED OPEN-SOURCE REPOSITORIES</small>
          </div>
          <div>
            <strong>
              <CountUp end={4} duration={1.2} />
              <span>+</span>
            </strong>
            <small>CORE RESEARCH & PROTOTYPE DOMAINS</small>
          </div>
          <div>
            <strong>
              <CountUp end={100} duration={1.2} />
              <span>%</span>
            </strong>
            <small>TRANSPARENT, INSPECTABLE CODEBASES</small>
          </div>
        </div>
      </div>
    </section>
  )
}

/**
 * 3. INNOVATIONS: DETAILED CASE STUDIES
 */
function Innovations({ onOpenProject }: { onOpenProject: (p: Project) => void }) {
  return (
    <section className="section work-section" id="innovations">
      <div className="container">
        <div className="section-label">
          <span>02 / INNOVATION PORTFOLIO</span>
          <span>PROBLEM-DRIVEN VENTURE INITIATIVES</span>
        </div>

        <div className="work-heading">
          <Reveal>
            <h2>
              INNOVATIONS<br />
              <span>IN MOTION.</span>
            </h2>
          </Reveal>
          <p>
            Four core initiatives engineered by NEW STARS. Each project addresses verified real-world friction
            with documented architectures, working codebases, and realistic milestones.
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
            <strong>CASE STUDY DEEP-DIVE:</strong> Select any innovation card above to examine the full 9-point technical
            matrix—problem explored, target users, implemented solution, technology stack, working capabilities, active
            development, roadmap, and verified repositories.
          </p>
        </div>
      </div>
    </section>
  )
}

/**
 * 4. OUR APPROACH: INNOVATION JOURNEY (EXPLORE -> BUILD -> TEST -> COLLABORATE)
 */
function OurApproach() {
  const steps = [
    {
      phase: 'PHASE 01',
      title: 'EXPLORE',
      lead: 'Systemic Friction Discovery',
      desc: 'We identify neglected operational bottlenecks across civic infrastructure, local schooling, and agricultural supply chains where conventional tools fall short.',
      icon: Search,
      status: 'Active Fieldwork',
      deliverables: ['Problem Definition', 'Domain Workflow Mapping', 'Tech Feasibility Study']
    },
    {
      phase: 'PHASE 02',
      title: 'BUILD',
      lead: 'Rapid Hardware & Software Prototyping',
      desc: 'We construct working functional prototypes: soldering breadboards, programming ESP32 microcontrollers in C++, and engineering FastAPI/React 19 query engines.',
      icon: Cpu,
      status: 'Core Execution',
      deliverables: ['Bench Prototype Circuits', 'Full-Stack Codebases', 'Firmware Time-of-Flight Logic']
    },
    {
      phase: 'PHASE 03',
      title: 'TEST',
      lead: 'Bench Calibration & Edge Testing',
      desc: 'We measure sensor tolerances, calculate echo decay, stress-test API endpoints, and optimize offline-first sync caches for low-connectivity environments.',
      icon: FlaskConical,
      status: 'Validation Stage',
      deliverables: ['Serial Telemetry Verification', 'Simulated Edge Scenarios', 'Error & Rate-Limit Handling']
    },
    {
      phase: 'PHASE 04',
      title: 'COLLABORATE',
      lead: 'Pilot Partnerships & Scale',
      desc: 'We align with domain mentors, campus administrators, technical co-builders, and early pilot partners to deploy prototypes into controlled trial settings.',
      icon: Users,
      status: 'Open to Partners',
      deliverables: ['Field Trial Readiness', 'Open-Source Toolkits', 'Co-Development Feedback Loops']
    }
  ]

  return (
    <section className="section journey-section" id="approach">
      <div className="container">
        <div className="section-label">
          <span>05 / OUR APPROACH</span>
          <span>THE NEW STARS INNOVATION JOURNEY</span>
        </div>

        <div className="journey-head">
          <Reveal>
            <h2>
              HOW WE BUILD.<br />
              <span>EXPLORE TO SCALE.</span>
            </h2>
          </Reveal>
          <p>
            Our disciplined four-phase approach ensures every idea is grounded in real operational constraints,
            rigorously tested, and engineered for collaborative expansion.
          </p>
        </div>

        <div className="approach-cards-grid">
          {steps.map((st, i) => {
            const Icon = st.icon
            return (
              <Reveal key={st.phase} delay={i * 0.08}>
                <div className="approach-card">
                  <div className="approach-card-top">
                    <span className="approach-phase-tag">{st.phase}</span>
                    <Icon size={20} className="text-lime" />
                  </div>
                  <h3>{st.title}</h3>
                  <strong className="approach-lead">{st.lead}</strong>
                  <p>{st.desc}</p>

                  <div className="approach-status-row">
                    <span className="approach-status-pill">{st.status}</span>
                  </div>

                  <div className="approach-deliverables">
                    <span className="deliverable-label">CORE DELIVERABLES:</span>
                    <ul>
                      {st.deliverables.map((item, dIdx) => (
                        <li key={dIdx}>
                          <CheckCircle2 size={12} className="text-lime" /> {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>

        {/* Milestone State Classification Matrix */}
        <div className="milestone-classification-box">
          <div className="milestone-box-header">
            <Layers size={16} className="text-lime" />
            <h4>CLEAR INITIATIVE CLASSIFICATION</h4>
          </div>
          <div className="milestone-legend-grid">
            <div className="legend-item">
              <span className="legend-dot dot-completed" />
              <div>
                <strong>COMPLETED:</strong>
                <span>Tested breadboards, firmware math, working GitHub repositories, verified web previews.</span>
              </div>
            </div>
            <div className="legend-item">
              <span className="legend-dot dot-progress" />
              <div>
                <strong>IN DEVELOPMENT:</strong>
                <span>WiFi telemetry dispatch, dynamic chart generators, multi-bin prioritization algorithms.</span>
              </div>
            </div>
            <div className="legend-item">
              <span className="legend-dot dot-planned" />
              <div>
                <strong>PLANNED ROADMAP:</strong>
                <span>Cellular NB-IoT modules, municipal fleet optimization, regional language expansion.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/**
 * 5. COLLABORATION: PARTNERSHIP CHANNELS (MAIN CONVERSION GOAL)
 */
function ContactSection() {
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
      title: 'TECHNICAL COLLABORATORS',
      subtitle: 'Engineers, Designers & AI Builders',
      desc: 'Join us to build, refine, and open-source innovative systems across IoT firmware, NLP pipelines, and distributed applications.',
      icon: Cpu
    },
    {
      title: 'MENTORS & ADVISORS',
      subtitle: 'Startup Operators & Technology Leaders',
      desc: 'Provide strategic guidance on venture positioning, hardware manufacturability, and sustainable growth roadmaps.',
      icon: Compass
    },
    {
      title: 'RESEARCH PARTNERS',
      subtitle: 'Academic Labs & Civic Specialists',
      desc: 'Collaborate on applied research studies, civic municipal challenges, and mother-tongue pedagogical trials.',
      icon: FlaskConical
    },
    {
      title: 'PILOT PARTNERS',
      subtitle: 'Campuses, Municipalities & Organizations',
      desc: 'Trial our working prototypes—such as Smart Waste sensor nodes—in controlled, supportive test environments.',
      icon: Handshake
    }
  ]

  return (
    <footer className="contact-section" id="contact">
      <div className="container">
        <div className="section-label">
          <span>06 / CONTACT & COLLABORATION</span>
          <span>PARTNER WITH NEW STARS</span>
        </div>

        <p className="contact-kicker">SHAPING WHAT'S NEXT TOGETHER</p>
        <h2 className="new-stars-contact-title">
          IDEAS TODAY.<br />
          <span>INNOVATIONS TOMORROW.</span>
        </h2>

        {/* 4 Partnership Tracks */}
        <div className="collab-tracks-grid">
          {tracks.map((track, idx) => {
            const Icon = track.icon
            return (
              <div key={idx} className="collab-track-card">
                <div className="track-card-header">
                  <Icon size={18} className="text-lime" />
                  <span className="track-role">{track.title}</span>
                </div>
                <strong className="track-subtitle">{track.subtitle}</strong>
                <p>{track.desc}</p>
              </div>
            )
          })}
        </div>

        {/* Primary Action Row */}
        <div className="contact-bottom">
          <div className="contact-email-container">
            <a className="email-link" href={`mailto:${contactEmail}`}>
              {contactEmail} <MoveUpRight size={22} />
            </a>

            <button
              type="button"
              className="copy-email-btn"
              onClick={handleCopyEmail}
              aria-label="Copy verified contact email to clipboard"
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
              Direct communication with the NEW STARS initiative team. Open to exploratory discussions, joint venture
              ideation, and prototype demonstration briefings.
            </p>
          </div>
        </div>

        {/* Footer Meta Row */}
        <div className="footer-line">
          <a className="brand footer-brand new-stars-brand" href="#top" aria-label="NEW STARS Home">
            <Sparkles size={14} className="text-lime" />
            <span>NEW STARS<span>®</span></span>
          </a>

          <span className="footer-copyright">
            NEW STARS INNOVATION INITIATIVE © 2026<br />
            IDEAS TODAY. INNOVATIONS TOMORROW.
          </span>

          <div className="socials">
            <a
              href="https://github.com/boopathiravi03"
              target="_blank"
              rel="noreferrer"
              aria-label="NEW STARS GitHub Profile"
              title="Verified GitHub Account"
            >
              <Github size={18} />
            </a>
            <a
              href="https://www.linkedin.com/in/boopathiravi-740751336"
              target="_blank"
              rel="noreferrer"
              aria-label="Boopathi LinkedIn Profile"
              title="LinkedIn Profile"
            >
              <Linkedin size={18} />
            </a>
            <a
              href="https://github.com/boopathiravi03/portfolio-boopathi"
              target="_blank"
              rel="noreferrer"
              aria-label="Repository Source Code"
              title="Portfolio Source Code"
            >
              <Compass size={18} />
            </a>
            <a
              href={`mailto:${contactEmail}`}
              aria-label="Send direct email"
              title="Send Direct Email"
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

        {/* Dynamic NEW STARS ticker */}
        <div className="ticker" aria-hidden="true">
          <div className="ticker-track">
            {Array.from({ length: 4 }).map((_, i) => (
              <span key={i}>
                NEW STARS <b>★</b> IDEAS TODAY. INNOVATIONS TOMORROW. <b>★</b> HARDWARE TO CLOUD <b>★</b> APPLIED AI & CIVIC IOT <b>★</b>
              </span>
            ))}
          </div>
        </div>

        <About repoCount={github.profile.public_repos} />
        <Innovations onOpenProject={(proj) => setSelectedProject(proj)} />
        <SmartWasteFlagship />
        <GitHubSection github={github} />
        <OurApproach />
        <ContactSection />
      </main>

      {/* Case Study Detail Modal with 9-point matrix */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </>
  )
}
