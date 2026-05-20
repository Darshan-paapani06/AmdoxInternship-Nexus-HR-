import React, { useState, useMemo, useEffect } from 'react';
import { 
  Users, 
  Search, 
  Plus, 
  CheckCircle2, 
  X, 
  UserPlus, 
  ShieldCheck, 
  Cpu, 
  FileCheck, 
  User, 
  Briefcase, 
  Calendar, 
  ChevronRight, 
  AlertCircle, 
  Check, 
  Bell, 
  Layers, 
  Play, 
  PlusCircle, 
  Trash2,
  Clock,
  Lock,
  BrainCircuit
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";
import { motion, AnimatePresence } from 'motion/react';
import { cn } from "@/lib/utils";

interface OnboardingTask {
  id: string;
  title: string;
  description: string;
  dept: 'HR' | 'IT' | 'Manager';
  status: 'todo' | 'completed';
  completedAt?: string;
  completedBy?: string;
  prerequisiteTaskId?: string;
}

interface NewHireOnboarding {
  id: string;
  name: string;
  role: string;
  dept: string;
  email: string;
  startDate: string;
  avatar?: string;
  tasks: OnboardingTask[];
  emailStatus?: 'not_sent' | 'sent';
  dispatchedAt?: string;
}

const DEFAULT_HR_TASKS: Omit<OnboardingTask, 'id'>[] = [
  { title: "Verify forms, state IDs, and tax documents", description: "Collect, verify, and stamp the standard state forms and corporate I-9 agreements.", dept: 'HR', status: 'todo' },
  { title: "Configure health insurance & 401(k) match", description: "Register new hire into designated medical, vision, and tax-deferred match systems.", dept: 'HR', status: 'todo' },
  { title: "Review and sign handbook clause agreement", description: "Ensure digital acknowledgment stamp has been successfully sealed for standard bylaws.", dept: 'HR', status: 'todo' },
  { title: "Enter banking info into direct deposit payroll", description: "Configure baseline routing and account details inside direct deposit systems.", dept: 'HR', status: 'todo' },
];

const DEFAULT_IT_TASKS: Omit<OnboardingTask, 'id'>[] = [
  { title: "Provision corporate laptop and security bundle", description: "Configure system bios, physical trackpad, and hardware compliance trackers.", dept: 'IT', status: 'todo' },
  { title: "Create enterprise OKTA and directory accounts", description: "Establish corporate email, zero-trust cloud tokens, and password vaults.", dept: 'IT', status: 'todo' },
  { title: "Configure secure corporate VPN & Zero-Trust MFA", description: "Provision and lock absolute remote multi-factor enrollment profiles.", dept: 'IT', status: 'todo' },
  { title: "Provide GitHub team invites & Slack seat access", description: "Add target accounts to corporate code hubs and designated channel permissions.", dept: 'IT', status: 'todo' },
];

const DEFAULT_MGR_TASKS: Omit<OnboardingTask, 'id'>[] = [
  { title: "Schedule introductory 1-on-1 team welcome sync", description: "Map out standard recurrent mentoring checkpoints for the initial 30 days.", dept: 'Manager', status: 'todo' },
  { title: "Assign dedicated technical peer buddy & mentor", description: "Select and align an active peer engineer or officer to guide daily code workflows.", dept: 'Manager', status: 'todo' },
  { title: "Establish introductory 30-60-90 day performance OKRs", description: "Log high-level target benchmarks inside the active performance ledger.", dept: 'Manager', status: 'todo' },
  { title: "Introduce team during sync & active channels", description: "Publish formal warm welcoming statement across standard slack and sync structures.", dept: 'Manager', status: 'todo' },
];

const INITIAL_ONBOARDINGS: NewHireOnboarding[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    role: 'Head of Engineering',
    dept: 'Engineering',
    email: 's.chen@nexushr.com',
    startDate: '2026-06-01',
    avatar: 'https://avatar.iran.liara.run/public/job/designer/female',
    emailStatus: 'not_sent',
    tasks: [
      { id: 'h1', title: "Verify forms, state IDs, and tax documents", description: "Collect, verify, and stamp the standard state forms and corporate I-9 agreements.", dept: 'HR', status: 'completed', completedAt: '2026-05-18 10:22 AM', completedBy: 'Alexander Sterling' },
      { id: 'h2', title: "Configure health insurance & 401(k) match", description: "Register new hire into designated medical, vision, and tax-deferred match systems.", dept: 'HR', status: 'completed', completedAt: '2026-05-18 11:45 AM', completedBy: 'Alexander Sterling' },
      { id: 'h3', title: "Review and sign handbook clause agreement", description: "Ensure digital acknowledgment stamp has been successfully sealed for standard bylaws.", dept: 'HR', status: 'completed', completedAt: '2026-05-19 09:12 AM', completedBy: 'Alexander Sterling' },
      { id: 'h4', title: "Enter banking info into direct deposit payroll", description: "Configure baseline routing and account details inside direct deposit systems.", dept: 'HR', status: 'todo' },
      
      { id: 'i1', title: "Provision corporate laptop and security bundle", description: "Configure system bios, physical trackpad, and hardware compliance trackers.", dept: 'IT', status: 'completed', completedAt: '2026-05-19 02:30 PM', completedBy: 'Support Agent IT' },
      { id: 'i2', title: "Create enterprise OKTA and directory accounts", description: "Establish corporate email, zero-trust cloud tokens, and password vaults.", dept: 'IT', status: 'completed', completedAt: '2026-05-19 03:00 PM', completedBy: 'Support Agent IT', prerequisiteTaskId: 'h1' },
      { id: 'i3', title: "Configure secure corporate VPN & Zero-Trust MFA", description: "Provision and lock absolute remote multi-factor enrollment profiles.", dept: 'IT', status: 'completed', completedAt: '2026-05-19 03:15 PM', completedBy: 'Support Agent IT', prerequisiteTaskId: 'i2' },
      { id: 'i4', title: "Provide GitHub team invites & Slack seat access", description: "Add target accounts to corporate code hubs and designated channel permissions.", dept: 'IT', status: 'todo', prerequisiteTaskId: 'i2' },
      
      { id: 'm1', title: "Schedule introductory 1-on-1 team welcome sync", description: "Map out standard recurrent mentoring checkpoints for the initial 30 days.", dept: 'Manager', status: 'completed', completedAt: '2026-05-19 05:00 PM', completedBy: 'Sophia Lee', prerequisiteTaskId: 'h1' },
      { id: 'm2', title: "Assign dedicated technical peer buddy & mentor", description: "Select and align an active peer engineer or officer to guide daily code workflows.", dept: 'Manager', status: 'todo', prerequisiteTaskId: 'm1' },
      { id: 'm3', title: "Establish introductory 30-60-90 day performance OKRs", description: "Log high-level target benchmarks inside the active performance ledger.", dept: 'Manager', status: 'todo', prerequisiteTaskId: 'm1' },
      { id: 'm4', title: "Introduce team during sync & active channels", description: "Publish formal warm welcoming statement across standard slack and sync structures.", dept: 'Manager', status: 'todo', prerequisiteTaskId: 'm1' },
    ]
  },
  {
    id: '2',
    name: 'Marcus Vance',
    role: 'Security Engineer',
    dept: 'Engineering',
    email: 'm.thorne@nexushr.com',
    startDate: '2026-06-15',
    avatar: 'https://avatar.iran.liara.run/public/job/officer/male',
    emailStatus: 'not_sent',
    tasks: [
      { id: 'th1', title: "Verify forms, state IDs, and tax documents", description: "Collect, verify, and stamp the standard state forms and corporate I-9 agreements.", dept: 'HR', status: 'completed', completedAt: '2026-05-20 02:00 AM', completedBy: 'Alexander Sterling' },
      { id: 'th2', title: "Configure health insurance & 401(k) match", description: "Register new hire into designated medical, vision, and tax-deferred match systems.", dept: 'HR', status: 'todo' },
      { id: 'th3', title: "Review and sign handbook clause agreement", description: "Ensure digital acknowledgment stamp has been successfully sealed for standard bylaws.", dept: 'HR', status: 'todo' },
      { id: 'th4', title: "Enter banking info into direct deposit payroll", description: "Configure baseline routing and account details inside direct deposit systems.", dept: 'HR', status: 'todo' },
      
      { id: 'ti1', title: "Provision corporate laptop and security bundle", description: "Configure system bios, physical trackpad, and hardware compliance trackers.", dept: 'IT', status: 'todo' },
      { id: 'ti2', title: "Create enterprise OKTA and directory accounts", description: "Establish corporate email, zero-trust cloud tokens, and password vaults.", dept: 'IT', status: 'todo', prerequisiteTaskId: 'th1' },
      { id: 'ti3', title: "Configure secure corporate VPN & Zero-Trust MFA", description: "Provision and lock absolute remote multi-factor enrollment profiles.", dept: 'IT', status: 'todo', prerequisiteTaskId: 'ti2' },
      { id: 'ti4', title: "Provide GitHub team invites & Slack seat access", description: "Add target accounts to corporate code hubs and designated channel permissions.", dept: 'IT', status: 'todo', prerequisiteTaskId: 'ti2' },
      
      { id: 'tm1', title: "Schedule introductory 1-on-1 team welcome sync", description: "Map out standard recurrent mentoring checkpoints for the initial 30 days.", dept: 'Manager', status: 'todo', prerequisiteTaskId: 'th1' },
      { id: 'tm2', title: "Assign dedicated technical peer buddy & mentor", description: "Select and align an active peer engineer or officer to guide daily code workflows.", dept: 'Manager', status: 'todo', prerequisiteTaskId: 'tm1' },
      { id: 'tm3', title: "Establish introductory 30-60-90 day performance OKRs", description: "Log high-level target benchmarks inside the active performance ledger.", dept: 'Manager', status: 'todo', prerequisiteTaskId: 'tm1' },
      { id: 'tm4', title: "Introduce team during sync & active channels", description: "Publish formal warm welcoming statement across standard slack and sync structures.", dept: 'Manager', status: 'todo', prerequisiteTaskId: 'tm1' },
    ]
  },
  {
    id: '3',
    name: 'Elena Rostova',
    role: 'Senior PM Lead',
    dept: 'Product',
    email: 'e.rostova@nexushr.com',
    startDate: '2026-05-10',
    avatar: 'https://avatar.iran.liara.run/public/job/doctor/female',
    emailStatus: 'sent',
    dispatchedAt: '2026-05-10 11:30 AM',
    tasks: [
      { id: 'el1', title: "Verify forms, state IDs, and tax documents", description: "Collect, verify, and stamp the standard state forms and corporate I-9 agreements.", dept: 'HR', status: 'completed', completedAt: '2026-05-09 09:00 AM', completedBy: 'Alexander Sterling' },
      { id: 'el2', title: "Configure health insurance & 401(k) match", description: "Register new hire into designated medical, vision, and tax-deferred match systems.", dept: 'HR', status: 'completed', completedAt: '2026-05-09 11:30 AM', completedBy: 'Alexander Sterling' },
      { id: 'el3', title: "Review and sign handbook clause agreement", description: "Ensure digital acknowledgment stamp has been successfully sealed for standard bylaws.", dept: 'HR', status: 'completed', completedAt: '2026-05-10 10:00 AM', completedBy: 'Alexander Sterling' },
      { id: 'el4', title: "Enter banking info into direct deposit payroll", description: "Configure baseline routing and account details inside direct deposit systems.", dept: 'HR', status: 'completed', completedAt: '2026-05-10 11:00 AM', completedBy: 'Alexander Sterling' },
      
      { id: 'eli1', title: "Provision corporate laptop and security bundle", description: "Configure system bios, physical trackpad, and hardware compliance trackers.", dept: 'IT', status: 'completed', completedAt: '2026-05-09 03:00 PM', completedBy: 'IT Admin Support' },
      { id: 'eli2', title: "Create enterprise OKTA and directory accounts", description: "Establish corporate email, zero-trust cloud tokens, and password vaults.", dept: 'IT', status: 'completed', completedAt: '2026-05-09 04:00 PM', completedBy: 'IT Admin Support', prerequisiteTaskId: 'el1' },
      { id: 'eli3', title: "Configure secure corporate VPN & Zero-Trust MFA", description: "Provision and lock absolute remote multi-factor enrollment profiles.", dept: 'IT', status: 'completed', completedAt: '2026-05-09 04:30 PM', completedBy: 'IT Admin Support', prerequisiteTaskId: 'eli2' },
      { id: 'eli4', title: "Provide GitHub team invites & Slack seat access", description: "Add target accounts to corporate code hubs and designated channel permissions.", dept: 'IT', status: 'completed', completedAt: '2026-05-10 09:00 AM', completedBy: 'IT Admin Support', prerequisiteTaskId: 'eli2' },
      
      { id: 'elm1', title: "Schedule introductory 1-on-1 team welcome sync", description: "Map out standard recurrent mentoring checkpoints for the initial 30 days.", dept: 'Manager', status: 'completed', completedAt: '2026-05-11 11:00 AM', completedBy: 'Alexander Sterling', prerequisiteTaskId: 'el1' },
      { id: 'elm2', title: "Assign dedicated technical peer buddy & mentor", description: "Select and align an active peer engineer or officer to guide daily code workflows.", dept: 'Manager', status: 'completed', completedAt: '2026-05-11 02:00 PM', completedBy: 'Alexander Sterling', prerequisiteTaskId: 'elm1' },
      { id: 'elm3', title: "Establish introductory 30-60-90 day performance OKRs", description: "Log high-level target benchmarks inside the active performance ledger.", dept: 'Manager', status: 'completed', completedAt: '2026-05-12 10:00 AM', completedBy: 'Alexander Sterling', prerequisiteTaskId: 'elm1' },
      { id: 'elm4', title: "Introduce team during sync & active channels", description: "Publish formal warm welcoming statement across standard slack and sync structures.", dept: 'Manager', status: 'completed', completedAt: '2026-05-12 11:30 AM', completedBy: 'Alexander Sterling', prerequisiteTaskId: 'elm1' },
    ]
  }
];

export default function Onboarding() {
  const [candidates, setCandidates] = useState<NewHireOnboarding[]>(() => {
    const saved = localStorage.getItem('nexus_onboarding_hires');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return INITIAL_ONBOARDINGS;
      }
    }
    return INITIAL_ONBOARDINGS;
  });

  const [selectedCandidateId, setSelectedCandidateId] = useState<string>(
    candidates.length > 0 ? candidates[0].id : ''
  );

  const [searchQuery, setSearchQuery] = useState('');
  const [activeDeptTab, setActiveDeptTab] = useState<'all' | 'HR' | 'IT' | 'Manager'>('all');
  
  // Create / Launch Dialog States
  const [isLaunchOpen, setIsLaunchOpen] = useState(false);
  const [newName, setNewName] = useState('');
  const [newRole, setNewRole] = useState('');
  const [newDept, setNewDept] = useState('Engineering');
  const [newEmail, setNewEmail] = useState('');
  const [newStartDate, setNewStartDate] = useState(new Date().toISOString().split('T')[0]);

  // Added Custom Tasks state inline
  const [customTaskTitle, setCustomTaskTitle] = useState('');
  const [customTaskDesc, setCustomTaskDesc] = useState('');
  const [customTaskDept, setCustomTaskDept] = useState<'HR' | 'IT' | 'Manager'>('HR');

  // Stakeholder reassignment states
  const [reassigningTask, setReassigningTask] = useState<{ candidateId: string; task: OnboardingTask } | null>(null);
  const [targetDept, setTargetDept] = useState<'HR' | 'IT' | 'Manager' | ''>('');

  // AI Suggestions and Custom Core State
  const [aiSuggestions, setAiSuggestions] = useState<any[]>([]);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiSummary, setAiSummary] = useState('');

  // Email Template Customize and Dispatch Center states
  const [isEmailCenterOpen, setIsEmailCenterOpen] = useState(false);
  const [customSubject, setCustomSubject] = useState("Welcome to NexusHR Enterprise!");
  const [customTemplate, setCustomTemplate] = useState(
    `Hi {name},\n\nWelcome to NexusHR! We are thrilled to have you join our team. Below are some crucial guidelines and perks extracted directly from Section 2 of our Employee Handbook:\n\n📅 CO-ORDINATED CORE HOURS: Our distributed core focus hours are 10:00 AM to 4:00 PM EST (7:00 AM to 1:00 PM PST) to foster seamless team syncs.\n\n💼 WORKSPACE REIMBURSEMENT: You of course receive a one-time $1,500 home-office hardware stipend, plus a recurring $150/month high-speed internet reimbursement allowance.\n\n🛡️ ZERO-TRUST SECURITY: Strictly adhere to our zero-trust rules. Unauthorized personal devices (BYOD) must never be used to access code hubs. Locked screens and dual MFA are absolute prerequisites.\n\n🌴 UNLIMITED PTO: We offer dynamic Unlimited PTO with a mandatory minimum of 15 fully disconnected days annually to keep your batteries fully charged.\n\nYour accounts and corporate laptop are now fully verified and provisioned! We look forward to your first day.\n\nSincerely,\nAlexander Sterling\nChief Human Resources Officer\nNexusHR Enterprise`
  );

  useEffect(() => {
    localStorage.setItem('nexus_onboarding_hires', JSON.stringify(candidates));
  }, [candidates]);

  // Handle welcome email automated dispatch checking
  const checkAndDispatchWelcomeEmail = async (hire: NewHireOnboarding) => {
    const hrTasks = hire.tasks.filter(t => t.dept === 'HR');
    const itTasks = hire.tasks.filter(t => t.dept === 'IT');
    const allHrItDone = hrTasks.every(t => t.status === 'completed') && itTasks.every(t => t.status === 'completed');

    if (allHrItDone && hire.emailStatus !== 'sent') {
      try {
        const mailBody = customTemplate.replace(/{name}/g, hire.name);
        const response = await fetch('/api/onboarding/dispatch-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: hire.name,
            email: hire.email,
            subject: customSubject,
            body: mailBody
          })
        });
        const data = await response.json();
        if (data.success) {
          setCandidates(prev => prev.map(c => {
            if (c.id === hire.id) {
              return {
                ...c,
                emailStatus: 'sent',
                dispatchedAt: data.dispatchedAt
              };
            }
            return c;
          }));

          toast.success("Welcome Email Auto-Dispatched", {
            description: `All HR & IT tasks completed for ${hire.name}. Automated welcome handbook kit dispatched to ${hire.email} successfully.`,
            duration: 7000
          });
        }
      } catch (e) {
        console.error("Failed to auto-dispatch welcome email:", e);
      }
    }
  };

  // Fetch optimal task assignments from Gemini model via express api
  const fetchAiSuggestions = async (candidate: NewHireOnboarding) => {
    setIsAiLoading(true);
    try {
      const response = await fetch('/api/ai/suggest-assignments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          candidateName: candidate.name,
          candidateRole: candidate.role,
          candidateDept: candidate.dept,
          tasks: candidate.tasks
        })
      });
      const data = await response.json();
      setAiSuggestions(data.suggestions || []);
      setAiSummary(data.summaryText || '');
    } catch (error) {
      console.error("Unable to gather task allocation suggestions:", error);
      toast.error("AI Generation Advisor Offline", {
        description: "Error communicating with server-side AI planner service guidelines."
      });
    } finally {
      setIsAiLoading(false);
    }
  };

  // Handle active selection pointer fallback
  const currentCandidate = useMemo(() => {
    return candidates.find(c => c.id === selectedCandidateId) || candidates[0] || null;
  }, [candidates, selectedCandidateId]);

  // Candidates filtering by search
  const filteredCandidates = useMemo(() => {
    if (!searchQuery.trim()) return candidates;
    const q = searchQuery.toLowerCase().trim();
    return candidates.filter(c => 
      c.name.toLowerCase().includes(q) || 
      c.role.toLowerCase().includes(q) || 
      c.dept.toLowerCase().includes(q) ||
      c.email.toLowerCase().includes(q)
    );
  }, [candidates, searchQuery]);

  // Compute stats details
  const stats = useMemo(() => {
    const total = candidates.length;
    let totalTasksCount = 0;
    let completedTasksCount = 0;
    let pendingHr = 0;
    let pendingIt = 0;
    let pendingMgr = 0;

    candidates.forEach(c => {
      c.tasks.forEach(t => {
        totalTasksCount++;
        if (t.status === 'completed') {
          completedTasksCount++;
        } else {
          if (t.dept === 'HR') pendingHr++;
          if (t.dept === 'IT') pendingIt++;
          if (t.dept === 'Manager') pendingMgr++;
        }
      });
    });

    const overallProgress = totalTasksCount > 0 ? Math.round((completedTasksCount / totalTasksCount) * 100) : 0;
    const fullyOnboarded = candidates.filter(c => c.tasks.every(t => t.status === 'completed')).length;

    return {
      total,
      overallProgress,
      pendingHr,
      pendingIt,
      pendingMgr,
      fullyOnboarded
    };
  }, [candidates]);

  // Toggle tasks status securely & recalculate progress in dynamic state
  const handleToggleTask = (candidateId: string, taskId: string) => {
    // Locate the candidate and the target task first to check dependencies
    const targetCandidate = candidates.find(c => c.id === candidateId);
    if (targetCandidate) {
      const targetTask = targetCandidate.tasks.find(t => t.id === taskId);
      if (targetTask && targetTask.status === 'todo' && targetTask.prerequisiteTaskId) {
        const prereq = targetCandidate.tasks.find(pt => pt.id === targetTask.prerequisiteTaskId);
        if (prereq && prereq.status !== 'completed') {
          toast.error("Task Dependency Locked", {
            description: `You must first complete the prerequisite task: "${prereq.title}".`
          });
          return; // Block execution
        }
      }
    }

    setCandidates(prevHires => {
      return prevHires.map(hire => {
        if (hire.id !== candidateId) return hire;

        const updatedTasks = hire.tasks.map(task => {
          if (task.id !== taskId) return task;

          const becomesCompleted = task.status === 'todo';
          const stamp = new Date().toLocaleDateString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            month: 'short',
            day: 'numeric'
          });

          if (becomesCompleted) {
            toast.success("Task Sealed Successfully", {
              description: `"${task.title}" marked completed by Alexander Sterling (CHRO).`
            });
            return {
              ...task,
              status: 'completed' as const,
              completedAt: stamp,
              completedBy: 'Alexander Sterling'
            };
          } else {
            toast.info("Task Reset to Pending State", {
              description: `"${task.title}" moved back to action backlog.`
            });
            return {
              ...task,
              status: 'todo' as const,
              completedAt: undefined,
              completedBy: undefined
            };
          }
        });

        const nextCandidate = {
          ...hire,
          tasks: updatedTasks
        };

        // Asynchronously check and dispatch email on task state updates
        setTimeout(() => {
          checkAndDispatchWelcomeEmail(nextCandidate);
        }, 100);

        return nextCandidate;
      });
    });
  };

  // Reassign onboarding task stakeholder
  const handleReassignTask = () => {
    if (!reassigningTask || !targetDept) return;
    const { candidateId, task } = reassigningTask;

    setCandidates(prevHires => {
      return prevHires.map(hire => {
        if (hire.id !== candidateId) return hire;
        return {
          ...hire,
          tasks: hire.tasks.map(t => {
            if (t.id !== task.id) return t;
            return {
              ...t,
              dept: targetDept as 'HR' | 'IT' | 'Manager'
            };
          })
        };
      });
    });

    toast.success("Onboarding Task Reassigned", {
      description: `"${task.title}" successfully transferred to the ${targetDept} queue.`
    });
    setReassigningTask(null);
    setTargetDept('');
  };

  // Launch fresh workflow with default checklists prefilled
  const handleLaunchWorkflow = (e: React.FormEvent) => {
    e.preventDefault();

    if (!newName.trim() || !newRole.trim() || !newEmail.trim()) {
      toast.error("Form Validation Failed", {
        description: "Please populate all fields prior to establishing onboarding workflows."
      });
      return;
    }

    const uniqueId = String(Date.now());
    
    // Auto populate template checklist items with hierarchical prerequisites
    const hr0Id = `hr-${uniqueId}-0`;
    const it1Id = `it-${uniqueId}-1`;
    const it2Id = `it-${uniqueId}-2`;
    const mgr0Id = `mgr-${uniqueId}-0`;

    const combinedTasks: OnboardingTask[] = [
      ...DEFAULT_HR_TASKS.map((t, idx) => ({ 
        ...t, 
        id: `hr-${uniqueId}-${idx}` 
      } as OnboardingTask)),
      ...DEFAULT_IT_TASKS.map((t, idx) => ({ 
        ...t, 
        id: `it-${uniqueId}-${idx}`,
        prerequisiteTaskId: idx === 1 ? hr0Id : idx === 2 ? it1Id : idx === 3 ? it1Id : undefined
      } as OnboardingTask)),
      ...DEFAULT_MGR_TASKS.map((t, idx) => ({ 
        ...t, 
        id: `mgr-${uniqueId}-${idx}`,
        prerequisiteTaskId: idx === 0 ? hr0Id : idx > 0 ? mgr0Id : undefined
      } as OnboardingTask)),
    ];

    const avatarGender = Math.random() > 0.5 ? 'female' : 'male';
    const avatarIndex = Math.floor(Math.random() * 50) + 1;

    const newWorkflow: NewHireOnboarding = {
      id: uniqueId,
      name: newName,
      role: newRole,
      dept: newDept,
      email: newEmail,
      startDate: newStartDate,
      avatar: `https://avatar.iran.liara.run/img/avatar_${avatarGender}${avatarIndex}.png`,
      emailStatus: 'not_sent',
      tasks: combinedTasks
    };

    setCandidates(prev => [newWorkflow, ...prev]);
    setSelectedCandidateId(uniqueId);
    setIsLaunchOpen(false);

    // Reset Form fields
    setNewName('');
    setNewRole('');
    setNewEmail('');
    setNewStartDate(new Date().toISOString().split('T')[0]);

    toast.success("Onboarding Workflow Initialized", {
      description: `Structured HR, IT & Manager checkpoints constructed for ${newName}.`
    });
  };

  // Add customized task inline to specific individual on the fly
  const handleAddCustomTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentCandidate) return;
    if (!customTaskTitle.trim()) {
      toast.error("Task Title Required", { description: "Please enter a specific instruction summary." });
      return;
    }

    const newTask: OnboardingTask = {
      id: `custom-${Date.now()}`,
      title: customTaskTitle.trim(),
      description: customTaskDesc.trim() || "Custom aligned objective set by leadership.",
      dept: customTaskDept,
      status: 'todo'
    };

    setCandidates(prev => prev.map(c => {
      if (c.id !== currentCandidate.id) return c;
      return {
        ...c,
        tasks: [...c.tasks, newTask]
      };
    }));

    setCustomTaskTitle('');
    setCustomTaskDesc('');
    toast.success("Aligned Objective Added", {
      description: `Custom task linked to ${currentCandidate.name}'s Onboarding program.`
    });
  };

  const handleDeleteWorkflow = (candidateId: string, name: string) => {
    if (confirm(`Remove this onboarding record for ${name}?`)) {
      setCandidates(prev => prev.filter(c => c.id !== candidateId));
      if (selectedCandidateId === candidateId) {
        setSelectedCandidateId(candidates[0]?.id || '');
      }
      toast.info("Onboarding Record Cleared", {
        description: `Successfully expunged ${name} workflow.`
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Upper Module Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/20">
            <Layers className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Onboarding Workflows</h1>
            <p className="text-muted-foreground mt-1">
              Cross-departmental lifecycle tracking spanning HR checklists, physical IT provisioning, and localized manager objectives.
            </p>
          </div>
        </div>

        <Button 
          onClick={() => setIsLaunchOpen(true)}
          className="bg-primary hover:bg-primary/95 text-black font-extrabold text-xs shadow-md shadow-primary/10 rounded-lg uppercase tracking-wider h-10 px-4 shrink-0"
        >
          <UserPlus className="mr-2 h-4 w-4" /> Ship New Hire Setup
        </Button>
      </div>

      {/* Global Progress Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-[#0d0d0d] border border-border/80 p-4 rounded-xl">
          <CardContent className="p-0 space-y-1">
            <span className="text-[10px] font-mono text-[#666] uppercase font-bold tracking-wider">Active Programs</span>
            <div className="flex items-baseline gap-2 pt-2">
              <span className="text-2xl font-black text-white">{stats.total}</span>
              <span className="text-xs text-muted-foreground">new team hires</span>
            </div>
            <Progress value={(stats.fullyOnboarded / (stats.total || 1)) * 100} className="h-1.5 mt-2 bg-white/[0.04]" />
            <span className="text-[9px] text-[#555] block pt-1.5 font-semibold font-mono">
              COMPLETED TRANSITIONS: {stats.fullyOnboarded} OF {stats.total}
            </span>
          </CardContent>
        </Card>

        <Card className="bg-[#0d0d0d] border border-border/80 p-4 rounded-xl">
          <CardContent className="p-0 space-y-1">
            <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold tracking-wider">HR Pending Checks</span>
            <div className="flex items-baseline gap-2 pt-2">
              <span className="text-2xl font-black text-emerald-400">{stats.pendingHr}</span>
              <span className="text-xs text-muted-foreground">outstanding clauses</span>
            </div>
            <div className="text-[9px] text-[#555] block pt-3.5 font-bold uppercase tracking-wider flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" /> Verify legal & contracts
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#0d0d0d] border border-border/80 p-4 rounded-xl">
          <CardContent className="p-0 space-y-1">
            <span className="text-[10px] font-mono text-blue-400 uppercase font-bold tracking-wider">IT Open Tickets</span>
            <div className="flex items-baseline gap-2 pt-2">
              <span className="text-2xl font-black text-blue-400">{stats.pendingIt}</span>
              <span className="text-xs text-muted-foreground">hardware & access</span>
            </div>
            <div className="text-[9px] text-[#555] block pt-3.5 font-bold uppercase tracking-wider flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" /> Zero-Trust provisions
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#0d0d0d] border border-border/80 p-4 rounded-xl">
          <CardContent className="p-0 space-y-1">
            <span className="text-[10px] font-mono text-amber-400 uppercase font-bold tracking-wider">Manager OKR Syncs</span>
            <div className="flex items-baseline gap-2 pt-2">
              <span className="text-2xl font-black text-amber-400">{stats.pendingMgr}</span>
              <span className="text-xs text-muted-foreground">recurrent alignment targets</span>
            </div>
            <div className="text-[9px] text-[#555] block pt-3.5 font-bold uppercase tracking-wider flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-amber-500 rounded-full" /> Structured welcome guides
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Column Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Hand: Candidates Directory Navigation Feed */}
        <div className="lg:col-span-1 space-y-4">
          <Card className="bg-[#0d0d0d] border border-border/80 p-4 rounded-xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-widest text-[#666]">Candidates Directory</h3>
              <Badge className="bg-primary/10 text-primary border border-primary/20 text-[10px]">
                {filteredCandidates.length} Active
              </Badge>
            </div>

            {/* In-feed search filters */}
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
              <Input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search new hires by name/dept..."
                className="pl-8 bg-[#141414] border-[#1e1e1e] text-xs h-9 focus-visible:ring-primary/40 text-white rounded-lg"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-[9px] text-muted-foreground hover:text-white hover:bg-white/10 px-1 rounded-sm"
                >
                  CLR
                </button>
              )}
            </div>

            <div className="space-y-2 max-h-[460px] overflow-y-auto pr-0.5 scrollbar-thin scrollbar-thumb-gray-800">
              {filteredCandidates.map(hire => {
                const completeCount = hire.tasks.filter(t => t.status === 'completed').length;
                const totalCount = hire.tasks.length;
                const percentage = totalCount > 0 ? Math.round((completeCount / totalCount) * 100) : 0;
                const matchesSelected = hire.id === selectedCandidateId;

                return (
                  <div
                    key={hire.id}
                    onClick={() => setSelectedCandidateId(hire.id)}
                    className={cn(
                      "w-full p-3 rounded-lg border text-left cursor-pointer transition-all relative group flex flex-col gap-2.5",
                      matchesSelected 
                        ? "bg-secondary/40 border-primary/30 shadow-md shadow-primary/5" 
                        : "bg-white/[0.01] border-[#1a1a1a] hover:border-[#2e2e2e] hover:bg-white/[0.02]"
                    )}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9 rounded-md border border-white/10 shrink-0">
                          <AvatarImage src={hire.avatar} className="object-cover" />
                          <AvatarFallback className="bg-primary/10 text-primary font-bold text-xs font-mono">
                            {hire.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className="overflow-hidden">
                          <h4 className="text-xs font-bold text-white leading-tight truncate">{hire.name}</h4>
                          <p className="text-[10px] text-muted-foreground leading-none mt-1 truncate">{hire.role}</p>
                        </div>
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteWorkflow(hire.id, hire.name);
                        }}
                        className="text-[#444] hover:text-red-400 p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity self-start shrink-0"
                        title="Delete Onboarding Program"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>

                    <div className="space-y-1.5 pt-1.5 border-t border-white/[0.02]">
                      <div className="flex items-center justify-between text-[9px] font-mono text-[#555]">
                        <span className="font-semibold flex items-center gap-1">
                          <Calendar className="h-3 w-3 inline text-muted-foreground" />
                          Starts {new Date(hire.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </span>
                        <span className={cn(
                          "font-bold",
                          percentage === 100 ? "text-primary" : "text-[#777]"
                        )}>
                          {completeCount}/{totalCount} DONE ({percentage}%)
                        </span>
                      </div>
                      <Progress value={percentage} className="h-1 bg-white/[0.04] rounded-none" />
                    </div>

                    {percentage === 100 && (
                      <div className="absolute right-3 top-3 bg-primary/20 border border-primary/40 p-0.5 rounded-full">
                        <Check className="h-2.5 w-2.5 text-primary" />
                      </div>
                    )}
                  </div>
                );
              })}

              {filteredCandidates.length === 0 && (
                <div className="py-12 text-center text-muted-foreground space-y-2">
                  <User className="h-8 w-8 text-[#333] mx-auto" />
                  <p className="text-xs">No onboarding profiles match search terms.</p>
                </div>
              )}
            </div>
          </Card>

          {/* Prompt guide box */}
          <Card className="bg-[#0b0b0b] border border-[#1a1a1a] p-4 rounded-xl leading-relaxed space-y-2">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-primary shrink-0" />
              <div className="text-[10px] font-bold uppercase tracking-wider text-white">Security Escalation Protocol</div>
            </div>
            <p className="text-[11px] text-muted-foreground leading-relaxed">
              All digital credentials and laptop deliveries require active verification stamps before moving to "in-progress" status. For priority overrides, contact HR admin operators directly.
            </p>
          </Card>
        </div>

        {/* Middle and Right Sections Combined: Core Task Check List Container */}
        <div className="lg:col-span-2 space-y-6">
          {currentCandidate ? (
            <div className="space-y-6">
              
              {/* Selected Hire Profile Summary header banner bar */}
              <Card className="bg-[#0d0d0d] border border-border/80 rounded-xl p-5 relative overflow-hidden">
                <div className="absolute -right-16 -bottom-16 w-36 h-36 bg-primary/5 rounded-full blur-2xl pointer-events-none" />
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  
                  <div className="flex items-center gap-4">
                    <Avatar className="h-14 w-14 rounded-lg border border-primary/20 p-0.5 shrink-0 bg-black">
                      <AvatarImage src={currentCandidate.avatar} className="object-cover rounded-md" />
                      <AvatarFallback className="bg-primary/10 text-primary font-bold text-sm">
                        {currentCandidate.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="text-xl font-bold text-white tracking-tight">{currentCandidate.name}</h2>
                        <Badge className="bg-[#111] border border-[#222] text-muted-foreground text-[9px] uppercase font-mono py-0.5 px-2 rounded font-bold">
                          {currentCandidate.dept}
                        </Badge>
                      </div>
                      
                      <p className="text-xs text-muted-foreground mt-1 leading-none">
                        Role: <strong className="text-white font-semibold">{currentCandidate.role}</strong> • Email: <span className="font-mono text-[10.5px]">{currentCandidate.email}</span>
                      </p>
                    </div>
                  </div>

                  {/* Horizontal visual indicator block */}
                  <div className="flex flex-col md:items-end gap-1.5 pt-2.5 md:pt-0 shrink-0 border-t md:border-none border-white/[0.04]">
                    <span className="text-[10px] uppercase font-mono tracking-widest text-[#555] font-bold">Process Completeness Goal</span>
                    <div className="flex items-center gap-2.5">
                      <span className="text-2xl font-black text-primary font-sans">
                        {useMemo(() => {
                          const done = currentCandidate.tasks.filter(t => t.status === 'completed').length;
                          return Math.round((done / (currentCandidate.tasks.length || 1)) * 100);
                        }, [currentCandidate])}%
                      </span>
                      <div className="w-24 bg-white/[0.04] h-2 rounded overflow-hidden">
                        <div 
                          className="bg-primary h-full transition-all duration-500 ease-out" 
                          style={{ 
                            width: `${Math.round((currentCandidate.tasks.filter(t => t.status === 'completed').length / (currentCandidate.tasks.length || 1)) * 100)}%` 
                          }}
                        />
                      </div>
                    </div>
                  </div>

                </div>
              </Card>

              {/* Sub grid layout for checklists alongside AI Insights & Email Status */}
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                
                {/* Left Side: Checklist and Append Custom Task (xl:col-span-2) */}
                <div className="xl:col-span-2 space-y-6">
                  
                  {/* Department Check Task Panel list switcher */}
                  <Card className="bg-[#0d0d0d] border border-border/80 rounded-xl overflow-hidden shadow-lg">
                    <div className="p-4 border-b border-[#141414] bg-[#0a0a0a] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                        <span className="text-xs font-bold uppercase tracking-wider text-white font-sans">Onboarding Checklist</span>
                      </div>

                      {/* Operational Dept toggle tab bar buttons */}
                      <div className="flex items-center gap-1 border border-[#1e1e1e] bg-black p-0.5 rounded-lg w-fit self-start">
                        {[
                          { id: 'all', label: 'All Items' },
                          { id: 'HR', label: 'HR Admin' },
                          { id: 'IT', label: 'Secure IT' },
                          { id: 'Manager', label: 'Hiring Mgr' },
                        ].map(tab => (
                          <button
                            key={tab.id}
                            type="button"
                            onClick={() => setActiveDeptTab(tab.id as any)}
                            className={cn(
                              "px-2.5 py-1 rounded text-[10px] uppercase font-bold tracking-wider transition-all",
                              activeDeptTab === tab.id 
                                ? "bg-[#111] text-primary border border-white/[0.05] shadow" 
                                : "text-[#666] hover:text-white"
                            )}
                          >
                            {tab.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="p-5 space-y-3 max-h-[460px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-800">
                      {currentCandidate.tasks
                        .filter(task => activeDeptTab === 'all' || task.dept === activeDeptTab)
                        .map(task => {
                          const isDone = task.status === 'completed';
                          // Check for dependency lock
                          let isLocked = false;
                          let prereqTask: OnboardingTask | undefined;
                          if (!isDone && task.prerequisiteTaskId) {
                            prereqTask = currentCandidate.tasks.find(pt => pt.id === task.prerequisiteTaskId);
                            if (prereqTask && prereqTask.status !== 'completed') {
                              isLocked = true;
                            }
                          }

                          return (
                            <div
                              key={task.id}
                              onClick={() => {
                                if (isLocked && prereqTask) {
                                  toast.error("Dependency Check Lock", {
                                    description: `Prerequisite checklist item must be certified first: "${prereqTask.title}".`
                                  });
                                  return;
                                }
                                handleToggleTask(currentCandidate.id, task.id);
                              }}
                              className={cn(
                                "group p-3.5 rounded-xl border text-left transition-all flex items-start gap-3.5 select-none",
                                isLocked 
                                  ? "bg-[#070707]/60 border-dashed border-[#1a1a1a] opacity-60 cursor-not-allowed" 
                                  : "bg-white/[0.01] border-[#161616] hover:border-white/10 cursor-pointer",
                                !isLocked && isDone && "bg-emerald-900/[0.02] border-emerald-500/10 hover:border-emerald-500/20 shadow-inner"
                              )}
                            >
                              <div className={cn(
                                "h-5 w-5 rounded border mt-0.5 flex items-center justify-center shrink-0 transition-all",
                                isLocked 
                                  ? "bg-[#111] border-[#1e1e1e] text-amber-500/60"
                                  : (isDone 
                                    ? "bg-emerald-500/10 border-emerald-500 text-emerald-400" 
                                    : "border-gray-800 bg-black group-hover:border-primary/40 text-transparent")
                              )}>
                                {isLocked ? (
                                  <Lock className="h-2.5 w-2.5" />
                                ) : (
                                  <Check className="h-3 w-3 mt-px stroke-[3]" />
                                )}
                              </div>

                              <div className="flex-1 space-y-1 overflow-hidden">
                                <div className="flex items-baseline justify-between gap-3 flex-wrap">
                                  <h5 className={cn(
                                    "text-xs font-bold leading-tight",
                                    isDone ? "text-muted-foreground/55 line-through font-semibold" : "text-white"
                                  )}>
                                    {task.title}
                                  </h5>
                                  
                                  {/* Inline Stakeholder Reassigner Dropdown Selector */}
                                  <div className="flex items-center gap-2">
                                    <select
                                      value={task.dept}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                      }}
                                      onChange={(e) => {
                                        e.stopPropagation();
                                        const newDeptVal = e.target.value as 'HR' | 'IT' | 'Manager';
                                        
                                        setCandidates(prevHires => {
                                          return prevHires.map(hire => {
                                            if (hire.id !== currentCandidate.id) return hire;
                                            return {
                                              ...hire,
                                              tasks: hire.tasks.map(t => {
                                                if (t.id !== task.id) return t;
                                                return {
                                                  ...t,
                                                  dept: newDeptVal
                                                };
                                              })
                                            };
                                          });
                                        });

                                        toast.success("Stakeholder Direct Transferred", {
                                          description: `"${task.title}" transferred immediately to ${newDeptVal} department.`
                                        });
                                      }}
                                      className={cn(
                                        "text-[9px] font-mono py-0.5 px-2 border border-[#1e1e1e] font-extrabold uppercase rounded-lg shrink-0 transition-all focus:outline-none cursor-pointer bg-black text-[#888] hover:text-white",
                                        task.dept === 'HR' && "text-emerald-400 hover:bg-emerald-500/10",
                                        task.dept === 'IT' && "text-blue-400 hover:bg-blue-500/10",
                                        task.dept === 'Manager' && "text-amber-400 hover:bg-amber-500/10"
                                      )}
                                    >
                                      <option value="HR">HR Admin</option>
                                      <option value="IT">Secure IT</option>
                                      <option value="Manager">Hiring Mgr</option>
                                    </select>
                                  </div>
                                </div>
                                
                                <p className={cn(
                                  "text-[10.5px] leading-relaxed",
                                  isDone ? "text-[#444]" : "text-muted-foreground"
                                )}>
                                  {task.description}
                                </p>

                                {isLocked && prereqTask && (
                                  <div className="flex items-center gap-1.5 text-[9.5px] font-mono text-amber-500/80 pt-1">
                                    <Clock className="w-3 h-3 text-amber-500" />
                                    <span>LOCKED: Prerequisite task required: "{prereqTask.title}"</span>
                                  </div>
                                )}

                                {isDone && (
                                  <div className="pt-2 text-[9px] font-mono text-[#555] flex items-center gap-1 flex-wrap">
                                    <span className="bg-[#121212] border border-white/[0.02] px-1 py-0.5 rounded text-emerald-500">
                                      CERTIFIED
                                    </span>
                                    <span>Checked by {task.completedBy} • {task.completedAt}</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          );
                        })}

                      {currentCandidate.tasks.filter(task => activeDeptTab === 'all' || task.dept === activeDeptTab).length === 0 && (
                        <div className="py-12 text-center text-muted-foreground space-y-2 font-normal">
                          <AlertCircle className="h-7 w-7 text-[#222] mx-auto" />
                          <p className="text-xs">No pending checkpoints linked under this filter category.</p>
                        </div>
                      )}
                    </div>
                  </Card>

                  {/* Add Custom Task Form Panel to specific Candidate */}
                  <Card className="bg-[#0d0d0d] border border-border/80 rounded-xl p-5 shadow-md">
                    <div className="flex items-center justify-between pb-3 border-b border-[#141414] mb-4">
                      <div className="flex items-center gap-2">
                        <PlusCircle className="h-4 w-4 text-primary" />
                        <span className="text-xs font-bold uppercase tracking-wider text-white">Append Team Task objective</span>
                      </div>
                      <Badge variant="outline" className="text-[10px] text-muted-foreground border-border/40 font-bold uppercase font-sans">
                        Linked to {currentCandidate.name}
                      </Badge>
                    </div>

                    <form onSubmit={handleAddCustomTask} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="md:col-span-2 space-y-1.5">
                          <label className="text-[9px] font-bold uppercase tracking-widest text-[#555] block">
                            Objective Summary
                          </label>
                          <Input
                            type="text"
                            value={customTaskTitle}
                            onChange={(e) => setCustomTaskTitle(e.target.value)}
                            placeholder="e.g. Align sandbox schema with security lead..."
                            className="bg-[#141414] border-[#1e1e1e] text-xs h-9 focus-visible:ring-primary/40 text-white rounded-lg"
                          />
                        </div>
                        <div className="md:col-span-1 space-y-1.5">
                          <label className="text-[9px] font-bold uppercase tracking-widest text-[#555] block">
                            Responsible Dept
                          </label>
                          <select
                            value={customTaskDept}
                            onChange={(e) => setCustomTaskDept(e.target.value as any)}
                            className="w-full bg-[#141414] border border-[#1e1e1e] text-xs h-9 focus-visible:ring-primary/40 focus:outline-none text-muted-foreground rounded-lg px-2.5"
                          >
                            <option value="HR">HR Admin</option>
                            <option value="IT">Secure IT</option>
                            <option value="Manager">Hiring Manager</option>
                          </select>
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[9px] font-bold uppercase tracking-widest text-[#555] block">
                          Instructions & Purpose
                        </label>
                        <Input
                          type="text"
                          value={customTaskDesc}
                          onChange={(e) => setCustomTaskDesc(e.target.value)}
                          placeholder="e.g. Review Spanner db parameters and log verification steps."
                          className="bg-[#141414] border-[#1e1e1e] text-xs h-9 focus-visible:ring-primary/40 text-white rounded-lg"
                        />
                      </div>

                      <div className="flex justify-end">
                        <Button 
                          type="submit" 
                          className="bg-primary hover:bg-primary/95 text-black font-extrabold text-[11px] py-1.5 h-8.5 rounded-lg uppercase tracking-wider px-4"
                        >
                          Linked Objective ➔
                        </Button>
                      </div>
                    </form>
                  </Card>
                </div>

                {/* Right Side: AI Assistant Match & Automated Welcome Status */}
                <div className="xl:col-span-1 space-y-6">
                  
                  {/* AI Suggestions Card */}
                  <Card className="bg-[#0d0d0d] border border-border/80 rounded-xl p-5 shadow-lg relative overflow-hidden">
                    <div className="absolute -right-16 -bottom-16 w-32 h-32 bg-primary/2 rounded-full blur-2xl pointer-events-none" />
                    <div className="flex items-center justify-between pb-3 border-b border-[#141414] mb-4">
                      <div className="flex items-center gap-2">
                        <Cpu className="h-4 w-4 text-primary animate-pulse shrink-0" />
                        <span className="text-xs font-bold uppercase tracking-wider text-white">AI Assignment Advisor</span>
                      </div>
                      <Badge className="bg-primary/10 text-primary border border-primary/20 text-[9px] uppercase font-mono py-0 rounded">
                        Insight
                      </Badge>
                    </div>

                    <p className="text-[11px] text-muted-foreground leading-relaxed mb-4">
                      Calculates ideal operational stakeholders based on current departmental backlogs, historic checklist completion times, and candidate skillsets.
                    </p>

                    <Button 
                      onClick={() => fetchAiSuggestions(currentCandidate)}
                      disabled={isAiLoading}
                      className="w-full bg-primary hover:bg-primary/95 text-black font-extrabold text-[10px] uppercase tracking-wider h-8 rounded-lg mb-4"
                    >
                      {isAiLoading ? "Processing Workloads..." : "✨ Calculate Recommended Owners"}
                    </Button>

                    <div className="space-y-3">
                      {aiSuggestions.length > 0 ? (
                        <div className="space-y-2.5">
                          {aiSuggestions.map((s, idx) => (
                            <div key={idx} className="bg-[#121212] border border-white/[0.03] p-3 rounded-lg space-y-1.5 relative hover:border-primary/20 transition-all">
                              <div className="flex items-center justify-between gap-2">
                                <span className="text-[10px] font-bold text-white truncate max-w-[130px]">{s.taskTitle}</span>
                                <Badge className={cn(
                                  "text-[8px] font-mono px-1.5 py-0 border-none font-bold",
                                  s.suggestedDept === 'HR' && "bg-emerald-500/10 text-emerald-400",
                                  s.suggestedDept === 'IT' && "bg-blue-500/10 text-blue-400",
                                  s.suggestedDept === 'Manager' && "bg-amber-500/10 text-amber-400"
                                )}>
                                  REASSIGN DEPT: {s.suggestedDept || 'IT'}
                                </Badge>
                              </div>
                              <p className="text-[10px] text-muted-foreground leading-relaxed leading-[1.3]">{s.reason}</p>
                              <div className="flex items-center justify-between pt-1.5 text-[8.5px] font-mono text-[#555] border-t border-white/[0.02]">
                                <span>Est Time: <strong className="text-white font-semibold">{s.estCompletionTime || "2 hrs"}</strong></span>
                                <span className="uppercase text-amber-500/80 font-bold">{s.urgency || "High"}</span>
                              </div>
                            </div>
                          ))}
                          {aiSummary && (
                            <div className="text-[10.5px] bg-primary/[0.02] border border-primary/10 rounded-lg p-2.5 text-muted-foreground leading-relaxed">
                              <strong className="text-primary font-bold">Strategic Impact:</strong> {aiSummary}
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="border border-dashed border-[#1e1e1e] p-5 text-center text-muted-foreground rounded-lg">
                          <BrainCircuit className="h-6 w-6 text-[#222] mx-auto mb-2" />
                          <p className="text-[10.5px]">No suggestions compiled yet. Run calculations to fetch predictive staffing recommendations.</p>
                        </div>
                      )}
                    </div>
                  </Card>

                  {/* Welcome Email automated status Card */}
                  <Card className="bg-[#0d0d0d] border border-border/80 rounded-xl p-5 shadow-lg relative overflow-hidden">
                    <div className="flex items-center justify-between pb-3 border-b border-[#141414] mb-4">
                      <div className="flex items-center gap-2">
                        <Bell className="h-4 w-4 text-primary" />
                        <span className="text-xs font-bold uppercase tracking-wider text-white">Welcome Portal</span>
                      </div>
                      <Badge className={cn(
                        "text-[8px] font-mono py-0 px-1.5 uppercase font-bold",
                        currentCandidate.emailStatus === 'sent' ? "bg-emerald-500/10 text-emerald-400" : "bg-[#222] text-[#888]"
                      )}>
                        {currentCandidate.emailStatus === 'sent' ? "SENT" : "PENDING HR + IT"}
                      </Badge>
                    </div>

                    <p className="text-[11px] text-muted-foreground leading-relaxed mb-3">
                      Triggers customizable details from the Employee Handbook to <span className="text-white font-mono">{currentCandidate.email}</span> automatically once all HR & IT tasks are certified.
                    </p>

                    <div className="bg-[#141414] border border-[#222] rounded-lg p-3 space-y-2.5 mb-3">
                      <div className="flex items-center justify-between text-[10px] font-mono border-b border-white/[0.02] pb-1.5">
                        <span className="text-muted-foreground">RECIPIENT:</span>
                        <span className="text-white font-bold">{currentCandidate.name}</span>
                      </div>
                      <div className="flex items-center justify-between text-[10px] font-mono">
                        <span className="text-muted-foreground">STATUS:</span>
                        {currentCandidate.emailStatus === 'sent' ? (
                          <span className="text-emerald-400 font-bold flex items-center gap-1">
                            <Check className="h-3 w-3 stroke-[3]" /> DISPATCHED
                          </span>
                        ) : (
                          <span className="text-amber-500 font-bold animate-pulse">
                            AWAITING VERIFY
                          </span>
                        )}
                      </div>
                      {currentCandidate.emailStatus === 'sent' && (
                        <div className="text-[9px] font-mono text-[#555] leading-none pt-1 border-t border-white/[0.02]">
                          Sent: {currentCandidate.dispatchedAt || "Just now"}
                        </div>
                      )}
                    </div>

                    <Button
                      onClick={() => setIsEmailCenterOpen(true)}
                      variant="outline"
                      className="w-full border-[#222] bg-[#141414] hover:bg-white/5 text-[#888] hover:text-white font-extrabold text-[10px] uppercase tracking-wider h-8 rounded-lg"
                    >
                      Template Editor
                    </Button>
                  </Card>

                </div>

              </div>

            </div>
          ) : (
            <Card className="bg-[#0d0d0d] border border-border/80 py-16 px-6 text-center rounded-xl">
              <AlertCircle className="h-10 w-10 text-[#222] mx-auto mb-3" />
              <h3 className="text-sm font-bold text-white">No Onboarding Candidates Configured</h3>
              <p className="text-xs text-muted-foreground mt-2 max-w-sm mx-auto">
                Select or initialize an active onboarding program to begin reviewing IT, HR, and workflow components.
              </p>
              <Button size="sm" onClick={() => setIsLaunchOpen(true)} className="mt-4 text-xs font-bold bg-primary text-black hover:bg-primary/90">
                Launch Onboarding Program
              </Button>
            </Card>
          )}
        </div>

      </div>

      {/* Initialize / Launch Onboarding Dialog Card Overlay */}
      <Dialog open={isLaunchOpen} onOpenChange={setIsLaunchOpen}>
        <DialogContent className="max-w-md bg-[#0d0d0d] border border-[#1a1a1a] rounded-xl text-white">
          <DialogHeader className="space-y-1">
            <div className="flex items-center gap-2.5 text-primary">
              <UserPlus className="h-5 w-5" />
              <DialogTitle className="text-lg font-bold">Launch Onboarding Program</DialogTitle>
            </div>
            <DialogDescription className="text-xs text-muted-foreground">
              Define the workspace details for a new corporate hire. Default HR, IT, and Manager checklist templates will automatically populate.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleLaunchWorkflow} className="space-y-4 pt-2.5">
            <div className="space-y-1.5">
              <label className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground block">
                Employee Full Legal Name
              </label>
              <Input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="e.g. David Thorne"
                className="bg-[#141414] border-[#222] focus-visible:ring-primary/40 h-9.5 text-xs text-white"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground block">
                  Corporate Role / Title
                </label>
                <Input
                  type="text"
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value)}
                  placeholder="e.g. Lead Devops Operator"
                  className="bg-[#141414] border-[#222] focus-visible:ring-primary/40 h-9.5 text-xs text-white"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground block">
                  Department Assign
                </label>
                <select
                  value={newDept}
                  onChange={(e) => setNewDept(e.target.value)}
                  className="w-full bg-[#141414] border border-[#222] text-xs h-9.5 focus-visible:ring-primary/40 focus:outline-none text-muted-foreground rounded-lg px-2.5"
                >
                  <option value="Engineering">Engineering</option>
                  <option value="Product">Product Office</option>
                  <option value="Design">Digital Design</option>
                  <option value="Sales">Revenue Sales</option>
                  <option value="People">People Ops</option>
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground block">
                Workspace Official Email
              </label>
              <Input
                type="email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                placeholder="e.g. d.thorne@nexushr.com"
                className="bg-[#141414] border-[#222] focus-visible:ring-primary/40 h-9.5 text-xs text-white"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground block">
                Target Effective Start Date
              </label>
              <Input
                type="date"
                value={newStartDate}
                onChange={(e) => setNewStartDate(e.target.value)}
                className="bg-[#141414] border-[#222] focus-visible:ring-primary/40 h-9.5 text-xs text-white"
                required
              />
            </div>

            <DialogFooter className="flex flex-row justify-end gap-2 mt-4 pt-1">
              <Button 
                type="button"
                variant="outline" 
                onClick={() => setIsLaunchOpen(false)}
                className="border-[#1a1a1a] bg-transparent text-white hover:bg-white/5 text-xs font-semibold"
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                className="bg-primary hover:bg-primary/90 text-black font-extrabold text-xs"
              >
                Establish Program ➔
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Confirmation Modal for Stakeholder Reassignment */}
      <Dialog open={!!reassigningTask} onOpenChange={(open) => !open && setReassigningTask(null)}>
        <DialogContent className="max-w-md bg-[#0d0d0d] border border-[#1a1a1a] rounded-xl text-white">
          <DialogHeader className="space-y-1">
            <div className="flex items-center gap-2.5 text-primary">
              <Layers className="h-5 w-5" />
              <DialogTitle className="text-lg font-bold">Confirm Task Reassignment</DialogTitle>
            </div>
            <DialogDescription className="text-xs text-muted-foreground">
              Verify reassignment details. This action changes the primary department responsible for completing this task.
            </DialogDescription>
          </DialogHeader>

          {reassigningTask && (
            <div className="space-y-4 pt-2.5 text-xs">
              <div className="bg-[#141414] border border-[#1e1e1e] rounded-lg p-3 space-y-2">
                <div>
                  <span className="text-muted-foreground font-mono block text-[9px] uppercase tracking-wider">Candidate</span>
                  <span className="font-bold text-white text-xs">
                    {candidates.find(c => c.id === reassigningTask.candidateId)?.name || "New Hire"}
                  </span>
                </div>
                <div>
                  <span className="text-muted-foreground font-mono block text-[9px] uppercase tracking-wider">Task Title</span>
                  <span className="font-semibold text-white text-xs">{reassigningTask.task.title}</span>
                </div>
                <div>
                  <span className="text-muted-foreground font-mono block text-[9px] uppercase tracking-wider">Current Owner</span>
                  <Badge variant="secondary" className="text-[10px] mt-1 bg-white/10 text-white font-mono uppercase">
                    {reassigningTask.task.dept} Department
                  </Badge>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block">
                  Select New Responsible Stakeholder
                </label>
                <select
                  value={targetDept}
                  onChange={(e) => setTargetDept(e.target.value as any)}
                  className="w-full bg-[#141414] border border-[#222] text-xs h-9.5 focus-visible:ring-primary/40 focus:outline-none text-white rounded-lg px-2.5 font-sans"
                >
                  <option value="HR">HR Admin</option>
                  <option value="IT">Secure IT</option>
                  <option value="Manager">Hiring Manager</option>
                </select>
              </div>
            </div>
          )}

          <DialogFooter className="flex flex-row justify-end gap-2 mt-4 pt-1">
            <Button 
              type="button"
              variant="outline" 
              onClick={() => setReassigningTask(null)}
              className="border-[#1a1a1a] bg-transparent text-white hover:bg-white/5 text-xs font-semibold"
            >
              Cancel
            </Button>
            <Button 
              type="button"
              onClick={handleReassignTask}
              className="bg-primary hover:bg-primary/95 text-black font-extrabold text-xs"
            >
              Confirm & Reassign ➔
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Customizable Welcome Email Handbook Template Editor Modal Overlay */}
      <Dialog open={isEmailCenterOpen} onOpenChange={setIsEmailCenterOpen}>
        <DialogContent className="max-w-[500px] bg-[#0d0d0d] border border-[#1a1a1a] rounded-xl text-white">
          <DialogHeader className="space-y-1">
            <div className="flex items-center gap-2.5 text-primary">
              <Bell className="h-5 w-5" />
              <DialogTitle className="text-lg font-bold">Customize Handbook Welcome Template</DialogTitle>
            </div>
            <DialogDescription className="text-xs text-muted-foreground">
              Define the automated email template sent when HR + IT checklists are completely checked off. Information is derived from the NexusHR Core Employee Handbook.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 pt-3">
            <div className="bg-[#121212] border border-white/[0.02] p-3 rounded-lg text-[10.5px] leading-relaxed text-muted-foreground">
              <span className="text-amber-500 font-bold uppercase tracking-wider block text-[9.5px] mb-0.5">Placeholder Guides</span>
              Use the placeholder token <code className="text-white bg-[#222] px-1 py-0.5 rounded font-mono">{`{name}`}</code> to automatically bind new candidate names in the dispatched output message.
            </div>

            <div className="space-y-1.5">
              <label className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground block">
                Subject Line
              </label>
              <Input
                type="text"
                value={customSubject}
                onChange={(e) => setCustomSubject(e.target.value)}
                placeholder="e.g. Welcome to NexusHR Enterprise!"
                className="bg-[#141414] border-[#222] focus-visible:ring-primary/40 h-9.5 text-xs text-white"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground block">
                Welcome Message Template Body
              </label>
              <textarea
                value={customTemplate}
                onChange={(e) => setCustomTemplate(e.target.value)}
                rows={11}
                className="w-full bg-[#141414] border border-[#222] rounded-lg p-3 text-xs text-white font-sans focus:ring-primary/40 focus:outline-none focus:border-primary/40 leading-relaxed resize-none"
              />
            </div>
          </div>

          <DialogFooter className="flex flex-row justify-end gap-2 mt-4 pt-1">
            <Button 
              type="button"
              variant="outline" 
              onClick={() => setIsEmailCenterOpen(false)}
              className="border-[#1a1a1a] bg-transparent text-white hover:bg-white/5 text-xs font-semibold"
            >
              Cancel
            </Button>
            <Button 
              type="button"
              onClick={() => {
                setIsEmailCenterOpen(false);
                toast.success("Welcome Template Sealed", {
                  description: "Custom handbook-aligned messaging rules saved. Any subsequent HR+IT completions will fire this configuration."
                });
              }}
              className="bg-primary hover:bg-primary/95 text-black font-extrabold text-xs"
            >
              Save Template Rules
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
