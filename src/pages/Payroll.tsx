import React, { useState } from 'react';
import { 
  CreditCard, 
  DollarSign, 
  Download, 
  FileText, 
  ArrowUpRight,
  TrendingUp,
  History,
  Coins,
  Receipt,
  PiggyBank,
  CheckCircle,
  Activity,
  Award
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid,
  Cell,
  PieChart,
  Pie,
  Legend
} from 'recharts';
import { toast } from "sonner";

const INITIAL_BAND_DATA = [
  { band: '$60k-$90k', employees: 4200, avgSalary: 74200, baseBonus: 3200 },
  { band: '$90k-$120k', employees: 5120, avgSalary: 104500, baseBonus: 6400 },
  { band: '$120k-$150k', employees: 2130, avgSalary: 132000, baseBonus: 11200 },
  { band: '$150k-$180k', employees: 850, avgSalary: 161000, baseBonus: 18500 },
  { band: '$180k-$220k', employees: 430, avgSalary: 198000, baseBonus: 24000 },
  { band: '$220k+', employees: 182, avgSalary: 242000, baseBonus: 45000 },
];

const BASE_DEDUCTIONS = [
  { name: 'Net Take-Home Salary', value: 63.5, color: '#10b981' },
  { name: 'Federal Income Taxes', value: 18.0, color: '#3b82f6' },
  { name: 'State / Local Taxes', value: 7.5, color: '#f59e0b' },
  { name: 'Health Premium Share', value: 6.2, color: '#8b5cf6' },
  { name: '401(k) Employee Contribution', value: 4.8, color: '#ec4899' },
];

const INITIAL_PAYROLL_DATA = [
  { id: '1', month: 'April 2026', totalPayout: '$28,420,000', status: 'paid', date: 'Apr 30, 2026' },
  { id: '2', month: 'March 2026', totalPayout: '$27,850,000', status: 'paid', date: 'Mar 31, 2026' },
  { id: '3', month: 'February 2026', totalPayout: '$27,100,000', status: 'paid', date: 'Feb 28, 2026' },
  { id: '4', month: 'January 2026', totalPayout: '$26,950,000', status: 'paid', date: 'Jan 31, 2026' },
];

export default function Payroll() {
  const [payrollHistory, setPayrollHistory] = useState(INITIAL_PAYROLL_DATA);
  const [bonusMultiplier, setBonusMultiplier] = useState(1.0);
  const [activeTab, setActiveTab] = useState<'distribution' | 'deductions'>('distribution');
  const [processing, setProcessing] = useState(false);

  // Dynamic band data powered by slider multiplier
  const currentBandData = React.useMemo(() => {
    return INITIAL_BAND_DATA.map(item => ({
      ...item,
      bonusAwarded: Math.round(item.baseBonus * bonusMultiplier)
    }));
  }, [bonusMultiplier]);

  // Compute stats metrics dynamically
  const stats = React.useMemo(() => {
    let totalEmployees = 0;
    let totalSalaryVolume = 0;
    let totalBonusVolume = 0;

    INITIAL_BAND_DATA.forEach(item => {
      totalEmployees += item.employees;
      totalSalaryVolume += item.avgSalary * item.employees;
      totalBonusVolume += (item.baseBonus * bonusMultiplier) * item.employees;
    });

    const averageSalary = Math.round(totalSalaryVolume / totalEmployees);
    const averageBonus = Math.round(totalBonusVolume / totalEmployees);
    const totalDisbursement = Math.round((totalSalaryVolume + totalBonusVolume) / 12); // single month estimate

    return {
      averageSalary,
      averageBonus,
      totalDisbursement,
      totalEmployees
    };
  }, [bonusMultiplier]);

  // Simulate active payroll generation
  const handleProcessPayrollSubmit = () => {
    setProcessing(true);
    toast.info("Initializing Calculation Ledger...", {
      description: `Re-evaluating accounts for ${stats.totalEmployees.toLocaleString()} corporate lines.`
    });

    setTimeout(() => {
      const uniqueId = String(payrollHistory.length + 1);
      const formattedTotal = `$${(stats.totalDisbursement / 1000000).toFixed(2)}M`;
      const today = new Date();
      const monthStr = today.toLocaleString('default', { month: 'long', year: 'numeric' });
      const dateStr = today.toLocaleString('default', { month: 'short', day: 'numeric', year: 'numeric' });

      const newRecord = {
        id: uniqueId,
        month: monthStr,
        totalPayout: formattedTotal,
        status: 'paid',
        date: dateStr
      };

      setPayrollHistory(prev => [newRecord, ...prev]);
      setProcessing(false);
      toast.success("Payroll Processed Successfully", {
        description: `Disbursed ${formattedTotal} to staff registries with digital paystubs generated.`
      });
    }, 2500);
  };

  return (
    <div className="space-y-6">
      {/* Header operations banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Payroll Management</h1>
          <p className="text-muted-foreground mt-1 text-sm font-sans">
            Financial operations, compliance registries, and detailed dynamic payroll analytics visualizations.
          </p>
        </div>

        <Button 
          disabled={processing}
          onClick={handleProcessPayrollSubmit}
          className="bg-primary hover:bg-primary/95 text-black font-extrabold text-xs uppercase tracking-wider h-10 px-4 rounded-lg flex items-center gap-2 block shrink-0"
        >
          {processing ? (
            <>
              <Activity className="h-4 w-4 animate-spin" /> processing...
            </>
          ) : (
            <>
              <DollarSign className="h-4 w-4" /> Ship Executive Payroll
            </>
          )}
        </Button>
      </div>

      {/* Core Summary Metrics row fields */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-[#0d0d0d] border border-border/80 p-4 rounded-xl">
          <CardContent className="p-0">
            <span className="text-[10px] font-mono text-[#666] uppercase font-bold tracking-wider">Average Salary</span>
            <div className="flex items-baseline gap-1 pt-2">
              <span className="text-2xl font-black text-white">${stats.averageSalary.toLocaleString()}</span>
              <span className="text-xs text-muted-foreground">/ year</span>
            </div>
            <p className="text-[9px] text-[#555] mt-1 font-bold uppercase tracking-wider flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-primary rounded-full" /> Across globally tracked levels
            </p>
          </CardContent>
        </Card>

        <Card className="bg-[#0d0d0d] border border-border/80 p-4 rounded-xl">
          <CardContent className="p-0">
            <span className="text-[10px] font-mono text-[#666] uppercase font-bold tracking-wider">Average Bonus</span>
            <div className="flex items-baseline gap-1 pt-2">
              <span className="text-2xl font-black text-white">${stats.averageBonus.toLocaleString()}</span>
              <span className="text-xs text-muted-foreground">/ year</span>
            </div>
            <p className="text-[9px] text-[#555] mt-1 font-bold uppercase tracking-wider flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" /> Adjusted by performance multiplier
            </p>
          </CardContent>
        </Card>

        <Card className="bg-[#0d0d0d] border border-border/80 p-4 rounded-xl">
          <CardContent className="p-0">
            <span className="text-[10px] font-mono text-blue-400 uppercase font-bold tracking-wider">Total Taxes YTD</span>
            <div className="flex items-baseline gap-1 pt-2">
              <span className="text-2xl font-black text-blue-400">$12.4M</span>
              <span className="text-[10px] text-muted-foreground font-mono">IRS COMPLIANT</span>
            </div>
            <p className="text-[9px] text-[#555] mt-1 font-bold uppercase tracking-wider">Federal & local filings up to date</p>
          </CardContent>
        </Card>

        <Card className="bg-[#0d0d0d] border border-border/80 p-4 rounded-xl">
          <CardContent className="p-0">
            <span className="text-[10px] font-mono text-purple-400 uppercase font-bold tracking-wider">Est Monthly Volume</span>
            <div className="flex items-baseline gap-1 pt-2">
              <span className="text-2xl font-black text-purple-400">${(stats.totalDisbursement / 1000000).toFixed(2)}M</span>
              <span className="text-xs text-muted-foreground">/ month</span>
            </div>
            <p className="text-[9px] text-[#555] mt-1 font-bold uppercase tracking-wider">Adjusted for {stats.totalEmployees.toLocaleString()} staff members</p>
          </CardContent>
        </Card>
      </div>

      {/* Interactive payroll statistics and charting block layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Graph display panel Card */}
        <Card className="lg:col-span-2 bg-[#0d0d0d] border border-border/80 rounded-xl overflow-hidden flex flex-col justify-between">
          <CardHeader className="pb-3 border-b border-white/[0.02] bg-black/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <CardTitle className="text-sm font-bold uppercase tracking-wider text-white">Interactive Financial breakdowns</CardTitle>
              <CardDescription className="text-xs text-muted-foreground">
                Toggle structured salaries distribution profiles and deductions formulas.
              </CardDescription>
            </div>

            {/* Switching tabs layout buttons */}
            <div className="flex items-center gap-1 bg-black border border-[#1e1e1e] p-0.5 rounded-lg w-fit">
              <button
                onClick={() => setActiveTab('distribution')}
                className={cn(
                  "px-2.5 py-1 rounded text-[10px] uppercase font-bold tracking-wider transition-all",
                  activeTab === 'distribution' 
                    ? "bg-[#111] text-primary border border-white/[0.05] shadow" 
                    : "text-[#666] hover:text-white"
                )}
              >
                Salary Bands & Bonuses
              </button>
              <button
                onClick={() => setActiveTab('deductions')}
                className={cn(
                  "px-2.5 py-1 rounded text-[10px] uppercase font-bold tracking-wider transition-all",
                  activeTab === 'deductions' 
                    ? "bg-[#111] text-primary border border-white/[0.05] shadow" 
                    : "text-[#666] hover:text-white"
                )}
              >
                Deduction Breakdown
              </button>
            </div>
          </CardHeader>

          <CardContent className="pt-6 flex-1 flex flex-col justify-center min-h-[290px]">
            {activeTab === 'distribution' ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground font-mono">Employee Level Distribution Analysis</span>
                  <div className="flex items-center gap-2 text-[10px] text-muted-foreground font-mono">
                    <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 bg-blue-500 rounded-full" /> Base Salary Average</span>
                    <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" /> Bonus Allocation</span>
                  </div>
                </div>

                <div className="h-60 w-full bg-black/40 border border-[#141414] rounded-lg p-2.5">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={currentBandData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#161616" vertical={false} />
                      <XAxis dataKey="band" stroke="#444" fontSize={10} />
                      <YAxis stroke="#444" fontSize={10} tickFormatter={(v) => `$${v/1000}k`} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#0d0d0d', border: '1px solid #1c1c1c', borderRadius: '6px' }}
                        labelStyle={{ color: '#fff', fontSize: '11px', fontWeight: 'bold' }}
                        itemStyle={{ fontSize: '10.5px' }}
                        formatter={(value) => [`$${Number(value).toLocaleString()}`, '']}
                      />
                      <Bar name="Average Salary" dataKey="avgSalary" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={25} />
                      <Bar name="Bonus Allocation" dataKey="bonusAwarded" fill="#10b981" radius={[4, 4, 0, 0]} barSize={25} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground font-mono">Estimated Percentage share of Gross Payout</span>
                  <span className="text-[10px] text-emerald-400 font-bold font-mono">Gross Volume: 100%</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                  <div className="h-60 w-full bg-black/40 border border-[#141414] rounded-lg p-2.5 flex justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={BASE_DEDUCTIONS}
                          cx="50%"
                          cy="50%"
                          innerRadius={50}
                          outerRadius={80}
                          paddingAngle={3}
                          dataKey="value"
                        >
                          {BASE_DEDUCTIONS.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#0d0d0d', border: '1px solid #1c1c1c', borderRadius: '6px' }}
                          itemStyle={{ fontSize: '11px', color: '#fff' }}
                          formatter={(value) => [`${value}%`, '']}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="space-y-2.5 pr-4">
                    {BASE_DEDUCTIONS.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between border-b border-white/[0.02] pb-1.5 last:border-none">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                          <span className="text-xs text-muted-foreground leading-none">{item.name}</span>
                        </div>
                        <span className="text-xs font-bold font-mono text-white">{item.value}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Bonus Modulator simulation slider Card */}
        <Card className="lg:col-span-1 bg-[#0d0d0d] border border-border/80 rounded-xl p-5 flex flex-col justify-between">
          <div className="space-y-5">
            <div className="flex items-center gap-2 border-b border-white/[0.02] pb-2.5">
              <Award className="h-5 w-5 text-primary" />
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-white">Executive Bonus Modulator</span>
                <p className="text-[10px] text-muted-foreground font-normal">Fine-tune performance multiplier coefficients.</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-black/50 border border-[#141414] rounded-lg p-3 space-y-1">
                <span className="text-[9px] font-mono text-[#555] uppercase font-bold tracking-wider">Adjustment Ratio</span>
                <div className="flex items-baseline justify-between pt-1">
                  <span className="text-2xl font-black text-primary font-mono">{bonusMultiplier.toFixed(2)}x</span>
                  <Badge variant="outline" className="text-[8px] uppercase tracking-wider font-mono border-primary/20 text-primary">
                    {bonusMultiplier === 1.0 ? "BASELINE" : bonusMultiplier > 1.0 ? "PEAK REWARD" : "CONSERVATIVE"}
                  </Badge>
                </div>
              </div>

              {/* Range slider input */}
              <div className="space-y-2 pt-1.5">
                <input
                  type="range"
                  min="0.5"
                  max="2.0"
                  step="0.05"
                  value={bonusMultiplier}
                  onChange={(e) => {
                    const val = parseFloat(e.target.value);
                    setBonusMultiplier(val);
                    toast.info(`Bonus ratio modulated to ${val.toFixed(2)}x`, {
                      description: "Simulation charts updated accordingly.",
                      duration: 1200
                    });
                  }}
                  className="w-full h-1.5 bg-[#141414] rounded-lg appearance-none cursor-pointer accent-primary"
                />
                <div className="flex justify-between text-[10px] font-mono text-[#444] font-semibold">
                  <span>0.50x (Min Penalty)</span>
                  <span>1.0x (Norm)</span>
                  <span>2.0x (Max Award)</span>
                </div>
              </div>
            </div>

            <div className="bg-[#0b0b0b] border border-white/[0.02] rounded-lg p-3 space-y-2">
              <div className="flex gap-2 items-start text-xs text-muted-foreground leading-relaxed">
                <PiggyBank className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                <p className="text-[11px]">
                  Modulating this value scales baseline signing bonuses across all organizational bands instantly. This enables real-time fiscal forecasting before formal payroll processing.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-white/[0.02] mt-4 flex items-center gap-1.5 text-[10px] text-muted-foreground font-mono">
            <CheckCircle className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
            <span>CALCULATION ENGINE VALIDATED</span>
          </div>
        </Card>

      </div>

      {/* Payroll ledger table history */}
      <Card className="bg-[#0d0d0d] border border-border/80 rounded-xl overflow-hidden shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between bg-black/30 border-b border-white/[0.02]">
          <div>
            <CardTitle className="text-sm font-bold uppercase tracking-wider text-white">Payroll History</CardTitle>
            <CardDescription className="text-xs text-muted-foreground">Review past disbursements and generate reports.</CardDescription>
          </div>
          <Button variant="outline" size="sm" className="h-8 border-[#1e1e1e] bg-transparent text-xs font-semibold hover:bg-white/5 gap-2">
            <History className="h-4 w-4" />
            Full History
          </Button>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-black/20 hover:bg-black/20 border-b border-white/[0.02]">
              <TableRow>
                <TableHead className="text-xs text-[#555] font-bold font-mono">Period</TableHead>
                <TableHead className="text-xs text-[#555] font-bold font-mono">Execution Date</TableHead>
                <TableHead className="text-xs text-[#555] font-bold font-mono">Total Disbursement</TableHead>
                <TableHead className="text-xs text-[#555] font-bold font-mono">Status</TableHead>
                <TableHead className="text-right text-xs text-[#555] font-bold font-mono">Report Download</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payrollHistory.map((p) => (
                <TableRow key={p.id} className="border-b border-white/[0.02] hover:bg-white/[0.01]">
                  <TableCell className="font-bold text-white py-3.5 text-xs">{p.month}</TableCell>
                  <TableCell className="text-muted-foreground text-xs">{p.date}</TableCell>
                  <TableCell className="font-mono text-primary text-xs font-semibold">{p.totalPayout}</TableCell>
                  <TableCell>
                    <Badge variant="default" className="bg-emerald-500/15 text-emerald-400 border-none font-bold uppercase py-px px-1.5 text-[9px] tracking-widest leading-none">
                      {p.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right py-2">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => toast.success(`Statement report exported for ${p.month}.`)}
                      className="h-8 w-8 text-[#777] hover:text-white hover:bg-white/5 rounded-md"
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
