import {
  ArrowRight,
  ArrowUpRight,
  Bot,
  Code2,
  Database,
  ExternalLink,
  Github,
  Layers,
  Sparkles,
  Terminal,
  Zap
} from 'lucide-react'
import Reveal from '../components/Reveal'
import { projects, type Project } from '../data/projects'

interface BGAIFeaturedProps {
  onOpenDetails: (project: Project) => void
}

export default function BGAIFeatured({ onOpenDetails }: BGAIFeaturedProps) {
  const bgProject = projects.find((p) => p.id === 'bg-chatbox')

  return (
    <section className="section bgai-featured-section" id="bg-ai-platform">
      <div className="container">
        {/* Section Header */}
        <div className="section-label">
          <span>FEATURED INNOVATION / ARTIFICIAL INTELLIGENCE & SOFTWARE</span>
          <span>LIVE PLATFORM SHOWCASE</span>
        </div>

        <div className="bgai-hero">
          <div className="bgai-hero-left">
            <Reveal>
              <div className="bgai-badge">
                <Bot size={14} className="text-lime" />
                <span>AI PLATFORM · LIVE & OPEN SOURCE</span>
              </div>
              <h2 className="flagship-title">
                BG AI PLATFORM.<br />
                <span>CONVERSATIONAL DATABASE INTELLIGENCE.</span>
              </h2>
            </Reveal>

            <p className="bgai-lead">
              An AI-powered platform designed to make database interaction more accessible through conversational
              interfaces.
            </p>

            <p className="bgai-subcopy">
              Built on high-performance FastAPI and React 19, BG AI translates plain-English business questions into
              safe, structured queries—introspecting schema metadata, executing relational analysis, and rendering
              dynamic interactive visual insights without manual SQL drafting.
            </p>

            {/* The Two Primary Action Buttons */}
            <div className="bgai-actions-group">
              <a
                href="https://thebg.con.in"
                target="_blank"
                rel="noreferrer"
                className="btn-live-platform"
                aria-label="Visit Live BG AI Platform website (opens in new tab)"
              >
                <span>Visit Live Platform</span>
                <ExternalLink size={16} />
              </a>

              <a
                href="https://github.com/boopathiravi03/BG_chatbox"
                target="_blank"
                rel="noreferrer"
                className="btn-explore-code"
                aria-label="Explore BG AI Platform Source Code on GitHub (opens in new tab)"
              >
                <Github size={16} />
                <span>Explore Source Code</span>
                <ArrowUpRight size={14} />
              </a>

              {bgProject && (
                <button
                  type="button"
                  className="btn-case-study-trigger"
                  onClick={() => onOpenDetails(bgProject)}
                  aria-label="View BG AI Platform Technical Case Study"
                >
                  <span>View Technical Case Study</span>
                  <ArrowRight size={14} />
                </button>
              )}
            </div>
          </div>

          {/* Interactive Simulated Interface Preview */}
          <div className="bgai-hero-right">
            <div className="bgai-preview-window">
              <div className="window-header">
                <div className="window-dots">
                  <span className="dot dot-red" />
                  <span className="dot dot-yellow" />
                  <span className="dot dot-green" />
                </div>
                <span className="window-url">thebg.con.in / conversational-engine</span>
                <span className="window-status-pill">
                  <span className="status-dot-sm" /> Live Engine
                </span>
              </div>

              <div className="window-body">
                {/* Natural Language Prompt */}
                <div className="chat-bubble user-prompt">
                  <span className="bubble-label">QUERY INPUT:</span>
                  <p>“Show total regional orders and average checkout value by month for 2026.”</p>
                </div>

                {/* AI Reasoning Step */}
                <div className="chat-pipeline-step">
                  <div className="step-badge">
                    <Zap size={12} className="text-lime" />
                    <span>SCHEMA INTROSPECTION & SQL FORMULATION</span>
                  </div>
                  <pre className="sql-snippet">
                    <code>
                      SELECT DATE_TRUNC('month', order_date) AS month,
                      COUNT(id) AS total_orders, AVG(amount) AS avg_value
                      FROM transactions GROUP BY 1 ORDER BY 1;
                    </code>
                  </pre>
                </div>

                {/* Dynamic Data Widget Result */}
                <div className="chat-bubble ai-response">
                  <div className="response-header">
                    <Sparkles size={14} className="text-lime" />
                    <span>DYNAMIC VISUALIZATION RESULT</span>
                  </div>
                  <div className="mock-chart-bars">
                    <div className="chart-bar-col">
                      <div className="bar-fill" style={{ height: '45%' }} />
                      <span>JAN</span>
                    </div>
                    <div className="chart-bar-col">
                      <div className="bar-fill" style={{ height: '65%' }} />
                      <span>FEB</span>
                    </div>
                    <div className="chart-bar-col">
                      <div className="bar-fill" style={{ height: '82%' }} />
                      <span>MAR</span>
                    </div>
                    <div className="chart-bar-col">
                      <div className="bar-fill" style={{ height: '95%' }} />
                      <span>APR</span>
                    </div>
                  </div>
                  <div className="response-footer-metric">
                    <span>STATUS: 200 OK · 142ms latency · Verified SQLAlchemy ORM</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Grid Breakdown */}
        <div className="bgai-features-grid">
          <div className="bgai-feat-card">
            <div className="feat-icon">
              <Bot size={20} className="text-lime" />
            </div>
            <h4>Conversational SQL</h4>
            <p>
              Natural language prompt routing transforms arbitrary business questions into validated database queries
              without exposing raw database connection strings.
            </p>
          </div>

          <div className="bgai-feat-card">
            <div className="feat-icon">
              <Database size={20} className="text-lime" />
            </div>
            <h4>Schema Introspection</h4>
            <p>
              Automated table, column, and relational key mapping providing contextual grounding so generated queries
              adhere strictly to current schema definitions.
            </p>
          </div>

          <div className="bgai-feat-card">
            <div className="feat-icon">
              <Terminal size={20} className="text-lime" />
            </div>
            <h4>Modern Full-Stack</h4>
            <p>
              Engineered with FastAPI 0.141, Python 3.11+, React 19, TypeScript, and Tailwind CSS v4 for microsecond
              API response times and smooth data exploration.
            </p>
          </div>

          <div className="bgai-feat-card">
            <div className="feat-icon">
              <Layers size={20} className="text-lime" />
            </div>
            <h4>Dynamic Visualization</h4>
            <p>
              Intelligently matches query payload dimensions with appropriate visualization primitives (time series,
              distributions, categorical aggregations).
            </p>
          </div>
        </div>

        {/* Tech Stack Banner */}
        <div className="bgai-stack-pills-row">
          <span className="stack-row-label">ACTUAL TECH STACK:</span>
          {['FastAPI 0.141', 'React 19', 'TypeScript', 'SQLAlchemy 2.0', 'Python 3.11+', 'Vite 8', 'Tailwind CSS v4'].map(
            (tech) => (
              <span key={tech} className="bgai-tech-pill">
                <Code2 size={12} className="text-lime" /> {tech}
              </span>
            )
          )}
        </div>
      </div>
    </section>
  )
}
