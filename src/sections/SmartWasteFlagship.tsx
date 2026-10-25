import { useState } from 'react'
import {
  AlertTriangle,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  Compass,
  Cpu,
  Github,
  Radio,
  Server,
  Sliders,
  Sparkles,
  Wifi
} from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import Reveal from '../components/Reveal'

export default function SmartWasteFlagship() {
  const reduceMotion = useReducedMotion()

  // Interactive simulated bench test state
  const [fillLevel, setFillLevel] = useState<number>(68)
  const [activePreset, setActivePreset] = useState<'low' | 'mid' | 'critical'>('mid')

  const BIN_HEIGHT_CM = 50
  const measuredDistanceCm = Math.max(
    2,
    Math.round(BIN_HEIGHT_CM * (1 - fillLevel / 100))
  )
  const isCritical = fillLevel >= 80

  const handlePreset = (level: number, preset: 'low' | 'mid' | 'critical') => {
    setFillLevel(level)
    setActivePreset(preset)
  }

  return (
    <section className="section flagship-section" id="smart-waste">
      <div className="container">
        {/* Section Header */}
        <div className="section-label">
          <span>03 / FEATURED CASE STUDY</span>
          <span>NEW STARS HARDWARE & SENSOR LAB</span>
        </div>

        <div className="flagship-hero">
          <div className="flagship-hero-text">
            <Reveal>
              <div className="flagship-badge">
                <Radio size={14} className="text-lime" />
                <span>ACTIVE BENCH PROTOTYPE</span>
              </div>
              <h2 className="flagship-title">
                SMART WASTE<br />
                <span>MANAGEMENT SYSTEM.</span>
              </h2>
            </Reveal>
            <p className="flagship-lead">
              Transforming municipal waste collection from arbitrary calendar schedules into data-driven,
              predictive dispatch.
            </p>
          </div>

          <div className="flagship-hero-action">
            <a
              href="https://github.com/boopathiravi03/Smart_dustbin"
              target="_blank"
              rel="noreferrer"
              className="flagship-repo-btn"
            >
              <Github size={16} /> View Hardware Repo <ArrowUpRight size={14} />
            </a>
          </div>
        </div>

        {/* Motivation & Problem Brief */}
        <div className="flagship-motivation-grid">
          <div className="motivation-card">
            <span className="card-kicker">THE PROBLEM</span>
            <h3>Unpredictable Urban Overflows</h3>
            <p>
              Waste bins fill unevenly across urban corridors. Collection crews run fixed daily loops, burning
              fuel to inspect empty bins while overflowing bins create public hygiene hazards and environmental
              friction.
            </p>
          </div>
          <div className="motivation-card">
            <span className="card-kicker">THE SOLUTION</span>
            <h3>Continuous Ultrasonic Depth Sensing</h3>
            <p>
              A solar-ready microcontroller node attached to the bin lid pulses high-frequency sound waves downward.
              By tracking time-of-flight echo delays, the firmware calculates exact fill depth and notifies teams
              before overflow occurs.
            </p>
          </div>
        </div>

        {/* System Architecture Diagram (Sensor -> MCU -> Telemetry -> Dashboard) */}
        <div className="architecture-diagram-wrap">
          <div className="arch-header">
            <span className="arch-kicker">END-TO-END DATA PIPELINE</span>
            <h3>System Architecture</h3>
            <p>Physical sound wave to centralized situational dashboard</p>
          </div>

          <div className="arch-pipeline-grid">
            {/* Step 1: Sensor */}
            <div className="arch-node-card">
              <div className="arch-node-icon">
                <Radio size={22} />
              </div>
              <span className="arch-step">STEP 01</span>
              <h4>HC-SR04 Transducer</h4>
              <p>Emits 40kHz ultrasonic pulse into the container cavity. Listens for echo reflection.</p>
              <div className="node-metric">40kHz Burst · 2–400cm</div>
            </div>

            <div className="arch-connector" aria-hidden="true">
              <motion.div
                className="connector-pulse"
                animate={reduceMotion ? undefined : { x: ['-100%', '100%'] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              />
              <ArrowRight size={16} />
            </div>

            {/* Step 2: Microcontroller */}
            <div className="arch-node-card active-border">
              <div className="arch-node-icon">
                <Cpu size={22} />
              </div>
              <span className="arch-step">STEP 02</span>
              <h4>ESP32 Firmware</h4>
              <p>Computes time-of-flight: D = (t × 0.0343) / 2. Maps distance to calibrated fill capacity %.</p>
              <div className="node-metric">Dual-Core 240MHz · C++</div>
            </div>

            <div className="arch-connector" aria-hidden="true">
              <motion.div
                className="connector-pulse"
                animate={reduceMotion ? undefined : { x: ['-100%', '100%'] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear', delay: 0.5 }}
              />
              <ArrowRight size={16} />
            </div>

            {/* Step 3: Network */}
            <div className="arch-node-card">
              <div className="arch-node-icon">
                <Wifi size={22} />
              </div>
              <span className="arch-step">STEP 03</span>
              <h4>Telemetry Dispatch</h4>
              <p>Transmits JSON payload containing Bin UUID, fill percentage, and battery voltage over WiFi/HTTP.</p>
              <div className="node-metric">JSON / REST Client</div>
            </div>

            <div className="arch-connector" aria-hidden="true">
              <motion.div
                className="connector-pulse"
                animate={reduceMotion ? undefined : { x: ['-100%', '100%'] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear', delay: 1 }}
              />
              <ArrowRight size={16} />
            </div>

            {/* Step 4: Dashboard */}
            <div className="arch-node-card">
              <div className="arch-node-icon">
                <Server size={22} />
              </div>
              <span className="arch-step">STEP 04</span>
              <h4>Monitoring Dashboard</h4>
              <p>Ranks bins by urgency. Triggers priority visual alert when fill exceeds 80% threshold.</p>
              <div className="node-metric">Real-Time Web UI</div>
            </div>
          </div>
        </div>

        {/* Interactive Simulated Bench Test Bench */}
        <div className="bench-test-container">
          <div className="bench-top-bar">
            <div className="bench-title-group">
              <Sliders size={18} className="text-lime" />
              <h3>Interactive Prototype Test Bench</h3>
            </div>
            <span className="bench-notice-badge">
              SIMULATED BENCH DATA — NOT LIVE MUNICIPAL HARDWARE TELEMETRY
            </span>
          </div>

          <div className="bench-grid">
            {/* Visual Bin Representation */}
            <div className="bench-visual-col">
              <div className="bin-sim-wrapper">
                <div className="bin-sim-lid">
                  <div className="lid-sensor-emitter">
                    <Radio size={14} className="text-lime" />
                    <span>ULTRASONIC SENSOR</span>
                  </div>
                </div>

                <div className="bin-sim-body">
                  {/* Dynamic fill line */}
                  <div
                    className={`bin-sim-fill ${isCritical ? 'is-critical-fill' : ''}`}
                    style={{ height: `${fillLevel}%` }}
                  >
                    <span className="fill-watermark">{fillLevel}% FULL</span>
                  </div>

                  {/* Sonar measurement line */}
                  <div className="sonar-beam" style={{ height: `${100 - fillLevel}%` }}>
                    <span className="sonar-distance-tag">{measuredDistanceCm} cm to waste surface</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Controls & Computed Telemetry */}
            <div className="bench-controls-col">
              <div className="bench-slider-box">
                <div className="slider-header">
                  <label htmlFor="fill-slider">ADJUST SIMULATED WASTE LEVEL</label>
                  <span className="slider-value">{fillLevel}%</span>
                </div>
                <input
                  id="fill-slider"
                  type="range"
                  min="5"
                  max="98"
                  value={fillLevel}
                  onChange={(e) => {
                    const val = Number(e.target.value)
                    setFillLevel(val)
                    if (val < 40) setActivePreset('low')
                    else if (val >= 80) setActivePreset('critical')
                    else setActivePreset('mid')
                  }}
                  className="fill-range-slider"
                />

                <div className="preset-buttons">
                  <button
                    type="button"
                    className={`preset-btn ${activePreset === 'low' ? 'active' : ''}`}
                    onClick={() => handlePreset(25, 'low')}
                  >
                    Low (25%)
                  </button>
                  <button
                    type="button"
                    className={`preset-btn ${activePreset === 'mid' ? 'active' : ''}`}
                    onClick={() => handlePreset(65, 'mid')}
                  >
                    Normal (65%)
                  </button>
                  <button
                    type="button"
                    className={`preset-btn ${activePreset === 'critical' ? 'active' : ''}`}
                    onClick={() => handlePreset(92, 'critical')}
                  >
                    Critical Alert (92%)
                  </button>
                </div>
              </div>

              {/* Status Output Box */}
              <div className={`telemetry-output-card ${isCritical ? 'alert-critical' : 'status-normal'}`}>
                <div className="telemetry-status-header">
                  {isCritical ? (
                    <>
                      <AlertTriangle size={18} className="text-warning" />
                      <strong>STATUS: OVERFLOW RISK DETECTED</strong>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 size={18} className="text-lime" />
                      <strong>STATUS: NORMAL OPERATING CAPACITY</strong>
                    </>
                  )}
                </div>

                <div className="telemetry-data-grid">
                  <div>
                    <span className="telemetry-label">BIN CAPACITY</span>
                    <strong className="telemetry-val">{fillLevel}%</strong>
                  </div>
                  <div>
                    <span className="telemetry-label">SURFACE DISTANCE</span>
                    <strong className="telemetry-val">{measuredDistanceCm} cm</strong>
                  </div>
                  <div>
                    <span className="telemetry-label">DISPATCH PRIORITY</span>
                    <strong className={`telemetry-val ${isCritical ? 'urgent-text' : ''}`}>
                      {isCritical ? 'IMMEDIATE DISPATCH' : 'SCHEDULED ROUTE'}
                    </strong>
                  </div>
                  <div>
                    <span className="telemetry-label">CALIBRATED HEIGHT</span>
                    <strong className="telemetry-val">{BIN_HEIGHT_CM} cm</strong>
                  </div>
                </div>

                <div className="firmware-logic-box">
                  <code>
                    distance_cm = (duration_us * 0.0343) / 2;<br />
                    fill_pct = ((50 - {measuredDistanceCm}) / 50) * 100 = {fillLevel}%;
                  </code>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Prototype Capabilities vs Roadmap Matrix */}
        <div className="flagship-capabilities-grid">
          <div className="cap-column completed">
            <div className="cap-header">
              <CheckCircle2 size={16} />
              <h4>COMPLETED ON BENCH</h4>
            </div>
            <ul>
              <li>ESP32 firmware interfacing with HC-SR04 ultrasonic transducer.</li>
              <li>Sonic burst generation and pulse-in echo timing measurement.</li>
              <li>Mathematical mapping of ultrasonic time-of-flight to percentage fill.</li>
              <li>Serial telemetry output with threshold alert at 80% capacity.</li>
              <li>Breadboard circuit wiring and power rail stabilization.</li>
            </ul>
          </div>

          <div className="cap-column in-progress">
            <div className="cap-header">
              <Clock size={16} />
              <h4>IN ACTIVE DEVELOPMENT</h4>
            </div>
            <ul>
              <li>WiFi telemetry push to central dashboard over HTTP JSON REST.</li>
              <li>Moving-average smoothing algorithm to ignore temporary sensor jitter.</li>
              <li>Multi-bin status table displaying priority-ranked containers.</li>
              <li>Time-to-overflow estimation based on hourly fill velocity.</li>
            </ul>
          </div>

          <div className="cap-column planned">
            <div className="cap-header">
              <Compass size={16} />
              <h4>NEXT ROADMAP MILESTONES</h4>
            </div>
            <ul>
              <li>Solar harvesting circuit with 18650 Li-ion battery and deep-sleep cycling.</li>
              <li>Cellular NB-IoT / GSM module integration for long-range municipal range.</li>
              <li>Ruggedized weatherproof 3D-printed enclosure for outdoor durability.</li>
              <li>Automated sanitation truck route generation based on urgency clusters.</li>
            </ul>
          </div>
        </div>

        {/* Verification & Transparency Banner */}
        <div className="flagship-integrity-card">
          <Sparkles size={16} className="text-lime" />
          <p>
            <strong>INITIATIVE INTEGRITY NOTICE:</strong> This project is currently an active hardware prototype
            engineered under NEW STARS and validated on a development test bench. It has not been deployed across municipal fleets,
            and no field-measured fuel savings or municipal partnerships are claimed.
          </p>
        </div>
      </div>
    </section>
  )
}
