import React, { useState } from 'react';
import { 
  TrendingUp, 
  Target, 
  MessageSquare, 
  Award, 
  Star,
  ChevronRight,
  MoreHorizontal,
  Bell,
  Clock,
  Sliders,
  Mail,
  Send,
  History,
  CheckCircle2,
  RefreshCw,
  Sparkles,
  AlertCircle,
  Users,
  Settings
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface ReviewItem {
  id: string;
  name: string;
  manager: string;
  type: string;
  date: string;
  remindersStatus: {
    employee: 'scheduled' | 'sent' | 'none';
    manager: 'scheduled' | 'sent' | 'none';
  };
}

interface LogEntry {
  id: string;
  time: string;
  event: string;
  type: 'review' | 'feedback' | 'system';
  channels: string[];
  status: 'sent' | 'queued' | 'failed';
}

const INITIAL_REVIEWS: ReviewItem[] = [
  { 
    id: 'r1', 
    name: 'James Wilson', 
    manager: 'Sarah Chen', 
    type: 'Annual Review', 
    date: 'Tomorrow, 10:00 AM',
    remindersStatus: { employee: 'scheduled', manager: 'scheduled' }
  },
  { 
    id: 'r2', 
    name: 'Sophia Lee', 
    manager: 'Alexander Sterling', 
    type: 'Probation Review', 
    date: 'May 22, 02:30 PM',
    remindersStatus: { employee: 'scheduled', manager: 'scheduled' }
  },
  { 
    id: 'r3', 
    name: 'Marcus Thorne', 
    manager: 'Sarah Chen', 
    type: 'Quarterly Check-in', 
    date: 'May 24, 11:00 AM',
    remindersStatus: { employee: 'scheduled', manager: 'scheduled' }
  },
  { 
    id: 'r4', 
    name: 'Elena Rodriguez', 
    manager: 'Sarah Chen', 
    type: '360 Peer Feedback', 
    date: 'May 25, 05:00 PM',
    remindersStatus: { employee: 'scheduled', manager: 'scheduled' }
  }
];

const INITIAL_LOGS: LogEntry[] = [
  {
    id: 'l1',
    time: 'Today, 09:30 AM',
    event: 'Sent Annual Review Alert to James Wilson (employee) and Sarah Chen (manager)',
    type: 'review',
    channels: ['email', 'slack'],
    status: 'sent'
  },
  {
    id: 'l2',
    time: 'Yesterday, 04:15 PM',
    event: 'Automatic 48h feedback sweep broadcasted to product team peers',
    type: 'feedback',
    channels: ['email'],
    status: 'sent'
  },
  {
    id: 'l3',
    time: 'May 18, 11:00 AM',
    event: 'Probation deadline warnings compiled and dispatched to departments',
    type: 'system',
    channels: ['in_app'],
    status: 'sent'
  }
];

const TEMPLATES_PRESETS = {
  review: {
    subject: "Reminder: Upcoming Performance Review - Q2 2026",
    body: "Hi {Name},\n\nThis is an automated reminder that your scheduled performance review dialogue with your manager {Manager} is approaching on {Date}.\n\nPlease ensure your preparation materials and self-evaluation forms are updated inside the portal prior to the session.\n\nBest,\nNexusHR Automated Agent"
  },
  feedback: {
    subject: "Action Required: Complete 360 Peer Feedback Campaigns",
    body: "Hi {Name},\n\nYour peers are relying on your constructive feedback for Q2 cycles. There is pending evaluation due on {Date}.\n\nIt takes around 5 minutes to submit comments in the feedback section.\n\nThank you for championing growth,\nNexusHR Automated Agent"
  },
  checkin: {
    subject: "OKR Milestones: Mid-Quarter Alignment Audit",
    body: "Hi {Name},\n\nPlease complete progressive updates on your active goal sheets before the quarterly alignment milestone.\n\nEnsure statuses match latest key metrics.\n\nRegards,\nNexusHR People Ops"
  }
};

export default function Performance() {
  // Config state
  const [triggerCadence, setTriggerCadence] = useState<'3' | '1' | '7'>('3');
  const [feedbackDeadlineHours, setFeedbackDeadlineHours] = useState<'48' | '24' | '12'>('24');
  const [notifyEmployee, setNotifyEmployee] = useState(true);
  const [notifyManager, setNotifyManager] = useState(true);
  const [activeChannels, setActiveChannels] = useState({
    email: true,
    slack: true,
    inApp: true
  });

  // Template customizer state
  const [templateType, setTemplateType] = useState<'review' | 'feedback' | 'checkin'>('review');
  const [subjectInput, setSubjectInput] = useState(TEMPLATES_PRESETS.review.subject);
  const [bodyInput, setBodyInput] = useState(TEMPLATES_PRESETS.review.body);

  const [reviews, setReviews] = useState<ReviewItem[]>(INITIAL_REVIEWS);
  const [logs, setLogs] = useState<LogEntry[]>(INITIAL_LOGS);
  const [isSimulating, setIsSimulating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleTemplatePresetChange = (type: 'review' | 'feedback' | 'checkin') => {
    setTemplateType(type);
    setSubjectInput(TEMPLATES_PRESETS[type].subject);
    setBodyInput(TEMPLATES_PRESETS[type].body);
  };

  const handleSaveSettings = () => {
    setIsSaving(true);
    setTimeout(() => {
      toast.success("Notification Rules Saved!", {
        description: `Trigger timing set to ${triggerCadence} days for reviews, ${feedbackDeadlineHours} hours for feedback. Alerts bound with ${Object.keys(activeChannels).filter(c => activeChannels[c as keyof typeof activeChannels]).length} channel targets active.`,
        duration: 3500
      });
      setIsSaving(false);
    }, 600);
  };

  const handleRunBackupScan = () => {
    setIsSimulating(true);
    toast.info("Initializing Daily Automated Sweep...", {
      description: "Crawling active upcoming review schedules and peer feedback cycles...",
      duration: 1500,
    });

    setTimeout(() => {
      const processedNames: string[] = [];
      const newLogs: LogEntry[] = [];
      const channelsUsed = Object.keys(activeChannels).filter(c => activeChannels[c as keyof typeof activeChannels]);

      const updatedReviews = reviews.map(r => {
        if (r.remindersStatus.employee === 'sent' && r.remindersStatus.manager === 'sent') {
          return r;
        }

        processedNames.push(r.name);

        // Dispatches
        if (notifyEmployee) {
          toast.success(`[Dispatch] Employee reminder sent to ${r.name}`, {
            description: `Sent via: ${channelsUsed.join(', ').toUpperCase()}`,
            duration: 3500
          });
        }
        if (notifyManager) {
          toast.success(`[Dispatch] Manager reminder sent to ${r.manager}`, {
            description: `Subject: Alerting on ${r.name}'s Upcoming Review.`,
            duration: 3500
          });
        }

        // Keep dynamic logs
        newLogs.push({
          id: `log-${Date.now()}-${r.id}`,
          time: 'Just now',
          event: `Automated ${r.type} alerts dispatched to ${r.name} (${notifyEmployee ? 'Employee' : ''}) & ${r.manager} (${notifyManager ? 'Manager' : ''})`,
          type: r.type.includes('Feedback') ? 'feedback' : 'review',
          channels: channelsUsed,
          status: 'sent'
        });

        return {
          ...r,
          remindersStatus: {
            employee: notifyEmployee ? 'sent' : r.remindersStatus.employee,
            manager: notifyManager ? 'sent' : r.remindersStatus.manager
          }
        };
      });

      if (processedNames.length === 0) {
        toast.info("Sweep Finished: No pending reminders found.", {
          description: "All upcoming reviews are already fully notified for today."
        });
      } else {
        toast.success("Automated Reminders Swept Successfully!", {
          description: `Dispatched ${processedNames.length * ((notifyEmployee ? 1 : 0) + (notifyManager ? 1 : 0))} notification alerts securely.`
        });
      }

      setReviews(updatedReviews);
      setLogs([...newLogs, ...logs]);
      setIsSimulating(false);
    }, 1200);
  };

  const handleSingleItemOverride = (item: ReviewItem, event: React.MouseEvent) => {
    event.stopPropagation();
    const channelsUsed = Object.keys(activeChannels).filter(c => activeChannels[c as keyof typeof activeChannels]);

    toast.success(`Manual Dispatch: Reminders sent for ${item.name}`, {
      description: `Targeting: ${item.name} (EE) and ${item.manager} (MGR) immediately.`,
      duration: 3500
    });

    const overrideLog: LogEntry = {
      id: `log-manual-${Date.now()}`,
      time: 'Just now',
      event: `[Manual Sync Key Trigger] Sent Q2 evaluation reminder to ${item.name} & ${item.manager}`,
      type: item.type.includes('Feedback') ? 'feedback' : 'review',
      channels: channelsUsed,
      status: 'sent'
    };

    setReviews(prev => prev.map(r => r.id === item.id ? { ...r, remindersStatus: { employee: 'sent', manager: 'sent' } } : r));
    setLogs(prev => [overrideLog, ...prev]);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Performance & OKRs</h1>
          <p className="text-muted-foreground mt-1">Track organization goals, individual performance, and feedback cycles.</p>
        </div>
        <Button className="bg-primary flex items-center gap-2">
          <Target className="h-4 w-4" />
          Set New Goal
        </Button>
      </div>

      {/* Main Grid: OKRs & Top Performers */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 bg-card/50 border-border">
          <CardHeader>
            <CardTitle>Organization OKRs - Q2 2026</CardTitle>
            <CardDescription>Quarterly objectives and key results progress.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="space-y-3">
              <div className="flex justify-between items-center text-sm font-bold uppercase tracking-tight">
                <span>Infrastructure Scaling (Capacity x2)</span>
                <span className="text-primary">82%</span>
              </div>
              <Progress value={82} className="h-2 bg-primary/10" />
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center text-sm font-bold uppercase tracking-tight">
                <span>Employee Satisfaction {'>'} 4.5/5</span>
                <span className="text-emerald-500">94%</span>
              </div>
              <Progress value={94} className="h-2 bg-emerald-500/10" />
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center text-sm font-bold uppercase tracking-tight">
                <span>Market Share Expansion (APAC)</span>
                <span className="text-orange-500">45%</span>
              </div>
              <Progress value={45} className="h-2 bg-orange-500/10" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 border-border">
          <CardHeader>
            <CardTitle>Top Performers</CardTitle>
            <CardDescription>Recognition based on peer feedback.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { name: 'Sarah Chen', score: '4.9/5', badge: 'Leadership' },
              { name: 'Marcus Thorne', score: '4.8/5', badge: 'Innovation' },
              { name: 'Elena Rodriguez', score: '4.8/5', badge: 'Collaboration' },
            ].map((p, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-secondary/30 border border-border">
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>{p.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-bold leading-none">{p.name}</p>
                    <p className="text-[10px] text-muted-foreground mt-1 uppercase tracking-widest">{p.badge}</p>
                  </div>
                </div>
                <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20">{p.score}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Reminder Automation Center Hub */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Automation Controls Column */}
        <Card className="lg:col-span-2 bg-[#0d0d0d]/80 border-primary/20 shadow-2xl shadow-primary/5">
          <CardHeader className="border-b border-border/50 pb-4">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-primary/10 rounded-lg text-primary">
                <Sliders className="h-5 w-5" />
              </div>
              <div>
                <CardTitle className="text-xl">Reminder Automation Hub</CardTitle>
                <CardDescription>Autopilot schedules for upcoming reviews & missing feedback alerts.</CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-6 space-y-6">
            {/* Rule settings selectors */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block">
                  Performance Review Trigger Time
                </label>
                <div className="flex rounded-md bg-secondary/30 p-1 border border-border">
                  {[
                    { val: '7', label: '7d Before' },
                    { val: '3', label: '3d Before' },
                    { val: '1', label: '1d Before' }
                  ].map(item => (
                    <button
                      key={item.val}
                      onClick={() => setTriggerCadence(item.val as any)}
                      className={cn(
                        "flex-1 text-xs py-1.5 font-bold uppercase transition-all rounded",
                        triggerCadence === item.val 
                          ? "bg-primary text-black" 
                          : "text-muted-foreground hover:text-white"
                      )}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block">
                  Feedback Deadline Warning Time
                </label>
                <div className="flex rounded-md bg-secondary/30 p-1 border border-border">
                  {[
                    { val: '48', label: '48h Prior' },
                    { val: '24', label: '24h Prior' },
                    { val: '12', label: '12h Prior' }
                  ].map(item => (
                    <button
                      key={item.val}
                      onClick={() => setFeedbackDeadlineHours(item.val as any)}
                      className={cn(
                        "flex-1 text-xs py-1.5 font-bold uppercase transition-all rounded",
                        feedbackDeadlineHours === item.val 
                          ? "bg-primary text-black" 
                          : "text-muted-foreground hover:text-white"
                      )}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Recipient Role toggles & Channel controls */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 border-t border-border/40">
              <div className="space-y-3">
                <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block">
                  Alert Targets (Recipients)
                </label>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setNotifyEmployee(!notifyEmployee)}
                    className={cn(
                      "flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-bold transition-all",
                      notifyEmployee 
                        ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400 font-bold" 
                        : "border-border bg-white/5 text-muted-foreground"
                    )}
                  >
                    <Users className="h-3 w-3" />
                    Employee (Reviewee)
                  </button>
                  <button
                    onClick={() => setNotifyManager(!notifyManager)}
                    className={cn(
                      "flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-bold transition-all",
                      notifyManager 
                        ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400 font-bold" 
                        : "border-border bg-white/5 text-muted-foreground"
                    )}
                  >
                    <Award className="h-3 w-3" />
                    Manager (Reviewer)
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block">
                  Communication Channels
                </label>
                <div className="flex gap-2">
                  {[
                    { id: 'email', label: 'Email Outbox', icon: <Mail className="h-3.5 w-3.5" /> },
                    { id: 'slack', label: 'Slack Alert', icon: <MessageSquare className="h-3.5 w-3.5" /> },
                    { id: 'inApp', label: 'In-App Alerts', icon: <Bell className="h-3.5 w-3.5" /> }
                  ].map(channel => (
                    <button
                      key={channel.id}
                      onClick={() => setActiveChannels({
                        ...activeChannels,
                        [channel.id]: !activeChannels[channel.id as keyof typeof activeChannels]
                      })}
                      className={cn(
                        "flex items-center justify-center gap-1.5 flex-1 py-1.5 px-2.5 rounded-lg border text-[11px] font-bold uppercase transition-all",
                        activeChannels[channel.id as keyof typeof activeChannels]
                          ? "border-primary/30 bg-primary/10 text-primary"
                          : "border-border bg-white/5 text-muted-foreground"
                      )}
                    >
                      {channel.icon}
                      <span className="sr-only sm:not-sr-only text-[9px]">{channel.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Template dynamic preview console */}
            <div className="pt-4 border-t border-border/40 space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block">
                  Broadcast Template Preset
                </label>
                <div className="flex gap-2 bg-secondary/20 p-0.5 rounded border border-border">
                  {[
                    { key: 'review', label: 'Reviews' },
                    { key: 'feedback', label: 'Deadlines' },
                    { key: 'checkin', label: 'OKR Alignment' }
                  ].map(type => (
                    <button
                      key={type.key}
                      onClick={() => handleTemplatePresetChange(type.key as any)}
                      className={cn(
                        "text-[9px] px-2 py-1 font-bold uppercase transition-all rounded",
                        templateType === type.key 
                          ? "bg-secondary text-white" 
                          : "text-muted-foreground hover:text-white"
                      )}
                    >
                      {type.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2 p-4 rounded-xl bg-card border border-border">
                <div className="space-y-1">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground">Notification Subject</span>
                  <input
                    type="text"
                    value={subjectInput}
                    onChange={(e) => setSubjectInput(e.target.value)}
                    className="w-full text-xs font-semibold bg-white/5 border border-white/5 rounded px-2.5 py-1.5 focus:border-primary/50 text-white outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground">Notification Template Body</span>
                  <textarea
                    rows={4}
                    value={bodyInput}
                    onChange={(e) => setBodyInput(e.target.value)}
                    className="w-full text-xs font-mono bg-white/5 border border-white/5 rounded p-2.5 focus:border-primary/50 text-white outline-none leading-relaxed resize-none"
                  />
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[8px] text-muted-foreground uppercase font-bold tracking-widest">Live Tags:</span>
                  {['{Name}', '{Manager}', '{Date}', '{campaign}'].map(tag => (
                    <span key={tag} className="text-[8px] font-mono px-1.5 py-0.5 rounded bg-primary/10 text-primary border border-primary/10">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Strategy Hub deploy controls */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-border/40">
              <div className="flex items-center gap-2 text-[10px] text-muted-foreground uppercase font-bold tracking-widest">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                Automatic Daemon Engine Connected
              </div>
              <div className="flex gap-2 w-full sm:w-auto">
                <Button 
                  onClick={handleSaveSettings}
                  disabled={isSaving}
                  variant="outline"
                  className="flex-1 sm:flex-none text-xs h-9 uppercase font-bold"
                >
                  <Settings className="h-3.5 w-3.5 mr-1" />
                  {isSaving ? "Saving..." : "Deploy Settings"}
                </Button>

                <Button 
                  onClick={handleRunBackupScan}
                  disabled={isSimulating}
                  className="flex-1 sm:flex-none text-xs h-9 uppercase font-bold bg-primary text-black hover:bg-primary/90"
                >
                  <RefreshCw className={cn("h-3.5 w-3.5 mr-1", isSimulating && "animate-spin")} />
                  {isSimulating ? "Running Cron Dispatch..." : "Run Automated Sweep now"}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Live Dispatched Logs & Metrics */}
        <Card className="bg-[#0b0b0b] border-border flex flex-col h-full justify-between overflow-hidden">
          <CardHeader className="border-b border-border/50 pb-4 bg-white/[0.01]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <History className="h-4 w-4 text-primary" />
                <CardTitle className="text-sm uppercase tracking-widest font-bold">Automation Telemetry</CardTitle>
              </div>
              <Badge variant="outline" className="text-[9px] bg-primary/10 border-none font-bold text-primary">LIVE FLOW</Badge>
            </div>
          </CardHeader>

          <CardContent className="p-0 overflow-y-auto max-h-[360px] flex-1 divide-y divide-border">
            {logs.map((log) => (
              <div key={log.id} className="p-4 hover:bg-white/[0.01] transition-all space-y-1.5">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {log.channels.map(ch => (
                      <Badge key={ch} variant="outline" className="text-[7px] uppercase font-bold tracking-widest border-none px-1 bg-white/5 text-muted-foreground mr-1">
                        {ch}
                      </Badge>
                    ))}
                  </div>
                  <span className="text-[8px] font-mono font-bold text-muted-foreground">{log.time}</span>
                </div>
                <p className="text-xs text-secondary-foreground font-medium leading-relaxed">{log.event}</p>
                <div className="flex items-center justify-between pt-1">
                  <span className="text-[8px] uppercase tracking-wider text-muted-foreground font-semibold">
                    Target: {log.type === 'review' ? 'Review Cycle' : 'Feedback Cycle'}
                  </span>
                  <span className="text-[8px] text-emerald-400 font-mono font-bold uppercase tracking-widest flex items-center gap-1">
                    <CheckCircle2 className="h-2 w-2" /> SENT
                  </span>
                </div>
              </div>
            ))}
          </CardContent>

          <div className="p-4 border-t border-border/50 bg-white/[0.02] space-y-2">
            <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
              <span>Total Automated Reminders Today</span>
              <span className="text-primary font-mono">{logs.filter(l => l.status === 'sent').length * 2} Dispatched</span>
            </div>
            <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
              <span>Next Routine Cron Sweep</span>
              <span className="font-mono text-white flex items-center gap-1">
                <Clock className="h-3 w-3 text-muted-foreground" /> In 20h 27m
              </span>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Recents 360 Feedback (Static for overview) */}
        <Card className="bg-card/50 border-border">
          <CardHeader>
            <CardTitle>Recent 360 Feedback</CardTitle>
            <CardDescription>Feedback submitted in the last 24 hours.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-4 p-4 rounded-xl bg-primary/5 border border-primary/10">
              <MessageSquare className="h-5 w-5 text-primary shrink-0 mt-1" />
              <div>
                <p className="text-sm font-medium italic">"Exceptional leadership during the Q2 infrastructure migration. Handled the crisis with calm and precision."</p>
                <p className="text-xs text-muted-foreground mt-2">— Anonymous Peer Feedback for <span className="text-primary font-bold">Sarah Chen</span></p>
              </div>
            </div>
            <div className="flex gap-4 p-4 rounded-xl bg-orange-500/5 border border-orange-500/10">
              <MessageSquare className="h-5 w-5 text-orange-500 shrink-0 mt-1" />
              <div>
                <p className="text-sm font-medium italic">"Strong individual contributor. Could improve on proactive communication with the product team."</p>
                <p className="text-xs text-muted-foreground mt-2">— Manager Feedback for <span className="text-orange-500 font-bold">David Kim</span></p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Reviews with Live reminders triggers */}
        <Card className="bg-card/50 border-border h-full flex flex-col">
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <div>
              <CardTitle>Active Reviews & Deadlines</CardTitle>
              <CardDescription>Scheduled performance discussions with automated triggers.</CardDescription>
            </div>
            <TooltipWrapper text="These events automatically fire emails & Slack notifications according to the automation hub timing rules.">
              <Badge variant="outline" className="text-[9px] uppercase font-bold tracking-widest text-primary border-primary/20 bg-primary/5">
                BOUND TO AUTOMATION
              </Badge>
            </TooltipWrapper>
          </CardHeader>

          <CardContent className="p-0 flex-1 divide-y divide-border">
            {reviews.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-4 hover:bg-secondary/20 transition-all group gap-4">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-black transform transition-all shadow-md shadow-primary/5">
                    <Target className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-foreground leading-none">{item.name}</p>
                    <p className="text-[10px] text-muted-foreground mt-1 tracking-wider uppercase flex items-center gap-1.5">
                      {item.type} <span className="inline-block h-1 w-1 bg-white/20 rounded-full" /> Mgr: <span className="font-semibold text-white/70">{item.manager}</span>
                    </p>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-1.5">
                  <div className="flex items-center gap-1.5">
                    {/* Employee reminder state */}
                    {item.remindersStatus.employee === 'sent' ? (
                      <Badge className="bg-emerald-500/10 text-emerald-400 border-none text-[8px] flex items-center gap-1 font-mono uppercase tracking-widest px-1 py-0.5 whitespace-nowrap">
                        <CheckCircle2 className="h-2.5 w-2.5" /> EE Sent
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="border-border text-muted-foreground bg-neutral-900/30 text-[8px] flex items-center gap-1 font-mono uppercase tracking-widest px-1 py-0.5 whitespace-nowrap">
                        <Clock className="h-2.5 w-2.5" /> EE Scheduled
                      </Badge>
                    )}

                    {/* Manager reminder state */}
                    {item.remindersStatus.manager === 'sent' ? (
                      <Badge className="bg-emerald-500/10 text-emerald-400 border-none text-[8px] flex items-center gap-1 font-mono uppercase tracking-widest px-1 py-0.5 whitespace-nowrap">
                        <CheckCircle2 className="h-2.5 w-2.5" /> MGR Sent
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="border-border text-muted-foreground bg-neutral-900/30 text-[8px] flex items-center gap-1 font-mono uppercase tracking-widest px-1 py-0.5 whitespace-nowrap">
                        <Clock className="h-2.5 w-2.5" /> MGR Scheduled
                      </Badge>
                    )}

                    {/* Prompt Manual Single Dispatch button */}
                    <div className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button 
                        size="icon" 
                        variant="ghost" 
                        onClick={(e) => handleSingleItemOverride(item, e)}
                        className="h-6 w-6 text-primary hover:bg-primary hover:text-black rounded"
                        title="Force Immediate Push alert"
                      >
                        <Bell className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  <span className="text-[9px] uppercase font-mono tracking-widest text-[#00e1ff]">{item.date}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Simple internal helper wrapper for clarity
function TooltipWrapper({ children, text }: { children: React.ReactNode; text: string }) {
  return (
    <div className="relative group/tooltip">
      {children}
      <div className="absolute right-0 bottom-full mb-2 w-64 p-2 bg-neutral-950 border border-border rounded text-[9px] text-[#cccccc] opacity-0 pointer-events-none group-hover/tooltip:opacity-100 transition-all z-50 leading-relaxed shadow-xl font-normal">
        {text}
      </div>
    </div>
  );
}
