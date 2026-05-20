'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import NeuralScanInterface from '../components/NeuralScanInterface'
import ResultsDashboard from '../components/ResultsDashboard'
import ParticleField from '../components/ParticleField'
import CursorEffect from '../components/CursorEffect'
import TerminalLog from '../components/TerminalLog'
import HeroSection from '../components/HeroSection'

export type ScanPhase = 'idle' | 'uploading' | 'initializing' | 'mapping' | 'analyzing' | 'computing' | 'complete'

export interface AuraProfile {
  overallScore: number
  percentile: number
  classification: string
  subclass: string
  categories: {
    symmetry: number
    jawStructure: number
    skinQuality: number
    featureHarmony: number
    aestheticPotential: number
    neuralPresence: number
  }
  energyMetrics: {
    confidence: number
    dominance: number
    charisma: number
    auraIntensity: number
    magnetism: number
  }
  improvements: Array<{
    area: string
    priority: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW'
    action: string
    impact: string
  }>
  dnaProfile: {
    titanClass: string
    symmetryTier: string
    structureRating: string
    aestheticIndex: string
    harmonicFreq: string
  }
}

const SCAN_PHASES: Record<ScanPhase, { label: string; duration: number; logs: string[] }> = {
  idle: { label: 'SYSTEM READY', duration: 0, logs: [] },
  uploading: {
    label: 'UPLOADING NEURAL DATA',
    duration: 800,
    logs: ['> Establishing secure uplink...', '> Encrypting biometric payload...', '> Transfer initiated...']
  },
  initializing: {
    label: 'INITIALIZING NEURAL SCAN',
    duration: 1200,
    logs: [
      '> AURA-7X Neural Engine v4.2 initialized',
      '> Loading facial topology matrices...',
      '> Calibrating symmetry sensors...',
      '> Activating aesthetic intelligence core...',
    ]
  },
  mapping: {
    label: 'MAPPING FACIAL ARCHITECTURE',
    duration: 2000,
    logs: [
      '> Detecting 468 facial landmark nodes...',
      '> Constructing 3D mesh topology...',
      '> Calculating golden ratio deviations...',
      '> Mapping cranial geometry vectors...',
      '> Analyzing orbital socket depth...',
      '> Measuring mandibular projection index...',
    ]
  },
  analyzing: {
    label: 'RUNNING DEEP ANALYSIS',
    duration: 2000,
    logs: [
      '> Deploying neural aesthetic classifier...',
      '> Cross-referencing 2.4M aesthetic profiles...',
      '> Computing symmetry deviation score...',
      '> Analyzing skin texture frequency map...',
      '> Detecting feature proportion ratios...',
      '> Calculating charisma resonance field...',
    ]
  },
  computing: {
    label: 'COMPUTING AURA PROFILE',
    duration: 1500,
    logs: [
      '> Generating Neural DNA signature...',
      '> Computing energy field metrics...',
      '> Calculating dominance projection score...',
      '> Synthesizing improvement vectors...',
      '> AURA profile compilation: 94%...',
      '> PROFILE LOCKED. Rendering intelligence report...',
    ]
  },
  complete: { label: 'ANALYSIS COMPLETE', duration: 0, logs: ['> ██████████ 100%', '> Neural profile LOCKED', '> AURA INTELLIGENCE REPORT READY'] }
}

function generateAuraProfile(imageData?: string): AuraProfile {
  const seed = Math.random()
  const score = Math.floor(55 + seed * 40)
  
  const classifications = [
    { name: 'TITAN CLASS', sub: 'ALPHA STRUCTURE DETECTED' },
    { name: 'ELITE TIER', sub: 'HIGH SYMMETRY MATRIX' },
    { name: 'APEX FORM', sub: 'NEURAL HARMONY ACTIVE' },
    { name: 'PRIME CLASS', sub: 'AESTHETIC POTENTIAL UNLOCKED' },
    { name: 'SOVEREIGN', sub: 'DOMINANCE FIELD STRONG' },
  ]
  
  const cls = classifications[Math.floor(seed * classifications.length)]

  return {
    overallScore: score,
    percentile: Math.floor(60 + seed * 38),
    classification: cls.name,
    subclass: cls.sub,
    categories: {
      symmetry: Math.floor(60 + Math.random() * 35),
      jawStructure: Math.floor(55 + Math.random() * 40),
      skinQuality: Math.floor(65 + Math.random() * 30),
      featureHarmony: Math.floor(60 + Math.random() * 35),
      aestheticPotential: Math.floor(70 + Math.random() * 28),
      neuralPresence: Math.floor(65 + Math.random() * 32),
    },
    energyMetrics: {
      confidence: Math.floor(60 + Math.random() * 38),
      dominance: Math.floor(50 + Math.random() * 45),
      charisma: Math.floor(65 + Math.random() * 33),
      auraIntensity: Math.floor(55 + Math.random() * 42),
      magnetism: Math.floor(60 + Math.random() * 37),
    },
    improvements: [
      {
        area: 'JAW DEFINITION',
        priority: 'HIGH',
        action: 'Lower body fat ↓2-3%, implement mewing protocol',
        impact: '+8-12 pts structural score'
      },
      {
        area: 'SKIN OPTIMIZATION',
        priority: 'HIGH',
        action: 'Retinol + Vitamin C serum + SPF 50 daily protocol',
        impact: '+6-10 pts skin quality'
      },
      {
        area: 'HAIRSTYLE VECTOR',
        priority: 'MEDIUM',
        action: 'Textured crop / mid fade — frames your face geometry',
        impact: '+5-8 pts visual harmony'
      },
      {
        area: 'BODY COMPOSITION',
        priority: 'MEDIUM',
        action: 'Build traps + neck for stronger head-to-body ratio',
        impact: '+7-11 pts dominance field'
      },
      {
        area: 'STYLE UPGRADE',
        priority: 'LOW',
        action: 'Adopt minimalist wardrobe: navy, charcoal, black',
        impact: '+4-6 pts charisma output'
      },
    ],
    dnaProfile: {
      titanClass: `TC-${Math.floor(seed * 9000 + 1000)}`,
      symmetryTier: `S${Math.floor(seed * 4 + 1)}-TIER`,
      structureRating: `ASR-${Math.floor(seed * 400 + 600)}`,
      aestheticIndex: `HAI-${(seed * 9.9 + 1).toFixed(2)}`,
      harmonicFreq: `${(seed * 40 + 60).toFixed(1)}Hz`,
    }
  }
}

export default function Home() {
  const [phase, setPhase] = useState<ScanPhase>('idle')
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [profile, setProfile] = useState<AuraProfile | null>(null)
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    '> AURA-7X NEURAL INTELLIGENCE SYSTEM v4.2',
    '> All systems nominal. Awaiting biometric input...',
    '> Neural aesthetic engine: ONLINE',
    '> Facial topology processor: STANDBY',
  ])
  const [scanProgress, setScanProgress] = useState(0)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const addLog = useCallback((log: string) => {
    setTerminalLogs(prev => [...prev.slice(-20), log])
  }, [])

  const runScanSequence = useCallback(async (imageData: string) => {
    const phases: ScanPhase[] = ['uploading', 'initializing', 'mapping', 'analyzing', 'computing', 'complete']
    let progress = 0

    for (const p of phases) {
      setPhase(p)
      const phaseData = SCAN_PHASES[p]
      
      for (const log of phaseData.logs) {
        await new Promise(r => setTimeout(r, 300 + Math.random() * 400))
        addLog(log)
      }

      const steps = 20
      const increment = (100 / (phases.length * steps))
      for (let i = 0; i < steps; i++) {
        progress = Math.min(100, progress + increment)
        setScanProgress(Math.floor(progress))
        await new Promise(r => setTimeout(r, phaseData.duration / steps))
      }
    }

    const generatedProfile = generateAuraProfile(imageData)
    setProfile(generatedProfile)
    setScanProgress(100)
  }, [addLog])

  const handleImageUpload = useCallback((file: File) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const imageData = e.target?.result as string
      setUploadedImage(imageData)
      addLog(`> Biometric file received: ${file.name}`)
      addLog(`> File size: ${(file.size / 1024).toFixed(1)} KB`)
      runScanSequence(imageData)
    }
    reader.readAsDataURL(file)
  }, [addLog, runScanSequence])

  const handleReset = useCallback(() => {
    setPhase('idle')
    setUploadedImage(null)
    setProfile(null)
    setScanProgress(0)
    setTerminalLogs([
      '> AURA-7X NEURAL INTELLIGENCE SYSTEM v4.2',
      '> System reset. Ready for new scan...',
      '> Neural aesthetic engine: ONLINE',
    ])
  }, [])

  return (
    <main className="min-h-screen bg-cyber-black grid-bg relative overflow-hidden">
      {/* Background effects */}
      <div className="noise-overlay" />
      <ParticleField />
      <CursorEffect />

      {/* Scan line effect */}
      {phase !== 'idle' && phase !== 'complete' && (
        <div 
          className="fixed inset-0 pointer-events-none z-10"
          style={{
            background: 'linear-gradient(to bottom, transparent 48%, rgba(0,245,255,0.03) 50%, transparent 52%)',
            animation: 'scanLine 3s linear infinite',
          }}
        />
      )}

      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="border-b border-cyber-border/50 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 relative">
              <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                <polygon points="16,2 30,9 30,23 16,30 2,23 2,9" fill="none" stroke="#00f5ff" strokeWidth="1" opacity="0.8"/>
                <polygon points="16,6 26,11 26,21 16,26 6,21 6,11" fill="none" stroke="#0099ff" strokeWidth="0.5" opacity="0.5"/>
                <circle cx="16" cy="16" r="4" fill="#00f5ff" opacity="0.9"/>
                <line x1="16" y1="2" x2="16" y2="6" stroke="#00f5ff" strokeWidth="1"/>
                <line x1="16" y1="26" x2="16" y2="30" stroke="#00f5ff" strokeWidth="1"/>
              </svg>
            </div>
            <div>
              <div className="font-display text-cyber-cyan text-sm font-bold tracking-widest glow-cyan-text">AURA-AI</div>
              <div className="font-mono text-cyber-cyan/40 text-xs tracking-widest">NEURAL AESTHETIC INTELLIGENCE</div>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-6 font-mono text-xs text-cyber-cyan/50 tracking-wider">
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-cyber-green animate-pulse" />
              SYSTEM ONLINE
            </span>
            <span>NEURAL ENGINE v4.2</span>
            <span>ACCURACY: 99.7%</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-cyber-green animate-pulse" />
            <span className="font-mono text-xs text-cyber-green/70 tracking-wider">LIVE</span>
          </div>
        </header>

        {/* Main content */}
        {phase === 'idle' && (
          <HeroSection 
            onUpload={handleImageUpload}
            fileInputRef={fileInputRef}
            terminalLogs={terminalLogs}
          />
        )}

        {(phase !== 'idle' && phase !== 'complete') && (
          <NeuralScanInterface
            phase={phase}
            uploadedImage={uploadedImage}
            progress={scanProgress}
            phaseLabel={SCAN_PHASES[phase].label}
          />
        )}

        {phase === 'complete' && profile && (
          <ResultsDashboard
            profile={profile}
            uploadedImage={uploadedImage}
            onReset={handleReset}
          />
        )}

        {/* Terminal log - always visible */}
        <TerminalLog logs={terminalLogs} phase={phase} />
      </div>
    </main>
  )
}
