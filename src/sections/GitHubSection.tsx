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

// Language color dots matching typical developer palettes
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
      title: `Created ${event.payload.ref_type || 'repository'}`,
      detail: event.payload.ref || 'initial'
    }
  }
  if (event.type === 'WatchEvent') {
    return {
      title: 'Starred repository',
      detail: event.repo.name
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

  // Available unique languages from fetched repositories
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

  // Aggregate stats strictly derived from real API data
  const totalStars = useMemo(() => {
    return repos.reduce((acc, r) => acc + (r.stargazers_count || 0), 0)
  }, [repos])

  return (
    <section className="section github-section" id="github">
      <div className="container">
        {/* Section Header */}
        <div className="section-label">
          <span>03 / LIVE GITHUB REPOSITORIES</span>
          <span>ACCOUNT: @boopathiravi03</span>
        </div>

        <div className="github-head">
          <div>
            <Reveal>
              <h2 className="github-title">
                SOURCE CODE.<br />
                <span>OPEN & VERIFIED.</span>
              </h2>
            </Reveal>
            <p className="github-subtitle">
              Live repository data fetched directly from the official GitHub REST API for{' '}
              <a
                href="https://github.com/boopathiravi03"
                target="_blank"
                rel="noreferrer"
                className="profile-link"
              >
                @boopathiravi03 <ArrowUpRight size={13} />
              </a>
              . No fabricated metrics.
            </p>
          </div>

          {/* Refresh & Sync Controls */}
          <div className="github-sync-panel">
            <button
              type="button"
              className="github-refresh-btn"
              onClick={() => refresh()}
              disabled={loading}
              aria-label="Refresh GitHub Data"
            >
              <RefreshCw size={14} className={loading ? 'is-spinning' : ''} />
              <span>{loading ? 'Syncing API...' : 'Refresh GitHub Data'}</span>
            </button>
            {lastFetched && (
              <span className="last-fetched-text">
                Last checked: {lastFetched.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            )}
          </div>
        </div>

        {/* Rate limit / Fallback Notice Banner */}
        {(rateLimited || isFallback) && (
          <div className="github-banner" role="status">
            <AlertCircle size={16} />
            <div>
              <strong>Using verified fallback snapshot for @boopathiravi03.</strong>{' '}
              <span>
                {rateLimited
                  ? 'GitHub REST API unauthenticated rate limit reached (60 req/hr). Authentic data is preserved.'
                  : 'Displaying cached repository dataset. Click refresh to query GitHub directly.'}
              </span>
            </div>
          </div>
        )}

        {/* Live Metrics Row */}
        <div className="github-stats-grid">
          <div className="gh-stat-card">
            <div className="gh-stat-top">
              <span>PUBLIC REPOSITORIES</span>
              <Code2 size={16} />
            </div>
            <strong>
              <CountUp end={profile.public_repos || repos.length} duration={1.2} />
            </strong>
            <small>Live count from GitHub profile</small>
          </div>

          <div className="gh-stat-card">
            <div className="gh-stat-top">
              <span>PRIMARY LANGUAGES</span>
              <Github size={16} />
            </div>
            <strong>
              <CountUp end={availableLanguages.length - 1} duration={1.2} />
            </strong>
            <small>TypeScript, Python, Kotlin, Dart, etc.</small>
          </div>

          <div className="gh-stat-card">
            <div className="gh-stat-top">
              <span>TOTAL STARS</span>
              <Star size={16} />
            </div>
            <strong>
              <CountUp end={totalStars} duration={1.2} />
            </strong>
            <small>Accumulated across public repos</small>
          </div>

          <div className="gh-stat-card">
            <div className="gh-stat-top">
              <span>VERIFIED ACCOUNT</span>
              <span className="status-dot-sm" />
            </div>
            <strong className="profile-badge">boopathiravi03</strong>
            <small>Active since {new Date(profile.created_at).getFullYear()}</small>
          </div>
        </div>

        {/* Filters and Search Bar */}
        <div className="github-controls-bar">
          <div className="search-input-wrap">
            <Search size={15} />
            <input
              type="text"
              placeholder="Search repositories by name or topic..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search repositories"
            />
            {searchQuery && (
              <button
                type="button"
                className="clear-search-btn"
                onClick={() => setSearchQuery('')}
                aria-label="Clear search query"
              >
                ✕
              </button>
            )}
          </div>

          {/* Language filter pills */}
          <div className="language-pills" role="radiogroup" aria-label="Filter by programming language">
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

          {/* Sort selector */}
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
                  <span className="no-desc-text">No description provided on repository.</span>
                )}
              </p>

              <div className="repo-meta-row">
                <div className="repo-stats-group">
                  <span className="repo-stat" title={`${repo.stargazers_count} stargazers`}>
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
            <p>No repositories match your current search and language filters.</p>
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

        {/* Real Public Activity Feed */}
        <div className="activity-feed-section">
          <div className="activity-feed-head">
            <div className="activity-feed-title">
              <GitCommit size={16} />
              <h3>RECENT PUBLIC GITHUB ACTIVITY</h3>
            </div>
            <span className="activity-disclaimer">
              Derived from GitHub REST API /events/public. Does not include private commits or offline work.
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
      </div>
    </section>
  )
}
