'use client'

import { AuraProfile } from '../app/page'

interface ResultsDashboardProps {
  profile: AuraProfile
  uploadedImage: string | null
  onReset: () => void
}

const PRIORITY_COLORS = {
  CRITICAL: 'text-cyber-red border-cyber-red/30 bg-cyber-red/5',
  HIGH: 'text-cyber-orange border-orange-500/30 bg-orange-500/5',
  MEDIUM: 'text-cyber-gold border-cyber-gold/30 bg-cyber-gold/5',
  LOW: 'text-cyber-green border-cyber-green/30 bg-cyber-green/5',
}

function ScoreBar({ score, color = '#00f5ff', delay = 0 }: { score: number; color?: string; delay?: number }) {
  return (
    <div className="h-1 bg-cyber-dark rounded overflow-hidden">
      <div
        className="h-full rounded transition-all duration-1000"
        style={{
          width: `${score}%`,
          background: `linear-gradient(90deg, ${color}, ${color}88)`,
          boxShadow: `0 0 6px ${color}80`,
          animationDelay: `${delay}ms`,
        }}
      />
    </div>
  )
}

function CircleScore({ score, size = 100, color = '#00f5ff' }: { score: number; size?: number; color?: string }) {
  const radius = (size - 12) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (score / 100) * circumference

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.05)"
          strokeWidth="4"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="4"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ filter: `drop-shadow(0 0 6px ${color})` }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-display font-black text-white" style={{ fontSize: size / 4 }}>{score}</span>
      </div>
    </div>
  )
}

export default function ResultsDashboard({ profile, uploadedImage, onReset }: ResultsDashboardProps) {
  const scoreColor = profile.overallScore >= 80 ? '#00ff88' : profile.overallScore >= 65 ? '#00f5ff' : '#ffd700'

  return (
    <div className="flex-1 px-4 py-6 max-w-7xl mx-auto w-full">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="font-mono text-cyber-green text-xs tracking-[0.5em] mb-2">
          ◈ ANALYSIS COMPLETE — INTELLIGENCE REPORT UNLOCKED ◈
        </div>
        <h2 className="font-display text-3xl md:text-5xl font-black gradient-text-cyan">
          AURA INTELLIGENCE REPORT
        </h2>
      </div>

      {/* Top row: main score + DNA profile */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        
        {/* Main score card */}
        <div className="cyber-panel holo-card rounded-lg p-6 text-center relative overflow-hidden">
          <div className="absolute top-2 left-2 w-4 h-4 border-l border-t border-cyber-cyan/40" />
          <div className="absolute top-2 right-2 w-4 h-4 border-r border-t border-cyber-cyan/40" />
          <div className="absolute bottom-2 left-2 w-4 h-4 border-l border-b border-cyber-cyan/40" />
          <div className="absolute bottom-2 right-2 w-4 h-4 border-r border-b border-cyber-cyan/40" />
          
          <div className="font-mono text-xs text-cyber-cyan/50 tracking-widest mb-3">NEURAL AESTHETIC SCORE</div>
          
          <div className="flex justify-center mb-4">
            <CircleScore score={profile.overallScore} size={120} color={scoreColor} />
          </div>

          <div className="font-display text-xl font-black mb-1" style={{ color: scoreColor }}>
            {profile.classification}
          </div>
          <div className="font-mono text-xs tracking-widest" style={{ color: `${scoreColor}80` }}>
            {profile.subclass}
          </div>
          <div className="mt-3 font-mono text-xs text-cyber-cyan/50">
            TOP {100 - profile.percentile}% GLOBALLY
          </div>

          {uploadedImage && (
            <div className="mt-4 relative inline-block">
              <img
                src={uploadedImage}
                alt="Scanned"
                className="w-16 h-16 rounded object-cover mx-auto"
                style={{ border: `1px solid ${scoreColor}40` }}
              />
              <div className="absolute inset-0 rounded" style={{
                background: `linear-gradient(to bottom, transparent, ${scoreColor}20)`,
              }} />
            </div>
          )}
        </div>

        {/* Category scores */}
        <div className="cyber-panel rounded-lg p-5">
          <div className="font-mono text-xs text-cyber-cyan/50 tracking-widest mb-4">◈ CATEGORY BREAKDOWN</div>
          <div className="space-y-3">
            {Object.entries(profile.categories).map(([key, value], i) => {
              const labels: Record<string, string> = {
                symmetry: 'FACIAL SYMMETRY',
                jawStructure: 'JAW STRUCTURE',
                skinQuality: 'SKIN QUALITY',
                featureHarmony: 'FEATURE HARMONY',
                aestheticPotential: 'AESTHETIC POTENTIAL',
                neuralPresence: 'NEURAL PRESENCE',
              }
              const barColors = ['#00f5ff', '#0099ff', '#00ff88', '#8b00ff', '#ffd700', '#ff6600']
              const color = barColors[i]
              
              return (
                <div key={key}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-mono text-xs tracking-wide" style={{ color, fontSize: '9px' }}>
                      {labels[key]}
                    </span>
                    <span className="font-display text-xs font-bold" style={{ color }}>{value}</span>
                  </div>
                  <ScoreBar score={value} color={color} delay={i * 100} />
                </div>
              )
            })}
          </div>
        </div>

        {/* Neural DNA Profile */}
        <div className="cyber-panel rounded-lg p-5">
          <div className="font-mono text-xs text-cyber-cyan/50 tracking-widest mb-4">◈ NEURAL DNA PROFILE</div>
          <div className="space-y-3">
            {[
              { label: 'TITAN CLASS ID', value: profile.dnaProfile.titanClass, color: '#00f5ff' },
              { label: 'SYMMETRY TIER', value: profile.dnaProfile.symmetryTier, color: '#0099ff' },
              { label: 'STRUCTURE RATING', value: profile.dnaProfile.structureRating, color: '#8b00ff' },
              { label: 'AESTHETIC INDEX', value: profile.dnaProfile.aestheticIndex, color: '#ffd700' },
              { label: 'HARMONIC FREQ', value: profile.dnaProfile.harmonicFreq, color: '#00ff88' },
            ].map((item, i) => (
              <div key={i} className="bg-cyber-dark/50 rounded p-2 border border-cyber-border/50">
                <div className="font-mono text-xs text-cyber-cyan/40 tracking-widest mb-0.5" style={{ fontSize: '9px' }}>
                  {item.label}
                </div>
                <div className="font-display text-sm font-bold" style={{ color: item.color, textShadow: `0 0 10px ${item.color}60` }}>
                  {item.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Energy metrics */}
      <div className="cyber-panel rounded-lg p-5 mb-4">
        <div className="font-mono text-xs text-cyber-cyan/50 tracking-widest mb-4">◈ ENERGY FIELD METRICS — AURA SIGNATURE</div>
        <div className="grid grid-cols-5 gap-4">
          {[
            { key: 'confidence', label: 'CONFIDENCE', icon: '◈', color: '#00f5ff' },
            { key: 'dominance', label: 'DOMINANCE', icon: '◉', color: '#ff6600' },
            { key: 'charisma', label: 'CHARISMA', icon: '◈', color: '#8b00ff' },
            { key: 'auraIntensity', label: 'AURA INTENSITY', icon: '◉', color: '#ffd700' },
            { key: 'magnetism', label: 'MAGNETISM', icon: '◈', color: '#00ff88' },
          ].map((metric) => {
            const value = profile.energyMetrics[metric.key as keyof typeof profile.energyMetrics]
            return (
              <div key={metric.key} className="text-center">
                <CircleScore score={value} size={72} color={metric.color} />
                <div className="font-mono mt-2" style={{ color: metric.color, fontSize: '9px', letterSpacing: '1px' }}>
                  {metric.label}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Improvement vectors + Evolution timeline */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {/* Improvements */}
        <div className="cyber-panel rounded-lg p-5">
          <div className="font-mono text-xs text-cyber-cyan/50 tracking-widest mb-4">◈ IMPROVEMENT VECTORS — PRIORITY RANKED</div>
          <div className="space-y-3">
            {profile.improvements.map((imp, i) => (
              <div key={i} className={`rounded p-3 border ${PRIORITY_COLORS[imp.priority]}`}>
                <div className="flex items-center justify-between mb-1">
                  <span className="font-display text-xs font-bold tracking-wider">{imp.area}</span>
                  <span className={`font-mono text-xs px-2 py-0.5 rounded border ${PRIORITY_COLORS[imp.priority]}`} style={{ fontSize: '9px' }}>
                    {imp.priority}
                  </span>
                </div>
                <div className="font-body text-xs text-white/60 mb-1">{imp.action}</div>
                <div className="font-mono text-xs text-cyber-green/70">{imp.impact}</div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Evolution Timeline */}
        <div className="cyber-panel rounded-lg p-5">
          <div className="font-mono text-xs text-cyber-cyan/50 tracking-widest mb-4">◈ AI TRANSFORMATION TIMELINE</div>
          <div className="space-y-4">
            {[
              {
                phase: 'CURRENT STATE',
                score: profile.overallScore,
                desc: 'Your baseline aesthetic profile as analyzed by the AURA-7X neural engine.',
                color: '#ffd700',
                tag: 'NOW'
              },
              {
                phase: 'OPTIMIZED FORM',
                score: Math.min(99, profile.overallScore + 12),
                desc: 'Score achievable within 6 months following all improvement protocols.',
                color: '#00f5ff',
                tag: '6 MONTHS'
              },
              {
                phase: 'PEAK POTENTIAL',
                score: Math.min(99, profile.overallScore + 22),
                desc: 'Maximum aesthetic potential unlocked through full optimization stack.',
                color: '#00ff88',
                tag: '12-18 MONTHS'
              },
            ].map((stage, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="flex-shrink-0 text-center">
                  <CircleScore score={stage.score} size={64} color={stage.color} />
                  <div className="font-mono mt-1" style={{ color: stage.color, fontSize: '8px' }}>{stage.tag}</div>
                </div>
                <div className="flex-1 pt-2">
                  <div className="font-display text-xs font-bold mb-1" style={{ color: stage.color }}>
                    {stage.phase}
                  </div>
                  <div className="font-body text-xs text-white/50 leading-relaxed">{stage.desc}</div>
                  {i < 2 && (
                    <div className="font-mono text-xs mt-1" style={{ color: stage.color }}>
                      +{Math.min(99, profile.overallScore + (i + 1) * 11) - profile.overallScore} pts potential gain
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <button onClick={onReset} className="cyber-btn rounded font-display tracking-widest text-xs w-full sm:w-auto px-8">
          ◈ SCAN NEW SUBJECT
        </button>
        <button
          onClick={() => window.print()}
          className="cyber-btn-primary cyber-btn rounded font-display tracking-widest text-xs w-full sm:w-auto px-8"
        >
          ◉ EXPORT INTELLIGENCE REPORT
        </button>
      </div>
    </div>
  )
}
