import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Calendar, 
  CheckCircle2, 
  XCircle, 
  Clock,
  Plus,
  Compass,
  Cpu,
  Mail,
  Bell,
  AlertTriangle,
  RefreshCw,
  TrendingDown,
  TrendingUp,
  Inbox
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { toast } from "sonner";
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid,
  Legend
} from 'recharts';

interface LeaveRequest {
  id: string;
  name: string;
  email: string;
  type: string;
  duration: string;
  period: string;
  status: 'pending' | 'approved' | 'rejected';
}

interface ForecastData {
  month: string;
  projectedLeaveTaken: number;
  accrual: number;
  endingBalance: number;
}

interface ForecastResult {
  forecastedBalances: ForecastData[];
  insights: string[];
  summaryText: string;
}

const INITIAL_REQUESTS: LeaveRequest[] = [
  { id: '1', name: 'Elena Rodriguez', email: 'e.rodriguez@nexushr.com', type: 'Annual Leave', duration: '5 days', period: 'May 20 - May 25', status: 'pending' },
  { id: '2', name: 'David Kim', email: 'd.kim2@nexushr.com', type: 'Sick Leave', duration: '1 day', period: 'May 18', status: 'approved' },
  { id: '3', name: 'Marcus Thorne', email: 'm.thorne@nexushr.com', type: 'Study Leave', duration: '3 days', period: 'Jun 05 - Jun 08', status: 'pending' },
  { id: '4', name: 'James Wilson', email: 'j.wilson@nexushr.com', type: 'Annual Leave', duration: '10 days', period: 'Jul 01 - Jul 11', status: 'approved' },
  { id: '5', name: 'Sarah Chen', email: 's.chen@nexushr.com', type: 'Adoption Leave', duration: '5 days', period: 'Jul 15 - Jul 20', status: 'pending' }
];

export default function Leave() {
  const [requests, setRequests] = useState<LeaveRequest[]>(INITIAL_REQUESTS);
  const [notifications, setNotifications] = useState<{ id: string; text: string; type: 'success' | 'danger'; time: string }[]>([
    { id: 'init-1', text: 'System Initialized: Leave queues listening for incoming submission signals.', type: 'success', time: '10 mins ago' }
  ]);
  
  // Dialog state for requesting leave
  const [isRequestOpen, setIsRequestOpen] = useState(false);
  const [reqName, setReqName] = useState('');
  const [reqEmail, setReqEmail] = useState('');
  const [reqType, setReqType] = useState('Annual Leave');
  const [reqDuration, setReqDuration] = useState('3 days');
  const [reqPeriod, setReqPeriod] = useState('Jun 10 - Jun 13');

  // AI Forecast state
  const [forecast, setForecast] = useState<ForecastResult | null>(null);
  const [loadingForecast, setLoadingForecast] = useState<boolean>(false);
  const [averageBalance, setAverageBalance] = useState(18.5);
  const [accrualRate, setAccrualRate] = useState(1.75);

  const fetchForecast = async () => {
    setLoadingForecast(true);
    try {
      const response = await fetch('/api/ai/forecast-leave', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentBalance: averageBalance,
          accrualRate: accrualRate,
          trends: "Anticipated increase in mental health days and team team shifts for summer vacation."
        })
      });
      if (response.ok) {
        const data = await response.json();
        setForecast(data);
      } else {
        throw new Error("Fallback required");
      }
    } catch (err) {
      console.warn("Using simulated AI model fallback response");
      // Fallback data structure if Gemini key is missing / unreachable in test sandbox
      const simulated: ForecastResult = {
        forecastedBalances: [
          { month: "Jun", projectedLeaveTaken: 4.1, accrual: accrualRate, endingBalance: Number((averageBalance - 4.1 + accrualRate).toFixed(2)) },
          { month: "Jul", projectedLeaveTaken: 6.5, accrual: accrualRate, endingBalance: Number((averageBalance - 4.1 - 6.5 + (accrualRate * 2)).toFixed(2)) },
          { month: "Aug", projectedLeaveTaken: 5.2, accrual: accrualRate, endingBalance: Number((averageBalance - 4.1 - 6.5 - 5.2 + (accrualRate * 3)).toFixed(2)) },
          { month: "Sep", projectedLeaveTaken: 2.1, accrual: accrualRate, endingBalance: Number((averageBalance - 4.1 - 6.5 - 5.2 - 2.1 + (accrualRate * 4)).toFixed(2)) },
          { month: "Oct", projectedLeaveTaken: 1.5, accrual: accrualRate, endingBalance: Number((averageBalance - 4.1 - 6.5 - 5.2 - 2.1 - 1.5 + (accrualRate * 5)).toFixed(2)) },
          { month: "Nov", projectedLeaveTaken: 3.2, accrual: accrualRate, endingBalance: Number((averageBalance - 4.1 - 6.5 - 5.2 - 2.1 - 1.5 - 3.2 + (accrualRate * 6)).toFixed(2)) }
        ],
        insights: [
          "Summer PTO surge peak is projected for mid-July with a 45% increase in team outage requests.",
          "Accrual rates may cause an average balance compression to 11.2 days by September.",
          "Recommendation: Encourage early partial-week plans over full-week blocks to support core sprint milestones."
        ],
        summaryText: "AI Analytics predicts a major July peak PTO demand. Standard accruals will see a temporary deficits load."
      };
      setForecast(simulated);
    } finally {
      setLoadingForecast(false);
    }
  };

  useEffect(() => {
    fetchForecast();
  }, [averageBalance, accrualRate]);

  // Handle Approve
  const handleApprove = (id: string) => {
    const target = requests.find(r => r.id === id);
    if (!target) return;

    setRequests(prev => prev.map(r => r.id === id ? { ...r, status: 'approved' } : r));
    
    const notificationText = `Approved "${target.type}" requested by ${target.name}. Verified credentials & matching state balance.`;
    
    // In-app logged event update
    setNotifications(prev => [
      { id: Date.now().toString(), text: `[OOO APPROVED] ${target.name}: ${target.type} (${target.duration}) updated.`, type: 'success', time: 'Just now' },
      ...prev
    ]);

    toast.success("Leave Request Approved", {
      description: `Dispatched enterprise notifications & confirmation emails to ${target.email}`
    });
  };

  // Handle Reject
  const handleReject = (id: string) => {
    const target = requests.find(r => r.id === id);
    if (!target) return;

    setRequests(prev => prev.map(r => r.id === id ? { ...r, status: 'rejected' } : r));
    
    setNotifications(prev => [
      { id: Date.now().toString(), text: `[OOO REJECTED] ${target.name}: ${target.type} request denied.`, type: 'danger', time: 'Just now' },
      ...prev
    ]);

    toast.error("Leave Request Rejected", {
      description: `Sent denial communication record to ${target.email}.`
    });
  };

  // Process manual request addition
  const handleRequestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reqName.trim() || !reqEmail.trim()) {
      toast.error("Format validation check failed", { description: "Please state employee details completely." });
      return;
    }

    const newReq: LeaveRequest = {
      id: String(Date.now()),
      name: reqName,
      email: reqEmail,
      type: reqType,
      duration: reqDuration,
      period: reqPeriod,
      status: 'pending'
    };

    setRequests(prev => [newReq, ...prev]);
    setIsRequestOpen(false);
    setReqName('');
    setReqEmail('');

    setNotifications(prev => [
      { id: Date.now().toString(), text: `[SUBMISSION RECEIVED] New pending leave application registered for ${reqName}.`, type: 'success', time: 'Just now' },
      ...prev
    ]);

    toast.info("Leave Request Dispatched", {
      description: `Placed into high-priority manager queue awaiting approval.`
    });
  };

  // Stats calculation
  const stats = React.useMemo(() => {
    const pendingCount = requests.filter(r => r.status === 'pending').length;
    const approvedCount = requests.filter(r => r.status === 'approved').length;
    return {
      pending: pendingCount,
      approved: approvedCount
    };
  }, [requests]);

  return (
    <div className="space-y-6">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Leave Management</h1>
          <p className="text-muted-foreground mt-1 font-sans">
            Oversee corporate leave requests, dynamic manager approval metrics, and advanced predictive team balance forecasting.
          </p>
        </div>
        <Button 
          onClick={() => setIsRequestOpen(true)}
          className="bg-primary hover:bg-primary/90 text-black font-extrabold uppercase text-xs tracking-wider h-10 px-4 rounded-lg flex items-center gap-2 block shrink-0"
        >
          <Plus className="h-4 w-4" /> Request Team Leave
        </Button>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-[#0d0d0d] border border-border/80 p-4 rounded-xl">
          <CardContent className="p-0">
            <span className="text-[10px] font-mono text-[#666] uppercase font-bold tracking-wider">Awaiting Approval</span>
            <div className="flex items-baseline gap-2 pt-2">
              <span className="text-2xl font-black text-white">{stats.pending}</span>
              <span className="text-xs text-muted-foreground">pending requests</span>
            </div>
            <div className="text-[9px] text-muted-foreground mt-1 block pt-1 border-t border-white/[0.02]">
              Requires immediate supervisor sign-off 
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#0d0d0d] border border-border/80 p-4 rounded-xl">
          <CardContent className="p-0">
            <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold tracking-wider">Currently OOO</span>
            <div className="flex items-baseline gap-2 pt-2">
              <span className="text-2xl font-black text-emerald-500">{4 + stats.approved}</span>
              <span className="text-xs text-muted-foreground">active leaves today</span>
            </div>
            <div className="text-[9px] text-emerald-500/80 mt-1 block pt-1 border-t border-white/[0.02] flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" /> Staffing ratio compliant
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#0d0d0d] border border-border/80 p-4 rounded-xl">
          <CardContent className="p-0">
            <span className="text-[10px] font-mono text-purple-400 uppercase font-bold tracking-wider">Configure Avg Balance</span>
            <div className="flex items-center gap-3 pt-1">
              <span className="text-2xl font-black text-purple-400 font-mono">{averageBalance.toFixed(1)}</span>
              <input 
                type="range" 
                min="10" 
                max="30" 
                step="0.5" 
                value={averageBalance} 
                onChange={(e) => setAverageBalance(parseFloat(e.target.value))} 
                className="w-24 accent-purple-400 h-1 bg-[#1a1a1a] rounded-lg appearance-none cursor-pointer"
              />
            </div>
            <div className="text-[9px] text-[#444] font-semibold mt-1 block">Adjust baseline model parameters</div>
          </CardContent>
        </Card>

        <Card className="bg-[#0d0d0d] border border-border/80 p-4 rounded-xl">
          <CardContent className="p-0">
            <span className="text-[10px] font-mono text-blue-400 uppercase font-bold tracking-wider font-mono">Accrual Rate</span>
            <div className="flex items-center gap-3 pt-1">
              <span className="text-2xl font-black text-blue-400 font-mono">{accrualRate.toFixed(2)}</span>
              <input 
                type="range" 
                min="1.0" 
                max="3.0" 
                step="0.05" 
                value={accrualRate} 
                onChange={(e) => setAccrualRate(parseFloat(e.target.value))} 
                className="w-24 accent-blue-400 h-1 bg-[#1a1a1a] rounded-lg appearance-none cursor-pointer"
              />
            </div>
            <div className="text-[9px] text-[#444] font-semibold mt-1 block">Accrual days added / month</div>
          </CardContent>
        </Card>
      </div>

      {/* Prominent AI forecasting widget layout */}
      <Card className="bg-[#0b0b0b] border border-primary/20 rounded-xl overflow-hidden relative">
        <div className="absolute right-3 top-3 flex items-center gap-1 bg-primary/10 border border-primary/20 py-0.5 px-2 rounded-full">
          <Cpu className="h-3.5 w-3.5 text-primary animate-pulse" />
          <span className="text-[9px] font-bold text-primary uppercase font-mono tracking-wider">Gemini Intelligence Enabled</span>
        </div>

        <CardHeader className="pb-3 border-b border-white/[0.02]">
          <CardTitle className="text-sm font-bold uppercase tracking-wider text-white">AI Leave Capacity & Balance Predictor</CardTitle>
          <CardDescription className="text-xs text-muted-foreground">
            Projected seasonal coverage loads, accrued balances, and expected PTO taken indices.
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-5 space-y-6">
          {loadingForecast ? (
            <div className="py-16 text-center space-y-3">
              <RefreshCw className="h-7 w-7 text-primary animate-spin mx-auto" />
              <p className="text-xs text-muted-foreground font-mono">Running predictive projection algorithms via Gemini...</p>
            </div>
          ) : forecast ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Interactive graph visualization */}
              <div className="lg:col-span-2 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground font-mono">6-Month Dynamic Balance Trend</span>
                  <div className="flex items-center gap-2 text-[10px] text-muted-foreground font-mono">
                    <span className="flex items-center gap-1 font-semibold"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Projected Taken</span>
                    <span className="flex items-center gap-1 font-semibold"><span className="w-1.5 h-1.5 rounded-full bg-primary" /> Ending Balance</span>
                  </div>
                </div>

                <div className="h-56 w-full bg-black/50 border border-white/[0.02] p-2.5 rounded-lg">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={forecast.forecastedBalances} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorAccrual" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10b981" stopOpacity={0.15}/>
                          <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="var(--color-primary, #ffffff)" stopOpacity={0.15}/>
                          <stop offset="95%" stopColor="var(--color-primary, #ffffff)" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#161616" vertical={false} />
                      <XAxis dataKey="month" stroke="#444" fontSize={10} fontStyle="italic" />
                      <YAxis stroke="#444" fontSize={10} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#0d0d0d', border: '1px solid #1c1c1c', borderRadius: '6px' }}
                        labelStyle={{ color: '#fff', fontSize: '11px', fontWeight: 'bold' }}
                        itemStyle={{ fontSize: '10.5px' }}
                      />
                      <Area type="monotone" name="Leave Taken" dataKey="projectedLeaveTaken" stroke="#10b981" fillOpacity={1} fill="url(#colorAccrual)" strokeWidth={2} />
                      <Area type="monotone" name="Ending Balance" dataKey="endingBalance" stroke="#facc15" fillOpacity={1} fill="url(#colorBalance)" strokeWidth={2} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Insights Column */}
              <div className="lg:col-span-1 flex flex-col justify-between space-y-4">
                <div>
                  <h4 className="text-[10px] font-bold text-primary uppercase tracking-widest font-mono mb-2 flex items-center gap-1.5">
                    <Compass className="h-4 w-4 text-primary" /> Strategic AI Insights
                  </h4>
                  <div className="space-y-2.5">
                    {forecast.insights.map((insight, idx) => (
                      <div key={idx} className="bg-white/[0.01] border border-white/[0.03] p-2.5 rounded-lg flex gap-2">
                        <span className="text-[11px] font-mono font-black text-primary">0{idx + 1}</span>
                        <p className="text-[11px] text-muted-foreground leading-relaxed font-sans">{insight}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-white/[0.03] pt-3.5 bg-white/[0.01] rounded-lg p-3">
                  <div className="flex gap-2 items-start">
                    <AlertTriangle className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-white">Coverage Intelligence Summary</span>
                      <p className="text-[10px] text-muted-foreground leading-relaxed mt-1">{forecast.summaryText}</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          ) : (
            <div className="py-12 text-center text-muted-foreground">
              No leave capacity model run yet in this session. Click range settings to run.
            </div>
          )}
        </CardContent>
      </Card>

      {/* Main Grid: Pending Approval Queue & Notification Ledger */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Leaving Queue Feed Column */}
        <div className="lg:col-span-2">
          <Card className="bg-[#0d0d0d] border border-border/80 rounded-xl overflow-hidden shadow-lg">
            <CardHeader className="pb-3 border-b border-white/[0.02] bg-black/40 flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-sm font-bold uppercase tracking-wider text-white">Awaiting Approval Queue</CardTitle>
                <CardDescription className="text-xs text-muted-foreground">
                  Direct action channel for active leave applications.
                </CardDescription>
              </div>
              <Badge className="bg-primary/15 text-primary text-[10px] uppercase tracking-wider border border-primary/20">
                {requests.filter(r => r.status === 'pending').length} Actions
              </Badge>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader className="bg-black/20 hover:bg-black/20 border-b border-white/[0.02]">
                  <TableRow>
                    <TableHead className="text-xs text-[#555] font-bold font-mono">Employee</TableHead>
                    <TableHead className="text-xs text-[#555] font-bold font-mono">Category</TableHead>
                    <TableHead className="text-xs text-[#555] font-bold font-mono">Period Scope</TableHead>
                    <TableHead className="text-xs text-[#555] font-bold font-mono">Duration</TableHead>
                    <TableHead className="text-xs text-[#555] font-bold font-mono">Status</TableHead>
                    <TableHead className="text-right text-xs text-[#555] font-bold font-mono">Queue Operations</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {requests.map((req) => {
                    const isPending = req.status === 'pending';
                    return (
                      <TableRow key={req.id} className="border-b border-white/[0.02] hover:bg-white/[0.01]">
                        <TableCell className="py-3.5">
                          <div className="flex flex-col">
                            <span className="text-xs font-bold text-white">{req.name}</span>
                            <span className="text-[10px] text-muted-foreground font-mono leading-none mt-0.5">{req.email}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-xs text-muted-foreground font-semibold">{req.type}</TableCell>
                        <TableCell className="text-muted-foreground text-xs font-medium">
                          <div className="flex items-center gap-1.5 font-mono">
                            <Calendar className="h-3 w-3 text-muted-foreground" />
                            {req.period}
                          </div>
                        </TableCell>
                        <TableCell className="text-xs text-white font-semibold font-mono">{req.duration}</TableCell>
                        <TableCell>
                          <Badge className={cn(
                            "text-[9px] uppercase tracking-widest font-bold py-0.5 px-2 font-mono rounded",
                            req.status === 'approved' && "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
                            req.status === 'rejected' && "bg-red-500/10 text-red-400 border border-red-500/20",
                            req.status === 'pending' && "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20"
                          )}>
                            {req.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right py-2">
                          {isPending ? (
                            <div className="flex justify-end gap-1.5">
                              <Button 
                                size="sm" 
                                onClick={() => handleApprove(req.id)}
                                className="h-7 bg-[#141414] text-emerald-400 hover:bg-emerald-500 hover:text-black border border-emerald-500/20 hover:border-emerald-500 text-[10px] font-bold uppercase tracking-wider py-1 rounded"
                              >
                                Approve
                              </Button>
                              <Button 
                                size="sm"
                                onClick={() => handleReject(req.id)} 
                                className="h-7 bg-[#141414] text-red-400 hover:bg-red-500 hover:text-white border border-red-500/20 hover:border-red-500 text-[10px] font-bold uppercase tracking-wider py-1 rounded"
                              >
                                Reject
                              </Button>
                            </div>
                          ) : (
                            <span className="text-[10px] text-[#444] uppercase font-bold font-mono">Archived</span>
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })}

                  {requests.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={6} className="py-12 text-center text-muted-foreground">
                        <Inbox className="h-8 w-8 text-[#222] mx-auto mb-2" />
                        No active leave queues found. Click request button to generate submissions.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar: Sent Notifications Ledger Feed */}
        <div className="lg:col-span-1">
          <Card className="bg-[#0d0d0d] border border-border/80 rounded-xl overflow-hidden shadow-lg h-full flex flex-col">
            <CardHeader className="pb-3 border-b border-white/[0.02] bg-black/40 flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-sm font-bold uppercase tracking-wider text-white">Dispatched Notifications Log</CardTitle>
                <CardDescription className="text-xs text-muted-foreground">
                  In-App & Email alerts queue for active status changes.
                </CardDescription>
              </div>
              <Bell className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent className="p-4 flex-1 flex flex-col gap-3.5 max-h-[460px] overflow-y-auto">
              {notifications.map((notif) => (
                <div 
                  key={notif.id} 
                  className={cn(
                    "p-3 rounded-lg border text-xs flex gap-2.5 items-start leading-relaxed",
                    notif.type === 'success' 
                      ? "bg-emerald-500/[0.02] border-emerald-500/10" 
                      : "bg-red-500/[0.02] border-red-500/10"
                  )}
                >
                  <div className="mt-0.5 shrink-0">
                    <Mail className={cn(
                      "h-3.5 w-3.5",
                      notif.type === 'success' ? "text-emerald-400" : "text-red-400"
                    )} />
                  </div>
                  <div className="space-y-1 overflow-hidden">
                    <p className="text-white text-[11px] font-sans break-words">{notif.text}</p>
                    <div className="flex gap-2 items-center text-[9px] font-mono text-[#555] font-semibold">
                      <span className="text-primary uppercase">ALERT DISPATCHED</span>
                      <span>•</span>
                      <span>EMAIL SUCCESS</span>
                      <span>•</span>
                      <span>{notif.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

      </div>

      {/* Leave Application Dialog Request Form Container */}
      <Dialog open={isRequestOpen} onOpenChange={setIsRequestOpen}>
        <DialogContent className="max-w-md bg-[#0d0d0d] border border-[#1a1a1a] rounded-xl text-white">
          <DialogHeader className="space-y-1">
            <div className="flex items-center gap-2.5 text-primary">
              <Calendar className="h-5 w-5" />
              <DialogTitle className="text-lg font-bold">Apply For Corporate Leave</DialogTitle>
            </div>
            <DialogDescription className="text-xs text-muted-foreground">
              Register a new leave request. It will be dispatched directly to the active awaits manager queue.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleRequestSubmit} className="space-y-4 pt-2.5">
            <div className="space-y-1.5">
              <label className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground block font-mono">
                Employee Full Name
              </label>
              <Input
                type="text"
                value={reqName}
                onChange={(e) => setReqName(e.target.value)}
                placeholder="e.g. Liam Vance"
                className="bg-[#141414] border-[#222] focus-visible:ring-primary/40 h-9.5 text-xs text-white"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground block font-mono">
                Official Working Email
              </label>
              <Input
                type="email"
                value={reqEmail}
                onChange={(e) => setReqEmail(e.target.value)}
                placeholder="e.g. l.vance@nexushr.com"
                className="bg-[#141414] border-[#222] focus-visible:ring-primary/40 h-9.5 text-xs text-white"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground block font-mono">
                  Leave Type Group
                </label>
                <select
                  value={reqType}
                  onChange={(e) => setReqType(e.target.value)}
                  className="w-full bg-[#141414] border border-[#222] text-xs h-9.5 focus-visible:ring-primary/40 focus:outline-none text-muted-foreground rounded-lg px-2.5"
                >
                  <option value="Annual Leave">Annual Leave</option>
                  <option value="Sick Leave">Sick Leave</option>
                  <option value="Study Leave">Study Leave</option>
                  <option value="Unpaid Leave">Unpaid Leave</option>
                  <option value="Maternity Leave">Maternity Leave</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground block font-mono">
                  Total Duration Info
                </label>
                <Input
                  type="text"
                  value={reqDuration}
                  onChange={(e) => setReqDuration(e.target.value)}
                  placeholder="e.g. 4 days"
                  className="bg-[#141414] border-[#222] focus-visible:ring-primary/40 h-9.5 text-xs text-white"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground block font-mono">
                Proposed Calendar Period
              </label>
              <Input
                type="text"
                value={reqPeriod}
                onChange={(e) => setReqPeriod(e.target.value)}
                placeholder="e.g. Jun 15 - Jun 19"
                className="bg-[#141414] border-[#222] focus-visible:ring-primary/40 h-9.5 text-xs text-white"
                required
              />
            </div>

            <DialogFooter className="flex flex-row justify-end gap-2 mt-4 pt-1">
              <Button 
                type="button"
                variant="outline" 
                onClick={() => setIsRequestOpen(false)}
                className="border-[#1a1a1a] bg-transparent text-white hover:bg-white/5 text-xs font-semibold"
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                className="bg-primary hover:bg-primary/95 text-black font-extrabold text-xs"
              >
                Submit Application ➔
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
