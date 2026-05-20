'use client'

import { ScanPhase } from '../app/page'

interface NeuralScanInterfaceProps {
  phase: ScanPhase
  uploadedImage: string | null
  progress: number
  phaseLabel: string
}

export default function NeuralScanInterface({ phase, uploadedImage, progress, phaseLabel }: NeuralScanInterfaceProps) {
  const phaseColors: Record<string, string> = {
    uploading: '#00f5ff',
    initializing: '#00f5ff',
    mapping: '#0099ff',
    analyzing: '#8b00ff',
    computing: '#00ff88',
  }

  const color = phaseColors[phase] || '#00f5ff'

  return (
    <div className="flex-1 flex items-center justify-center px-4 py-8">
      <div className="max-w-2xl w-full">
        {/* Phase indicator */}
        <div className="text-center mb-8">
          <div className="font-mono text-xs tracking-[0.5em] mb-2" style={{ color }}>
            ◈ {phaseLabel} ◈
          </div>
          <div className="font-display text-3xl font-black text-white mb-2">
            NEURAL SCAN IN PROGRESS
          </div>
          <div className="font-mono text-cyber-cyan/50 text-sm">
            Do not close this window. Biometric analysis running...
          </div>
        </div>

        {/* Main scan visualization */}
        <div className="cyber-panel rounded-lg p-6 mb-6 relative overflow-hidden">
          {/* Corner brackets */}
          <div className="absolute top-3 left-3 w-5 h-5 border-l-2 border-t-2 border-cyber-cyan/60" />
          <div className="absolute top-3 right-3 w-5 h-5 border-r-2 border-t-2 border-cyber-cyan/60" />
          <div className="absolute bottom-3 left-3 w-5 h-5 border-l-2 border-b-2 border-cyber-cyan/60" />
          <div className="absolute bottom-3 right-3 w-5 h-5 border-r-2 border-b-2 border-cyber-cyan/60" />

          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Image with scan overlay */}
            <div className="relative flex-shrink-0">
              <div
                className="w-48 h-48 rounded relative overflow-hidden"
                style={{ border: `1px solid ${color}40` }}
              >
                {uploadedImage ? (
                  <img src={uploadedImage} alt="Scan target" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-cyber-dark flex items-center justify-center">
                    <div className="font-mono text-cyber-cyan/30 text-xs">NO IMAGE</div>
                  </div>
                )}
                
                {/* Scan overlay */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: `linear-gradient(to bottom, ${color}00, ${color}15, ${color}00)` }}
                />
                <div className="scan-overlay absolute inset-0 pointer-events-none" />
                
                {/* Facial grid overlay */}
                <div className="absolute inset-0 pointer-events-none" style={{
                  backgroundImage: `
                    linear-gradient(${color}10 1px, transparent 1px),
                    linear-gradient(90deg, ${color}10 1px, transparent 1px)
                  `,
                  backgroundSize: '20px 20px',
                }}/>

                {/* Corner targeting */}
                <div className="absolute top-1 left-1 w-4 h-4 border-l border-t" style={{ borderColor: color }} />
                <div className="absolute top-1 right-1 w-4 h-4 border-r border-t" style={{ borderColor: color }} />
                <div className="absolute bottom-1 left-1 w-4 h-4 border-l border-b" style={{ borderColor: color }} />
                <div className="absolute bottom-1 right-1 w-4 h-4 border-r border-b" style={{ borderColor: color }} />

                {/* Scan label */}
                <div
                  className="absolute top-2 left-0 right-0 text-center font-mono text-xs"
                  style={{ color, fontSize: '9px', letterSpacing: '2px' }}
                >
                  TARGET LOCKED
                </div>
              </div>

              {/* Rotating rings around image */}
              <div className="absolute -inset-4 pointer-events-none">
                <svg viewBox="0 0 224 224" className="w-full h-full absolute inset-0" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="112" cy="112" r="100"
                    fill="none" stroke={color} strokeWidth="0.5" strokeOpacity="0.3"
                    strokeDasharray="20 10"
                    style={{ animation: 'rotateRing 6s linear infinite', transformOrigin: '112px 112px' }}
                  />
                  <circle cx="112" cy="112" r="108"
                    fill="none" stroke={color} strokeWidth="0.3" strokeOpacity="0.2"
                    strokeDasharray="5 20"
                    style={{ animation: 'counterRotateRing 10s linear infinite', transformOrigin: '112px 112px' }}
                  />
                </svg>
              </div>
            </div>

            {/* Progress and metrics */}
            <div className="flex-1 w-full">
              {/* Progress bar */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-mono text-xs tracking-widest" style={{ color }}>NEURAL SCAN PROGRESS</span>
                  <span className="font-display text-2xl font-black" style={{ color }}>{progress}%</span>
                </div>
                <div className="h-2 bg-cyber-dark rounded overflow-hidden border border-cyber-border">
                  <div
                    className="h-full rounded transition-all duration-300"
                    style={{
                      width: `${progress}%`,
                      background: `linear-gradient(90deg, ${color}, ${color}88)`,
                      boxShadow: `0 0 10px ${color}80`,
                    }}
                  />
                </div>
              </div>

              {/* Live metrics */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'NODES SCANNED', value: `${Math.floor(progress * 4.68)}`, max: '468' },
                  { label: 'ANALYSIS DEPTH', value: `${Math.floor(progress * 0.32)}`, max: '32 LAYERS' },
                  { label: 'MATCHES FOUND', value: `${Math.floor(progress * 24000)}`, max: '2.4M' },
                  { label: 'CONFIDENCE', value: `${Math.min(99, Math.floor(progress * 0.99))}%`, max: '99%' },
                ].map((metric, i) => (
                  <div key={i} className="bg-cyber-dark/50 rounded p-2 border border-cyber-border/50">
                    <div className="font-mono text-xs text-cyber-cyan/40 tracking-wider mb-1">{metric.label}</div>
                    <div className="font-display text-sm font-bold" style={{ color }}>{metric.value}</div>
                  </div>
                ))}
              </div>

              {/* Phase dots */}
              <div className="flex gap-2 mt-4">
                {['UPLOAD', 'INIT', 'MAP', 'ANALYZE', 'COMPUTE'].map((step, i) => {
                  const phases = ['uploading', 'initializing', 'mapping', 'analyzing', 'computing']
                  const currentIdx = phases.indexOf(phase)
                  const isDone = i < currentIdx
                  const isActive = i === currentIdx
                  
                  return (
                    <div key={i} className="flex-1 text-center">
                      <div
                        className="h-1 w-full rounded mb-1"
                        style={{
                          background: isDone ? color : isActive ? `${color}80` : 'rgba(255,255,255,0.05)',
                          boxShadow: isActive ? `0 0 8px ${color}` : 'none',
                        }}
                      />
                      <div
                        className="font-mono text-xs"
                        style={{
                          color: isDone ? color : isActive ? color : 'rgba(255,255,255,0.2)',
                          fontSize: '8px',
                          letterSpacing: '1px',
                        }}
                      >
                        {step}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Analyzing message */}
        <div className="text-center font-mono text-xs tracking-widest text-cyber-cyan/40 flex items-center justify-center gap-2">
          <span>PROCESSING BIOMETRIC DATA</span>
          <span className="flex gap-1">
            {[0, 1, 2].map(i => (
              <span
                key={i}
                className="w-1.5 h-1.5 rounded-full bg-cyber-cyan/60 load-dot"
                style={{ animationDelay: `${i * 0.16}s` }}
              />
            ))}
          </span>
        </div>
      </div>
    </div>
  )
}
