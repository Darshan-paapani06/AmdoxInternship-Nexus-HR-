import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  Plus, 
  Filter, 
  MoreVertical, 
  Mail, 
  Phone,
  ArrowRight,
  AlertTriangle,
  Check
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { EmployeeProfileSheet, EmployeeProfile } from "@/components/EmployeeProfileSheet";

const initialEmployees = [
  { id: '1', name: 'Sarah Chen', role: 'Head of Engineering', dept: 'Engineering', status: 'active', email: 's.chen@nexushr.com', avatar: undefined },
  { id: '2', name: 'James Wilson', role: 'Senior Product Manager', dept: 'Product', status: 'active', email: 'j.wilson@nexushr.com', avatar: undefined },
  { id: '3', name: 'Elena Rodriguez', role: 'UX Director', dept: 'Design', status: 'on-leave', email: 'e.rodriguez@nexushr.com', avatar: undefined },
  { id: '4', name: 'David Kim', role: 'Account Executive', dept: 'Sales', status: 'active', email: 'd.kim@nexushr.com', avatar: undefined },
  { id: '5', name: 'Marcus Thorne', role: 'Security Engineer', dept: 'Engineering', status: 'active', email: 'm.thorne@nexushr.com', avatar: undefined },
  { id: '6', name: 'Sophia Lee', role: 'HR Manager', dept: 'People', status: 'active', email: 's.lee@nexushr.com', avatar: undefined },
  { id: '7', name: 'David Miller', role: 'Junior Developer', dept: 'Engineering', status: 'terminated', email: 'd.miller@nexushr.com', avatar: undefined },
];

export default function Employees() {
  const [employeesList, setEmployeesList] = useState(initialEmployees);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState<EmployeeProfile | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  // Lifecycle change confirmation trigger states
  const [pendingStatusChange, setPendingStatusChange] = useState<{ empId: string; newStatus: string } | null>(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const handleUpdateAvatar = (avatarUrl: string) => {
    if (!selectedEmployee) return;
    
    setEmployeesList(prev => prev.map(emp => 
      emp.id === selectedEmployee.id ? { ...emp, avatar: avatarUrl } : emp
    ));
    
    setSelectedEmployee(prev => prev ? { ...prev, avatar: avatarUrl } : null);
  };

  const handleStatusSelect = (empId: string, newStatus: string) => {
    const emp = employeesList.find(e => e.id === empId);
    if (!emp || emp.status === newStatus) return;
    
    setPendingStatusChange({ empId, newStatus });
    setIsConfirmOpen(true);
  };

  const confirmStatusChange = () => {
    if (!pendingStatusChange) return;
    const { empId, newStatus } = pendingStatusChange;

    setEmployeesList(prev => prev.map(emp => 
      emp.id === empId ? { ...emp, status: newStatus } : emp
    ));

    // Also update current active sheet info
    if (selectedEmployee && selectedEmployee.id === empId) {
      setSelectedEmployee(prev => prev ? { ...prev, status: newStatus } : null);
    }

    const employeeName = employeesList.find(e => e.id === empId)?.name || 'Employee';

    toast.success("Lifecycle Status Updated", {
      description: `Successfully modified ${employeeName}'s workspace status to ${newStatus.toUpperCase()}.`,
    });

    setIsConfirmOpen(false);
    setPendingStatusChange(null);
  };

  const handleEmployeeClick = (emp: any) => {
    setSelectedEmployee(emp);
    setIsSheetOpen(true);
  };

  const filteredEmployees = employeesList.filter(emp => 
    emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.dept.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Workforce Directory</h1>
          <p className="text-muted-foreground mt-1">Manage employee profiles, lifecycle, and departmental organization.</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 gap-2">
          <Plus className="h-4 w-4" />
          Add Employee
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search by name, role, or department..." 
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline" className="gap-2">
          <Filter className="h-4 w-4" />
          Filters
        </Button>
      </div>

      <Card className="bg-[#0d0d0d] border border-[#1a1a1a] rounded-xl overflow-hidden shadow-2xl">
        <div className="p-6 border-b border-[#1a1a1a] flex items-center justify-between bg-[#111]/30">
          <h3 className="font-bold text-white tracking-tight">Workforce Lifecycle Tracking</h3>
          <Button variant="link" className="text-xs text-primary font-bold hover:underline h-auto p-0">Export Detailed Report</Button>
        </div>
        <Table className="text-sm">
          <TableHeader>
            <TableRow className="hover:bg-transparent border-b border-[#1a1a1a]">
              <TableHead className="px-6 py-4 font-bold text-[10px] uppercase tracking-widest text-muted-foreground">Employee</TableHead>
              <TableHead className="px-6 py-4 font-bold text-[10px] uppercase tracking-widest text-muted-foreground">Role</TableHead>
              <TableHead className="px-6 py-4 font-bold text-[10px] uppercase tracking-widest text-muted-foreground">Department</TableHead>
              <TableHead className="px-6 py-4 font-bold text-[10px] uppercase tracking-widest text-muted-foreground">Performance</TableHead>
              <TableHead className="px-6 py-4 font-bold text-[10px] uppercase tracking-widest text-muted-foreground text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y divide-[#1a1a1a]">
            {filteredEmployees.map((emp) => (
              <TableRow 
                key={emp.id} 
                onClick={() => handleEmployeeClick(emp)}
                className="group hover:bg-white/[0.02] cursor-pointer border-none transition-colors"
              >
                <TableCell className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9 rounded-md border border-primary/20 shadow-lg shadow-primary/5 group-hover:scale-105 transition-transform">
                      <AvatarImage src={emp.avatar} className="object-cover" />
                      <AvatarFallback className="bg-gradient-to-br from-primary to-primary/60 text-black font-bold text-xs ring-offset-background">
                        {emp.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="font-bold text-sm text-foreground">{emp.name}</span>
                      <span className="text-[10px] text-muted-foreground font-mono">ID: NX-{emp.id}0482</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="px-6 py-4">
                  <span className="text-sm font-medium text-muted-foreground">{emp.role}</span>
                </TableCell>
                <TableCell className="px-6 py-4">
                  <span className="text-sm text-muted-foreground">{emp.dept}</span>
                </TableCell>
                <TableCell className="px-6 py-4">
                  <div className="flex items-center gap-2 max-w-[150px]">
                    <div className="flex-1 h-1.5 bg-[#1a1a1a] rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary transition-all duration-1000" 
                        style={{ width: `${Math.random() * 40 + 60}%` }} 
                      />
                    </div>
                    <span className="text-[10px] font-bold text-muted-foreground">9.2</span>
                  </div>
                </TableCell>
                <TableCell className="px-6 py-4 text-right" onClick={(e) => {
                  e.stopPropagation(); // Avoid triggering details modal drawer
                }}>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="focus:outline-none focus:ring-1 focus:ring-primary/40 rounded px-1 text-right">
                        <Badge 
                          className={cn(
                            "px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest border-none cursor-pointer hover:bg-white/10 transition-colors inline-flex items-center gap-1",
                            emp.status === 'active' && "bg-emerald-500/10 text-emerald-400",
                            emp.status === 'on-leave' && "bg-amber-500/10 text-amber-400",
                            emp.status === 'terminated' && "bg-red-500/10 text-red-400",
                            !['active', 'on-leave', 'terminated'].includes(emp.status) && "bg-white/5 text-muted-foreground"
                          )}
                        >
                          {emp.status}
                          <span className="text-[8px] opacity-60">▼</span>
                        </Badge>
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-[#0f0f0f] border border-[#1a1a1a] text-xs min-w-[120px]">
                      <DropdownMenuItem 
                        onClick={() => handleStatusSelect(emp.id, 'active')}
                        className="text-emerald-400 focus:text-emerald-300 focus:bg-emerald-500/10 font-bold uppercase tracking-wider text-[10px]"
                      >
                        Active
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => handleStatusSelect(emp.id, 'on-leave')}
                        className="text-amber-400 focus:text-amber-300 focus:bg-amber-500/10 font-bold uppercase tracking-wider text-[10px]"
                      >
                        On Leave
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => handleStatusSelect(emp.id, 'terminated')}
                        className="text-red-400 focus:text-red-300 focus:bg-red-500/10 font-bold uppercase tracking-wider text-[10px]"
                      >
                        Terminated
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      <EmployeeProfileSheet 
        employee={selectedEmployee}
        isOpen={isSheetOpen}
        onOpenChange={setIsSheetOpen}
        onUpdateAvatar={handleUpdateAvatar}
        onUpdateStatus={(newStatus) => {
          if (selectedEmployee) {
            handleStatusSelect(selectedEmployee.id, newStatus);
          }
        }}
      />

      <Dialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
        <DialogContent className="max-w-md bg-[#0d0d0d] border border-[#1a1a1a] rounded-xl text-white">
          <DialogHeader>
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-red-500/10 text-red-500">
                <AlertTriangle className="h-5 w-5" />
              </div>
              <div>
                <DialogTitle className="text-lg font-bold">Confirm Status Change</DialogTitle>
                <DialogDescription className="text-xs text-muted-foreground mt-1">
                  You are about to modify this employee's corporate lifecycle status.
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          {pendingStatusChange && (() => {
            const emp = employeesList.find(e => e.id === pendingStatusChange.empId);
            if (!emp) return null;
            return (
              <div className="py-2 space-y-4">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.02] border border-[#1a1a1a]">
                  <Avatar className="h-10 w-10 rounded-md border border-primary/20">
                    <AvatarImage src={emp.avatar} className="object-cover" />
                    <AvatarFallback className="bg-primary/10 text-primary font-bold text-xs ring-offset-background">
                      {emp.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <h4 className="text-sm font-bold text-white leading-none">{emp.name}</h4>
                    <p className="text-[10px] text-muted-foreground font-mono mt-1">ID: NX-{emp.id}0482 • {emp.role}</p>
                  </div>
                </div>

                <div className="grid grid-cols-5 items-center gap-2 text-center py-2 px-1">
                  <div className="col-span-2 flex flex-col items-center gap-1">
                    <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">Current State</span>
                    <Badge 
                      className={cn(
                        "px-2 w-full py-1 text-center justify-center rounded text-[10px] font-bold uppercase tracking-widest border-none",
                        emp.status === 'active' && "bg-emerald-500/10 text-emerald-400",
                        emp.status === 'on-leave' && "bg-amber-500/10 text-amber-400",
                        emp.status === 'terminated' && "bg-red-500/10 text-red-400",
                        !['active', 'on-leave', 'terminated'].includes(emp.status) && "bg-white/5 text-muted-foreground"
                      )}
                    >
                      {emp.status}
                    </Badge>
                  </div>
                  
                  <div className="col-span-1 flex justify-center text-muted-foreground font-bold">
                    →
                  </div>

                  <div className="col-span-2 flex flex-col items-center gap-1">
                    <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">Target State</span>
                    <Badge 
                      className={cn(
                        "px-2 w-full py-1 text-center justify-center rounded text-[10px] font-bold uppercase tracking-widest border-none",
                        pendingStatusChange.newStatus === 'active' && "bg-emerald-500/10 text-emerald-400",
                        pendingStatusChange.newStatus === 'on-leave' && "bg-amber-500/10 text-amber-400",
                        pendingStatusChange.newStatus === 'terminated' && "bg-red-500/10 text-red-400",
                        !['active', 'on-leave', 'terminated'].includes(pendingStatusChange.newStatus) && "bg-white/5 text-muted-foreground"
                      )}
                    >
                      {pendingStatusChange.newStatus}
                    </Badge>
                  </div>
                </div>

                {pendingStatusChange.newStatus === 'terminated' && (
                  <div className="p-3 rounded-lg bg-red-950/20 border border-red-500/20 text-xs text-red-400/90 leading-relaxed">
                    <strong>Warning:</strong> Transitioning status to <strong>TERMINATED</strong> will restrict access credentials, freeze corporate accounts, and initiate standard offboarding flows.
                  </div>
                )}
                {pendingStatusChange.newStatus === 'on-leave' && (
                  <div className="p-3 rounded-lg bg-amber-950/20 border border-amber-500/20 text-xs text-amber-400/90 leading-relaxed">
                    <strong>Notice:</strong> Transitioning status to <strong>ON LEAVE</strong> will suspend active roadmap assignments and configure workforce records for temporary absence.
                  </div>
                )}
              </div>
            );
          })()}

          <DialogFooter className="flex flex-row justify-end gap-2 mt-4">
            <Button 
              variant="outline" 
              onClick={() => {
                setIsConfirmOpen(false);
                setPendingStatusChange(null);
              }}
              className="border-[#1a1a1a] bg-transparent text-white hover:bg-white/5 text-xs font-semibold"
            >
              Cancel
            </Button>
            <Button 
              onClick={confirmStatusChange}
              className={cn(
                "text-xs font-bold",
                pendingStatusChange?.newStatus === 'terminated' 
                  ? "bg-red-600 hover:bg-red-500 text-white" 
                  : "bg-primary hover:bg-primary/90 text-black"
              )}
            >
              Confirm Update
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
