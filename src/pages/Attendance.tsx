import React, { useState } from 'react';
import { 
  Clock, 
  MapPin, 
  Calendar, 
  AlertCircle,
  Download,
  CheckCircle2,
  Info,
  CalendarDays,
  Plus,
  ShieldAlert,
  CalendarRange,
  Users
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface CompanyHoliday {
  id: string;
  name: string;
  date: string;
  type: string;
  impact: string;
}

const INITIAL_HOLIDAYS: CompanyHoliday[] = [
  { id: '1', name: "Memorial Day", date: "2026-05-25", type: "Federal Holiday", impact: "System automatically suspends all daily absence flags and awards default 8.0 hr holiday wages." },
  { id: '2', name: "Juneteenth National Holiday", date: "2026-06-19", type: "Federal Holiday", impact: "Headcount tracker paused. Operations closed entirely. Overrides remote MFA clock-in locks." },
  { id: '3', name: "Independence Day", date: "2026-07-04", type: "Federal Holiday", impact: "Holiday payroll schedule auto-accrued. Suspends normal work pattern tracking indexes." },
  { id: '4', name: "Labor Day", date: "2026-09-07", type: "Federal Holiday", impact: "Compliance filters bypassed. Clock-ins are treated as double-pay volunteers." },
  { id: '5', name: "Thanksgiving Day", date: "2026-11-26", type: "Corporate Shutdown", impact: "Active compliance checks deactivated for double-shutdown block (Nov 26-27)." }
];

const INITIAL_ATTENDANCE_STATS = [
  { day: 'Mon', attendance: 92 },
  { day: 'Tue', attendance: 95 },
  { day: 'Wed', attendance: 88 },
  { day: 'Thu', attendance: 94 },
  { day: 'Fri', attendance: 91 },
];

const INITIAL_LOGS = [
  { id: '1', name: 'Sarah Chen', status: 'present', clockIn: '08:45 AM', clockOut: '05:30 PM', location: 'Office' },
  { id: '2', name: 'James Wilson', status: 'late', clockIn: '10:15 AM', clockOut: '06:00 PM', location: 'Remote' },
  { id: '3', name: 'David Kim', status: 'present', clockIn: '09:00 AM', clockOut: '05:45 PM', location: 'Office' },
  { id: '4', name: 'Sophia Lee', status: 'present', clockIn: '08:30 AM', clockOut: '05:00 PM', location: 'Office' },
];

export default function Attendance() {
  const [holidays, setHolidays] = useState<CompanyHoliday[]>(INITIAL_HOLIDAYS);
  const [activeLogList, setActiveLogList] = useState(INITIAL_LOGS);
  const [selectedHolidayId, setSelectedHolidayId] = useState<string>('1');
  const [hasClockedIn, setHasClockedIn] = useState(false);

  // Dialog State for adding holiday
  const [isHolidayOpen, setIsHolidayOpen] = useState(false);
  const [newHoiName, setNewHoiName] = useState('');
  const [newHoiDate, setNewHoiDate] = useState('');
  const [newHoiType, setNewHoiType] = useState('Federal Holiday');
  const [newHoiImpact, setNewHoiImpact] = useState('');

  const currentHoliday = holidays.find(h => h.id === selectedHolidayId) || holidays[0];

  // Perform personal clock-in simulation
  const handleClockIn = () => {
    if (hasClockedIn) {
      toast.info("Already clocked in", { description: "Your timestamp has been successfully recorded." });
      return;
    }

    const stamp = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    const newLog = {
      id: String(Date.now()),
      name: 'Alexander Sterling',
      status: 'present',
      clockIn: stamp,
      clockOut: '—',
      location: 'Office (CHRO Hub)'
    };

    setActiveLogList(prev => [newLog, ...prev]);
    setHasClockedIn(true);
    toast.success("Clock-in Registered Successfully", {
      description: `Logged in at ${stamp} via Office network segment. Attendance trends recalculated.`
    });
  };

  // Submit dynamic company wide holiday
  const handleHolidaySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newHoiName.trim() || !newHoiDate.trim()) {
      toast.error("Form Validation Error", { description: "Please enter holiday name and date." });
      return;
    }

    const defaultImpact = newHoiImpact.trim() || "Suspends daily headcount audits and automatically applies standard holiday pay scale.";
    const newHol: CompanyHoliday = {
      id: String(Date.now()),
      name: newHoiName,
      date: newHoiDate,
      type: newHoiType,
      impact: defaultImpact
    };

    setHolidays(prev => [...prev, newHol].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()));
    setIsHolidayOpen(false);
    setNewHoiName('');
    setNewHoiDate('');
    setNewHoiImpact('');

    toast.success("Company-wide Holiday Configured", {
      description: `Holiday "${newHoiName}" mapped successfully. Absence overrides registered.`
    });
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Attendance Tracking</h1>
          <p className="text-muted-foreground mt-1 text-sm font-sans">
            Monitor compliance checkpoints, real-time desk clock-ins, and scheduled holiday bypasses.
          </p>
        </div>
        <Button 
          onClick={handleClockIn}
          className={cn(
            "font-extrabold text-xs uppercase tracking-wider h-10 px-4 rounded-lg flex items-center gap-2 shrink-0 transition-all",
            hasClockedIn ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 cursor-not-allowed" : "bg-primary text-black hover:bg-primary/90 shadow-md shadow-primary/20"
          )}
        >
          <Clock className="h-4 w-4" /> 
          {hasClockedIn ? "Successfully Clocked In" : "Clock In Now"}
        </Button>
      </div>

      {/* Main Grid: Trends & Calendar side-by-side */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Attendance Trends (Left col 2/3) */}
        <Card className="lg:col-span-2 bg-[#0d0d0d] border border-border/80 rounded-xl overflow-hidden shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between border-b border-white/[0.02] bg-black/30 pb-3">
            <div>
              <CardTitle className="text-sm font-bold uppercase tracking-wider text-white">Attendance Trends</CardTitle>
              <CardDescription className="text-xs text-muted-foreground">Daily presence ratios across entire organization.</CardDescription>
            </div>
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 text-[10px] font-mono leading-none">
              AVG WEEKLY RATING: 92.4%
            </Badge>
          </CardHeader>
          <CardContent className="h-[250px] pt-6">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={INITIAL_ATTENDANCE_STATS}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#161616" />
                <XAxis dataKey="day" stroke="#444" fontSize={10} />
                <YAxis stroke="#444" fontSize={10} domain={[0, 100]} />
                <Tooltip 
                  cursor={{fill: 'rgba(255,255,255,0.03)'}}
                  contentStyle={{ backgroundColor: '#0d0d0d', border: '1px solid #1e1e1e', borderRadius: '6px' }}
                  labelStyle={{ color: '#fff', fontSize: '11px', fontWeight: 'bold' }}
                  itemStyle={{ fontSize: '10.5px' }}
                  formatter={(value) => [`${value}%`, 'Attendance']}
                />
                <Bar dataKey="attendance" fill="#facc15" radius={[4, 4, 0, 0]} barSize={35} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Quick Presence Indicators (Right col 1/3) */}
        <Card className="lg:col-span-1 bg-[#0d0d0d] border border-border/80 rounded-xl p-5 flex flex-col justify-between shadow-lg">
          <div className="space-y-4">
            <div className="border-b border-white/[0.02] pb-2 text-xs font-bold uppercase tracking-wider text-[#666]">
              Real-time Roster Ratios
            </div>
            
            <div className="space-y-4 pt-1">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 border border-emerald-500/20 shadow-md">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-[10px] font-mono text-[#555] font-bold uppercase tracking-wider">Present & Online</p>
                  <p className="text-2xl font-black text-white">{11204 + (hasClockedIn ? 1 : 0)}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-400 border border-orange-500/20 shadow-md">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-[10px] font-mono text-[#555] font-bold uppercase tracking-wider">Late Arrivals</p>
                  <p className="text-2xl font-black text-white">482</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-xl bg-red-500/10 flex items-center justify-center text-red-500 border border-red-500/20 shadow-md">
                  <AlertCircle className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-[10px] font-mono text-[#555] font-bold uppercase tracking-wider">Unplanned Absences</p>
                  <p className="text-2xl font-black text-white">796</p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-[10px] bg-white/[0.01] border border-white/[0.03] p-2.5 rounded-lg text-muted-foreground leading-relaxed mt-4 flex gap-1.5 font-sans">
            <Info className="h-4 w-4 text-primary shrink-0 mt-0.5" />
            <span>Integrate remote VPN activity vectors automatically with Active Directory registries hourly.</span>
          </div>
        </Card>
      </div>

      {/* Structured Company Holiday Calendar Segment */}
      <h3 className="text-xs font-bold uppercase tracking-widest text-[#666] pt-1">Company Holidays & Impact Rules</h3>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Holiday Interactive List (Left 1/3) */}
        <Card className="lg:col-span-1 bg-[#0d0d0d] border border-border/80 rounded-xl p-4 flex flex-col justify-between shadow-lg">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-white/[0.02] pb-2">
              <div className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4 text-primary" />
                <span className="text-xs font-bold uppercase tracking-wider text-white">Holidays Calendar</span>
              </div>
              <Button 
                onClick={() => setIsHolidayOpen(true)}
                variant="outline" 
                size="xs" 
                className="h-6 px-2 text-[10px] border-[#222] hover:bg-white/5 uppercase font-mono font-bold text-primary hover:text-white shrink-0"
              >
                <Plus className="h-3 w-3 mr-1" /> Add
              </Button>
            </div>

            <div className="space-y-2 max-h-[220px] overflow-y-auto pr-0.5 scrollbar-thin scrollbar-thumb-gray-800">
              {holidays.map((h) => {
                const isSelected = h.id === selectedHolidayId;
                const formattedDate = new Date(h.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
                return (
                  <div
                    key={h.id}
                    onClick={() => setSelectedHolidayId(h.id)}
                    className={cn(
                      "p-2.5 rounded-lg border text-left cursor-pointer transition-all flex items-center justify-between gap-2.5",
                      isSelected 
                        ? "bg-secondary/40 border-primary/40 shadow-sm"
                        : "bg-white/[0.01] border-white/[0.02] hover:border-[#2e2e2e] hover:bg-white/[0.02]"
                    )}
                  >
                    <div>
                      <h4 className="text-xs font-bold text-white leading-tight">{h.name}</h4>
                      <p className="text-[10px] text-muted-foreground font-semibold mt-0.5">{formattedDate}</p>
                    </div>
                    <Badge className={cn(
                      "text-[8px] font-mono py-0 px-1 border-none font-bold uppercase shrink-0 transition-all",
                      h.type === 'Federal Holiday' ? "bg-emerald-500/10 text-emerald-400" : "bg-blue-500/10 text-blue-400"
                    )}>
                      {h.type}
                    </Badge>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="pt-3.5 border-t border-white/[0.02] mt-4 flex items-center gap-1.5 text-[10px] text-muted-foreground font-mono font-bold">
            <CalendarRange className="h-3.5 w-3.5 text-primary" />
            <span>TOTAL SCHEDULED OFF DAYS: {holidays.length} DAYS</span>
          </div>
        </Card>

        {/* Holiday Compliance Impact Explaner (Right 2/3) */}
        <Card className="lg:col-span-2 bg-[#0b0b0b] border border-primary/20 rounded-xl p-5 relative overflow-hidden flex flex-col justify-between shadow-lg">
          <div className="absolute right-3 top-3 flex items-center gap-1.5 bg-primary/10 border border-primary/20 py-0.5 px-2 rounded-full">
            <ShieldAlert className="h-3.5 w-3.5 text-primary" />
            <span className="text-[9px] font-bold text-primary uppercase font-mono tracking-wider">Attendance Impact Rule Activated</span>
          </div>

          <div className="space-y-4">
            <div>
              <span className="text-[9px] font-mono text-primary font-bold uppercase tracking-widest block">Selected Holiday Directive</span>
              <h3 className="text-xl font-black text-white mt-1">{currentHoliday?.name || "No Holiday Selected"}</h3>
              <p className="text-xs text-muted-foreground mt-0.5 font-mono">
                Date: {currentHoliday ? new Date(currentHoliday.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }) : "—"}
              </p>
            </div>

            <div className="bg-[#0f0f0f] border border-[#1a1a1a] rounded-xl p-4 space-y-3 leading-relaxed">
              <div className="flex gap-2.5 items-start">
                <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0 text-primary font-mono text-xs font-bold">
                  !
                </div>
                <div>
                  <h4 className="text-[11px] font-black uppercase tracking-wider text-white">Automatic Absent Filter Override</h4>
                  <p className="text-[11px] text-muted-foreground mt-1 font-sans">
                    On this date, the system auto-bypasses standard scheduled check-ins. Daily SLA checks normally flagging an employee as 'absent' are automatically skipped. Holiday wage values accumulators are added directly to the active Payroll ledger.
                  </p>
                </div>
              </div>

              <div className="border-t border-white/[0.02] pt-3 mt-3">
                <span className="text-[9px] font-mono text-emerald-400 font-bold uppercase tracking-wider block">Explicit Impact Flag On Records</span>
                <p className="text-xs text-white font-semibold leading-relaxed mt-1">
                  {currentHoliday?.impact || "Directive loaded cleanly. Standard attendance tracking defaults apply."}
                </p>
              </div>
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-white/[0.02] flex items-center justify-between text-[10px] font-mono text-muted-foreground leading-none">
            <span className="flex items-center gap-1 text-emerald-400 font-bold"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" /> WAGE CALCULATOR SYNCED</span>
            <span>POL-ID: NY-882-{currentHoliday?.id || "99"}</span>
          </div>
        </Card>
      </div>

      {/* Recent Clock Logs Table */}
      <Card className="bg-[#0d0d0d] border border-border/80 rounded-xl overflow-hidden shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between bg-black/40 border-b border-white/[0.02] pb-3">
          <div>
            <CardTitle className="text-sm font-bold uppercase tracking-wider text-white">Recent Attendance Logs</CardTitle>
            <CardDescription className="text-xs text-muted-foreground">Detailed view of live employee sign-ins.</CardDescription>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => toast.success("Roster logs exported inside CSV format.")}
            className="h-8 border-[#1e1e1e] bg-transparent text-xs font-semibold hover:bg-white/5 gap-2"
          >
            <Download className="h-4 w-4" />
            Export logs
          </Button>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-black/20 hover:bg-black/20 border-b border-white/[0.02]">
              <TableRow>
                <TableHead className="text-xs text-[#555] font-bold font-mono">Employee Name</TableHead>
                <TableHead className="text-xs text-[#555] font-bold font-mono">Status Status</TableHead>
                <TableHead className="text-xs text-[#555] font-bold font-mono">Clock In Time</TableHead>
                <TableHead className="text-xs text-[#555] font-bold font-mono">Clock Out Time</TableHead>
                <TableHead className="text-xs text-[#555] font-bold font-mono">Location Node</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {activeLogList.map((log) => (
                <TableRow key={log.id} className="border-b border-white/[0.02] hover:bg-white/[0.01]">
                  <TableCell className="font-bold text-white py-3.5 text-xs">{log.name}</TableCell>
                  <TableCell>
                    <Badge className={cn(
                      "text-[9px] font-mono py-0.5 px-2 border-none font-bold uppercase rounded",
                      log.status === 'present' ? "bg-emerald-500/10 text-emerald-400" : "bg-orange-500/10 text-orange-400"
                    )}>
                      {log.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground font-mono font-semibold">{log.clockIn}</TableCell>
                  <TableCell className="text-xs text-muted-foreground font-mono font-semibold">{log.clockOut}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1.5 text-muted-foreground text-xs font-medium">
                      <MapPin className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                      {log.location}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Holiday Configuration Dialog Overlay */}
      <Dialog open={isHolidayOpen} onOpenChange={setIsHolidayOpen}>
        <DialogContent className="max-w-md bg-[#0d0d0d] border border-[#1a1a1a] rounded-xl text-white">
          <DialogHeader className="space-y-1">
            <div className="flex items-center gap-2.5 text-primary">
              <CalendarRange className="h-5 w-5" />
              <DialogTitle className="text-lg font-bold">Configure Corporate Holiday</DialogTitle>
            </div>
            <DialogDescription className="text-xs text-muted-foreground">
              Define a new organization holiday and active attendance overrides parameters.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleHolidaySubmit} className="space-y-4 pt-2.5">
            <div className="space-y-1.5">
              <label className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground block font-mono">
                Holiday Official Name
              </label>
              <Input
                type="text"
                value={newHoiName}
                onChange={(e) => setNewHoiName(e.target.value)}
                placeholder="e.g. Christmas Day"
                className="bg-[#141414] border-[#222] focus-visible:ring-primary/40 h-9.5 text-xs text-white"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground block font-mono">
                  Official Date
                </label>
                <Input
                  type="date"
                  value={newHoiDate}
                  onChange={(e) => setNewHoiDate(e.target.value)}
                  className="bg-[#141414] border-[#222] focus-visible:ring-primary/40 h-9.5 text-xs text-white"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground block font-mono">
                  Holiday Classification
                </label>
                <select
                  value={newHoiType}
                  onChange={(e) => setNewHoiType(e.target.value)}
                  className="w-full bg-[#141414] border border-[#222] text-xs h-9.5 focus-visible:ring-primary/40 focus:outline-none text-muted-foreground rounded-lg px-2.5"
                >
                  <option value="Federal Holiday">Federal Holiday</option>
                  <option value="Corporate Shutdown">Corporate Shutdown</option>
                  <option value="Optional Holiday">Optional Holiday</option>
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground block font-mono">
                Attendance Compliance Override Impact Flag
              </label>
              <Input
                type="text"
                value={newHoiImpact}
                onChange={(e) => setNewHoiImpact(e.target.value)}
                placeholder="e.g. Suspends standard headcount audits & triggers shutdown flags auto."
                className="bg-[#141414] border-[#222] focus-visible:ring-primary/40 h-9.5 text-xs text-white"
              />
            </div>

            <DialogFooter className="flex flex-row justify-end gap-2 mt-4 pt-1">
              <Button 
                type="button"
                variant="outline" 
                onClick={() => setIsHolidayOpen(false)}
                className="border-[#1a1a1a] bg-transparent text-white hover:bg-white/5 text-xs font-semibold"
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                className="bg-primary hover:bg-primary/95 text-black font-extrabold text-xs"
              >
                Register Holiday Override ➔
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
