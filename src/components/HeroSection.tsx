'use client'

import { useState, useCallback, RefObject } from 'react'

interface HeroSectionProps {
  onUpload: (file: File) => void
  fileInputRef: RefObject<HTMLInputElement>
  terminalLogs: string[]
}

export default function HeroSection({ onUpload, fileInputRef, terminalLogs }: HeroSectionProps) {
  const [isDragging, setIsDragging] = useState(false)

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file && file.type.startsWith('image/')) {
      onUpload(file)
    }
  }, [onUpload])

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) onUpload(file)
  }, [onUpload])

  return (
    <div className="flex-1 px-4 py-6 max-w-7xl mx-auto w-full">
      {/* Top hero text */}
      <div className="text-center mb-12 pt-8">
        <div className="font-mono text-cyber-cyan/60 text-xs tracking-[0.5em] uppercase mb-4 animate-fade-in-up">
          ◈ NEURAL AESTHETIC INTELLIGENCE SYSTEM ◈
        </div>
        
        <h1 
          className="font-display text-4xl md:text-6xl lg:text-7xl font-black mb-4 leading-none"
          style={{ animationDelay: '0.1s' }}
        >
          <span className="gradient-text-cyan glitch-text" data-text="AURA">AURA</span>
          <span className="text-white"> INTELLIGENCE</span>
        </h1>
        
        <div className="font-body text-cyber-cyan/70 text-lg md:text-xl max-w-2xl mx-auto mb-6" style={{ animationDelay: '0.2s' }}>
          Upload your image. Let the <span className="text-cyber-cyan font-bold">AURA-7X Neural Engine</span> decode your 
          aesthetic DNA, compute your dominance field, and generate your futuristic intelligence profile.
        </div>

        <div className="flex items-center justify-center gap-6 font-mono text-xs text-cyber-cyan/40 tracking-widest mb-10">
          <span>◈ 468 LANDMARK NODES</span>
          <span>◈ 2.4M PROFILE DATABASE</span>
          <span>◈ 99.7% ACCURACY</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left stats */}
        <div className="space-y-4">
          {[
            { label: 'NEURAL ENGINE', value: 'ACTIVE', color: 'text-cyber-green' },
            { label: 'SCAN RESOLUTION', value: '4K ULTRA', color: 'text-cyber-cyan' },
            { label: 'ANALYSIS DEPTH', value: '∞ LAYERS', color: 'text-cyber-blue' },
            { label: 'DATABASE', value: '2.4M PROFILES', color: 'text-cyber-purple' },
            { label: 'ACCURACY RATE', value: '99.7%', color: 'text-cyber-gold' },
          ].map((stat, i) => (
            <div key={i} className="cyber-panel rounded p-3 flex items-center justify-between" style={{ animationDelay: `${i * 0.1}s` }}>
              <span className="font-mono text-xs text-cyber-cyan/50 tracking-wider">{stat.label}</span>
              <span className={`font-display text-xs font-bold ${stat.color}`}>{stat.value}</span>
            </div>
          ))}
        </div>

        {/* Center upload */}
        <div className="flex flex-col items-center justify-center">
          <div
            className={`upload-zone rounded-lg w-full aspect-square flex flex-col items-center justify-center cursor-pointer transition-all duration-300 relative ${isDragging ? 'border-cyber-cyan scale-105' : ''}`}
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            style={{
              background: isDragging
                ? 'radial-gradient(circle at center, rgba(0,245,255,0.1) 0%, transparent 70%)'
                : 'radial-gradient(circle at center, rgba(0,245,255,0.03) 0%, transparent 70%)',
              maxWidth: '320px'
            }}
          >
            {/* Corner decorations */}
            <div className="absolute top-2 left-2 w-6 h-6 border-l-2 border-t-2 border-cyber-cyan opacity-60" />
            <div className="absolute top-2 right-2 w-6 h-6 border-r-2 border-t-2 border-cyber-cyan opacity-60" />
            <div className="absolute bottom-2 left-2 w-6 h-6 border-l-2 border-b-2 border-cyber-cyan opacity-60" />
            <div className="absolute bottom-2 right-2 w-6 h-6 border-r-2 border-b-2 border-cyber-cyan opacity-60" />

            {/* Center targeting reticle */}
            <div className="relative mb-6">
              <svg viewBox="0 0 120 120" className="w-24 h-24" xmlns="http://www.w3.org/2000/svg">
                {/* Outer ring */}
                <circle cx="60" cy="60" r="50" fill="none" stroke="rgba(0,245,255,0.2)" strokeWidth="1"/>
                <circle cx="60" cy="60" r="50" fill="none" stroke="rgba(0,245,255,0.6)" strokeWidth="1"
                  strokeDasharray="20 8" className="animate-rotate-ring" style={{ transformOrigin: '60px 60px' }}/>
                
                {/* Inner ring */}
                <circle cx="60" cy="60" r="35" fill="none" stroke="rgba(0,153,255,0.4)" strokeWidth="0.5"
                  strokeDasharray="10 5" className="animate-counter-rotate-ring" style={{ transformOrigin: '60px 60px' }}/>
                
                {/* Face outline */}
                <ellipse cx="60" cy="55" rx="22" ry="26" fill="none" stroke="rgba(0,245,255,0.5)" strokeWidth="1"/>
                
                {/* Eyes */}
                <ellipse cx="52" cy="50" rx="4" ry="3" fill="none" stroke="rgba(0,245,255,0.8)" strokeWidth="1"/>
                <ellipse cx="68" cy="50" rx="4" ry="3" fill="none" stroke="rgba(0,245,255,0.8)" strokeWidth="1"/>
                
                {/* Nose */}
                <path d="M60 52 L57 60 L63 60" fill="none" stroke="rgba(0,245,255,0.5)" strokeWidth="0.8"/>
                
                {/* Mouth */}
                <path d="M54 65 Q60 70 66 65" fill="none" stroke="rgba(0,245,255,0.6)" strokeWidth="1"/>
                
                {/* Crosshair lines */}
                <line x1="60" y1="8" x2="60" y2="20" stroke="rgba(0,245,255,0.4)" strokeWidth="1"/>
                <line x1="60" y1="100" x2="60" y2="112" stroke="rgba(0,245,255,0.4)" strokeWidth="1"/>
                <line x1="8" y1="60" x2="20" y2="60" stroke="rgba(0,245,255,0.4)" strokeWidth="1"/>
                <line x1="100" y1="60" x2="112" y2="60" stroke="rgba(0,245,255,0.4)" strokeWidth="1"/>

                {/* Targeting dots */}
                <circle cx="60" cy="60" r="2" fill="rgba(0,245,255,0.8)"/>
              </svg>
            </div>

            <div className="text-center px-4">
              <div className="font-display text-cyber-cyan text-xs tracking-widest mb-2">
                {isDragging ? '◈ DROP TO INITIATE SCAN ◈' : '◈ INITIALIZE NEURAL SCAN ◈'}
              </div>
              <div className="font-mono text-cyber-cyan/40 text-xs">
                Upload selfie or drag & drop
              </div>
              <div className="font-mono text-cyber-cyan/30 text-xs mt-1">
                JPG / PNG / WEBP supported
              </div>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileSelect}
            />
          </div>

          <button
            onClick={() => fileInputRef.current?.click()}
            className="cyber-btn-primary cyber-btn mt-4 w-full rounded font-display tracking-widest"
            style={{ maxWidth: '320px' }}
          >
            ▶ UPLOAD &amp; SCAN
          </button>
        </div>

        {/* Right — feature list */}
        <div className="space-y-3">
          {[
            {
              icon: '◈',
              title: 'NEURAL DNA PROFILE',
              desc: 'Generates your unique aesthetic classification: Titan Class, Elite Symmetry, Alpha Structure',
              color: 'border-cyber-cyan/20'
            },
            {
              icon: '◉',
              title: 'CYBER HUD INTERFACE',
              desc: 'Iron Man-style diagnostics with live scan visualization and facial mesh targeting',
              color: 'border-cyber-blue/20'
            },
            {
              icon: '◈',
              title: 'ENERGY FIELD METRICS',
              desc: 'Confidence energy, dominance level, charisma score, aura intensity, magnetism field',
              color: 'border-cyber-purple/20'
            },
            {
              icon: '◉',
              title: 'EVOLUTION TIMELINE',
              desc: 'Current → Optimized → Potential — your aesthetic transformation roadmap',
              color: 'border-cyber-green/20'
            },
            {
              icon: '◈',
              title: 'ACTIONABLE INTEL',
              desc: 'Priority-ranked improvement vectors: haircut, skincare, fitness, style protocols',
              color: 'border-cyber-gold/20'
            },
          ].map((feature, i) => (
            <div key={i} className={`cyber-panel rounded p-3 border-l-2 ${feature.color}`}>
              <div className="flex items-start gap-2">
                <span className="text-cyber-cyan text-xs mt-0.5">{feature.icon}</span>
                <div>
                  <div className="font-display text-xs text-cyber-cyan tracking-wider mb-1">{feature.title}</div>
                  <div className="font-body text-cyber-cyan/50 text-xs leading-relaxed">{feature.desc}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
