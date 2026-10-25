import { useEffect } from 'react'
import {
  ArrowUpRight,
  CheckCircle2,
  Clock,
  Compass,
  Cpu,
  ExternalLink,
  Github,
  Layers,
  ShieldAlert,
  X
} from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import type { Project } from '../data/projects'

interface ProjectModalProps {
  project: Project | null
  onClose: () => void
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const reduceMotion = useReducedMotion()

  // Close on Escape key and prevent body scroll when open
  useEffect(() => {
    if (!project) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [project, onClose])

  return (
    <AnimatePresence>
      {project && (
        <div className="modal-portal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
          {/* Backdrop */}
          <motion.div
            className="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />

          {/* Modal Container */}
          <div className="modal-container">
            <motion.div
              className="modal-card"
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Header */}
              <div className="modal-header">
                <div className="modal-meta">
                  <span className="modal-num">PROJECT / {project.number}</span>
                  <span className="modal-status-badge">
                    <span className="status-dot-sm" />
                    {project.statusBadge}
                  </span>
                </div>
                <button
                  className="modal-close-btn"
                  onClick={onClose}
                  aria-label="Close project modal"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Body */}
              <div className="modal-body">
                <div className="modal-category">{project.category}</div>
                <h2 id="modal-title" className="modal-title">
                  {project.headline}
                </h2>
                <p className="modal-description">{project.description}</p>

                {/* Tech Stack pills */}
                <div className="modal-section-title">
                  <Layers size={14} /> TECH STACK & COMPONENTS
                </div>
                <div className="modal-tags">
                  {project.hardwareOrStack.map((tech) => (
                    <span key={tech} className="modal-tag">
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Three-part Feature Status Matrix */}
                <div className="modal-feature-matrix">
                  {/* Completed */}
                  <div className="matrix-column completed-col">
                    <div className="matrix-title">
                      <CheckCircle2 size={16} /> COMPLETED & DEMONSTRABLE
                    </div>
                    <ul>
                      {project.features.completed.map((feat, i) => (
                        <li key={i}>{feat}</li>
                      ))}
                    </ul>
                  </div>

                  {/* In Progress */}
                  <div className="matrix-column in-progress-col">
                    <div className="matrix-title">
                      <Clock size={16} /> CURRENTLY IN DEVELOPMENT
                    </div>
                    <ul>
                      {project.features.inProgress.map((feat, i) => (
                        <li key={i}>{feat}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Planned */}
                  <div className="matrix-column planned-col">
                    <div className="matrix-title">
                      <Compass size={16} /> PLANNED / ROADMAP
                    </div>
                    <ul>
                      {project.features.planned.map((feat, i) => (
                        <li key={i}>{feat}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Architecture Notes */}
                <div className="modal-arch-box">
                  <div className="arch-box-title">
                    <Cpu size={15} /> ARCHITECTURE & PRINCIPLE
                  </div>
                  <p>{project.architectureNotes}</p>
                </div>

                {/* Verification Notice */}
                {project.verificationNote && (
                  <div className="modal-verification-notice">
                    <ShieldAlert size={15} />
                    <span>{project.verificationNote}</span>
                  </div>
                )}
              </div>

              {/* Footer Actions */}
              <div className="modal-footer">
                <div className="modal-actions-left">
                  {project.repoUrl && (
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="modal-action-btn primary"
                    >
                      <Github size={16} /> View on GitHub <ArrowUpRight size={14} />
                    </a>
                  )}
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="modal-action-btn secondary"
                    >
                      <ExternalLink size={16} /> Live Preview <ArrowUpRight size={14} />
                    </a>
                  )}
                </div>
                <button className="modal-dismiss-btn" onClick={onClose}>
                  Done
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  )
}
