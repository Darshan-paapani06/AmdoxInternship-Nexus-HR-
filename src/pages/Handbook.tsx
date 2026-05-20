import React, { useState, useMemo } from 'react';
import { 
  FileText, 
  Search, 
  CheckCircle, 
  BookOpen, 
  ShieldAlert, 
  Heart, 
  Award, 
  HelpCircle, 
  Bookmark, 
  BookmarkCheck, 
  Sparkles, 
  MessageSquare, 
  ArrowRight, 
  Printer, 
  Scale, 
  Check,
  AlertCircle
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface HandbookSection {
  id: string;
  category: 'welcome' | 'policies' | 'conduct' | 'benefits' | 'performance';
  categoryLabel: string;
  title: string;
  summary: string;
  content: string[];
  lastUpdated: string;
}

const HANDBOOK_SECTIONS: HandbookSection[] = [
  {
    id: 'intro',
    category: 'welcome',
    categoryLabel: 'Welcome',
    title: '1. Welcome to NexusHR Enterprise',
    summary: 'An introduction to our mission, core values, and collaborative culture.',
    lastUpdated: 'Jan 2026',
    content: [
      'Welcome to NexusHR! We are thrilled to have you join our team of high-impact engineers, product managers, designers, and business operators. At NexusHR, we believe that workforce intelligence and compliance platforms can revolutionize how organizations thrive.',
      'Our Mission: To build the neural infrastructure that empowers enterprise workforces through transparency, human-centric design, and powerful artificial intelligence.',
      'Our Core Values:',
      '🚀 Extreme Ownership: We take pride and absolute responsibility for the quality of our systems, products, and workspaces.',
      '🧠 Intellect & Candor: We debate ideas fiercely but constructively. We value honest, logical feedback over polite hesitation.',
      '⚡ Ship with High Velocity: Perfection is an iteration, not a starting point. We build, test, and adapt at market speed.',
      '🧱 Human-First Architecture: While our software is complex and AI-driven, our focus always remains on actual human empowerment.',
      'This employee handbook serves as your compass and blueprint for operating successfully within NexusHR. Please review these policies carefully as they govern our day-to-day operations and represent our shared commitments.'
    ]
  },
  {
    id: 'policies-remote',
    category: 'policies',
    categoryLabel: 'Company Policies',
    title: '2.1 Work Anywhere & Coordinated Core Hours',
    summary: 'Guiding guidelines for our remote-first, distributed workforce operations.',
    lastUpdated: 'Feb 2026',
    content: [
      'NexusHR is a distributed-first company. We trust you to organize your schedules to optimize focus, productivity, and personal well-being.',
      'Core Operational Hours: To facilitate seamless cross-departmental alignment, synchronous meetings, and client response SLA coverage, we coordinate around core hours of 10:00 AM to 4:00 PM EST (7:00 AM to 1:00 PM PST). All full-time team members are expected to be reachable and highly responsive on primary workspace channels (Slack, Email) during this window.',
      'Workspace Reimbursement: Full-time employees receive a one-time $1,500 home-office equipment allowance to ensure an ergonomic, secure workspace, plus up to $150/month for high-speed fiber internet and cell plans.',
      'Secure Operations: Traveling and working from alternate public locations is welcome. However, you must always adhere strictly to our zero-trust secure access policies, always connect through company-approved VPN protocols, and ensure zero visual shoulder-surfing in public environments.'
    ]
  },
  {
    id: 'policies-eq',
    category: 'policies',
    categoryLabel: 'Company Policies',
    title: '2.2 Equal Opportunity & Harassment-Free Workplace',
    summary: 'Our unwavering commitment to diversity, equity, inclusion, and safety.',
    lastUpdated: 'Jan 2026',
    content: [
      'NexusHR is strictly committed to offering equal employment opportunities to all qualified persons. We make all placement, promotion, compensation, and career decisions solely based on merit, capability, performance, and business needs.',
      'Zero Tolerance Policy: We maintain an absolute zero-tolerance standard for any form of harassment, discrimination, or intimidation based on race, gender, religion, sexual orientation, disability, age, or nation of origin.',
      'Reporting Procedures: If you experience or witness behavior that violates this commitment, you are strongly encouraged to report it immediately. Reports can be submitted directly to Alexander Sterling (CHRO), via the NexusHR Compliance portal, or anonymously through our whistleblowing intake channel. Every report is fully investigated with maximum confidentiality, and retaliation of any form will result in immediate termination.'
    ]
  },
  {
    id: 'policies-it',
    category: 'policies',
    categoryLabel: 'Company Policies',
    title: '2.3 IT Security, Zero-Trust, & Data Privacy',
    summary: 'Security protocols required to protect customer telemetry and secure corporate accounts.',
    lastUpdated: 'Mar 2026',
    content: [
      'As an enterprise SaaS platform handling high-security workforce data, NexusHR maintains strict compliance with SOC 2 Type II, ISO 27001, and GDPR standards. Protecting consumer telemetry is our top priority.',
      'Device Policy: Full-time employees are provided a secure corporate-managed hardware package. Unauthorized personal devices (BYOD) must never be used to access production codebases, live customer data, or secure network boundaries.',
      'Password & MFA Controls: Multi-factor authentication (MFA) is mandatory across all cloud applications and network accounts. Passwords must comply with enterprise policies (minimum 16 characters, high entropy) and be strictly handled inside corporate password managers.',
      'Clean Desk and Account Locks: Lock your screen immediately when leaving your workspace. Never share credentials with any third parties or internal team members. Corporate devices should never be lent to family members or guests.'
    ]
  },
  {
    id: 'conduct-ethics',
    category: 'conduct',
    categoryLabel: 'Code of Conduct',
    title: '3.1 Ethical Standards & Intellectual Property',
    summary: 'Expectations for corporate ethics, confidentiality, and IP protection.',
    lastUpdated: 'Jan 2026',
    content: [
      'NexusHR team members are expected to hold themselves to the highest standards of professional ethics, respect, and compliance.',
      'Protecting Proprietary Information: Any intellectual property, proprietary software code, strategic product roadmaps, and client analytics developed or accessed during your tenure with NexusHR remain the exclusive property of the company. These must be kept strictly confidential and never discussed externally or uploaded to unsecured public AI engines (e.g., public LLM models without enterprise API boundaries).',
      'Conflicts of Interest: Avoid any active external professional endeavors or personal investments that interfere with your capacity to carry out your responsibilities at NexusHR, or that directly compete with our product offerings. Side projects that are non-competitive, open-source contributions, and educational endeavors are permitted, provided they do not utilize company assets and are approved via our standard side-project registry.'
    ]
  },
  {
    id: 'conduct-social',
    category: 'conduct',
    categoryLabel: 'Code of Conduct',
    title: '3.2 Public Communications & Social Media Policies',
    summary: 'Guidelines for speaking on behalf of the company and publishing content.',
    lastUpdated: 'Dec 2025',
    content: [
      'At NexusHR, we believe in supporting individual expression while ensuring our collective corporate reputation remain secure, accurate, and professional.',
      'Representing the Brand: Only authorized spokespeople may issue formal public statements, press releases, or official commentary about NexusHR products, finances, or customer relationships. If an external journalist or analyst contacts you on social channels (LinkedIn, X), state that you are not a spokesperson and route the query to pr@nexushr.com.',
      'Personal Social Media: We encourage you to share your triumphs, open-source projects, and thought leadership online! However, when identifying yourself as a NexusHR employee, always make it clear that your views and opinions are strictly your own. Avoid sharing screenshots of internal UI, analytics consoles, secure Slack messages, or confidential code snippets.'
    ]
  },
  {
    id: 'benefits-wellness',
    category: 'benefits',
    categoryLabel: 'Employee Benefits',
    title: '4.1 Premium Healthcare, Dental, & Wellness Systems',
    summary: 'Comprehensive healthcare support to nurture physical, clinical, and psychological well-being.',
    lastUpdated: 'Mar 2026',
    content: [
      'Your physical and mental health are of paramount importance. NexusHR provides comprehensive, highly subsidized benefits programs starting on your absolute first day of employment.',
      'Medical, Dental, and Vision: We cover 100% of insurance premiums for the primary employee across a selection of top-tier HSA and PPO plans, and provide a 75% premium subsidy for spouses and dependents.',
      'Health Savings Account (HSA): Fully integrated HSA options with an annual company-sponsored contribution of up to $1,500.',
      'Mental Health Support: Employees receive unlimited free credits for certified platform-guided therapy via our designated mental wellness partner app, alongside full coverage for up to 6 clinical sessions annually.',
      'Fitness Subsidies: Receive up to $80/month toward physical gyms, yoga studios, health trackers, or athletic training applications.'
    ]
  },
  {
    id: 'benefits-pto',
    category: 'benefits',
    categoryLabel: 'Employee Benefits',
    title: '4.2 Paid Time Off, Holidays, & Parental Leave',
    summary: 'Our framework for flexible recharge time and family support.',
    lastUpdated: 'Feb 2026',
    content: [
      'Unlimited Paid Time Off (PTO): NexusHR operates on a flexible, unlimited PTO model because we believe our team should be measured by impact, execution, and outcomes, not by hours logged. To prevent cognitive fatigue and ensure true recovery, we require a mandatory minimum of 15 fully disconnected PTO days per year.',
      'Booking Guidelines: Standard leaves must be requested and approved in writing via the NexusHR PTO portal at least 2 weeks in advance to allow projects and roadmap dependencies to adjust seamlessly.',
      'Paid Parental Leave: Full-time employees are eligible for up to 16 weeks of 100% company-paid parental leave within 12 months of welcoming a new child via birth, adoption, or foster placement.',
      'Sabbatical Program: For every 4 consecutive years of dedicated service to NexusHR, you are eligible for 4 consecutive weeks of paid sabbatical to pursue personal research, travel, or deep-rest cycles.'
    ]
  },
  {
    id: 'benefits-retirement',
    category: 'benefits',
    categoryLabel: 'Employee Benefits',
    title: '4.3 401(k) Retirement & Financial Compensation Plans',
    summary: 'Wealth building plans and wealth matching frameworks.',
    lastUpdated: 'Jan 2026',
    content: [
      'Retirement Savings Matching: NexusHR offers a premium tax-advantaged 401(k) savings program. We match $1.00 for every dollar you contribute, up to 4% of your total base salary. All matching contributions vest immediately on day one.',
      'Equity Ownership Grants: Full-time hires receive starting equity grants in the form of Stock Options or RSUs, governed by our standard 4-year vesting schedule with a standard 1-year cliff. Vesting status can be audited in your equity terminal.',
      'Discretionary Performance Bonuses: Performance bonuses are evaluated, budgeted, and distributed on an annual basis in alignment with corporate accomplishments, individual OKRs, and system quality benchmarks.'
    ]
  },
  {
    id: 'performance-eval',
    category: 'performance',
    categoryLabel: 'Performance Guidelines',
    title: '5.1 Evaluation Cycles, Milestones, & OKRs',
    summary: 'How we coordinate, feedback, and evaluate excellence at scale.',
    lastUpdated: 'Feb 2026',
    content: [
      'NexusHR operates on a continuous feedback framework. We believe in performance evaluations that inspire professional growth, clarify goals, and reward outstanding execution.',
      'Objectives & Key Results (OKRs): All functional and technical teams align their weekly roadmaps to Quarterly OKRs. OKRs are set transparently, logged in the NexusHR Performance center, and continuously reviewed during bi-weekly syncs.',
      'The Annual Performance Review: Held each November, the review includes a self-evaluation, anonymous 360-degree peer feedback, upward manager feedback, and a comprehensive leadership synthesis. Factors examined include OKR completion, technical execution quality, adherence to core values, and overall influence on corporate culture.',
      'Performance Metrics & Grading: Employees are graded periodically on a 5-point alignment scale: (1) Does Not Meet Standards, (2) Improving Progress, (3) Exceeds Expectation, (4) Mastery level execution, (5) Exceptional Industry Leader.'
    ]
  },
  {
    id: 'performance-pip',
    category: 'performance',
    categoryLabel: 'Performance Guidelines',
    title: '5.2 Corrective Frameworks & PIP Guidelines',
    summary: 'Our structured plan for restoring performance and addressing technical gaps.',
    lastUpdated: 'Jan 2026',
    content: [
      'When an employee is consistently struggling to meet OKR levels, project obligations, or collaborative standards, we believe in proactive, structured corrections to help them succeed.',
      'Initial Discovery: The manager and employee will first hold informal focus syncs to identify root difficulties, clear technical roadblocks, adjust workloads, or assign temporary mentors.',
      'Performance Improvement Plan (PIP): If performance does not recover within a 30-day monitoring window, a formal PIP may be initiated in alignment with HR Business Partners. A PIP is a transparent, highly documented, 45-day framework detailing precise milestones, deliverables, weekly reviews, and clear criteria for success.',
      'Outcome Conditions: Achieving the specified milestones completes the PIP successfully and restores the employee to standard standing. Failing to satisfy the clear criteria by the 45-day deadline will lead to immediate exit separation.'
    ]
  }
];

const PRESET_MOCK_QUESTIONS = [
  { text: "What are the core hours and remote check-ins?", id: 1 },
  { text: "How much is the home office allowance?", id: 2 },
  { text: "What is the policy on unlimited PTO?", id: 3 },
  { text: "What happens if a PIP fails?", id: 4 },
  { text: "What is the 401(k) company match?", id: 5 }
];

function levenshteinDistance(a: string, b: string): number {
  const tmp: number[][] = [];
  for (let i = 0; i <= a.length; i++) {
    tmp[i] = [i];
  }
  for (let j = 0; j <= b.length; j++) {
    tmp[0][j] = j;
  }
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      tmp[i][j] = Math.min(
        tmp[i - 1][j] + 1,
        tmp[i][j - 1] + 1,
        tmp[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)
      );
    }
  }
  return tmp[a.length][b.length];
}

function isFuzzyMatch(query: string, text: string): boolean {
  if (!query) return true;
  const cleanQuery = query.toLowerCase().trim();
  const cleanText = text.toLowerCase();
  
  if (cleanText.includes(cleanQuery)) return true;

  const queryTerms = cleanQuery.split(/\s+/).filter(t => t.length >= 2);
  if (queryTerms.length === 0) return false;

  const textWords = cleanText.split(/[^a-z0-9]/).filter(w => w.length >= 2);

  return queryTerms.every(term => {
    if (textWords.some(word => word.includes(term) || term.includes(word))) {
      return true;
    }

    return textWords.some(word => {
      if (Math.abs(word.length - term.length) > 2) return false;
      const dist = levenshteinDistance(term, word);
      const maxAllowed = term.length <= 5 ? 1 : 2;
      return dist <= maxAllowed;
    });
  });
}

export default function Handbook() {
  const [activeTab, setActiveTab] = useState<'all' | 'welcome' | 'policies' | 'conduct' | 'benefits' | 'performance'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [bookmarkedSections, setBookmarkedSections] = useState<string[]>([]);
  const [highlightedSectionId, setHighlightedSectionId] = useState<string | null>(null);
  
  // AI Helper states
  const [aiInput, setAiInput] = useState('');
  const [aiAnswers, setAiAnswers] = useState<{ query: string; answer: string; loading?: boolean }[]>([]);
  
  // Compliance Sign-off states
  const [signName, setSignName] = useState('');
  const [signCheck, setSignCheck] = useState(false);
  const [complianceSignature, setComplianceSignature] = useState<{ name: string; date: string } | null>(() => {
    const saved = localStorage.getItem('nexus_compliance_signed');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return null;
      }
    }
    return null;
  });

  // Printing/PDF Exporting mock action
  const handlePrint = () => {
    window.print();
    toast.success("Preparing Document", {
      description: "Compiling NexusHR handbook text layout for corporate export."
    });
  };

  // Bookmark toggler
  const toggleBookmark = (id: string) => {
    setBookmarkedSections(prev => {
      const exists = prev.includes(id);
      if (exists) {
        toast.info("Bookmark Removed", { description: "Section has been removed from your saved items." });
        return prev.filter(item => item !== id);
      } else {
        toast.success("Bookmark Saved", { description: "Section added to your quick reference bookmarks." });
        return [...prev, id];
      }
    });
  };

  // Filter sections by search and tab with fuzzy matching & score calculation
  const scoredFilteredSections = useMemo(() => {
    if (!searchQuery.trim()) {
      return HANDBOOK_SECTIONS.filter(section => {
        return activeTab === 'all' || section.category === activeTab;
      });
    }

    const query = searchQuery.toLowerCase().trim();

    const scored = HANDBOOK_SECTIONS.map(section => {
      let score = 0;
      let matches = false;

      const matchesTab = activeTab === 'all' || section.category === activeTab;
      if (!matchesTab) {
        return { section, score: 0, matches: false };
      }

      const titleLower = section.title.toLowerCase();
      if (titleLower.includes(query)) {
        score += 150;
        matches = true;
      } else if (isFuzzyMatch(query, titleLower)) {
        score += 80;
        matches = true;
      }

      const summaryLower = section.summary.toLowerCase();
      if (summaryLower.includes(query)) {
        score += 60;
        matches = true;
      } else if (isFuzzyMatch(query, summaryLower)) {
        score += 30;
        matches = true;
      }

      section.content.forEach(paragraph => {
        const paraLower = paragraph.toLowerCase();
        if (paraLower.includes(query)) {
          score += 20;
          matches = true;
        } else if (isFuzzyMatch(query, paraLower)) {
          score += 10;
          matches = true;
        }
      });

      return { section, score, matches };
    });

    return scored
      .filter(item => item.matches)
      .sort((a, b) => b.score - a.score)
      .map(item => item.section);
  }, [activeTab, searchQuery]);

  const handleJumpToSection = (id: string, title: string) => {
    const section = HANDBOOK_SECTIONS.find(s => s.id === id);
    if (section && activeTab !== 'all' && activeTab !== section.category) {
      setActiveTab('all');
    }

    setTimeout(() => {
      const element = document.getElementById(`section-${id}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setHighlightedSectionId(id);
        
        toast.success("Jumped to Clause", {
          description: `Navigated to ${title.substring(0, 35)}...`,
        });

        setTimeout(() => {
          setHighlightedSectionId(null);
        }, 2500);
      } else {
        toast.error("Section not visible", {
          description: "Could not locate the clause on the page layout."
        });
      }
    }, 120);
  };

  // Clean form clear
  const handleSignatureSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!signName.trim()) {
      toast.error("Invalid Signature Name", { description: "Please enter your full legal corporate name." });
      return;
    }
    if (!signCheck) {
      toast.error("Compliance Consent Required", { description: "You must check the agreement box before signing." });
      return;
    }

    const todayStr = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
    const info = { name: signName, date: todayStr };
    localStorage.setItem('nexus_compliance_signed', JSON.stringify(info));
    setComplianceSignature(info);
    toast.success("Handbook Compliance Acknowledged", {
      description: `Thank you, ${signName}. Your formal agreement has been officially stamped and saved.`
    });
  };

  const handleClearSignature = () => {
    localStorage.removeItem('nexus_compliance_signed');
    setComplianceSignature(null);
    setSignName('');
    setSignCheck(false);
    toast.info("Compliance Acknowledgment Reset", {
      description: "Corporate sign-off stamp has been removed from this system."
    });
  };

  // Simulated AI query answering engine
  const askAIHelper = (question: string) => {
    if (!question.trim()) return;
    const cleanQ = question.trim();
    setAiInput('');
    
    // Add pending state
    const newIdx = aiAnswers.length;
    setAiAnswers(prev => [...prev, { query: cleanQ, answer: '', loading: true }]);

    setTimeout(() => {
      let answerText = "I apologize, but I couldn't locate specific information addressing that specific query in the NexusHR 2026 guidelines. Please consult Alexander Sterling, CHRO, for direct assistance.";
      const qLow = cleanQ.toLowerCase();

      if (qLow.includes('office') || qLow.includes('allowance') || qLow.includes('reimburse') || qLow.includes('$1,500')) {
        answerText = "🏡 Remote Office Allowance: Fast-growth full-time hires at NexusHR receive a starting $1,500 ergonomic equipment benefit, alongside deep $150 monthly telecom and internet coverage.";
      } else if (qLow.includes('hour') || qLow.includes('time') || qLow.includes('timezone') || qLow.includes('eastern')) {
        answerText = "⏰ Coordinated Hours: NexusHR works synchronously on CORE operational window from 10:00 AM to 4:00 PM EST (7:00 AM - 1:00 PM PST) to support rapid inter-team cycles and meetings.";
      } else if (qLow.includes('pto') || qLow.includes('leave') || qLow.includes('vacation')) {
        answerText = "🌴 Unlimited PTO & Parental Support: We provide Unlimited PTO, mandating a strict minimum of 15 fully logged recovery days off per year. Parents welcoming new family members receive 16 weeks of 100% paid leave.";
      } else if (qLow.includes('pip') || qLow.includes('monitoring') || qLow.includes('performance') || qLow.includes('corrective')) {
        answerText = "📈 Corrective Support & PIPs: Consistently failing standards starts with informal team mentoring. If unresolved, HR schedules a 45-day milestone-based Performance Improvement Plan (PIP). Meeting targets resets status; failing targets results in separation.";
      } else if (qLow.includes('401') || qLow.includes('savings') || qLow.includes('match') || qLow.includes('retirement')) {
        answerText = "💰 401(k) Financial Matching: We match $1.00 for every matching dollar of your contributions, maxed up to 4% of base salaries. All retirement matching funds vest at 100% on day one.";
      } else if (qLow.includes('harass') || qLow.includes('discrim') || qLow.includes('equal') || qLow.includes('respect')) {
        answerText = "🛡️ Harassment & Diversity: NexusHR operates an absolute zero-tolerance standard for any form of harassment, discrimination, or retribution. Safe escalations route directly through Alexander Sterling (CHRO).";
      } else if (qLow.includes('security') || qLow.includes('device') || qLow.includes('pass') || qLow.includes('vpn')) {
        answerText = "🔒 SOC2 Zero-Trust Security: We mandate corporate devices for access (no BYOD), enforce 16-character high-entropy master keys on integrated managers, and require MFA across all work surfaces.";
      }

      setAiAnswers(prev => prev.map((item, idx) => 
        idx === newIdx ? { query: cleanQ, answer: answerText, loading: false } : item
      ));
    }, 850);
  };

  return (
    <div className="space-y-6">
      {/* Header Title Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/20">
            <BookOpen className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Enterprise Employee Handbook</h1>
            <p className="text-muted-foreground mt-1">Official compliance handbook, corporate charter, and benefits directory for NexusHR.</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handlePrint} className="border-[#222] bg-[#111] text-xs font-semibold hover:bg-[#1a1a1a]">
            <Printer className="mr-2 h-4 w-4" /> Export Draft
          </Button>
          <Badge className="bg-primary/10 text-primary border-primary/30 font-mono text-[10px] uppercase font-bold self-center h-fit py-1 px-2">
            Ver. 2026.1 • STABLE
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Left Column Navigation & Quick widgets */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="bg-[#0d0d0d] border border-[#1a1a1a] p-4 rounded-xl space-y-4">
            <div className="text-[10px] font-bold uppercase tracking-widest text-[#666]">Handbook Sections</div>
            <div className="flex flex-col gap-1">
              {[
                { id: 'all', label: 'All Chapters', icon: BookOpen },
                { id: 'welcome', label: '1. Welcome', icon: Award },
                { id: 'policies', label: '2. Policies', icon: ShieldAlert },
                { id: 'conduct', label: '3. Conduct', icon: Scale },
                { id: 'benefits', label: '4. Benefits', icon: Heart },
                { id: 'performance', label: '5. Reviews', icon: FileText },
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as any)}
                  className={cn(
                    "flex items-center gap-2.5 w-full text-left px-3 py-2.5 rounded-lg text-xs font-medium transition-all",
                    activeTab === item.id 
                      ? "bg-primary text-black font-semibold shadow-md" 
                      : "text-muted-foreground hover:bg-white/[0.03] hover:text-white"
                  )}
                >
                  <item.icon className="h-4 w-4 shrink-0" />
                  <span>{item.label}</span>
                  {activeTab === item.id && (
                    <span className="ml-auto w-1.5 h-1.5 rounded-full bg-black" />
                  )}
                </button>
              ))}
            </div>
          </Card>

          {/* Search bar inside navigation side */}
          <Card className="bg-[#0d0d0d] border border-[#1a1a1a] p-4 rounded-xl space-y-3">
            <div className="flex items-center justify-between">
              <div className="text-[10px] font-bold uppercase tracking-widest text-[#666]">Clause Search</div>
              {searchQuery && (
                <span className="text-[8px] bg-primary/10 text-primary border border-primary/20 rounded px-1.5 py-0.5 font-mono">
                  TYPO TOLERANT
                </span>
              )}
            </div>
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
              <Input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search rule keywords (e.g., bnefits)..."
                className="pl-8 bg-[#141414] border-[#1e1e1e] text-xs h-9 focus-visible:ring-primary/40 text-white rounded-lg"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] text-muted-foreground hover:text-white font-mono bg-[#222] px-1 rounded"
                >
                  CLR
                </button>
              )}
            </div>

            {/* Jump to section suggestion dropdown panel */}
            {searchQuery && (
              <div className="pt-2.5 border-t border-[#1a1a1a] space-y-1.5 animate-in fade-in duration-200">
                <div className="text-[9px] font-mono font-bold uppercase text-primary tracking-wider flex items-center justify-between">
                  <span>⚡ Quick Jump Suggestions</span>
                  <span className="text-[8px] text-muted-foreground uppercase">Click to jump</span>
                </div>
                <div className="space-y-1 max-h-48 overflow-y-auto pr-0.5 scrollbar-thin scrollbar-thumb-gray-800">
                  {scoredFilteredSections.slice(0, 5).map(section => (
                    <button
                      key={section.id}
                      onClick={() => handleJumpToSection(section.id, section.title)}
                      className="w-full text-left p-2 rounded bg-white/[0.01] hover:bg-white/[0.03] border border-[#1a1a1a] hover:border-primary/30 transition-all flex items-center justify-between group h-8"
                    >
                      <span className="truncate pr-2 text-[11px] font-medium text-slate-300 group-hover:text-primary transition-colors">
                        {section.title}
                      </span>
                      <span className="text-[9px] text-[#555] group-hover:text-primary transition-colors shrink-0 uppercase font-mono font-bold flex items-center gap-0.5">
                        Jump ➔
                      </span>
                    </button>
                  ))}
                  {scoredFilteredSections.length === 0 && (
                    <div className="text-[10px] text-muted-foreground py-1.5 italic text-center">
                      No matching clauses.
                    </div>
                  )}
                </div>
              </div>
            )}

            <p className="text-[10px] text-muted-foreground leading-relaxed">
              Dynamically scans and scores entire legal content blocks across chapters, offering fuzzy search tolerance for spelling mistakes.
            </p>
          </Card>

          {/* Bookmarks overview */}
          <Card className="bg-[#0d0d0d] border border-[#1a1a1a] p-4 rounded-xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#666]">Bookmarked ({bookmarkedSections.length})</span>
              <Bookmark className="h-3.5 w-3.5 text-muted-foreground" />
            </div>
            {bookmarkedSections.length === 0 ? (
              <p className="text-[10px] text-muted-foreground leading-relaxed">
                Click the bookmark pin in any section header to save core clauses to this list for rapid recall.
              </p>
            ) : (
              <div className="space-y-2">
                {bookmarkedSections.map(pinnedId => {
                  const sec = HANDBOOK_SECTIONS.find(s => s.id === pinnedId);
                  if (!sec) return null;
                  return (
                    <button
                      key={pinnedId}
                      onClick={() => handleJumpToSection(pinnedId, sec.title)}
                      className="w-full text-left p-2 rounded bg-white/[0.02] border border-[#1a1a1a] hover:border-primary/30 transition-colors group flex items-start gap-1.5"
                    >
                      <Check className="h-3 w-3 text-primary mt-0.5 shrink-0" />
                      <div className="overflow-hidden">
                        <div className="text-[11px] font-semibold text-white truncate group-hover:text-primary transition-colors">{sec.title}</div>
                        <span className="text-[9px] text-[#555] font-mono leading-none">{sec.categoryLabel}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </Card>
        </div>

        {/* Middle Columns Content Section */}
        <div className="lg:col-span-2 space-y-6">
          <div className="space-y-4">
            {scoredFilteredSections.length === 0 ? (
              <Card className="bg-[#0d0d0d] border border-[#1a1a1a] py-12 px-6 text-center rounded-xl">
                <ShieldAlert className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                <h3 className="text-sm font-bold text-white">No Matching Clauses Found</h3>
                <p className="text-xs text-muted-foreground mt-2 max-w-sm mx-auto">
                  We couldn't locate policies corresponding to "{searchQuery}". Try using broader terms like 'PTO', 'hours', or 'PIP'.
                </p>
                <Button size="sm" variant="outline" className="mt-4 text-xs" onClick={() => { setSearchQuery(''); setActiveTab('all'); }}>
                  Reset Filters
                </Button>
              </Card>
            ) : (
              scoredFilteredSections.map(section => (
                <Card 
                  key={section.id} 
                  id={`section-${section.id}`} 
                  className={cn(
                    "bg-[#0d0d0d] border rounded-xl transition-all duration-300 shadow-md scroll-mt-6",
                    highlightedSectionId === section.id 
                      ? "ring-2 ring-primary border-primary bg-primary/[0.01] shadow-lg shadow-primary/10 scale-[1.01]" 
                      : "border-border/80 hover:border-primary/20"
                  )}
                >
                  <CardHeader className="p-5 pb-3 border-b border-border/40 flex flex-row items-start justify-between gap-4">
                    <div>
                      <Badge className="bg-[#141414] hover:bg-[#202020] text-muted-foreground border border-[#222] text-[9px] uppercase tracking-widest font-mono font-bold mb-1.5">
                        {section.categoryLabel}
                      </Badge>
                      <CardTitle className="text-base font-bold text-white">{section.title}</CardTitle>
                      <CardDescription className="text-xs text-muted-foreground mt-1 font-medium">{section.summary}</CardDescription>
                    </div>
                    
                    <button 
                      onClick={() => toggleBookmark(section.id)}
                      className="p-1 px-1.5 border border-[#1e1e1e] bg-[#141414] rounded-lg text-muted-foreground hover:text-primary transition-colors hover:bg-white/[0.02]"
                    >
                      {bookmarkedSections.includes(section.id) ? (
                        <BookmarkCheck className="h-4 w-4 text-primary" />
                      ) : (
                        <Bookmark className="h-4 w-4" />
                      )}
                    </button>
                  </CardHeader>
                  <CardContent className="p-5 space-y-3.5 text-xs text-muted-foreground leading-relaxed font-medium">
                    {section.content.map((paragraph, idx) => {
                      const isHeading = paragraph.match(/^(Our Mission:|Our Core Values:|Core Operational Hours:|Zero Tolerance Policy:|Reporting Procedures:|Device Policy:|Password & MFA Controls:|Clean Desk and Account Locks:|Protecting Proprietary Information:|Conflicts of Interest:|Representing the Brand:|Personal Social Media:|Medical, Dental, and Vision:|Health Savings Account:|Mental Health Support:|Fitness Subsidies:|Unlimited Paid Time Off:|Booking Guidelines:|Paid Parental Leave:|Sabbatical Program:|Retirement Savings Matching:|Equity Ownership Grants:|Discretionary Performance Bonuses:|Objectives & Key Results:|The Annual Performance Review:|Performance Metrics & Grading:|Initial Discovery:|Performance Improvement Plan:|Outcome Conditions:)/);
                      return (
                        <p key={idx} className={cn(
                          isHeading ? "text-white font-bold text-xs pt-1.5" : "",
                          paragraph.startsWith('🚀') || paragraph.startsWith('🧠') || paragraph.startsWith('⚡') || paragraph.startsWith('🧱') ? "pl-4 bg-white/[0.01] p-2 rounded border-l border-primary/20" : ""
                        )}>
                          {paragraph}
                        </p>
                      );
                    })}
                    <div className="pt-2 text-[9px] font-mono text-muted-foreground flex items-center justify-between border-t border-white/[0.02] mt-3">
                      <span>STRICTLY ENTERPRISE PROPRIETARY CONFIDENTIAL</span>
                      <span>Last Updated: {section.lastUpdated}</span>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
          
          {/* Signoff compliance agreement block */}
          <Card className="bg-[#0d0d0d] border border-primary/20 rounded-xl overflow-hidden shadow-lg relative">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-primary to-blue-500" />
            <CardHeader className="p-5 pb-3">
              <div className="flex items-center gap-2 mb-1">
                <CheckCircle className="h-4 w-4 text-primary" />
                <span className="text-[10px] font-mono font-bold uppercase text-primary tracking-widest">Digital Stamp Authority</span>
              </div>
              <CardTitle className="text-base font-bold text-white">Digital Compliance Acknowledgment</CardTitle>
              <CardDescription className="text-xs text-muted-foreground leading-relaxed mt-1">
                All full-time personnel must formally review the company charter and execute a digital signature confirming understanding of SOC 2 data requirements, professional code levels, and PTO frameworks.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-5 pt-0 space-y-4">
              
              {complianceSignature ? (
                <div className="p-4 rounded-lg bg-emerald-500/5 border border-emerald-500/20 space-y-3.5">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wide">
                    <CheckCircle className="h-4 w-4" />
                    <span>Compliance Confirmed & Sealed</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-xs pt-1 border-t border-emerald-500/10">
                    <div>
                      <span className="text-[9px] uppercase tracking-wider text-muted-foreground block font-bold">Signatory Identity</span>
                      <strong className="text-white text-xs">{complianceSignature.name}</strong>
                    </div>
                    <div>
                      <span className="text-[9px] uppercase tracking-wider text-muted-foreground block font-bold">Timestamp Approved</span>
                      <strong className="text-white text-xs font-mono">{complianceSignature.date}</strong>
                    </div>
                  </div>
                  <div className="text-[10px] text-muted-foreground leading-relaxed italic bg-black/30 p-2.5 rounded border border-emerald-500/5">
                    "I attest that I have fully read and aligned with the NexusHR 2026 guidelines, compliance rules, security protocols, and corrective PIP steps."
                  </div>
                  <div className="flex justify-end pt-1">
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      onClick={handleClearSignature} 
                      className="text-red-400 hover:text-red-500 hover:bg-red-500/5 font-bold uppercase tracking-wider text-[10px] h-7 px-3"
                    >
                      Clear Signature
                    </Button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSignatureSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block">
                      Legal Full Name Statement
                    </label>
                    <Input
                      type="text"
                      value={signName}
                      onChange={(e) => setSignName(e.target.value)}
                      placeholder="e.g. Alexander Sterling"
                      className="bg-[#141414] border-[#222] focus-visible:ring-primary/40 h-10 text-xs text-white"
                      required
                    />
                  </div>
                  
                  <label className="flex items-start gap-3 p-3 rounded-lg bg-white/[0.01] border border-[#1a1a1a] hover:bg-white/[0.02] cursor-pointer selection:bg-transparent">
                    <input
                      type="checkbox"
                      checked={signCheck}
                      onChange={(e) => setSignCheck(e.target.checked)}
                      className="mt-0.5 rounded border-gray-800 bg-black text-primary focus:ring-primary/40 focus:ring-offset-black scale-105"
                    />
                    <span className="text-[11px] leading-relaxed text-muted-foreground font-medium">
                      I have received, thoroughly inspected, and unconditionally declare alignment with the formal policy guides, remote zero-trust protocols, conduct standards, and performance rubrics set by NexusHR.
                    </span>
                  </label>

                  <Button 
                    type="submit" 
                    className="w-full bg-primary hover:bg-primary/95 text-black font-bold text-xs py-2.5 h-10 shadow-md shadow-primary/10 rounded-lg uppercase tracking-wider"
                  >
                    Confirm & File Handbook Compliance
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Column Simulated AI Helper Side Desk */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="bg-[#0d0d0d] border border-primary/20 rounded-xl relative overflow-hidden flex flex-col shadow-xl">
            {/* Ambient indicator */}
            <div className="absolute -right-12 -top-12 w-28 h-28 bg-primary/10 rounded-full blur-2xl pointer-events-none" />
            
            <CardHeader className="p-4 border-b border-border bg-[#0a0a0a]">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                  <Sparkles className="h-4 w-4" />
                </div>
                <div>
                  <CardTitle className="text-xs font-bold text-white flex items-center gap-1.5 uppercase tracking-wide">
                    Nexus Policy Companion
                    <Badge className="bg-primary/20 text-primary text-[8px] font-bold select-none py-0.5 px-1 font-mono border-none">INTELLIGENT</Badge>
                  </CardTitle>
                  <CardDescription className="text-[10px] text-muted-foreground mt-0.5">Real-time synthesized policy agent.</CardDescription>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="p-4 space-y-4 flex-1">
              <div className="space-y-3.5 max-h-[380px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-800 pr-1">
                <div className="bg-[#141414] border border-[#222] rounded-lg p-3 text-xs leading-relaxed text-slate-300">
                  <div className="flex items-center gap-1 text-[9px] font-mono uppercase font-bold text-primary mb-1">
                    <MessageSquare className="h-3 w-3" />
                     Policy Bot
                  </div>
                  Hello! Ask me any structural policy question regarding remote equipment, retirement savings, limits for PTO levels, or corrective processes. I will cross-reference the handbook instantly!
                </div>

                {/* Simulated conversations list */}
                {aiAnswers.map((chat, idx) => (
                  <div key={idx} className="space-y-2">
                    <div className="bg-white/[0.02] border border-[#222] rounded-lg p-2.5 text-xs text-muted-foreground text-right ml-4">
                      {chat.query}
                    </div>
                    <div className="bg-[#141414] border border-[#222] rounded-lg p-3 text-xs leading-relaxed text-slate-300 mr-4 font-normal">
                      <div className="flex items-center gap-1 text-[9px] font-mono uppercase font-bold text-primary mb-1">
                        <Sparkles className="h-3 w-3 text-primary animate-pulse" />
                        AI Agent Response
                      </div>
                      {chat.loading ? (
                        <div className="flex items-center gap-2 py-1 text-muted-foreground font-semibold">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce delay-75" />
                          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce delay-150" />
                          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce delay-300" />
                          <span className="text-[10px] font-mono">Synthesizing guidelines...</span>
                        </div>
                      ) : (
                        chat.answer
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Sample preset questions */}
              <div className="space-y-1.5 pt-2 border-t border-[#1a1a1a]">
                <div className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground mb-1">Frequently Searched</div>
                {PRESET_MOCK_QUESTIONS.map(btn => (
                  <button
                    key={btn.id}
                    onClick={() => askAIHelper(btn.text)}
                    className="w-full text-left p-2 rounded text-[11px] text-muted-foreground hover:text-white hover:bg-white/[0.03] border border-[#1a1a1a] hover:border-primary/20 transition-all flex items-center justify-between group h-8 font-medium"
                  >
                    <span className="truncate pr-2">{btn.text}</span>
                    <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all text-primary shrink-0" />
                  </button>
                ))}
              </div>

              {/* Input for querying */}
              <div className="flex gap-1.5 pt-1">
                <Input
                  type="text"
                  value={aiInput}
                  onChange={(e) => setAiInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      askAIHelper(aiInput);
                    }
                  }}
                  placeholder="Ask policy question..."
                  className="bg-[#141414] border-[#222] text-xs h-9 focus-visible:ring-primary/40 text-white rounded-lg"
                />
                <Button 
                  onClick={() => askAIHelper(aiInput)}
                  className="bg-primary hover:bg-primary/95 text-black font-extrabold h-9 text-xs px-3 rounded-lg"
                >
                  Ask
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Quick contact card */}
          <Card className="bg-[#0d0d0d] border border-border/80 rounded-xl p-4 space-y-3">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-[#ffc107]" />
              <span className="text-[10px] font-bold uppercase tracking-wider text-white">Emergency Escapements</span>
            </div>
            <p className="text-[11px] text-muted-foreground leading-relaxed font-medium">
              For security failures, leaks, direct equal opportunity violations, or emergency support, file directly with our designated corporate contact:
            </p>
            <div className="bg-white/[0.02] border border-[#1a1a1a] p-2.5 rounded text-[11px] leading-relaxed">
              <span className="text-white font-bold block">Alexander Sterling</span>
              <span className="text-[10px] text-muted-foreground block font-mono">Chief HR Officer</span>
              <span className="text-[10px] text-primary hover:underline cursor-pointer block mt-1 font-mono">alexander.sterling@nexushr.com</span>
            </div>
          </Card>
        </div>

      </div>
    </div>
  );
}
