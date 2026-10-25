export interface ProjectFeatureMatrix {
  completed: string[]
  inProgress: string[]
  planned: string[]
}

export interface Project {
  id: string
  number: string
  category: string
  title: string
  headline: string
  description: string
  tags: string[]
  visual: 'waste' | 'database' | 'flutter' | 'android'
  statusBadge: string
  statusType: 'prototype' | 'active' | 'concept'
  repoUrl?: string
  demoUrl?: string
  features: ProjectFeatureMatrix
  architectureNotes: string
  hardwareOrStack: string[]
  verificationNote?: string
}

export const projects: Project[] = [
  {
    id: 'smart-waste',
    number: '01',
    category: 'IoT · HARDWARE PROTOTYPE',
    title: 'Smart Waste\nManagement',
    headline: 'ESP32 Ultrasonic Fill-Level Sensing & Overflow Monitoring',
    description:
      'A connected waste-monitoring prototype using an ESP32 microcontroller and HC-SR04 ultrasonic sensor to calculate bin fill depth in real time, track capacity, and alert operators prior to overflow.',
    tags: ['ESP32', 'HC-SR04', 'C++ / Arduino', 'Web Dashboard'],
    visual: 'waste',
    statusBadge: 'Hardware Prototype',
    statusType: 'prototype',
    repoUrl: 'https://github.com/boopathiravi03/Smart_dustbin',
    features: {
      completed: [
        'ESP32 microcontroller firmware interfacing with HC-SR04 ultrasonic sensor',
        'Time-of-flight distance measurement translated to percentage fill capacity',
        'Local serial telemetry and threshold breach alerting (>80% capacity warning)',
        'Breadboard prototype circuit testing with status LEDs and serial diagnostics'
      ],
      inProgress: [
        'WiFi telemetry dispatch from ESP32 to a central lightweight web dashboard',
        'Fill-rate change velocity calculation to estimate time until overflow',
        'Multi-bin status table with priority sorting based on fill level'
      ],
      planned: [
        'Automated municipal collection route prioritization based on fill urgency',
        'Solar battery power management and deep sleep mode for field longevity',
        'Cellular/NB-IoT module integration for wide-area deployment beyond local WiFi'
      ]
    },
    architectureNotes:
      'Sensor emits a 40kHz sonic burst, reads echo duration, calculates depth D = (time * speedOfSound) / 2, and maps remaining capacity against calibrated bin dimensions.',
    hardwareOrStack: ['ESP32 Dev Module', 'HC-SR04 Sensor', 'Arduino C++', 'HTTP Client', 'HTML/JS Dashboard'],
    verificationNote:
      'Hardware and firmware prototype in active bench testing. Does not claim deployed municipal fleets or measured city-wide fuel savings.'
  },
  {
    id: 'bg-chatbox',
    number: '02',
    category: 'AI · DATABASE INTELLIGENCE',
    title: 'BG AI\nDatabase Chat',
    headline: 'Natural Language Query Engine & Real-Time Visualization',
    description:
      'AI-powered conversational database intelligence system built with FastAPI and React 19. Translates natural language questions into structured queries, executes relational analysis, and visualizes insights dynamically.',
    tags: ['FastAPI', 'React 19', 'TypeScript', 'SQLAlchemy 2.0', 'Python 3.11+'],
    visual: 'database',
    statusBadge: 'Active Development',
    statusType: 'active',
    repoUrl: 'https://github.com/boopathiravi03/BG_chatbox',
    features: {
      completed: [
        'FastAPI 0.141 backend service with SQLAlchemy 2.0 ORM integration',
        'React 19 + TypeScript frontend scaffolded with Vite and styled via Tailwind CSS v4',
        'Natural language prompt routing and database schema context introspection',
        'Automated query generation and structured JSON response transformation'
      ],
      inProgress: [
        'Interactive dynamic data chart rendering based on query result types',
        'Multi-database connection pool management (PostgreSQL & SQLite)',
        'Query explanation and safety verification before execution'
      ],
      planned: [
        'Role-based data masking and query permission boundaries',
        'Exportable PDF and CSV executive summary reporting',
        'Query execution optimization and latency caching'
      ]
    },
    architectureNotes:
      'Dual-layer architecture: React 19 client communicates over REST with a FastAPI backend that inspects schema metadata, translates natural language, and executes sanitized SQL queries.',
    hardwareOrStack: ['FastAPI', 'SQLAlchemy 2.0', 'React 19', 'TypeScript', 'Vite 8', 'Tailwind CSS v4'],
    verificationNote: 'Verified active repository with published codebase on GitHub (@boopathiravi03/BG_chatbox).'
  },
  {
    id: 'tribal-lingua',
    number: '03',
    category: 'EDTECH · APPLIED NLP',
    title: 'Tribal Lingua\nAI Assistant',
    headline: 'Mother-Tongue Pedagogy for Primary Classrooms',
    description:
      'Educational assistant platform built with Flutter and FastAPI. Uses Groq LLM pipelines and IndicTrans2 for Hindi ↔ Santali translation, creating visual flashcards and worksheets designed for offline-first rural tablets.',
    tags: ['Flutter', 'FastAPI', 'IndicTrans2', 'Groq API', 'Python'],
    visual: 'flutter',
    statusBadge: 'Functional Architecture',
    statusType: 'active',
    repoUrl: 'https://github.com/boopathiravi03/tribal_lingua_ai',
    features: {
      completed: [
        'Cross-platform Flutter frontend with classroom assistant and lesson generator views',
        'FastAPI translation pipeline integrating IndicTrans2 (Hindi ↔ Santali)',
        'Groq pedagogy prompt chains for tailored elementary curriculum generation',
        'Sync-then-offline caching architecture for lesson packs and flashcards'
      ],
      inProgress: [
        'Interactive phonetics audio generator for pronunciation reinforcement',
        'Printable offline worksheet PDF compiler for remote schools',
        'Tablet UI optimizations for low-resolution classroom devices'
      ],
      planned: [
        'Extension to additional regional tribal dialects (Ho, Mundari)',
        'Local on-device lightweight model quantizations for zero-connectivity classrooms'
      ]
    },
    architectureNotes:
      'FastAPI service coordinates IndicTrans2 neural translation with Groq pedagogy models, compiling structured lesson packs cached locally by the Flutter tablet application.',
    hardwareOrStack: ['Flutter SDK', 'FastAPI', 'IndicTrans2', 'Groq API', 'Python 3.11', 'Android Tablets'],
    verificationNote: 'Verified active repository with published architecture on GitHub (@boopathiravi03/tribal_lingua_ai).'
  },
  {
    id: 'farm-trading',
    number: '04',
    category: 'MOBILE · ANDROID COMMERCE',
    title: 'FarmTrading\nMobile App',
    headline: 'Direct Farmer-Dealer Commerce & Market Pricing',
    description:
      'Android application connecting agricultural producers directly with regional produce dealers and buyers to enable transparent price discovery and reduce intermediary friction.',
    tags: ['Kotlin', 'Android SDK', 'REST API', 'Vercel Demo'],
    visual: 'android',
    statusBadge: 'Android App & Web Preview',
    statusType: 'prototype',
    repoUrl: 'https://github.com/boopathiravi03/FarmTradingApp',
    demoUrl: 'https://farm-trading-app.vercel.app',
    features: {
      completed: [
        'Kotlin-based native Android interface for commodity listings and dealer browsing',
        'Web preview application deployed on Vercel for cross-platform demonstration',
        'Categorized agricultural produce directory with unit price tracking'
      ],
      inProgress: [
        'Direct buyer-to-farmer communication channel and bid notification system',
        'Regional mandi benchmark price synchronization'
      ],
      planned: [
        'Escrow payment integration and multi-lingual voice search for farmers',
        'Historical crop harvest yield analytics'
      ]
    },
    architectureNotes:
      'Native Android client built with Kotlin and Jetpack components, interfacing with backend REST services and paired with a live Vercel web preview.',
    hardwareOrStack: ['Kotlin', 'Android Jetpack', 'REST API', 'Vercel Web Preview'],
    verificationNote: 'Verified repository and live web preview on Vercel (farm-trading-app.vercel.app).'
  }
]
