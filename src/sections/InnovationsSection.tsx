import { useMemo, useState } from 'react'
import {
  AlertCircle,
  ArrowUpRight,
  Calendar,
  ChevronDown,
  ChevronUp,
  Code2,
  ExternalLink,
  GitFork,
  Search,
  Sparkles,
  Star
} from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import Reveal from '../components/Reveal'
import { getProjectByRepoName, type Project } from '../data/projects'
import type { UseGitHubDataReturn } from '../hooks/useGitHubData'

interface InnovationsSectionProps {
  github: UseGitHubDataReturn
  onOpenDetails: (project: Project) => void
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

export default function InnovationsSection({ github, onOpenDetails }: InnovationsSectionProps) {
  const { repos, loading, isFallback, rateLimited } = github
  const reduceMotion = useReducedMotion()

  const [searchQuery, setSearchQuery] = useState('')
  const [selectedLanguage, setSelectedLanguage] = useState('All')
  const [sortBy, setSortBy] = useState<'updated' | 'stars'>('updated')
  const [showAll, setShowAll] = useState(false)

  // Extract unique languages
  const availableLanguages = useMemo(() => {
    const langs = new Set<string>()
    repos.forEach((repo) => {
      if (repo.language) langs.add(repo.language)
    })
    return ['All', ...Array.from(langs).sort()]
  }, [repos])

  // Filter and sort repos
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
        // Highlighting order: priority projects first if desired, or pure sort
        const caseStudyA = Boolean(getProjectByRepoName(a.name))
        const caseStudyB = Boolean(getProjectByRepoName(b.name))

        if (sortBy === 'stars') {
          if (b.stargazers_count !== a.stargazers_count) {
            return b.stargazers_count - a.stargazers_count
          }
        } else {
          // By default, recently updated
          const timeA = new Date(a.updated_at).getTime()
          const timeB = new Date(b.updated_at).getTime()
          if (timeA !== timeB) return timeB - timeA
        }

        // Secondary priority: verified case studies
        if (caseStudyA && !caseStudyB) return -1
        if (!caseStudyA && caseStudyB) return 1
        return 0
      })
  }, [repos, selectedLanguage, searchQuery, sortBy])

  // Pagination / Show More logic
  const isFiltering = searchQuery.trim() !== '' || selectedLanguage !== 'All'
  const displayLimit = 8
  const displayedRepos = showAll || isFiltering ? filteredRepos : filteredRepos.slice(0, displayLimit)
  const hasMore = !isFiltering && filteredRepos.length > displayLimit

  return (
    <section className="section innovations-showcase-section" id="innovations">
      <div className="container">
        {/* Section Header */}
        <div className="section-label">
          <span>02 / OUR INNOVATIONS</span>
          <span>MULTI-PROJECT STARTUP SHOWCASE</span>
        </div>

        <div className="innovations-head">
          <div>
            <Reveal>
              <h2 className="manifesto">
                OUR INNOVATIONS.<br />
                <span>CODE, HARDWARE & APPLIED AI.</span>
              </h2>
            </Reveal>
            <p className="innovations-subtitle">
              The complete technology portfolio of <strong>NEW STARS</strong>. Automatically synchronized with
              our open-source repositories under{' '}
              <a
                href="https://github.com/boopathiravi03"
                target="_blank"
                rel="noreferrer"
                className="profile-link"
              >
                @boopathiravi03 <ArrowUpRight size={13} />
              </a>
              . Every initiative is inspectable, verifiable, and continuously updated.
            </p>
          </div>

          <div className="innovations-meta-badges">
            <span className="live-repo-count-pill">
              <span className="status-dot-sm" />
              <span>{repos.length} Public Codebases Live</span>
            </span>
          </div>
        </div>

        {/* Fallback or Rate-Limit Notice */}
        {(rateLimited || isFallback) && (
          <div className="github-banner" role="status">
            <AlertCircle size={16} />
            <div>
              <strong>Verified snapshot active.</strong>{' '}
              <span>Displaying cached repository index. All source code links are functional.</span>
            </div>
          </div>
        )}

        {/* Controls: Search, Language Filter Pills, Sort */}
        <div className="innovations-filter-bar">
          <div className="search-input-wrap">
            <Search size={15} />
            <input
              type="text"
              placeholder="Search all innovations and repositories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search innovations"
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
            <label htmlFor="innovations-sort">SORT:</label>
            <select
              id="innovations-sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'updated' | 'stars')}
            >
              <option value="updated">Recently Updated</option>
              <option value="stars">Most Stars</option>
            </select>
          </div>
        </div>

        {/* Loading Skeletons */}
        {loading && repos.length === 0 && (
          <div className="innovations-grid-skeleton" aria-busy="true">
            {Array.from({ length: 8 }).map((_, idx) => (
              <div key={idx} className="skeleton-card">
                <div className="skeleton-line line-title" />
                <div className="skeleton-line line-desc" />
                <div className="skeleton-line line-meta" />
              </div>
            ))}
          </div>
        )}

        {/* Four-Column Responsive Grid */}
        <div className="innovations-showcase-grid">
          {displayedRepos.map((repo, i) => {
            const matchedProject = getProjectByRepoName(repo.name)
            const isFeatured = Boolean(matchedProject)

            return (
              <motion.article
                key={repo.id}
                className={`innovation-showcase-card ${isFeatured ? 'is-featured-initiative' : ''}`}
                initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.35, delay: (i % 4) * 0.05 }}
                whileHover={reduceMotion ? undefined : { y: -5 }}
              >
                {/* Header with Featured Badge or Project Number */}
                <div className="card-top-indicator">
                  {isFeatured ? (
                    <span className="featured-pill">
                      <Sparkles size={11} className="text-lime" />
                      <span>{matchedProject?.statusBadge || 'FEATURED INITIATIVE'}</span>
                    </span>
                  ) : (
                    <span className="generic-pill">
                      <Code2 size={11} />
                      <span>OPEN CODEBASE</span>
                    </span>
                  )}

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

                {/* Title & Headline */}
                <div className="card-main-info">
                  <h3 className="innovation-repo-name">
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`View ${repo.name} on GitHub`}
                    >
                      {matchedProject ? matchedProject.headline.split('·')[0].trim() : repo.name}
                    </a>
                  </h3>

                  {matchedProject && (
                    <span className="innovation-repo-slug">
                      repo: boopathiravi03/{repo.name}
                    </span>
                  )}

                  <p className="innovation-repo-desc">
                    {matchedProject
                      ? matchedProject.description
                      : repo.description || 'Open-source initiative developed by NEW STARS.'}
                  </p>
                </div>

                {/* Problem Highlight for featured projects */}
                {matchedProject && (
                  <div className="showcase-problem-box">
                    <span className="problem-micro-label">PROBLEM EXPLORED:</span>
                    <p>{matchedProject.problemExplored}</p>
                  </div>
                )}

                {/* Metrics: Stars, Forks, Last Updated */}
                <div className="card-bottom-meta">
                  <div className="meta-stats-row">
                    <span className="micro-stat" title={`${repo.stargazers_count} stars`}>
                      <Star size={12} /> {repo.stargazers_count}
                    </span>
                    <span className="micro-stat" title={`${repo.forks_count} forks`}>
                      <GitFork size={12} /> {repo.forks_count}
                    </span>
                    <span className="micro-stat date" title={`Updated ${repo.updated_at}`}>
                      <Calendar size={11} /> {formatDate(repo.updated_at)}
                    </span>
                  </div>

                  {/* Live Platform Quick Action if available */}
                  {matchedProject?.demoUrl && (
                    <div className="card-live-action-row">
                      <a
                        href={matchedProject.demoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="btn-card-live"
                        aria-label={`Visit Live Platform for ${matchedProject.title} (opens in new tab)`}
                      >
                        <Sparkles size={12} className="text-lime" />
                        <span>Visit Live Platform</span>
                        <ExternalLink size={12} />
                      </a>
                    </div>
                  )}

                  {/* Actions: View Details if case study exists + Repo link */}
                  <div className="card-actions-row">
                    {matchedProject ? (
                      <button
                        type="button"
                        className="btn-view-case-study"
                        onClick={() => onOpenDetails(matchedProject)}
                        aria-label={`Open case study for ${matchedProject.title.replace('\n', ' ')}`}
                      >
                        View Details <ArrowUpRight size={13} className="arrow-icon" />
                      </button>
                    ) : (
                      <span className="view-details-placeholder" />
                    )}

                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-repo-link"
                      title="Explore Source Code on GitHub"
                      aria-label={`Explore Source Code for ${repo.name}`}
                    >
                      <ExternalLink size={14} />
                    </a>
                  </div>
                </div>
              </motion.article>
            )
          })}
        </div>

        {/* Empty State */}
        {filteredRepos.length === 0 && (
          <div className="no-repos-found">
            <p>No initiatives or repositories match your active search and filter criteria.</p>
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

        {/* Show More / Show All Controls */}
        {hasMore && (
          <div className="show-more-row">
            <button
              type="button"
              className="btn-show-more-innovations"
              onClick={() => setShowAll(true)}
              aria-label={`Show all ${filteredRepos.length} innovations`}
            >
              <span>Show All {filteredRepos.length} Innovations & Codebases</span>
              <ChevronDown size={16} />
            </button>
          </div>
        )}

        {showAll && !isFiltering && filteredRepos.length > displayLimit && (
          <div className="show-more-row">
            <button
              type="button"
              className="btn-show-more-innovations"
              onClick={() => setShowAll(false)}
              aria-label="Show fewer innovations"
            >
              <span>Show Less</span>
              <ChevronUp size={16} />
            </button>
          </div>
        )}

        {/* Bottom Banner Delineating Multi-Project Portfolio */}
        <div className="portfolio-multi-notice">
          <div className="multi-notice-left">
            <Sparkles size={16} className="text-lime" />
            <div>
              <strong>COMPLETE VENTURE PORTFOLIO:</strong>{' '}
              <span>
                NEW STARS actively builds across IoT hardware, applied NLP, and mobile marketplaces. Above are all {repos.length} live
                public codebases. Below, we spotlight our flagship civic IoT deep-dive: the Smart Waste Management System.
              </span>
            </div>
          </div>
          <a href="#smart-waste" className="btn-jump-flagship">
            Explore Flagship Case Study <ArrowUpRight size={14} />
          </a>
        </div>
      </div>
    </section>
  )
}
