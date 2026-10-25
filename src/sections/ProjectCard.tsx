import {
  ArrowUpRight,
  Cpu,
  Database,
  ExternalLink,
  Layers,
  Smartphone
} from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import type { Project } from '../data/projects'

interface ProjectCardProps {
  project: Project
  onOpenDetails: (project: Project) => void
}

const iconMap = {
  waste: Cpu,
  database: Database,
  flutter: Layers,
  android: Smartphone
}

export default function ProjectCard({ project, onOpenDetails }: ProjectCardProps) {
  const Icon = iconMap[project.visual] || Cpu
  const reduceMotion = useReducedMotion()

  return (
    <motion.article
      className={`project-card project-${project.visual}`}
      initial={reduceMotion ? false : { opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      whileHover={
        reduceMotion
          ? undefined
          : {
              y: -8,
              transition: { duration: 0.25, ease: 'easeOut' }
            }
      }
      transition={{ duration: 0.4 }}
    >
      <div className="project-art" aria-hidden="true">
        <div className="art-top">
          <span>PROJECT / {project.number}</span>
          <span className="art-live">
            <i /> {project.statusBadge}
          </span>
        </div>

        {/* Visual Scene based on type */}
        {project.visual === 'waste' && (
          <div className="sensor-scene">
            <div className="radar radar-one" />
            <div className="radar radar-two" />
            <div className="bin-shape">
              <div className="bin-lid" />
              <div className="bin-body">
                <span className="bin-fill" />
              </div>
              <div className="bin-label">
                FILL DEPTH
                <br />
                <b>68%</b>
              </div>
            </div>
            <div className="sensor-chip">
              <Icon size={17} />
              <span>
                ESP32 + HC-SR04
                <br />
                ULTRASONIC
              </span>
            </div>
            <span className="coordinate">13°04' N / 80°16' E · BENCH TEST</span>
          </div>
        )}

        {project.visual === 'database' && (
          <div className="data-scene">
            <div className="data-orbit orbit-a" />
            <div className="data-orbit orbit-b" />
            <div className="data-core">
              <Icon size={38} />
            </div>
            <span className="data-label label-a">FASTAPI</span>
            <span className="data-label label-b">REACT 19</span>
            <span className="data-label label-c">SQL INTEL</span>
          </div>
        )}

        {project.visual === 'flutter' && (
          <div className="flutter-scene">
            <div className="flutter-grid" />
            <div className="flutter-badge">HINDI ↔ SANTALI</div>
            <div className="flutter-glow" />
            <div className="flutter-content">
              <span className="flutter-lead">INDICTRANS2 + GROQ</span>
              <p>OFFLINE-FIRST PEDAGOGY</p>
            </div>
          </div>
        )}

        {project.visual === 'android' && (
          <div className="android-scene">
            <div className="android-frame">
              <div className="android-header">
                <span className="dot" />
                <span className="dot" />
                <span className="dot" />
              </div>
              <div className="android-body">
                <div className="price-pill">PRODUCE PRICE INDEX</div>
                <div className="rate-card">FARMER ↔ DEALER DIRECT</div>
              </div>
            </div>
          </div>
        )}

        <span className="project-icon">
          <Icon size={18} />
        </span>
      </div>

      <div className="project-copy">
        <div className="eyebrow">{project.category}</div>
        <h3>
          {project.title.split('\n').map((line, i) => (
            <span key={i}>
              {line}
              <br />
            </span>
          ))}
        </h3>
        <p className="project-headline">{project.headline}</p>
        <p className="project-desc">{project.description}</p>

        <div className="tag-list">
          {project.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>

        <div className="project-card-actions">
          <button
            type="button"
            className="case-study-btn"
            onClick={() => onOpenDetails(project)}
            aria-label={`Open technical case study for ${project.title.replace('\n', ' ')}`}
          >
            Explore Case Study <ArrowUpRight size={15} className="arrow-icon" />
          </button>

          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noreferrer"
              className="card-quick-link"
              title="Open Live Preview"
              aria-label="Open Live Preview"
            >
              <ExternalLink size={15} />
            </a>
          )}
        </div>
      </div>
    </motion.article>
  )
}
