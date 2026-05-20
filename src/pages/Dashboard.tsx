import React, { useState, useEffect, useMemo } from 'react';
import { 
  Users, 
  TrendingDown, 
  TrendingUp, 
  Clock, 
  DollarSign, 
  BrainCircuit,
  ArrowUpRight,
  ArrowDownRight,
  ShieldCheck,
  Check
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from 'recharts';
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

const stats = [
  { label: 'Total Employees', value: '12,482', change: '+2.4%', icon: Users, trend: 'up' },
  { label: 'Monthly Attrition', value: '0.8%', change: '-0.3%', icon: TrendingDown, trend: 'down' },
  { label: 'Avg. Attendance', value: '94.2%', change: '+1.1%', icon: Clock, trend: 'up' },
  { label: 'Payroll Budget', value: '$28.4M', change: '+4.2%', icon: DollarSign, trend: 'up' },
];

const revenueData = [
  { month: 'Jan', value: 4000 },
  { month: 'Feb', value: 3000 },
  { month: 'Mar', value: 2000 },
  { month: 'Apr', value: 2780 },
  { month: 'May', value: 1890 },
  { month: 'Jun', value: 2390 },
  { month: 'Jul', value: 3490 },
];

const departmentData = [
  { name: 'Eng', count: 420 },
  { name: 'Product', count: 180 },
  { name: 'Sales', count: 320 },
  { name: 'HR', count: 95 },
  { name: 'Ops', count: 240 },
];

export default function Dashboard() {
  const [onboardings, setOnboardings] = useState<any[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('nexushr_onboardings');
      if (stored) {
        setOnboardings(JSON.parse(stored));
      } else {
        // Fallback or default list
        setOnboardings([
          {
            id: '1',
            name: 'Sarah Chen',
            role: 'Head of Engineering',
            tasks: [
              { dept: 'HR', status: 'completed' },
              { dept: 'HR', status: 'completed' },
              { dept: 'HR', status: 'completed' },
              { dept: 'HR', status: 'todo' },
              { dept: 'IT', status: 'completed' },
              { dept: 'IT', status: 'completed' },
              { dept: 'IT', status: 'completed' },
              { dept: 'IT', status: 'todo' },
              { dept: 'Manager', status: 'completed' },
              { dept: 'Manager', status: 'todo' },
            ]
          },
          {
            id: '2',
            name: 'Marcus Vance',
            role: 'Security Engineer',
            tasks: [
              { dept: 'HR', status: 'completed' },
              { dept: 'HR', status: 'todo' },
              { dept: 'IT', status: 'todo' },
            ]
          },
          {
            id: '3',
            name: 'Elena Rostova',
            role: 'Senior PM Lead',
            tasks: [
              { dept: 'HR', status: 'completed' },
              { dept: 'HR', status: 'completed' },
              { dept: 'HR', status: 'completed' },
              { dept: 'HR', status: 'completed' },
              { dept: 'IT', status: 'completed' },
              { dept: 'IT', status: 'completed' },
              { dept: 'IT', status: 'completed' },
              { dept: 'IT', status: 'completed' },
              { dept: 'Manager', status: 'todo' },
            ]
          }
        ]);
      }
    } catch {
      // safe fallback
    }
  }, []);

  const stageStats = useMemo(() => {
    let hrPending = 0;
    let itProcessing = 0;
    let managerSync = 0;
    let fullyBoarded = 0;

    onboardings.forEach(candidate => {
      const hasIncompleteHR = candidate.tasks?.some((t: any) => t.dept === 'HR' && t.status !== 'completed');
      const hasIncompleteIT = candidate.tasks?.some((t: any) => t.dept === 'IT' && t.status !== 'completed');
      const hasIncompleteManager = candidate.tasks?.some((t: any) => t.dept === 'Manager' && t.status !== 'completed');

      if (hasIncompleteHR) {
        hrPending++;
      } else if (hasIncompleteIT) {
        itProcessing++;
      } else if (hasIncompleteManager) {
        managerSync++;
      } else {
        fullyBoarded++;
      }
    });

    return { hrPending, itProcessing, managerSync, fullyBoarded, total: onboardings.length };
  }, [onboardings]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Workforce Overview</h1>
          <p className="text-muted-foreground mt-1">Real-time intelligence and core HR metrics for NexusHR Enterprise.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">Export PDF</Button>
          <Button className="bg-primary text-primary-foreground shadow-lg shadow-primary/20">Generate Report</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-[#0d0d0d] border border-[#1a1a1a] p-5 rounded-xl hover:border-primary/30 transition-all">
          <div className="text-muted-foreground text-[10px] font-bold uppercase tracking-widest mb-1">Total Workforce</div>
          <div className="flex items-end justify-between">
            <div className="text-3xl font-bold">12,482</div>
            <div className="text-primary text-sm flex items-center gap-1 font-medium">
              +2.4% <TrendingUp className="h-3 w-3" />
            </div>
          </div>
        </Card>
        <Card className="bg-[#0d0d0d] border border-[#1a1a1a] p-5 rounded-xl hover:border-primary/30 transition-all">
          <div className="text-muted-foreground text-[10px] font-bold uppercase tracking-widest mb-1">Attrition Risk</div>
          <div className="flex items-end justify-between">
            <div className="text-3xl font-bold">4.2%</div>
            <div className="text-primary text-sm flex items-center gap-1 font-medium">
              -0.8% <TrendingDown className="h-3 w-3" />
            </div>
          </div>
        </Card>
        <Card className="bg-[#0d0d0d] border-l-4 border-l-primary border-y border-r border-[#1a1a1a] p-5 rounded-xl hover:border-primary/30 transition-all">
          <div className="text-muted-foreground text-[10px] font-bold uppercase tracking-widest mb-1">Engagement Score</div>
          <div className="flex items-end justify-between">
            <div className="text-3xl font-bold">88%</div>
            <Badge className="bg-primary/20 text-primary text-[10px] px-1.5 rounded border-none font-bold">EXCELLENT</Badge>
          </div>
        </Card>
        <Card className="bg-[#0d0d0d] border border-[#1a1a1a] p-5 rounded-xl hover:border-primary/30 transition-all">
          <div className="text-muted-foreground text-[10px] font-bold uppercase tracking-widest mb-1">Monthly Payroll</div>
          <div className="flex items-end justify-between">
            <div className="text-3xl font-bold">$14.2M</div>
            <div className="text-muted-foreground text-xs uppercase font-bold tracking-tighter">Stable</div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1">
        <Card className="lg:col-span-2 bg-[#0d0d0d] border border-border rounded-xl flex flex-col p-0 overflow-hidden">
          <div className="p-6 border-b border-border flex items-center justify-between">
            <h3 className="font-bold text-lg">Workforce Growth & Sentiment Analysis</h3>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" className="bg-border/30 text-xs py-1 h-8">12 Months</Button>
              <Button size="sm" className="bg-primary text-black text-xs font-bold py-1 h-8">30 Days</Button>
            </div>
          </div>
          <div className="p-6 h-[350px] relative">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: 'currentColor', opacity: 0.5, fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: 'currentColor', opacity: 0.5, fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'black', border: '1px solid hsl(var(--primary)/20)', borderRadius: '8px', backdropBlur: 'md' }}
                  itemStyle={{ color: 'hsl(var(--primary))' }}
                />
                <Area type="monotone" dataKey="value" stroke="hsl(var(--primary))" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
              </AreaChart>
            </ResponsiveContainer>
            <div className="absolute top-12 left-1/2 -translate-x-1/2 bg-black/80 backdrop-blur-md border border-primary/30 p-4 rounded-xl text-xs shadow-2xl z-20 max-w-[200px]">
              <div className="font-black uppercase tracking-widest text-primary mb-1">AI Projection</div>
              <p className="text-muted-foreground leading-relaxed">Sentiment rising by <span className="text-primary font-bold">12%</span> following Q3 Bonus rollout strategy.</p>
            </div>
          </div>
        </Card>

        <Card className="bg-[#0d0d0d] border border-border rounded-xl flex flex-col p-0 overflow-hidden">
          <div className="p-6 border-b border-border">
            <h3 className="font-bold text-lg">Critical AI Alerts</h3>
          </div>
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              <div className="p-4 bg-primary/5 border border-primary/20 rounded-xl relative group">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  <span className="text-[10px] font-bold text-primary uppercase tracking-widest">High Attrition Risk</span>
                </div>
                <div className="text-sm font-bold">Sarah Chen — Senior Engineer</div>
                <div className="text-xs text-muted-foreground mt-2 leading-relaxed">Predictive score: 88%. Burnout risk detected in last 14 days activity logs behavior.</div>
                <Button className="mt-4 w-full bg-primary text-black font-bold text-[10px] py-1 h-7 rounded-md">INITIATE RETENTION PLAN</Button>
              </div>

              <div className="p-4 bg-orange-500/5 border border-orange-500/20 rounded-xl">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-2 h-2 rounded-full bg-orange-500" />
                  <span className="text-[10px] font-bold text-orange-500 uppercase tracking-widest">Skill Gap Detected</span>
                </div>
                <div className="text-sm font-bold">Operations Team</div>
                <div className="text-xs text-muted-foreground mt-2 leading-relaxed">Team is 40% below target for Cloud Native proficiency metrics. Training suggested.</div>
              </div>

              <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-2 h-2 rounded-full bg-muted-foreground" />
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">New Insight</span>
                </div>
                <div className="text-sm font-bold">Remote Work Efficiency</div>
                <div className="text-xs text-muted-foreground mt-2 leading-relaxed">Productivity spikes 15% on Tuesdays/Thursdays during deep-focus hours.</div>
              </div>
            </div>
          </ScrollArea>
        </Card>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <Card className="bg-card/50 backdrop-blur-sm border-border">
          <CardHeader>
            <CardTitle>Department Headcount</CardTitle>
          </CardHeader>
          <CardContent className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={departmentData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="hsl(var(--border))" />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" width={80} axisLine={false} tickLine={false} tick={{fill: 'currentColor', opacity: 0.7, fontSize: 12}} />
                <Tooltip 
                   cursor={{fill: 'hsl(var(--primary) / 0.1)'}}
                   contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '8px' }}
                />
                <Bar dataKey="count" radius={[0, 4, 4, 0]}>
                  {departmentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={`hsl(var(--primary) / ${1 - index * 0.15})`} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Dynamic Card/Widget: Active Onboarding Programs Summary */}
        <Card className="bg-card/50 backdrop-blur-sm border-border flex flex-col p-5 overflow-hidden shadow-lg relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/2 rounded-full blur-2xl pointer-events-none" />
          <div className="flex items-center justify-between pb-3 border-b border-[#141414] mb-3">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-primary" />
              <span className="text-sm font-semibold text-white uppercase tracking-wider">Active Onboardings</span>
            </div>
            <span className="bg-primary/15 text-primary text-[9px] font-mono py-0.5 px-2 rounded-lg font-bold">
              {stageStats.total} TOTAL
            </span>
          </div>

          <p className="text-[11px] text-muted-foreground leading-relaxed mb-4">
            Real-time stages tracked from active new-hire checklists inside local storage:
          </p>

          <div className="space-y-3.5 flex-1 flex flex-col justify-center">
            {/* HR Stage */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground font-semibold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> HR Verification
                </span>
                <span className="font-mono text-white/90 font-bold">{stageStats.hrPending} pending</span>
              </div>
              <div className="w-full bg-white/[0.04] rounded-full h-1 overflow-hidden">
                <div 
                  className="h-full rounded-full transition-all duration-500 bg-emerald-400" 
                  style={{ width: `${stageStats.total > 0 ? (stageStats.hrPending / stageStats.total) * 100 : 0}%` }} 
                />
              </div>
            </div>

            {/* IT Stage */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground font-semibold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 anim-pulse" /> IT Provisioning
                </span>
                <span className="font-mono text-white/90 font-bold">{stageStats.itProcessing} active</span>
              </div>
              <div className="w-full bg-white/[0.04] rounded-full h-1 overflow-hidden">
                <div 
                  className="h-full rounded-full transition-all duration-500 bg-blue-400" 
                  style={{ width: `${stageStats.total > 0 ? (stageStats.itProcessing / stageStats.total) * 100 : 0}%` }} 
                />
              </div>
            </div>

            {/* Manager Stage */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground font-semibold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" /> Manager Sync
                </span>
                <span className="font-mono text-white/90 font-bold">{stageStats.managerSync} pending</span>
              </div>
              <div className="w-full bg-white/[0.04] rounded-full h-1 overflow-hidden">
                <div 
                  className="h-full rounded-full transition-all duration-500 bg-amber-400" 
                  style={{ width: `${stageStats.total > 0 ? (stageStats.managerSync / stageStats.total) * 100 : 0}%` }} 
                />
              </div>
            </div>

            {/* Fully Boarded Stage */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground font-semibold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" /> Completed
                </span>
                <span className="font-mono text-white/90 font-bold">{stageStats.fullyBoarded} certified</span>
              </div>
              <div className="w-full bg-white/[0.04] rounded-full h-1 overflow-hidden">
                <div 
                  className="h-full rounded-full transition-all duration-500 bg-primary" 
                  style={{ width: `${stageStats.total > 0 ? (stageStats.fullyBoarded / stageStats.total) * 100 : 0}%` }} 
                />
              </div>
            </div>
          </div>

          <div className="mt-3.5 pt-2 flex items-center justify-between text-[9px] font-mono text-muted-foreground border-t border-white/[0.03]">
            <span>SYSTEM-WIDE SYNC</span>
            <span className="text-emerald-400 font-bold">● ACTIVE</span>
          </div>
        </Card>

        <Card className="bg-card/50 backdrop-blur-sm border-border">
          <CardHeader>
            <CardTitle>Action Items</CardTitle>
            <CardDescription>Tasks requiring your immediate attention.</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-border">
              {[
                { title: 'Approve Payroll (May 2026)', date: 'Due in 2 days', status: 'pending' },
                { title: 'New Employee Onboarding', date: `${stageStats.total} active programs`, status: 'action' },
                { title: 'Performance Review Cycle', date: 'Closing tomorrow', status: 'urgent' },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-4 hover:bg-secondary/30 transition-colors cursor-pointer group">
                  <div>
                    <p className="font-medium">{item.title}</p>
                    <p className="text-sm text-muted-foreground">{item.date}</p>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function ChevronRight(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  )
}
