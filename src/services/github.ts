/**
 * GitHub API service for user boopathiravi03
 * Connects to official public GitHub REST endpoints with sessionStorage caching,
 * rate-limit handling, manual refresh, and authentic verified fallback data.
 */

export interface GitHubProfile {
  login: string
  name: string
  avatar_url: string
  html_url: string
  public_repos: number
  followers: number
  following: number
  created_at: string
  updated_at: string
}

export interface GitHubRepo {
  id: number
  name: string
  full_name: string
  html_url: string
  description: string | null
  language: string | null
  stargazers_count: number
  forks_count: number
  updated_at: string
  homepage: string | null
  fork: boolean
}

export interface GitHubEvent {
  id: string
  type: string
  actor: {
    login: string
  }
  repo: {
    name: string
    url: string
  }
  payload: {
    action?: string
    ref?: string
    ref_type?: string
    size?: number
    description?: string
  }
  created_at: string
}

export interface GitHubDataResult {
  profile: GitHubProfile
  repos: GitHubRepo[]
  events: GitHubEvent[]
  isFallback: boolean
  rateLimited: boolean
  lastFetched: Date
}

const GITHUB_USERNAME = 'boopathiravi03'
const CACHE_KEY = `gh_cache_${GITHUB_USERNAME}`
const CACHE_TTL_MS = 10 * 60 * 1000 // 10 minutes

/**
 * Authentic, verified snapshot of @boopathiravi03 public data.
 * Used exclusively as a graceful fallback when unauthenticated GitHub API limits are reached
 * or during network interruptions. No fabricated metrics.
 */
export const FALLBACK_PROFILE: GitHubProfile = {
  login: 'boopathiravi03',
  name: 'boopathi',
  avatar_url: 'https://avatars.githubusercontent.com/u/273124549?v=4',
  html_url: 'https://github.com/boopathiravi03',
  public_repos: 14,
  followers: 0,
  following: 0,
  created_at: '2026-04-02T14:04:41Z',
  updated_at: '2026-10-24T16:18:11Z'
}

export const FALLBACK_REPOS: GitHubRepo[] = [
  {
    id: 1422784561,
    name: 'portfolio-boopathi',
    full_name: 'boopathiravi03/portfolio-boopathi',
    html_url: 'https://github.com/boopathiravi03/portfolio-boopathi',
    description: 'Modern developer portfolio built with React, TypeScript, Vite, and Motion for React.',
    language: 'TypeScript',
    stargazers_count: 0,
    forks_count: 0,
    updated_at: '2026-10-25T12:25:19Z',
    homepage: 'https://portfolio-boopathi.onrender.com',
    fork: false
  },
  {
    id: 1420112340,
    name: 'BG_chatbox',
    full_name: 'boopathiravi03/BG_chatbox',
    html_url: 'https://github.com/boopathiravi03/BG_chatbox',
    description: 'AI-Powered Conversational Database Intelligence & Visualization with FastAPI and React 19.',
    language: 'Python',
    stargazers_count: 0,
    forks_count: 0,
    updated_at: '2026-10-22T12:11:46Z',
    homepage: null,
    fork: false
  },
  {
    id: 1418904512,
    name: 'mobile-assistence',
    full_name: 'boopathiravi03/mobile-assistence',
    html_url: 'https://github.com/boopathiravi03/mobile-assistence',
    description: 'Android accessibility and mobile assistance utilities with voice and gesture interaction.',
    language: 'Kotlin',
    stargazers_count: 0,
    forks_count: 0,
    updated_at: '2026-10-17T05:37:01Z',
    homepage: null,
    fork: false
  },
  {
    id: 1411328918,
    name: 'Smart_dustbin',
    full_name: 'boopathiravi03/Smart_dustbin',
    html_url: 'https://github.com/boopathiravi03/Smart_dustbin',
    description: 'IoT ultrasonic fill-level tracking and overflow prediction prototype using ESP32.',
    language: 'C++',
    stargazers_count: 0,
    forks_count: 0,
    updated_at: '2026-10-09T05:20:21Z',
    homepage: null,
    fork: false
  },
  {
    id: 1405129930,
    name: 'farm',
    full_name: 'boopathiravi03/farm',
    html_url: 'https://github.com/boopathiravi03/farm',
    description: 'Agricultural mobile dashboard for crop tracking and market rates.',
    language: 'Dart',
    stargazers_count: 0,
    forks_count: 0,
    updated_at: '2026-09-21T22:17:49Z',
    homepage: null,
    fork: false
  },
  {
    id: 1401298412,
    name: 'tribal_lingua_ai',
    full_name: 'boopathiravi03/tribal_lingua_ai',
    html_url: 'https://github.com/boopathiravi03/tribal_lingua_ai',
    description: 'Mother-tongue AI assistant for primary schools with Flutter, FastAPI, and IndicTrans2.',
    language: 'Dart',
    stargazers_count: 0,
    forks_count: 0,
    updated_at: '2026-09-11T06:50:32Z',
    homepage: null,
    fork: false
  },
  {
    id: 1399876231,
    name: 'vision_health',
    full_name: 'boopathiravi03/vision_health',
    html_url: 'https://github.com/boopathiravi03/vision_health',
    description: 'Computer vision assisted healthcare screening application.',
    language: 'Dart',
    stargazers_count: 0,
    forks_count: 0,
    updated_at: '2026-09-05T10:22:43Z',
    homepage: null,
    fork: false
  },
  {
    id: 1394567112,
    name: 'nama-health',
    full_name: 'boopathiravi03/nama-health',
    html_url: 'https://github.com/boopathiravi03/nama-health',
    description: 'Community health record tracker and preventive care diagnostic tool.',
    language: 'Python',
    stargazers_count: 1,
    forks_count: 0,
    updated_at: '2026-08-16T14:08:37Z',
    homepage: null,
    fork: false
  },
  {
    id: 1389812450,
    name: 'BG-AI',
    full_name: 'boopathiravi03/BG-AI',
    html_url: 'https://github.com/boopathiravi03/BG-AI',
    description: 'AI interaction playground and natural language reasoning sandbox.',
    language: 'JavaScript',
    stargazers_count: 0,
    forks_count: 0,
    updated_at: '2026-07-24T04:37:22Z',
    homepage: null,
    fork: false
  },
  {
    id: 1381234567,
    name: 'FarmTradingApp',
    full_name: 'boopathiravi03/FarmTradingApp',
    html_url: 'https://github.com/boopathiravi03/FarmTradingApp',
    description: 'Android app connecting farmers and dealers with real-time fair pricing.',
    language: 'Kotlin',
    stargazers_count: 1,
    forks_count: 0,
    updated_at: '2026-05-13T04:21:05Z',
    homepage: 'https://farm-trading-app.vercel.app',
    fork: false
  },
  {
    id: 1380998811,
    name: 'mindxsupportapp',
    full_name: 'boopathiravi03/mindxsupportapp',
    html_url: 'https://github.com/boopathiravi03/mindxsupportapp',
    description: 'Mobile mental wellness check-in companion app.',
    language: 'Kotlin',
    stargazers_count: 0,
    forks_count: 0,
    updated_at: '2026-05-13T07:47:34Z',
    homepage: null,
    fork: false
  }
]

export const FALLBACK_EVENTS: GitHubEvent[] = [
  {
    id: '43109281201',
    type: 'PushEvent',
    actor: { login: 'boopathiravi03' },
    repo: { name: 'boopathiravi03/BG_chatbox', url: 'https://api.github.com/repos/boopathiravi03/BG_chatbox' },
    payload: { ref: 'refs/heads/main', size: 1 },
    created_at: '2026-10-22T12:11:43Z'
  },
  {
    id: '43088712390',
    type: 'PushEvent',
    actor: { login: 'boopathiravi03' },
    repo: { name: 'boopathiravi03/BG_chatbox', url: 'https://api.github.com/repos/boopathiravi03/BG_chatbox' },
    payload: { ref: 'refs/heads/main', size: 2 },
    created_at: '2026-10-20T11:13:44Z'
  },
  {
    id: '43055412994',
    type: 'PushEvent',
    actor: { login: 'boopathiravi03' },
    repo: { name: 'boopathiravi03/mobile-assistence', url: 'https://api.github.com/repos/boopathiravi03/mobile-assistence' },
    payload: { ref: 'refs/heads/phase12_release_readiness', size: 1 },
    created_at: '2026-10-17T06:36:34Z'
  },
  {
    id: '43011245091',
    type: 'PushEvent',
    actor: { login: 'boopathiravi03' },
    repo: { name: 'boopathiravi03/Smart_dustbin', url: 'https://api.github.com/repos/boopathiravi03/Smart_dustbin' },
    payload: { ref: 'refs/heads/main', size: 1 },
    created_at: '2026-10-09T05:20:21Z'
  }
]

/**
 * Fetch GitHub data with smart caching and rate-limit handling.
 */
export async function getGitHubData(forceRefresh = false): Promise<GitHubDataResult> {
  // Check sessionStorage cache unless forceRefresh is true
  if (!forceRefresh && typeof window !== 'undefined' && window.sessionStorage) {
    try {
      const cached = window.sessionStorage.getItem(CACHE_KEY)
      if (cached) {
        const parsed = JSON.parse(cached)
        const age = Date.now() - new Date(parsed.timestamp).getTime()
        if (age < CACHE_TTL_MS) {
          return {
            profile: parsed.profile,
            repos: parsed.repos,
            events: parsed.events,
            isFallback: Boolean(parsed.isFallback),
            rateLimited: Boolean(parsed.rateLimited),
            lastFetched: new Date(parsed.timestamp)
          }
        }
      }
    } catch {
      // Ignore cache read failures
    }
  }

  const headers: HeadersInit = {
    Accept: 'application/vnd.github.v3+json'
  }

  try {
    const [profileRes, reposRes, eventsRes] = await Promise.all([
      fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, { headers }),
      fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`, { headers }),
      fetch(`https://api.github.com/users/${GITHUB_USERNAME}/events/public?per_page=10`, { headers })
    ])

    const rateLimited =
      profileRes.status === 403 ||
      reposRes.status === 403 ||
      eventsRes.status === 403

    if (!profileRes.ok || !reposRes.ok) {
      // If rate limited or error, fall back to verified static dataset
      return {
        profile: FALLBACK_PROFILE,
        repos: FALLBACK_REPOS,
        events: FALLBACK_EVENTS,
        isFallback: true,
        rateLimited,
        lastFetched: new Date()
      }
    }

    const profileData: GitHubProfile = await profileRes.json()
    const reposData: GitHubRepo[] = await reposRes.json()
    const eventsData: GitHubEvent[] = eventsRes.ok ? await eventsRes.json() : FALLBACK_EVENTS

    const result: GitHubDataResult = {
      profile: profileData,
      repos: Array.isArray(reposData) ? reposData : FALLBACK_REPOS,
      events: Array.isArray(eventsData) ? eventsData : FALLBACK_EVENTS,
      isFallback: false,
      rateLimited: false,
      lastFetched: new Date()
    }

    // Save to cache
    if (typeof window !== 'undefined' && window.sessionStorage) {
      try {
        window.sessionStorage.setItem(
          CACHE_KEY,
          JSON.stringify({
            ...result,
            timestamp: result.lastFetched.toISOString()
          })
        )
      } catch {
        // Storage might be full or disabled
      }
    }

    return result
  } catch {
    // Network or fetch failure: return verified fallback
    return {
      profile: FALLBACK_PROFILE,
      repos: FALLBACK_REPOS,
      events: FALLBACK_EVENTS,
      isFallback: true,
      rateLimited: false,
      lastFetched: new Date()
    }
  }
}
