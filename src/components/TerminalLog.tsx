'use client'

import { useEffect, useRef } from 'react'
import { ScanPhase } from '../app/page'

interface TerminalLogProps {
  logs: string[]
  phase: ScanPhase
}

export default function TerminalLog({ logs, phase }: TerminalLogProps) {
  const logRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight
    }
  }, [logs])

  const isActive = phase !== 'idle' && phase !== 'complete'

  return (
    <div className="border-t border-cyber-border/30 bg-cyber-dark/50 px-4 py-2">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-2 mb-1">
          <div className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-cyber-green animate-pulse' : 'bg-cyber-cyan/40'}`} />
          <span className="font-mono text-xs text-cyber-cyan/40 tracking-widest">SYSTEM TERMINAL</span>
          {isActive && (
            <span className="font-mono text-xs text-cyber-green/60 tracking-wider ml-auto">
              PROCESSING...
            </span>
          )}
        </div>
        <div
          ref={logRef}
          className="h-16 overflow-y-auto space-y-0.5 terminal-text"
          style={{ scrollbarWidth: 'none' }}
        >
          {logs.map((log, i) => (
            <div
              key={i}
              className="opacity-70"
              style={{ opacity: i === logs.length - 1 ? 1 : Math.max(0.3, 1 - (logs.length - 1 - i) * 0.1) }}
            >
              {log}
            </div>
          ))}
          {isActive && (
            <div className="text-cyber-green flex items-center gap-1">
              <span>{'>'}</span>
              <span className="animate-blink">█</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
