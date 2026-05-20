<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:0f0c29,50:302b63,100:24243e&height=220&section=header&text=NexusHR&fontSize=80&fontColor=ffffff&fontAlignY=38&desc=Enterprise%20Resource%20%26%20Personnel%20Orchestrator&descAlignY=60&descSize=18&animation=fadeIn" width="100%"/>

<br/>

[![React](https://img.shields.io/badge/React_18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![Google Gemini](https://img.shields.io/badge/Gemini_AI-4285F4?style=for-the-badge&logo=google&logoColor=white)](https://ai.google.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

<br/>

[![Zero TypeScript Warnings](https://img.shields.io/badge/TypeScript-Zero%20Warnings-22c55e?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Build: Passing](https://img.shields.io/badge/Build-Passing-22c55e?style=flat-square)](/)
[![License: MIT](https://img.shields.io/badge/License-MIT-f59e0b?style=flat-square)](LICENSE)
[![Code Style: ESLint](https://img.shields.io/badge/Code_Style-ESLint-4B32C3?style=flat-square&logo=eslint)](https://eslint.org/)
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

## ✦ Platform Modules

<div align="center">

|  | Module | Capability |
|:---:|---|---|
| 📊 | **Executive Dashboard** | KPI aggregates, active onboarding syncer, live stage progress |
| ⚡ | **Onboarding Engine** | Gemini AI suggestions, task dependencies, email gateway, stakeholder reassigner |
| 💸 | **Payroll Analytics** | Revenue slider, dual chart panes, execution ledger records |
| 📅 | **Attendance Portal** | Clock-in register, holiday overrides, roster export |

</div>

<br/>

---

## ✦ Features

<br/>

### 📊 Executive Dashboard & Operations Syncer

The central command view gives leadership an instant pulse on organizational health.

- **Operational Health KPIs** — Real-time aggregate counts for total active hires, monthly tax outlays, and personnel ratios, rendered as high-contrast status cards
- **Active Onboardings Syncer** — A live widget that reads candidate state and dynamically categorizes every open onboarding pipeline into four chronological stages:
  - `HR Pending` → `IT Processing` → `Manager Sync Pending` → `Fully Certified`
- **Adaptive Progress Indicators** — Per-candidate progress bars that visualize stage distribution across all active operational workflows at a glance

<br/>

---

### ⚡ Intelligent Onboarding State Machine

> *The most technically sophisticated module in the platform — a production-grade HR workflow engine.*

<br/>

#### 🤖 Generative AI Assignment Suggester *(Gemini 3.5 Flash)*

A secure backend integration powered by Google's Gemini 3.5 Flash model that analyzes each candidate in context and produces intelligent recommendations:

- Reads the candidate's role, team skill matrix, and current live checklist workload
- Recommends optimal department routing — **IT → HR → Manager** — based on bottleneck analysis
- Calculates precise **completion-hour estimates** per candidate
- Returns descriptive, actionable reasoning rendered in an interactive inline card panel
- All Gemini queries are executed **server-side** — the API key is never exposed to the client bundle

<br/>

#### ⚙️ Hierarchical Task Dependency Engine

A robust rule-based workflow system that enforces correct task sequencing across the entire onboarding pipeline:

- Tasks are gated by completion of their upstream dependencies
- Example: OKTA software account provisioning `(i2)` remains **locked with visual padlock indicators** until HR form verification `(h1)` is fully certified
- Attempts to bypass dependencies throw **real-time validation alerts**
- Visual state transitions animate smoothly between locked, in-progress, and complete states

<br/>

#### 📬 Automated Handbook Welcome Email Gateway

A fully integrated Email Dispatch Center built directly into the onboarding flow:

- Features an **inline template builder** for customizing onboarding handbook content per candidate
- Dispatch is gated: triggered only once all HR and IT checklist objectives are completed
- Simulates enterprise mail dispatchers with real-time mock delivery confirmation
- Automatically populates handbook bylaws and stores **date stamps + delivery success tokens** per candidate

<br/>

#### 🔄 Inline Dropdown Stakeholder Reassigner

- Visual inline department dropdown controls on every ledger task row
- Instantly transfer any task between **HR**, **IT**, or **Manager** departments
- Updates propagate with **live database sync** and instant status notifications

<br/>

---

### 💸 Dynamic Payroll Analytics & Forecaster

A fully interactive financial simulation engine for modeling compensation at enterprise scale.

#### Interactive Revenue Modulator
- A **live range slider** dynamically adjusts performance-based salary multipliers from `0.50×` to `2.00×` baseline allocations
- All charts, totals, and deduction calculations update in **real-time** as the slider moves

#### Dual Visualization Panes

| Pane | Chart Type | What It Shows |
|------|------|-------------|
| **Salary & Bonus Band Analysis** | Dual-color Responsive Bar Chart | Dynamically scaled totals reflecting current multiplier settings per department |
| **Gross Tax-Deduction Slice** | Interactive Donut Pie Chart | Take-home volume, Federal withholdings, and health premium breakdown |

#### Execution Ledger Records
- Full payroll run history across thousands of registered employees
- Simulates complete **payroll calculation pipelines** with live timestamp appending on each run
- Persistent ledger entries provide an auditable trail of all simulation events

<br/>

---

### 📅 Attendance Compliance & Holiday Override System

A smart attendance engine that handles real-world compliance edge cases automatically.

#### Direct Network Clock-In Register
- One-click clock-in triggers that **automatically capture browser-local timestamps**
- Logs precise office gateway location identifiers alongside each entry
- Updates roster grids in real-time with zero page reloads

#### Adaptive Absence Bypass Scheduler
- Integrates a **corporate holiday calendar** — federal holds and custom company shutdowns
- Selecting a recognized holiday automatically:
  - Disables daily absence flags for the entire roster
  - Overrides VPN security alerts for that period
  - Applies **double-pay compensation rules** directly into synchronization registers

#### Roster Log Table Excel Exporter
- Fully formatted attendance roster tables with complete log metrics
- **One-click export** to structured spreadsheet format via rapid export endpoints

<br/>

---

## ✦ Technology Stack

### Frontend

| Technology | Version | Role |
|---|---|---|
| **React** | 18 | SPA architecture with concurrent rendering |
| **Vite** | Latest | Ultra-fast HMR and optimized static builds |
| **TypeScript** | Strict | Zero-warning schemas for candidates, payroll, onboarding, and holidays |
| **Tailwind CSS** | v3 | Custom dark-ambient design system — off-blacks, high-contrast typography, micro-interactions |
| **Framer Motion** | Latest | Physical transitions, fading views, and custom layout animations |
| **Recharts** | Latest | Responsive SVG charting for salary bands, deduction pies, and attendance trends |
| **Lucide React** | Latest | Consistent modern SVG icon system |

### Backend

| Technology | Role |
|---|---|
| **Node.js + Express** | Standalone API server for data aggregation, localized APIs, and proxy interfaces |
| **Google GenAI SDK** | `@google/genai` for secure server-side Gemini 3.5 Flash query execution |
| **esbuild** | Compiles TypeScript backend into a unified `dist/server.cjs` production artifact |
| **Vite Dev Middleware** | Custom staging router for instant development script proxying |

<br/>

---

## ✦ Architecture

```
nexushr/
│
├── 📁 src/
│   ├── 📁 components/          # Reusable UI component library
│   ├── 📁 pages/
│   │   ├── Dashboard.tsx       # Executive KPI view & live onboarding syncer
│   │   ├── Onboarding.tsx      # State machine + AI suggester + email gateway + reassigner
│   │   ├── Payroll.tsx         # Revenue slider + dual chart panes + execution ledger
│   │   └── Attendance.tsx      # Clock-in register + holiday overrides + roster export
│   ├── 📁 types/               # Strict TypeScript schemas (candidates, payroll, holidays...)
│   └── 📁 utils/               # Data aggregation and helper utilities
│
├── 📁 server/
│   ├── server.ts               # Express API + Gemini proxy + data routes
│   └── dist/
│       └── server.cjs          # Compiled production backend (esbuild output)
│
├── 📁 public/                  # Static assets
├── vite.config.ts              # Vite + dev middleware configuration
├── tailwind.config.ts          # Custom dark design tokens
├── tsconfig.json               # Strict TypeScript compiler config
└── .env.example                # Environment variable template
```

<br/>

---

## ✦ Getting Started

### Prerequisites

- **Node.js** `v18+`
- **npm** `v9+` or **yarn**
- A valid **Google Gemini API Key** — obtain from [Google AI Studio](https://aistudio.google.com/)

<br/>

### Installation

**1. Clone the repository**
```bash
git clone https://github.com/your-username/nexushr.git
cd nexushr
```

**2. Install dependencies**
```bash
npm install
```

**3. Configure environment variables**
```bash
cp .env.example .env
```

Open `.env` and add your API key:
```env
GEMINI_API_KEY=your_google_gemini_api_key_here
PORT=3001
NODE_ENV=development
```

> ⚠️ **Security:** The API key is consumed exclusively by the Express server. It is never bundled into the client — safe secrets policy is enforced by design.

<br/>

### Running in Development

```bash
npm run dev
```

Portal available at → `http://localhost:5173`

<br/>

### Production Build

```bash
# Build the frontend
npm run build

# Compile the backend to dist/server.cjs
npm run build:server

# Start production server
npm start
```

<br/>

### Quality Checks

```bash
# TypeScript — must return zero warnings
npx tsc --noEmit

# Linter
npm run lint
```

<br/>

---

## ✦ Environment Variables

| Variable | Required | Default | Description |
|---|---|---|---|
| `GEMINI_API_KEY` | ✅ Yes | — | Google Gemini API key for AI assignment suggestions |
| `PORT` | Optional | `3001` | Express server port |
| `NODE_ENV` | Optional | `development` | Runtime environment flag |

<br/>

---

## ✦ Deep Dives

<details>
<summary><strong>🤖 AI Assignment Engine — How It Works</strong></summary>

<br/>

When a user triggers a suggestion for a candidate:

1. The frontend sends `POST /api/suggest` with the candidate's role, team, and current checklist state
2. The Express server constructs a structured prompt and calls Gemini 3.5 Flash via `@google/genai`
3. Gemini analyzes workload distribution, role requirements, and pipeline bottlenecks
4. The server returns a structured recommendation:
   - Optimal department routing (IT / HR / Manager)
   - Estimated completion hours
   - Natural language reasoning explaining the recommendation
5. The frontend renders this inside an animated interactive card panel

The API key never leaves the server — it is impossible for a client bundle inspector to extract it.

</details>

<details>
<summary><strong>⚙️ Task Dependency System — Implementation Logic</strong></summary>

<br/>

Task dependencies are enforced at the data model level with visual enforcement in the UI:

- Every checklist task carries a `dependencies: string[]` array listing prerequisite task IDs
- The task renderer checks whether all dependencies are in `status: 'complete'` before rendering the task as interactive
- Blocked tasks render with a padlock icon and muted visual treatment
- Clicking a locked task fires a validation alert explaining which prerequisite must be completed first
- Dependency resolution is reactive — completing a prerequisite immediately unlocks its dependents across the live UI

</details>

<details>
<summary><strong>💸 Payroll Simulation Engine — Calculation Logic</strong></summary>

<br/>

The payroll forecaster operates on a parameterized compensation model:

- Base salary data is seeded across employee records with role-based bands
- The performance multiplier slider (`0.50×` → `2.00×`) scales the bonus allocation component
- Tax deductions are calculated using IRS-approximated federal withholding brackets
- Health premium deductions are applied as fixed percentage allocations
- All computed values feed in real-time into the bar chart, donut chart, and the timestamped ledger

</details>

<details>
<summary><strong>📅 Holiday Compliance Engine — Override Rules</strong></summary>

<br/>

The holiday override system maintains a structured calendar of federal holidays and custom company shutdowns. When a date is flagged as a holiday:

- Absence flags for all employees on that date are automatically suppressed
- VPN security alerts that would normally fire for off-site access are bypassed for that period
- Double-pay multipliers are applied to any logged hours and propagated into payroll sync registers
- The roster table visually marks overridden dates with distinct styling to maintain full auditability

</details>

<br/>

---

## ✦ Quality Standards

| Standard | Status | Details |
|---|---|---|
| TypeScript Strict Mode | ✅ Zero warnings | `tsc --noEmit` passes cleanly across the entire codebase |
| ESLint Compliance | ✅ Clean | All strict linting rules satisfied |
| Secret Key Safety | ✅ Server-side only | `GEMINI_API_KEY` never reaches the client bundle |
| Production Build | ✅ Unified binary | esbuild compiles to `dist/server.cjs` — no relative path exceptions |
| Type Coverage | ✅ Full | Strict schemas for all domain entities — candidates, onboarding, payroll, holidays |
| Component Modularity | ✅ Complete | All UI broken into reusable, independently testable components |

<br/>

---

## ✦ Roadmap

- [ ] Multi-tenancy support — isolated workspaces per organization
- [ ] Role-based access control (RBAC) — HR Admin / Manager / Employee permission tiers
- [ ] Real database integration — PostgreSQL + Prisma persistence layer
- [ ] Email gateway live mode — SMTP / SendGrid integration for actual handbook delivery
- [ ] Mobile-responsive redesign — optimized layouts for tablet and mobile viewports
- [ ] Audit log export — compliance-ready audit trails in PDF and CSV
- [ ] SSO / OAuth integration — OKTA, Google Workspace, Microsoft Entra support
- [ ] Gemini streaming responses — stream AI suggestions token-by-token for UX fluidity

<br/>

---

## ✦ Contributing

Contributions are welcome. To get started:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Commit using conventional commits: `git commit -m 'feat: add your feature'`
4. Push to your branch: `git push origin feature/your-feature-name`
5. Open a Pull Request against `main`

Please ensure `tsc --noEmit` and `npm run lint` pass before submitting.

<br/>

---

## ✦ License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for full details.

<br/>

---

<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:24243e,50:302b63,100:0f0c29&height=120&section=footer" width="100%"/>

<br/>

**Designed & Developed with 💜 by [Darshan Paapani](https://github.com/darshan-paapani)**

*If NexusHR helped you, consider giving it a ⭐ — it helps others discover it.*

<br/>

</div>
