import { useEffect } from 'react'
import {
  AlertCircle,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  Compass,
  Cpu,
  ExternalLink,
  Github,
  Layers,
  Lightbulb,
  ShieldAlert,
  Users,
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
          <motion.div
            className="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />

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
                  <span className="modal-num">INNOVATION / {project.number}</span>
                  <span className="modal-status-badge">
                    <span className="status-dot-sm" />
                    {project.statusBadge}
                  </span>
                </div>
                <button
                  className="modal-close-btn"
                  onClick={onClose}
                  aria-label="Close innovation case study"
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

                {/* 1. Problem Explored & 2. Intended Users */}
                <div className="modal-context-grid">
                  <div className="modal-context-card">
                    <div className="context-card-title">
                      <AlertCircle size={15} className="text-lime" />
                      <span>1. PROBLEM BEING EXPLORED</span>
                    </div>
                    <p>{project.problemExplored}</p>
                  </div>

                  <div className="modal-context-card">
                    <div className="context-card-title">
                      <Users size={15} className="text-lime" />
                      <span>2. INTENDED USERS & PARTNERS</span>
                    </div>
                    <p>{project.intendedUsers}</p>
                  </div>
                </div>

                {/* 3. Proposed Solution */}
                <div className="modal-solution-card">
                  <div className="context-card-title">
                    <Lightbulb size={15} className="text-lime" />
                    <span>3. PROPOSED / IMPLEMENTED SOLUTION</span>
                  </div>
                  <p>{project.proposedSolution}</p>
                </div>

                {/* 4. Actual Technology Stack */}
                <div className="modal-section-title">
                  <Layers size={14} /> 4. ACTUAL TECHNOLOGY STACK
                </div>
                <div className="modal-tags">
                  {project.hardwareOrStack.map((tech) => (
                    <span key={tech} className="modal-tag">
                      {tech}
                    </span>
                  ))}
                </div>

                {/* 5, 6, 7. What Works, What is in Development, What is Planned */}
                <div className="modal-feature-matrix">
                  {/* 5. What currently works */}
                  <div className="matrix-column completed-col">
                    <div className="matrix-title">
                      <CheckCircle2 size={16} /> 5. WHAT CURRENTLY WORKS
                    </div>
                    <ul>
                      {project.features.completed.map((feat, i) => (
                        <li key={i}>{feat}</li>
                      ))}
                    </ul>
                  </div>

                  {/* 6. What is being developed */}
                  <div className="matrix-column in-progress-col">
                    <div className="matrix-title">
                      <Clock size={16} /> 6. CURRENTLY IN DEVELOPMENT
                    </div>
                    <ul>
                      {project.features.inProgress.map((feat, i) => (
                        <li key={i}>{feat}</li>
                      ))}
                    </ul>
                  </div>

                  {/* 7. What remains planned */}
                  <div className="matrix-column planned-col">
                    <div className="matrix-title">
                      <Compass size={16} /> 7. PLANNED ROADMAP
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
                    <Cpu size={15} /> ARCHITECTURE & ENGINEERING NOTES
                  </div>
                  <p>{project.architectureNotes}</p>
                </div>

                {/* Transparency Notice */}
                {project.verificationNote && (
                  <div className="modal-verification-notice">
                    <ShieldAlert size={15} />
                    <span>{project.verificationNote}</span>
                  </div>
                )}
              </div>

              {/* Footer with 8. GitHub repo & 9. Verified Live Demo */}
              <div className="modal-footer">
                <div className="modal-actions-left">
                  {project.repoUrl && (
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="modal-action-btn primary"
                    >
                      <Github size={16} /> 8. Source Code on GitHub <ArrowUpRight size={14} />
                    </a>
                  )}
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="modal-action-btn secondary"
                    >
                      <ExternalLink size={16} /> 9. Verified Live Demo <ArrowUpRight size={14} />
                    </a>
                  )}
                </div>
                <button className="modal-dismiss-btn" onClick={onClose}>
                  Close Case Study
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  )
}
