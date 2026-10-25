export type Project = {
  number: string
  category: string
  title: string
  description: string
  tags: string[]
  visual: 'waste' | 'database' | 'lab'
  status: string
}

export const projects: Project[] = [
  {
    number: '01', category: 'IoT · SMART CITIES', title: 'Smart Waste\nManagement',
    description: 'A connected waste-monitoring concept that tracks bin fill levels, estimates overflow risk, and helps teams prioritize collection.',
    tags: ['ESP32', 'Ultrasonic sensor', 'Web dashboard'], visual: 'waste', status: 'Prototype in progress',
  },
  {
    number: '02', category: 'SOFTWARE · DATABASES', title: 'Data into\nDecisions',
    description: 'A space for a database or software project. Replace this starter card with your real problem, implementation, and demo.',
    tags: ['SQL', 'Data modeling', 'Problem solving'], visual: 'database', status: 'Add your project details',
  },
  {
    number: '03', category: 'EXPERIMENTS · IDEAS', title: 'The Next\nExperiment',
    description: 'A home for prototypes, hackathon ideas, and small experiments that turn curiosity into something people can try.',
    tags: ['Research', 'Rapid prototyping', 'Iteration'], visual: 'lab', status: 'Concept space',
  },
]
