import { useCallback, useEffect, useState } from 'react'
import {
  FALLBACK_EVENTS,
  FALLBACK_PROFILE,
  FALLBACK_REPOS,
  getGitHubData,
  type GitHubEvent,
  type GitHubProfile,
  type GitHubRepo
} from '../services/github'

export interface UseGitHubDataReturn {
  profile: GitHubProfile
  repos: GitHubRepo[]
  events: GitHubEvent[]
  loading: boolean
  isFallback: boolean
  rateLimited: boolean
  lastFetched: Date | null
  refresh: () => Promise<void>
}

export function useGitHubData(): UseGitHubDataReturn {
  const [profile, setProfile] = useState<GitHubProfile>(FALLBACK_PROFILE)
  const [repos, setRepos] = useState<GitHubRepo[]>(FALLBACK_REPOS)
  const [events, setEvents] = useState<GitHubEvent[]>(FALLBACK_EVENTS)
  const [loading, setLoading] = useState<boolean>(true)
  const [isFallback, setIsFallback] = useState<boolean>(false)
  const [rateLimited, setRateLimited] = useState<boolean>(false)
  const [lastFetched, setLastFetched] = useState<Date | null>(null)

  const loadData = useCallback(async (force = false) => {
    setLoading(true)
    try {
      const data = await getGitHubData(force)
      setProfile(data.profile)
      setRepos(data.repos)
      setEvents(data.events)
      setIsFallback(data.isFallback)
      setRateLimited(data.rateLimited)
      setLastFetched(data.lastFetched)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadData(false)
  }, [loadData])

  const refresh = useCallback(async () => {
    await loadData(true)
  }, [loadData])

  return {
    profile,
    repos,
    events,
    loading,
    isFallback,
    rateLimited,
    lastFetched,
    refresh
  }
}
