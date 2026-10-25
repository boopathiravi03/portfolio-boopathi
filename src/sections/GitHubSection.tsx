import {
  AlertCircle,
  ArrowUpRight,
  Code2,
  GitCommit,
  Github,
  RefreshCw,
  Sparkles,
  Star
} from 'lucide-react'
import CountUp from '../components/CountUp'
import Reveal from '../components/Reveal'
import type { UseGitHubDataReturn } from '../hooks/useGitHubData'
import type { GitHubEvent } from '../services/github'

interface GitHubSectionProps {
  github: UseGitHubDataReturn
}

function formatRelativeTime(isoString: string): string {
  try {
    const now = new Date()
    const past = new Date(isoString)
    const diffMs = now.getTime() - past.getTime()
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

    if (diffDays <= 0) return 'Today'
    if (diffDays === 1) return 'Yesterday'
    if (diffDays < 30) return `${diffDays} days ago`
    const diffMonths = Math.floor(diffDays / 30)
    if (diffMonths === 1) return '1 month ago'
    if (diffMonths < 12) return `${diffMonths} months ago`
    return `${Math.floor(diffMonths / 12)} years ago`
  } catch {
    return 'Recent'
  }
}

function formatEventSummary(event: GitHubEvent): { title: string; detail: string } {
  const branch = event.payload.ref ? event.payload.ref.replace('refs/heads/', '') : 'main'
  if (event.type === 'PushEvent') {
    const commits = event.payload.size || 1
    return {
      title: `Pushed ${commits} commit${commits > 1 ? 's' : ''}`,
      detail: `Branch: ${branch}`
    }
  }
  if (event.type === 'CreateEvent') {
    return {
      title: `Created ${event.payload.ref_type || 'branch/tag'}`,
      detail: event.payload.ref || 'initial'
    }
  }
  return {
    title: event.type.replace('Event', ''),
    detail: event.repo.name
  }
}

export default function GitHubSection({ github }: GitHubSectionProps) {
  const { profile, repos, events, loading, isFallback, rateLimited, lastFetched, refresh } = github

  const totalStars = repos.reduce((acc, r) => acc + (r.stargazers_count || 0), 0)
  const languageSet = new Set(repos.map((r) => r.language).filter(Boolean))

  return (
    <section className="section github-section" id="innovation-lab">
      <div className="container">
        {/* Section Header */}
        <div className="section-label">
          <span>04 / INNOVATION LAB</span>
          <span>REAL-TIME COMMITS & LAB PULSE</span>
        </div>

        <div className="github-head">
          <div>
            <Reveal>
              <h2 className="github-title">
                THE LAB PULSE.<br />
                <span>BUILDING IN REAL-TIME.</span>
              </h2>
            </Reveal>
            <p className="github-subtitle">
              Live engineering telemetry from our open GitHub repositories under{' '}
              <a
                href="https://github.com/boopathiravi03"
                target="_blank"
                rel="noreferrer"
                className="profile-link"
              >
                @boopathiravi03 <ArrowUpRight size={13} />
              </a>
              . All commits, branch updates, and repository activity stream directly through GitHub’s public REST API.
            </p>
          </div>

          <div className="github-sync-panel">
            <button
              type="button"
              className="github-refresh-btn"
              onClick={() => refresh()}
              disabled={loading}
              aria-label="Sync GitHub Lab Activity"
            >
              <RefreshCw size={14} className={loading ? 'is-spinning' : ''} />
              <span>{loading ? 'Syncing...' : 'Sync Lab Activity'}</span>
            </button>
            {lastFetched && (
              <span className="last-fetched-text">
                Checked: {lastFetched.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            )}
          </div>
        </div>

        {/* Scope Disclaimer */}
        <div className="build-log-disclaimer">
          <Sparkles size={16} className="text-lime" />
          <p>
            <strong>LAB SCOPE NOTE:</strong> Public GitHub events represent open-source repository pushes.
            They do not capture hardware breadboard soldering, offline sensor calibrations, circuit wiring, or proprietary pilot notes.
          </p>
        </div>

        {/* Fallback Banner */}
        {(rateLimited || isFallback) && (
          <div className="github-banner" role="status">
            <AlertCircle size={16} />
            <div>
              <strong>Displaying verified snapshot for @boopathiravi03.</strong>{' '}
              <span>
                {rateLimited
                  ? 'GitHub unauthenticated REST rate limit reached. Verified authentic snapshot is active.'
                  : 'Cached snapshot active. Click sync to poll GitHub directly.'}
              </span>
            </div>
          </div>
        )}

        {/* Metrics Row */}
        <div className="github-stats-grid">
          <div className="gh-stat-card">
            <div className="gh-stat-top">
              <span>PUBLIC REPOSITORIES</span>
              <Code2 size={16} />
            </div>
            <strong>
              <CountUp end={profile.public_repos || repos.length} duration={1.2} />
            </strong>
            <small>Live from GitHub profile API</small>
          </div>

          <div className="gh-stat-card">
            <div className="gh-stat-top">
              <span>ACTIVE STACKS</span>
              <Github size={16} />
            </div>
            <strong>
              <CountUp end={languageSet.size} duration={1.2} />
            </strong>
            <small>TypeScript, Python, Kotlin, Dart, C++</small>
          </div>

          <div className="gh-stat-card">
            <div className="gh-stat-top">
              <span>COMMUNITY STARS</span>
              <Star size={16} />
            </div>
            <strong>
              <CountUp end={totalStars} duration={1.2} />
            </strong>
            <small>Across all public codebases</small>
          </div>

          <div className="gh-stat-card">
            <div className="gh-stat-top">
              <span>PRIMARY CONTRIBUTOR</span>
              <span className="status-dot-sm" />
            </div>
            <strong className="profile-badge">boopathiravi03</strong>
            <small>Active builder since {new Date(profile.created_at).getFullYear()}</small>
          </div>
        </div>

        {/* Chronological Public Activity Feed */}
        <div className="activity-feed-section">
          <div className="activity-feed-head">
            <div className="activity-feed-title">
              <GitCommit size={16} />
              <h3>VERIFIED RECENT COMMITS & REPO EVENTS</h3>
            </div>
            <span className="activity-disclaimer">
              Direct events from /users/boopathiravi03/events/public
            </span>
          </div>

          <div className="activity-timeline">
            {events.slice(0, 8).map((evt) => {
              const summary = formatEventSummary(evt)
              const repoUrl = `https://github.com/${evt.repo.name}`
              return (
                <div key={evt.id} className="activity-event-row">
                  <div className="activity-marker">
                    <span className="marker-dot" />
                  </div>
                  <div className="activity-info">
                    <div className="activity-main-line">
                      <span className="activity-action-title">{summary.title}</span>
                      <a
                        href={repoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="activity-repo-link"
                      >
                        {evt.repo.name} <ArrowUpRight size={12} />
                      </a>
                    </div>
                    <div className="activity-sub-line">
                      <span className="activity-detail">{summary.detail}</span>
                      <span className="activity-time">{formatRelativeTime(evt.created_at)}</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
