import { useMemo, useState } from 'react'
import {
  AlertCircle,
  ArrowUpRight,
  Calendar,
  Code2,
  ExternalLink,
  GitCommit,
  GitFork,
  Github,
  RefreshCw,
  Search,
  Sparkles,
  Star
} from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import CountUp from '../components/CountUp'
import Reveal from '../components/Reveal'
import type { UseGitHubDataReturn } from '../hooks/useGitHubData'
import type { GitHubEvent } from '../services/github'

interface GitHubSectionProps {
  github: UseGitHubDataReturn
}

const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: '#3178C6',
  JavaScript: '#F7DF1E',
  Python: '#3572A5',
  Kotlin: '#A97BFF',
  Dart: '#00B4AB',
  'C++': '#F34B7D',
  HTML: '#E34C26',
  Default: '#A3E635'
}

function formatDate(isoString: string): string {
  try {
    const d = new Date(isoString)
    return d.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  } catch {
    return isoString
  }
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
  const reduceMotion = useReducedMotion()

  const [selectedLanguage, setSelectedLanguage] = useState<string>('All')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [sortBy, setSortBy] = useState<'updated' | 'stars'>('updated')

  // Available unique languages
  const availableLanguages = useMemo(() => {
    const langs = new Set<string>()
    repos.forEach((repo) => {
      if (repo.language) langs.add(repo.language)
    })
    return ['All', ...Array.from(langs).sort()]
  }, [repos])

  // Filter & sort repositories
  const filteredRepos = useMemo(() => {
    return repos
      .filter((repo) => {
        const matchesLang = selectedLanguage === 'All' || repo.language === selectedLanguage
        const matchesSearch =
          searchQuery.trim() === '' ||
          repo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (repo.description && repo.description.toLowerCase().includes(searchQuery.toLowerCase()))
        return matchesLang && matchesSearch
      })
      .sort((a, b) => {
        if (sortBy === 'stars') {
          return b.stargazers_count - a.stargazers_count
        }
        return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
      })
  }, [repos, selectedLanguage, searchQuery, sortBy])

  const totalStars = useMemo(() => {
    return repos.reduce((acc, r) => acc + (r.stargazers_count || 0), 0)
  }, [repos])

  return (
    <section className="section github-section" id="build-log">
      <div className="container">
        {/* Section Header */}
        <div className="section-label">
          <span>04 / BUILDING IN PUBLIC</span>
          <span>THE BUILD LOG & CODEBASE TRACKER</span>
        </div>

        <div className="github-head">
          <div>
            <Reveal>
              <h2 className="github-title">
                THE BUILD LOG.<br />
                <span>CODE IN THE OPEN.</span>
              </h2>
            </Reveal>
            <p className="github-subtitle">
              A transparent view of engineering iterations, commits, and public repositories under{' '}
              <a
                href="https://github.com/boopathiravi03"
                target="_blank"
                rel="noreferrer"
                className="profile-link"
              >
                @boopathiravi03 <ArrowUpRight size={13} />
              </a>
              . Every prototype is developed through rapid experimentation.
            </p>
          </div>

          <div className="github-sync-panel">
            <button
              type="button"
              className="github-refresh-btn"
              onClick={() => refresh()}
              disabled={loading}
              aria-label="Refresh GitHub Data"
            >
              <RefreshCw size={14} className={loading ? 'is-spinning' : ''} />
              <span>{loading ? 'Syncing...' : 'Sync GitHub Activity'}</span>
            </button>
            {lastFetched && (
              <span className="last-fetched-text">
                Checked: {lastFetched.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            )}
          </div>
        </div>

        {/* Partial View Disclaimer Note */}
        <div className="build-log-disclaimer">
          <Sparkles size={16} className="text-lime" />
          <p>
            <strong>SCOPE NOTE:</strong> Public GitHub events represent a subset of engineering activity.
            They do not capture hardware breadboard soldering, circuit testing, private internal code, or offline
            design work.
          </p>
        </div>

        {/* Rate limit / Fallback Banner */}
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
              <span>ACTIVE DOMAINS</span>
              <Github size={16} />
            </div>
            <strong>
              <CountUp end={availableLanguages.length - 1} duration={1.2} />
            </strong>
            <small>IoT, AI, Mobile, Web Systems</small>
          </div>

          <div className="gh-stat-card">
            <div className="gh-stat-top">
              <span>TOTAL STARS</span>
              <Star size={16} />
            </div>
            <strong>
              <CountUp end={totalStars} duration={1.2} />
            </strong>
            <small>Accumulated across public repositories</small>
          </div>

          <div className="gh-stat-card">
            <div className="gh-stat-top">
              <span>VERIFIED ACCOUNT</span>
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
            {events.slice(0, 6).map((evt) => {
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

        {/* Repositories Controls & Filter Bar */}
        <div className="github-controls-bar">
          <div className="search-input-wrap">
            <Search size={15} />
            <input
              type="text"
              placeholder="Search codebases by name or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search repositories"
            />
            {searchQuery && (
              <button
                type="button"
                className="clear-search-btn"
                onClick={() => setSearchQuery('')}
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>

          <div className="language-pills" role="radiogroup" aria-label="Filter by language">
            {availableLanguages.map((lang) => (
              <button
                key={lang}
                type="button"
                role="radio"
                aria-checked={selectedLanguage === lang}
                className={`lang-pill ${selectedLanguage === lang ? 'is-active' : ''}`}
                onClick={() => setSelectedLanguage(lang)}
              >
                {lang !== 'All' && (
                  <span
                    className="lang-color-indicator"
                    style={{ backgroundColor: LANGUAGE_COLORS[lang] || LANGUAGE_COLORS.Default }}
                  />
                )}
                {lang}
              </button>
            ))}
          </div>

          <div className="sort-group">
            <label htmlFor="repo-sort-select">SORT:</label>
            <select
              id="repo-sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'updated' | 'stars')}
            >
              <option value="updated">Recently Updated</option>
              <option value="stars">Most Stars</option>
            </select>
          </div>
        </div>

        {/* Repositories Grid */}
        <div className="repos-grid">
          {filteredRepos.map((repo, i) => (
            <motion.div
              key={repo.id}
              className="repo-card"
              initial={reduceMotion ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.35, delay: (i % 6) * 0.05 }}
              whileHover={reduceMotion ? undefined : { y: -5 }}
            >
              <div className="repo-top">
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noreferrer"
                  className="repo-name"
                  aria-label={`View repository ${repo.name} on GitHub`}
                >
                  <Code2 size={16} />
                  <span>{repo.name}</span>
                  <ExternalLink size={13} className="repo-ext" />
                </a>
                {repo.language && (
                  <span className="repo-lang-badge">
                    <span
                      className="lang-dot"
                      style={{
                        backgroundColor: LANGUAGE_COLORS[repo.language] || LANGUAGE_COLORS.Default
                      }}
                    />
                    {repo.language}
                  </span>
                )}
              </div>

              <p className="repo-desc">
                {repo.description || (
                  <span className="no-desc-text">Open-source codebase by Boopathi.</span>
                )}
              </p>

              <div className="repo-meta-row">
                <div className="repo-stats-group">
                  <span className="repo-stat" title={`${repo.stargazers_count} stars`}>
                    <Star size={13} /> {repo.stargazers_count}
                  </span>
                  <span className="repo-stat" title={`${repo.forks_count} forks`}>
                    <GitFork size={13} /> {repo.forks_count}
                  </span>
                </div>

                <span className="repo-date" title={`Last updated on ${repo.updated_at}`}>
                  <Calendar size={12} /> {formatDate(repo.updated_at)}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredRepos.length === 0 && (
          <div className="no-repos-found">
            <p>No repositories match your active search and filter criteria.</p>
            <button
              type="button"
              className="reset-filters-btn"
              onClick={() => {
                setSelectedLanguage('All')
                setSearchQuery('')
              }}
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
