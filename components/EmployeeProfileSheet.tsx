import React, { useRef } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Mail, 
  Phone, 
  Calendar, 
  Briefcase, 
  Award, 
  TrendingUp,
  Building2,
  Globe,
  Camera,
  ChevronDown
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

export interface EmployeeProfile {
  id: string;
  name: string;
  role: string;
  dept: string;
  status: string;
  email: string;
  avatar?: string;
  phone?: string;
  location?: string;
  joinedDate?: string;
}

interface EmployeeProfileSheetProps {
  employee: EmployeeProfile | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onUpdateAvatar?: (avatarUrl: string) => void;
  onUpdateStatus?: (status: string) => void;
}

export function EmployeeProfileSheet({ 
  employee, 
  isOpen, 
  onOpenChange, 
  onUpdateAvatar,
  onUpdateStatus 
}: EmployeeProfileSheetProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  if (!employee) return null;

  const handlePhotoClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && onUpdateAvatar) {
      const url = URL.createObjectURL(file);
      onUpdateAvatar(url);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-md bg-[#0d0d0d] border-l border-border/50 text-foreground overflow-y-auto">
        <SheetHeader className="pb-6 border-b border-border/50">
          <div className="flex flex-col items-center text-center mt-6">
            <div className="relative group cursor-pointer" onClick={handlePhotoClick}>
              <Avatar className="h-24 w-24 border-4 border-primary/20 mb-4 shadow-2xl shadow-primary/10 group-hover:border-primary/50 transition-all">
                <AvatarImage src={employee.avatar} className="object-cover" />
                <AvatarFallback className="bg-primary/10 text-primary font-bold text-2xl">
                  {employee.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 rounded-full mb-4">
                <Camera className="h-6 w-6 text-white" />
              </div>
              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept="image/*" 
                onChange={handleFileChange}
              />
            </div>
            <SheetTitle className="text-2xl font-bold tracking-tight text-white">{employee.name}</SheetTitle>
            <SheetDescription className="text-primary font-bold uppercase tracking-widest text-xs mt-1">
              {employee.role}
            </SheetDescription>

            {onUpdateStatus ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="mt-4 flex items-center gap-1.5 focus:outline-none focus:ring-1 focus:ring-primary/40 rounded-full px-1">
                    <Badge 
                      className={cn(
                        "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border-none cursor-pointer hover:opacity-80 transition-opacity flex items-center gap-1",
                        employee.status === 'active' && "bg-emerald-500/10 text-emerald-400",
                        employee.status === 'on-leave' && "bg-amber-500/10 text-amber-400",
                        employee.status === 'terminated' && "bg-red-500/10 text-red-400",
                        !['active', 'on-leave', 'terminated'].includes(employee.status) && "bg-white/5 text-muted-foreground"
                      )}
                    >
                      {employee.status}
                      <ChevronDown className="h-3 w-3 opacity-70" />
                    </Badge>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="center" className="bg-[#0f0f0f] border border-[#1a1a1a] text-xs min-w-[120px]">
                  <DropdownMenuItem 
                    onClick={() => onUpdateStatus('active')}
                    className="text-emerald-400 focus:text-emerald-300 focus:bg-emerald-500/10 font-bold uppercase tracking-wider text-[10px]"
                  >
                    Active
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => onUpdateStatus('on-leave')}
                    className="text-amber-400 focus:text-amber-300 focus:bg-amber-500/10 font-bold uppercase tracking-wider text-[10px]"
                  >
                    On Leave
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => onUpdateStatus('terminated')}
                    className="text-red-400 focus:text-red-300 focus:bg-red-500/10 font-bold uppercase tracking-wider text-[10px]"
                  >
                    Terminated
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Badge 
                className={cn(
                  "mt-4 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border-none",
                  employee.status === 'active' && "bg-emerald-500/10 text-emerald-400",
                  employee.status === 'on-leave' && "bg-amber-500/10 text-amber-400",
                  employee.status === 'terminated' && "bg-red-500/10 text-red-400",
                  !['active', 'on-leave', 'terminated'].includes(employee.status) && "bg-white/5 text-muted-foreground"
                )}
              >
                {employee.status}
              </Badge>
            )}
          </div>
        </SheetHeader>

        <div className="py-8 space-y-8">
          {/* Contact Information */}
          <section className="space-y-4">
            <h4 className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] px-1">Contact Information</h4>
            <div className="grid gap-3">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/5 group hover:border-primary/30 transition-colors">
                <div className="p-2 rounded bg-primary/10 text-primary">
                  <Mail className="h-4 w-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-muted-foreground font-bold uppercase">Email</span>
                  <span className="text-sm font-medium">{employee.email}</span>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/5 group hover:border-primary/30 transition-colors">
                <div className="p-2 rounded bg-primary/10 text-primary">
                  <Phone className="h-4 w-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-muted-foreground font-bold uppercase">Phone</span>
                  <span className="text-sm font-medium">+1 (555) 000-0{employee.id}</span>
                </div>
              </div>
            </div>
          </section>

          {/* Job Details */}
          <section className="space-y-4">
            <h4 className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] px-1">Job Details</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 rounded-lg bg-white/5 border border-white/5">
                <Building2 className="h-4 w-4 text-primary mb-2" />
                <span className="text-[10px] text-muted-foreground font-bold uppercase block">Department</span>
                <span className="text-sm font-medium">{employee.dept}</span>
              </div>
              <div className="p-3 rounded-lg bg-white/5 border border-white/5">
                <Globe className="h-4 w-4 text-primary mb-2" />
                <span className="text-[10px] text-muted-foreground font-bold uppercase block">Office</span>
                <span className="text-sm font-medium">New York</span>
              </div>
              <div className="p-3 rounded-lg bg-white/5 border border-white/5">
                <Calendar className="h-4 w-4 text-primary mb-2" />
                <span className="text-[10px] text-muted-foreground font-bold uppercase block">Joined</span>
                <span className="text-sm font-medium">Jan 2023</span>
              </div>
              <div className="p-3 rounded-lg bg-white/5 border border-white/5">
                <Briefcase className="h-4 w-4 text-primary mb-2" />
                <span className="text-[10px] text-muted-foreground font-bold uppercase block">Type</span>
                <span className="text-sm font-medium">Full-time</span>
              </div>
            </div>
          </section>

          {/* Performance Metrics */}
          <section className="space-y-4">
            <div className="flex items-center justify-between px-1">
              <h4 className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em]">Performance Metric Trends</h4>
              <Badge variant="outline" className="text-[10px] bg-primary/10 text-primary border-none">TOP 5%</Badge>
            </div>
            <div className="space-y-5 p-4 rounded-xl bg-gradient-to-br from-primary/5 to-transparent border border-primary/10">
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-muted-foreground flex items-center gap-2"><Award className="h-3 w-3" /> Productivity</span>
                  <span className="font-bold text-primary">94%</span>
                </div>
                <Progress value={94} className="h-1.5" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-muted-foreground flex items-center gap-2"><TrendingUp className="h-3 w-3" /> Growth</span>
                  <span className="font-bold text-primary">88%</span>
                </div>
                <Progress value={88} className="h-1.5" />
              </div>
            </div>
          </section>
        </div>
      </SheetContent>
    </Sheet>
  );
}
