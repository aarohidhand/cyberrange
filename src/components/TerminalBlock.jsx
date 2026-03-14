import { useEffect, useRef, useState } from 'react'
import './TerminalBlock.css'

const defaultLines = [
  '$ systemctl status cyberrange --no-pager',
  '● cyberrange.service - MUJ-ISAC Cyber Range Platform',
  '   Loaded: loaded (/etc/systemd/system/cyberrange.service)',
  '   Active: active (running) since Mon 2026-03-14 09:00:01 IST',
  '   CGroup: /system.slice/cyberrange.service',
  '',
  '$ nmap -sV --script vuln 10.0.1.0/24',
  'Starting Nmap 7.94SVN ( https://nmap.org )',
  'Scanning 256 hosts... [██████████] 100%',
  'Host 10.0.1.47: SCADA/Modbus — 2 vulnerabilities found',
  'Host 10.0.1.112: IoT Gateway — 1 critical CVE detected',
  '',
  '$ suricata --runmode autofp -i eth0',
  '[INFO] Suricata IDS/IPS engine initialized',
  '[INFO] 47,832 rules loaded — monitoring active',
  'STATUS: ALL SYSTEMS OPERATIONAL ✓',
]

export default function TerminalBlock({ lines = defaultLines }) {
  const [displayedLines, setDisplayedLines] = useState([])
  const [currentLine, setCurrentLine] = useState(0)
  const [currentChar, setCurrentChar] = useState(0)
  const [started, setStarted] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started) setStarted(true)
    }, { threshold: 0.3 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [started])

  useEffect(() => {
    if (!started || currentLine >= lines.length) return

    const line = lines[currentLine]
    if (line === '') {
      setDisplayedLines(prev => [...prev, ''])
      setTimeout(() => {
        setCurrentLine(prev => prev + 1)
        setCurrentChar(0)
      }, 150)
      return
    }

    if (currentChar < line.length) {
      const timer = setTimeout(() => {
        setDisplayedLines(prev => {
          const updated = [...prev]
          if (updated.length <= currentLine) updated.push('')
          updated[currentLine] = line.substring(0, currentChar + 1)
          return updated
        })
        setCurrentChar(prev => prev + 1)
      }, 40)
      return () => clearTimeout(timer)
    } else {
      const timer = setTimeout(() => {
        setCurrentLine(prev => prev + 1)
        setCurrentChar(0)
      }, 300)
      return () => clearTimeout(timer)
    }
  }, [started, currentLine, currentChar, lines])

  return (
    <div className="terminal" ref={ref}>
      <div className="terminal__header">
        <span className="terminal__dot terminal__dot--r" />
        <span className="terminal__dot terminal__dot--y" />
        <span className="terminal__dot terminal__dot--g" />
        <span className="terminal__title">cyberrange-terminal</span>
      </div>
      <div className="terminal__body">
        {displayedLines.map((line, i) => (
          <div key={i} className={`terminal__line ${line.startsWith('$') ? 'terminal__line--cmd' : ''}`}>
            {line}
          </div>
        ))}
        {currentLine < lines.length && (
          <span className="terminal__cursor">█</span>
        )}
      </div>
    </div>
  )
}
