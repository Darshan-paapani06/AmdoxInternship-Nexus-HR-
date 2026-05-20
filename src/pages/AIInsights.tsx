import React, { useState } from 'react';
import { 
  BrainCircuit, 
  Sparkles, 
  AlertTriangle, 
  TrendingUp, 
  Target, 
  MessageSquare,
  Send,
  Zap,
  BarChart3
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Tooltip,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';

const attritionData = [
  { name: 'Stable', value: 85 },
  { name: 'Moderate Risk', value: 10 },
  { name: 'High Risk', value: 5 },
];

const skillData = [
  { subject: 'Cloud Arch', A: 120, fullMark: 150 },
  { subject: 'React/TS', A: 98, fullMark: 150 },
  { subject: 'System Design', A: 86, fullMark: 150 },
  { subject: 'Leadership', A: 99, fullMark: 150 },
  { subject: 'DevOps', A: 85, fullMark: 150 },
  { subject: 'Agile', A: 65, fullMark: 150 },
];

const COLORS = ['oklch(0.7 0.2 155)', 'oklch(0.6 0.15 155)', 'oklch(0.6 0.2 25)'];

export default function AIInsights() {
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState([
    { role: 'ai', content: 'Hello! I am Nexus AI. I have analyzed current workforce trends. Would you like to see the attrition risk forecast for the Engineering department?' }
  ]);

  const handleSendMessage = () => {
    if (!chatInput.trim()) return;
    setMessages(prev => [...prev, { role: 'user', content: chatInput }]);
    setChatInput('');
    // Mock AI response
    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'ai', content: "Analyzing current data... I've found an increasing burnout signal in the QA team over the last 3 weeks. I recommend scheduling 1-on-1s and checking workload distribution." }]);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/20">
            <BrainCircuit className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight italic">Nexus AI Intelligence</h1>
            <p className="text-muted-foreground mt-1 underline-offset-4 decoration-primary/30">Predictive workforce analytics and generative HR assistance.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Attrition Risk Analysis */}
        <Card className="bg-card/40 backdrop-blur-xl border-primary/20 relative overflow-hidden shadow-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-primary" />
              Attrition Forecaster
            </CardTitle>
            <CardDescription>Predictive risk score for the next quarter.</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={attritionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {attritionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-2xl font-bold text-emerald-500">85%</span>
              <span className="text-[10px] uppercase font-bold text-muted-foreground">Retention</span>
            </div>
          </CardContent>
          <div className="p-4 bg-primary/5 border-t border-primary/10">
            <div className="flex justify-between items-center text-xs font-bold uppercase tracking-widest text-primary">
              <span>Risk Severity: LOW</span>
              <div className="flex gap-1">
                <div className="h-1.5 w-4 rounded-full bg-primary" />
                <div className="h-1.5 w-4 rounded-full bg-primary/20" />
                <div className="h-1.5 w-4 rounded-full bg-primary/20" />
              </div>
            </div>
          </div>
        </Card>

        {/* Skill Intensity & Gap Analysis */}
        <Card className="bg-[#0d0d0d] border border-border flex flex-col">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-4 w-4 text-primary" />
                  Skill Intensity Radar
                </CardTitle>
                <CardDescription>Organization-wide core competency analysis.</CardDescription>
              </div>
              <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20">9 NEW GAPS</Badge>
            </div>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={skillData}>
                <PolarGrid stroke="hsl(var(--muted-foreground))" strokeOpacity={0.2} />
                <PolarAngleAxis dataKey="subject" tick={{fill: 'currentColor', fontSize: 10, opacity: 0.6}} />
                <Radar
                  name="Proficiency"
                  dataKey="A"
                  stroke="hsl(var(--primary))"
                  fill="hsl(var(--primary))"
                  fillOpacity={0.4}
                />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
          <div className="p-4 border-t border-border bg-[#111]/50">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Global Avg</p>
                <p className="text-sm font-bold">78.4%</p>
              </div>
              <div className="space-y-1 text-right">
                <p className="text-[10px] font-black text-primary uppercase tracking-widest">Industry Benchmark</p>
                <p className="text-sm font-bold">82.1%</p>
              </div>
            </div>
          </div>
        </Card>

        {/* AI Assistant Chat */}
        <Card className="bg-card/60 border-primary/30 flex flex-col h-[500px] lg:h-full row-span-2 overflow-hidden shadow-2xl shadow-primary/5">
          <CardHeader className="bg-primary/5 border-b border-primary/20 pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary animate-pulse" />
                <CardTitle className="text-lg">Nexus Assistant</CardTitle>
              </div>
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">LIVE</Badge>
            </div>
          </CardHeader>
          <CardContent className="flex-1 p-0 flex flex-col overflow-hidden">
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((m, i) => (
                  <div key={i} className={cn("flex flex-col gap-1", m.role === 'user' ? "items-end" : "items-start")}>
                    <div className={cn(
                      "px-4 py-2 rounded-2xl max-w-[85%] text-sm",
                      m.role === 'user' ? "bg-primary text-primary-foreground rounded-tr-none" : "bg-secondary border border-border rounded-tl-none"
                    )}>
                      {m.content}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            <div className="p-4 border-t border-border bg-card/50">
              <div className="flex gap-2">
                <Input 
                  placeholder="Ask Nexus about your workforce..." 
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="bg-background/50 border-border focus-visible:ring-primary"
                />
                <Button size="icon" onClick={handleSendMessage}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-[10px] text-muted-foreground mt-2 text-center">Nexus AI uses real-time behavioral data to generate insights.</p>
            </div>
          </CardContent>
        </Card>

        {/* Recommendations Column */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
           <Card className="bg-gradient-to-br from-primary/10 to-transparent border-primary/20">
             <CardHeader className="pb-2">
               <CardTitle className="text-sm font-bold flex items-center gap-2 uppercase tracking-tight">
                 <AlertTriangle className="h-4 w-4 text-primary" />
                 Engagement Intervention
               </CardTitle>
             </CardHeader>
             <CardContent>
               <p className="text-sm text-balance">The Sales team engagement score dropped <span className="text-primary font-bold">14%</span> this week. Nexus recommends an immediate pulse survey.</p>
               <Button variant="link" className="px-0 text-xs text-primary font-bold h-auto mt-2">DEPLOY PULSE SURVEY</Button>
             </CardContent>
           </Card>

           <Card className="bg-gradient-to-br from-purple-500/10 to-transparent border-purple-500/20">
             <CardHeader className="pb-2">
               <CardTitle className="text-sm font-bold flex items-center gap-2 uppercase tracking-tight text-purple-400">
                 <Target className="h-4 w-4" />
                 Skill Gap Alert
               </CardTitle>
             </CardHeader>
             <CardContent>
               <p className="text-sm text-balance">Engineering lacks <span className="font-bold text-purple-400">Kubernetes Core</span> proficiency for upcoming Q3 projects.</p>
               <Button variant="link" className="px-0 text-xs text-purple-400 font-bold h-auto mt-2">SCHEDULE TRAINING</Button>
             </CardContent>
           </Card>
        </div>
      </div>
      {/* Strategic AI Recommendations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-12">
        <Card className="bg-[#0d0d0d] border-l-4 border-l-primary border-y border-r border-[#1a1a1a] rounded-xl overflow-hidden">
          <CardHeader>
            <CardTitle className="text-sm font-black uppercase tracking-widest text-primary">Strategic Upskilling</CardTitle>
            <CardDescription className="text-xs">AI-identified training opportunities based on skill gaps.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-primary/5 border border-primary/10 rounded-lg">
              <p className="text-sm font-bold mb-1">Cloud Architecture Boot Camp</p>
              <p className="text-xs text-muted-foreground leading-relaxed">Target: Engineering & DevOps Teams. Expected ROI: 22% reduction in cloud latency/cost across Q4.</p>
              <Button variant="link" className="text-primary p-0 h-auto text-[10px] mt-2 font-black uppercase">Assign Training Pathway</Button>
            </div>
            <div className="p-4 bg-white/5 border border-white/10 rounded-lg">
              <p className="text-sm font-bold mb-1">AI-Driven HR Management Certification</p>
              <p className="text-xs text-muted-foreground leading-relaxed">Target: People Ops. Prepares team for Nexus AI v5 rollout in August.</p>
              <Button variant="link" className="text-primary p-0 h-auto text-[10px] mt-2 font-black uppercase">Assign Training Pathway</Button>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#0d0d0d] border border-border rounded-xl overflow-hidden">
          <CardHeader>
            <CardTitle className="text-sm font-black uppercase tracking-widest text-muted-foreground">Strategic Hiring Pulse</CardTitle>
            <CardDescription className="text-xs">Talent acquisition targets to bridge critical capability voids.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-lg">
              <div>
                <p className="text-sm font-bold">Principal AI Scientist</p>
                <p className="text-[10px] text-muted-foreground">Priority: <span className="text-red-500 font-bold uppercase">CRITICAL</span></p>
              </div>
              <Button size="sm" className="bg-primary text-black font-bold h-7 rounded-md text-[10px]">OPEN REQ</Button>
            </div>
            <div className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-lg">
              <div>
                <p className="text-sm font-bold">Product Lead - Security</p>
                <p className="text-[10px] text-muted-foreground">Priority: <span className="text-orange-500 font-bold uppercase">HIGH</span></p>
              </div>
              <Button size="sm" className="bg-primary text-black font-bold h-7 rounded-md text-[10px]">OPEN REQ</Button>
            </div>
            <div className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-lg">
              <div>
                <p className="text-sm font-bold">Data Privacy Lawyer</p>
                <p className="text-[10px] text-muted-foreground">Priority: <span className="text-muted-foreground font-bold uppercase">STABLE</span></p>
              </div>
              <Button size="sm" className="bg-primary text-black font-bold h-7 rounded-md text-[10px]">OPEN REQ</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
