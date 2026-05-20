<div align="center">

<!--  ═══════════════════════════════════════════════════════════
      NEXUSHR  —  ANIMATED BANNER  (pure SVG, no external deps)
      ═══════════════════════════════════════════════════════════ -->

<svg width="100%" viewBox="0 0 860 260" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <style>
      .wave1 { animation: w1 6s ease-in-out infinite; }
      .wave2 { animation: w2 6s ease-in-out infinite; }
      .wave3 { animation: w3 6s ease-in-out infinite; }
      .logo  { animation: float 4s ease-in-out infinite; transform-origin: 430px 108px; }
      .sub   { animation: fadein 1.8s ease forwards; opacity: 0; }
      .dot1  { animation: pulse 3s ease-in-out infinite; }
      .dot2  { animation: pulse 3s ease-in-out 1s infinite; }
      .dot3  { animation: pulse 3s ease-in-out 2s infinite; }
      @keyframes w1 {
        0%,100% { d: path("M0,180 C120,140 240,200 360,170 C480,140 600,190 720,160 C800,140 840,155 860,150 L860,260 L0,260 Z"); }
        50%      { d: path("M0,160 C100,190 230,145 370,175 C490,200 610,150 730,178 C810,195 845,165 860,170 L860,260 L0,260 Z"); }
      }
      @keyframes w2 {
        0%,100% { d: path("M0,200 C140,170 280,215 420,190 C560,165 680,205 860,185 L860,260 L0,260 Z"); }
        50%      { d: path("M0,185 C130,210 270,175 430,200 C570,220 690,180 860,200 L860,260 L0,260 Z"); }
      }
      @keyframes w3 {
        0%,100% { d: path("M0,225 C180,205 360,235 540,215 C680,200 780,225 860,215 L860,260 L0,260 Z"); }
        50%      { d: path("M0,215 C170,230 350,210 530,225 C670,238 770,212 860,222 L860,260 L0,260 Z"); }
      }
      @keyframes float {
        0%,100% { transform: translateY(0px); }
        50%      { transform: translateY(-8px); }
      }
      @keyframes fadein {
        to { opacity: 1; }
      }
      @keyframes pulse {
        0%,100% { r: 3; opacity: 0.5; }
        50%      { r: 5; opacity: 1; }
      }
    </style>

    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%"   stop-color="#0f0c29"/>
      <stop offset="50%"  stop-color="#302b63"/>
      <stop offset="100%" stop-color="#1a1040"/>
    </linearGradient>

    <linearGradient id="textgrad" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%"   stop-color="#a78bfa"/>
      <stop offset="50%"  stop-color="#818cf8"/>
      <stop offset="100%" stop-color="#c4b5fd"/>
    </linearGradient>

    <linearGradient id="accentgrad" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%"   stop-color="#6ee7b7"/>
      <stop offset="100%" stop-color="#a78bfa"/>
    </linearGradient>

    <filter id="glow">
      <feGaussianBlur stdDeviation="3" result="blur"/>
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs>

  <!-- background -->
  <rect width="860" height="260" fill="url(#bg)" rx="14"/>

  <!-- subtle grid lines -->
  <g opacity="0.06" stroke="#a78bfa" stroke-width="0.5">
    <line x1="0" y1="52" x2="860" y2="52"/>
    <line x1="0" y1="104" x2="860" y2="104"/>
    <line x1="0" y1="156" x2="860" y2="156"/>
    <line x1="215" y1="0" x2="215" y2="260"/>
    <line x1="430" y1="0" x2="430" y2="260"/>
    <line x1="645" y1="0" x2="645" y2="260"/>
  </g>

  <!-- animated waves -->
  <path class="wave1" fill="#7F77DD" opacity="0.18"
        d="M0,180 C120,140 240,200 360,170 C480,140 600,190 720,160 C800,140 840,155 860,150 L860,260 L0,260 Z"/>
  <path class="wave2" fill="#534AB7" opacity="0.22"
        d="M0,200 C140,170 280,215 420,190 C560,165 680,205 860,185 L860,260 L0,260 Z"/>
  <path class="wave3" fill="#302b63" opacity="0.55"
        d="M0,225 C180,205 360,235 540,215 C680,200 780,225 860,215 L860,260 L0,260 Z"/>

  <!-- floating orb accents -->
  <circle cx="80"  cy="55"  r="28" fill="#7F77DD" opacity="0.12"/>
  <circle cx="780" cy="70"  r="20" fill="#6ee7b7" opacity="0.10"/>
  <circle cx="160" cy="200" r="14" fill="#818cf8" opacity="0.13"/>
  <circle cx="700" cy="195" r="18" fill="#a78bfa" opacity="0.11"/>

  <!-- animated pulse dots -->
  <circle class="dot1" cx="68"  cy="42"  r="3" fill="#a78bfa"/>
  <circle class="dot2" cx="792" cy="58"  r="3" fill="#6ee7b7"/>
  <circle class="dot3" cx="430" cy="22"  r="3" fill="#c4b5fd"/>

  <!-- main logo group — floats -->
  <g class="logo">
    <!-- hexagon icon mark -->
    <polygon points="400,28 418,38 418,58 400,68 382,58 382,38"
             fill="none" stroke="url(#accentgrad)" stroke-width="1.5" opacity="0.9"/>
    <polygon points="400,34 412,41 412,55 400,62 388,55 388,41"
             fill="#7F77DD" opacity="0.25"/>
    <text x="400" y="52" text-anchor="middle"
          font-family="'Segoe UI',Arial,sans-serif" font-size="14"
          font-weight="700" fill="#c4b5fd" filter="url(#glow)">N</text>

    <!-- wordmark -->
    <text x="430" y="108" text-anchor="middle"
          font-family="'Segoe UI',Arial,sans-serif"
          font-size="68" font-weight="800" letter-spacing="6"
          fill="url(#textgrad)" filter="url(#glow)">NexusHR</text>

    <!-- accent line under wordmark -->
    <line x1="230" y1="120" x2="630" y2="120"
          stroke="url(#accentgrad)" stroke-width="1.2" opacity="0.7"/>
  </g>

  <!-- subtitle -->
  <text class="sub" x="430" y="150" text-anchor="middle"
        font-family="'Segoe UI',Arial,sans-serif"
        font-size="15" letter-spacing="3" fill="#a5b4fc" opacity="0">
    ENTERPRISE  RESOURCE  &amp;  PERSONNEL  ORCHESTRATOR
  </text>

  <!-- tag chips -->
  <g font-family="'Segoe UI',Arial,sans-serif" font-size="11" font-weight="600" letter-spacing="0.5">
    <rect x="204" y="165" width="78" height="20" rx="10" fill="#7F77DD" opacity="0.35"/>
    <text x="243" y="179" text-anchor="middle" fill="#ddd6fe">REACT 18</text>

    <rect x="292" y="165" width="86" height="20" rx="10" fill="#1D9E75" opacity="0.35"/>
    <text x="335" y="179" text-anchor="middle" fill="#6ee7b7">TYPESCRIPT</text>

    <rect x="388" y="165" width="82" height="20" rx="10" fill="#534AB7" opacity="0.45"/>
    <text x="429" y="179" text-anchor="middle" fill="#c4b5fd">GEMINI AI</text>

    <rect x="480" y="165" width="68" height="20" rx="10" fill="#0F6E56" opacity="0.40"/>
    <text x="514" y="179" text-anchor="middle" fill="#6ee7b7">EXPRESS</text>

    <rect x="558" y="165" width="96" height="20" rx="10" fill="#7F77DD" opacity="0.30"/>
    <text x="606" y="179" text-anchor="middle" fill="#e0e7ff">TAILWIND CSS</text>
  </g>
</svg>

<br/>

[![React](https://img.shields.io/badge/React_18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![Gemini AI](https://img.shields.io/badge/Gemini_AI-4285F4?style=for-the-badge&logo=google&logoColor=white)](https://ai.google.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

<br/>

[![Zero TS Warnings](https://img.shields.io/badge/TypeScript-Zero%20Warnings-22c55e?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Build Passing](https://img.shields.io/badge/Build-Passing-22c55e?style=flat-square)](/)
[![License MIT](https://img.shields.io/badge/License-MIT-f59e0b?style=flat-square)](LICENSE)
[![ESLint Clean](https://img.shields.io/badge/Code_Style-ESLint-4B32C3?style=flat-square&logo=eslint)](https://eslint.org/)
[![PRs Welcome](https://img.shields.io/badge/PRs-Welcome-a855f7?style=flat-square)](/)

</div>

---

<br/>

## ✦ What is NexusHR?

**NexusHR** is a high-performance, enterprise-grade HR Operations portal engineered from the ground up for large-scale organizations. It unifies real-time workforce intelligence, AI-driven task orchestration, and interactive data visualization into a single cohesive command center — eliminating the fragmentation of traditional HR tooling.

At its core, NexusHR combines a **Google Gemini AI engine**, a **reactive onboarding state machine**, **live payroll simulation**, and a **smart attendance compliance system** — all wrapped in a dark-ambient, high-contrast UI designed for long working sessions and executive-level clarity.

> *NexusHR is not just an HR dashboard — it's an operational intelligence layer for your entire personnel lifecycle.*

<br/>

---

## ✦ Platform Modules at a Glance

<div align="center">

|  | Module | Core Capability |
|:---:|:---|:---|
| 📊 | **Executive Dashboard** | Live KPI aggregates, active onboarding syncer, stage progress tracking |
| ⚡ | **Onboarding Engine** | Gemini AI task suggestions, dependency gating, email gateway, stakeholder reassigner |
| 💸 | **Payroll Analytics** | Revenue multiplier slider, dual chart panes, full execution ledger |
| 📅 | **Attendance Portal** | Real-time clock-in register, holiday override scheduler, roster Excel export |

</div>

<br/>

---

## ✦ Features

### 📊 Executive Dashboard & Operations Syncer

The central command view — gives leadership an instant pulse on organizational health.

- **Operational Health KPIs** — Real-time aggregate counts for total active hires, monthly tax outlays, and personnel ratios rendered as high-contrast status cards
- **Active Onboardings Syncer** — A live widget that reads candidate state and dynamically segments every open pipeline into four chronological stages:
  - `HR Pending` → `IT Processing` → `Manager Sync Pending` → `Fully Certified`
- **Adaptive Progress Indicators** — Per-candidate progress bars visualizing stage distribution across all active operational workflows at a glance

<br/>

---

### ⚡ Intelligent Onboarding State Machine

> *The most technically sophisticated module — a production-grade HR workflow engine with AI at its core.*

#### 🤖 Generative AI Assignment Suggester *(Gemini 3.5 Flash)*

A secure backend integration powered by Google's Gemini 3.5 Flash model that analyzes each candidate in context:

- Reads the candidate's role, team skill matrix, and current live checklist workload
- Recommends optimal department routing — **IT → HR → Manager** — based on bottleneck analysis
- Calculates precise **completion-hour estimates** per candidate
- Returns descriptive, actionable reasoning rendered inside an animated interactive card panel
- All Gemini queries execute **server-side only** — the API key is never exposed to the client bundle

#### ⚙️ Hierarchical Task Dependency Engine

A robust rule-based system that enforces correct task sequencing across the entire pipeline:

- Every task carries a `dependencies: string[]` array listing prerequisite task IDs
- Blocked tasks render with **visual padlock indicators** and a muted treatment
- Clicking a locked task fires **real-time validation alerts** naming the prerequisite
- Completing a prerequisite instantly unlocks its dependents reactively across the live UI

#### 📬 Automated Handbook Welcome Email Gateway

- **Inline template builder** for customizing handbook content per candidate
- Dispatch is gated — triggers only after all HR and IT checklist objectives are completed
- Simulates enterprise mail dispatchers with real-time mock delivery confirmation
- Stores **date stamps + delivery success tokens** per candidate automatically

#### 🔄 Inline Dropdown Stakeholder Reassigner

- Visual dropdown controls on every ledger task row
- Instantly transfer tasks between **HR**, **IT**, or **Manager** departments
- Updates propagate with **live database sync** and instant status notifications

<br/>

---

### 💸 Dynamic Payroll Analytics & Forecaster

A fully interactive financial simulation engine for modeling compensation at enterprise scale.

**Interactive Revenue Modulator** — A live range slider adjusts performance-based salary multipliers from `0.50×` to `2.00×`. All charts update in real-time.

| Visualization Pane | Chart Type | What It Shows |
|---|---|---|
| **Salary & Bonus Band Analysis** | Dual-color Bar Chart | Dynamically scaled totals per department at current multiplier |
| **Gross Tax-Deduction Slice** | Interactive Donut Pie | Take-home volume, Federal withholdings, and health premiums |

**Execution Ledger Records** — Full payroll run history across thousands of registered employees with live timestamp appending and auditable simulation trails.

<br/>

---

### 📅 Attendance Compliance & Holiday Override System

**Direct Network Clock-In Register** — One-click triggers that auto-capture browser-local timestamps and log precise office gateway location identifiers. Roster grids update with zero page reloads.

**Adaptive Absence Bypass Scheduler** — Corporate holiday calendar with federal holds and custom shutdowns. Selecting a holiday automatically:
- Disables daily absence flags across the full roster
- Overrides VPN security alerts for the period
- Applies **double-pay compensation rules** into synchronization registers

**Roster Log Table Excel Exporter** — Fully formatted attendance tables with one-click rapid export to structured spreadsheet format.

<br/>

---

## ✦ Technology Stack

### Frontend

| Technology | Version | Role |
|---|---|---|
| **React** | 18 | SPA with concurrent rendering |
| **Vite** | Latest | Ultra-fast HMR and optimized static builds |
| **TypeScript** | Strict | Zero-warning schemas for all domain entities |
| **Tailwind CSS** | v3 | Custom dark-ambient design system — off-blacks, high-contrast, micro-interactions |
| **Framer Motion** | Latest | Physical transitions, fading views, custom layout animations |
| **Recharts** | Latest | Responsive SVG charting — salary bands, deduction pies, attendance trends |
| **Lucide React** | Latest | Consistent modern SVG icon system |

### Backend

| Technology | Role |
|---|---|
| **Node.js + Express** | Standalone API server — data aggregation, localized APIs, proxy interfaces |
| **Google GenAI SDK** | `@google/genai` for secure server-side Gemini 3.5 Flash query execution |
| **esbuild** | Compiles backend TypeScript into unified `dist/server.cjs` production artifact |
| **Vite Dev Middleware** | Custom staging router for instant development script proxying |

<br/>

---

## ✦ Project Architecture

```
nexushr/
│
├── 📁 src/
│   ├── 📁 components/          # Reusable UI component library
│   ├── 📁 pages/
│   │   ├── Dashboard.tsx       # Executive KPIs & live onboarding syncer
│   │   ├── Onboarding.tsx      # State machine + AI suggester + email + reassigner
│   │   ├── Payroll.tsx         # Revenue slider + dual chart panes + ledger
│   │   └── Attendance.tsx      # Clock-in + holiday overrides + roster export
│   ├── 📁 types/               # Strict schemas — candidates, payroll, holidays
│   └── 📁 utils/               # Data aggregation helpers
│
├── 📁 server/
│   ├── server.ts               # Express API + Gemini proxy + data routes
│   └── dist/
│       └── server.cjs          # Compiled production backend (esbuild)
│
├── vite.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── .env.example
```

<br/>

---

## ✦ Getting Started

### Prerequisites

- **Node.js** `v18+`
- **npm** `v9+` or **yarn**
- A valid **Google Gemini API Key** from [Google AI Studio](https://aistudio.google.com/)

### Installation

```bash
# 1. Clone the repo
git clone https://github.com/darshan-paapani/nexushr.git
cd nexushr

# 2. Install dependencies
npm install

# 3. Set up environment
cp .env.example .env
```

Edit `.env`:
```env
GEMINI_API_KEY=your_google_gemini_api_key_here
PORT=3001
NODE_ENV=development
```

> ⚠️ The API key is consumed server-side only — never bundled into the client.

### Development

```bash
npm run dev
# → http://localhost:5173
```

### Production Build

```bash
npm run build          # Build frontend
npm run build:server   # Compile backend → dist/server.cjs
npm start              # Start production server
```

### Quality Checks

```bash
npx tsc --noEmit   # Must return zero warnings
npm run lint       # ESLint — must return clean
```

<br/>

---

## ✦ Environment Variables

| Variable | Required | Default | Description |
|---|---|---|---|
| `GEMINI_API_KEY` | ✅ | — | Google Gemini API key |
| `PORT` | Optional | `3001` | Express server port |
| `NODE_ENV` | Optional | `development` | Runtime environment |

<br/>

---

## ✦ Deep Dives

<details>
<summary><strong>🤖 AI Assignment Engine — how it works</strong></summary>
<br/>

1. Frontend sends `POST /api/suggest` with candidate role, team, and checklist state
2. Express server builds a structured prompt and calls Gemini 3.5 Flash via `@google/genai`
3. Gemini analyzes workload distribution, role fit, and pipeline bottlenecks
4. Server returns: optimal department route + estimated completion hours + natural language reasoning
5. Frontend renders inside an animated interactive card panel

The API key never reaches the browser — architecturally impossible for a client inspector to extract it.

</details>

<details>
<summary><strong>⚙️ Task Dependency Engine — implementation logic</strong></summary>
<br/>

- Every task carries `dependencies: string[]` listing prerequisite IDs
- Renderer checks all dependencies are `status: 'complete'` before enabling the task
- Locked tasks show padlock icon + muted visual treatment
- Clicking locked fires validation alert naming the required prerequisite
- Completing a prereq reactively unlocks all dependents live — no reload needed

</details>

<details>
<summary><strong>💸 Payroll Simulation Engine — calculation logic</strong></summary>
<br/>

- Base salaries seeded per role-based band across all employee records
- Performance multiplier slider (`0.50×` → `2.00×`) scales the bonus allocation
- Federal withholdings calculated via IRS-approximated bracket model
- Health premiums applied as fixed percentage deductions
- All outputs feed the bar chart, donut chart, and timestamped ledger simultaneously

</details>

<details>
<summary><strong>📅 Holiday Compliance Engine — override rules</strong></summary>
<br/>

When a date is flagged as a holiday:
- Absence flags for all employees suppressed automatically
- VPN security alerts bypassed for off-site access on that date
- Double-pay multipliers propagated into payroll sync registers
- Roster table marks overridden dates with distinct visual treatment for auditability

</details>

<br/>

---

## ✦ Quality Standards

| Standard | Status | Detail |
|---|---|---|
| TypeScript Strict | ✅ Zero warnings | `tsc --noEmit` passes clean across full codebase |
| ESLint | ✅ Clean | All strict rules satisfied |
| Secret Safety | ✅ Server-side only | `GEMINI_API_KEY` unreachable by client bundle |
| Production Build | ✅ Unified binary | esbuild → `dist/server.cjs`, no relative path exceptions |
| Type Coverage | ✅ Full | Strict schemas for all domain entities |
| Component Architecture | ✅ Modular | All UI independently testable and reusable |

<br/>

---

## ✦ Roadmap

- [ ] Multi-tenancy — isolated workspaces per organization
- [ ] RBAC — HR Admin / Manager / Employee permission tiers
- [ ] PostgreSQL + Prisma persistence layer
- [ ] Live email dispatch via SMTP / SendGrid
- [ ] Mobile-responsive redesign for tablet and phone
- [ ] Compliance-ready audit log export in PDF and CSV
- [ ] SSO — OKTA, Google Workspace, Microsoft Entra
- [ ] Gemini streaming responses — token-by-token AI output

<br/>

---

## ✦ Contributing

1. Fork the repo
2. Create a branch: `git checkout -b feature/your-feature`
3. Commit: `git commit -m 'feat: your feature description'`
4. Push: `git push origin feature/your-feature`
5. Open a Pull Request against `main`

Ensure `tsc --noEmit` and `npm run lint` are clean before submitting.

<br/>

---

## ✦ License

Licensed under the **MIT License** — see [LICENSE](LICENSE) for details.

<br/>

---

<!-- ═══════════════════════  FOOTER BANNER  ═══════════════════════ -->

<div align="center">

<svg width="100%" viewBox="0 0 860 100" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <style>
      .fw1 { animation: fw1 7s ease-in-out infinite; }
      .fw2 { animation: fw2 7s ease-in-out infinite; }
      @keyframes fw1 {
        0%,100% { d: path("M0,40 C200,10 400,60 600,30 C730,10 800,40 860,30 L860,100 L0,100 Z"); }
        50%      { d: path("M0,30 C180,55 380,15 580,45 C720,65 800,28 860,38 L860,100 L0,100 Z"); }
      }
      @keyframes fw2 {
        0%,100% { d: path("M0,60 C220,35 440,70 660,50 C760,38 820,58 860,52 L860,100 L0,100 Z"); }
        50%      { d: path("M0,52 C210,70 430,42 650,62 C755,72 815,48 860,58 L860,100 L0,100 Z"); }
      }
    </style>
    <linearGradient id="fbg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%"   stop-color="#1a1040"/>
      <stop offset="100%" stop-color="#0f0c29"/>
    </linearGradient>
    <linearGradient id="ftg" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%"   stop-color="#a78bfa"/>
      <stop offset="100%" stop-color="#6ee7b7"/>
    </linearGradient>
  </defs>
  <rect width="860" height="100" fill="url(#fbg)" rx="14"/>
  <path class="fw1" fill="#534AB7" opacity="0.25"
        d="M0,40 C200,10 400,60 600,30 C730,10 800,40 860,30 L860,100 L0,100 Z"/>
  <path class="fw2" fill="#302b63" opacity="0.50"
        d="M0,60 C220,35 440,70 660,50 C760,38 820,58 860,52 L860,100 L0,100 Z"/>
  <text x="430" y="38" text-anchor="middle"
        font-family="'Segoe UI',Arial,sans-serif"
        font-size="13" font-weight="700" letter-spacing="2" fill="url(#ftg)">
    DESIGNED &amp; DEVELOPED BY
  </text>
  <text x="430" y="62" text-anchor="middle"
        font-family="'Segoe UI',Arial,sans-serif"
        font-size="22" font-weight="800" letter-spacing="1" fill="#c4b5fd">
    Darshan Paapani
  </text>
  <text x="430" y="82" text-anchor="middle"
        font-family="'Segoe UI',Arial,sans-serif"
        font-size="11" letter-spacing="1" fill="#7F77DD">
    If NexusHR helped you, drop a ⭐ — it helps others discover it.
  </text>
</svg>

</div>
