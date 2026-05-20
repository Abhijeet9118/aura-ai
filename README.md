# AURA-AI — Neural Aesthetic Intelligence System

> A next-generation AI facial attractiveness analyzer with cyberpunk HUD interface, neural scan visualization, and futuristic intelligence profiling.

## 🧠 What Makes This Different

This is NOT a typical beauty filter app. AURA-AI is a **futuristic neural intelligence platform** that:

- Simulates a **live neural scanning sequence** with cinematic phases
- Generates a **Neural DNA Profile** (Titan Class, Elite Symmetry, Alpha Structure)
- Displays an **Iron Man-style HUD** with targeting reticles and rotating rings
- Provides **Energy Field Metrics**: confidence energy, dominance level, charisma score, aura intensity, magnetism
- Shows an **AI Transformation Timeline**: Current → Optimized → Peak Potential
- Features **animated terminal logs** with real-time scan updates
- Has a **particle field background** with neural network connections
- Custom **cyberpunk cursor** with lag effect
- **Holographic result cards** with glowing score rings

## 🚀 Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS** with custom cyber theme
- **Canvas API** for particle field
- **CSS animations** for all scan effects
- **Anthropic Claude API** ready (plug in your API key)

## 🛠 Setup

```bash
# 1. Install dependencies
npm install

# 2. Add your Anthropic API key (optional - for real AI analysis)
cp .env.example .env.local
# Edit .env.local and add: ANTHROPIC_API_KEY=your_key_here

# 3. Run development server
npm run dev

# 4. Open http://localhost:3000
```

## 📁 Project Structure

```
aura-ai/
├── src/
│   ├── app/
│   │   ├── page.tsx          # Main app logic & scan state machine
│   │   ├── layout.tsx        # Root layout with fonts
│   │   └── globals.css       # Cyberpunk design system
│   └── components/
│       ├── HeroSection.tsx       # Upload interface with targeting reticle
│       ├── NeuralScanInterface.tsx # Live scan visualization
│       ├── ResultsDashboard.tsx   # Full intelligence report
│       ├── ParticleField.tsx      # Canvas particle background
│       ├── CursorEffect.tsx       # Custom cyberpunk cursor
│       └── TerminalLog.tsx        # Live terminal output
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── next.config.js
```

## 🎯 Key Features

### Neural Scan Phases
1. **UPLOADING** — Secure biometric uplink
2. **INITIALIZING** — Neural engine calibration
3. **MAPPING** — 468 facial landmark detection
4. **ANALYZING** — Deep aesthetic classification
5. **COMPUTING** — AURA profile synthesis

### Score Categories
- Facial Symmetry
- Jaw Structure
- Skin Quality
- Feature Harmony
- Aesthetic Potential
- Neural Presence

### Energy Metrics
- Confidence Energy
- Dominance Level
- Charisma Score
- Aura Intensity
- Magnetism Field

## 🏆 Contest Notes

Built for 8x Engineer "Build a Umax Clone" contest.
- Scoring focus: AI integration, score UI design, recommendation quality
- Reference apps: Umax, Bloater AI, Glam Up, UCHAD, Debloat AI
- Deadline: May 24, 2026

## 📸 Screenshots

See `/screenshots/` folder (add after running the app).

## 🤖 AI Logs

See `/ai-logs/` folder for development AI conversations.
