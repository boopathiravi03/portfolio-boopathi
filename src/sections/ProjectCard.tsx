import { ArrowUpRight, Cpu, Database, FlaskConical } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import type { Project } from '../data/projects'

const iconMap = { waste: Cpu, database: Database, lab: FlaskConical }
export default function ProjectCard({ project }: { project: Project }) {
  const Icon = iconMap[project.visual]
  const reduceMotion = useReducedMotion()
  return <motion.article className={`project-card project-${project.visual}`} whileHover={reduceMotion ? undefined : { y: -7 }} transition={{ duration: 0.25 }}>
    <div className="project-art" aria-hidden="true">
      <div className="art-top"><span>PROJECT / {project.number}</span><span className="art-live"><i/> {project.status}</span></div>
      {project.visual === 'waste' && <div className="sensor-scene"><div className="radar radar-one"/><div className="radar radar-two"/><div className="bin-shape"><div className="bin-lid"/><div className="bin-body"><span className="bin-fill"/></div><div className="bin-label">LEVEL<br/><b>68%</b></div></div><div className="sensor-chip"><Icon size={17}/><span>ULTRASONIC<br/>SENSOR</span></div><span className="coordinate">13°04' N / 80°16' E</span></div>}
      {project.visual === 'database' && <div className="data-scene"><div className="data-orbit orbit-a"/><div className="data-orbit orbit-b"/><div className="data-core"><Icon size={38}/></div><span className="data-label label-a">STRUCTURE</span><span className="data-label label-b">QUERY</span><span className="data-label label-c">INSIGHT</span></div>}
      {project.visual === 'lab' && <div className="lab-scene"><div className="lab-sun"/><div className="lab-grid"/><div className="lab-asterisk">✳</div><div className="lab-type">TEST.<br/>LEARN.<br/><em>REPEAT.</em></div></div>}
      <span className="project-icon"><Icon size={18}/></span>
    </div>
    <div className="project-copy"><div className="eyebrow">{project.category}</div><h3>{project.title.split('\n').map((line, i) => <span key={i}>{line}<br/></span>)}</h3><p>{project.description}</p><div className="tag-list">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div><a className="project-link" href="#contact" aria-label={`Ask about ${project.title.replace('\n', ' ')}`}>Discuss this project <ArrowUpRight size={16}/></a></div>
  </motion.article>
}
