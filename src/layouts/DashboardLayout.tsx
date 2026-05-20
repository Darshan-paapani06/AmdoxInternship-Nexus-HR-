import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Network,
  CalendarClock, 
  FileText, 
  CreditCard, 
  TrendingUp, 
  BrainCircuit, 
  Settings, 
  LogOut,
  Menu,
  X,
  Bell,
  Search,
  ChevronRight,
  BookOpen,
  UserPlus
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppStore } from '@/src/store/useAppStore';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', id: 'dashboard' },
  { icon: Users, label: 'Employees', id: 'employees' },
  { icon: Network, label: 'Org Chart', id: 'org-chart' },
  { icon: CalendarClock, label: 'Attendance', id: 'attendance' },
  { icon: FileText, label: 'Leave Management', id: 'leave' },
  { icon: CreditCard, label: 'Payroll', id: 'payroll' },
  { icon: TrendingUp, label: 'Performance', id: 'performance' },
  { icon: BrainCircuit, label: 'Nexus AI Insights', id: 'ai-insights', accent: true },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { isSidebarOpen, toggleSidebar, user } = useAppStore();
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden dark">
      {/* Sidebar */}
      <aside 
        className={cn(
          "relative flex flex-col bg-card border-r border-border transition-all duration-300 ease-in-out z-50",
          isSidebarOpen ? "w-64" : "w-16"
        )}
      >
        <div className="flex items-center h-16 px-6 shrink-0 border-b border-border mb-2">
          <div className="flex items-center gap-3 overflow-hidden" onClick={() => navigate('/dashboard')} style={{ cursor: 'pointer' }}>
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-primary text-black font-bold text-xl">
              N
            </div>
            {isSidebarOpen && (
              <span className="text-xl font-bold tracking-tight whitespace-nowrap">Nexus<span className="text-primary">HR</span></span>
            )}
          </div>
        </div>

        <ScrollArea className="flex-1 px-4 py-2">
          <div className="px-3 py-4 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Intelligence</div>
          <nav className="space-y-1">
            {navItems.slice(0, 1).map((item) => (
              <Button
                key={item.id}
                variant="ghost"
                onClick={() => navigate(`/${item.id}`)}
                className={cn(
                  "w-full justify-start gap-3 h-11 px-3 transition-all rounded-lg",
                  location.pathname === `/${item.id}` ? "bg-secondary text-primary border border-primary/20" : "text-muted-foreground hover:text-foreground",
                  !isSidebarOpen && "justify-center px-0"
                )}
              >
                <item.icon className="h-5 w-5 shrink-0" />
                {isSidebarOpen && <span className="font-medium text-sm">{item.label}</span>}
              </Button>
            ))}
            {navItems.slice(7, 8).map((item) => (
              <Button
                key={item.id}
                variant="ghost"
                onClick={() => navigate(`/${item.id}`)}
                className={cn(
                  "w-full justify-start gap-3 h-11 px-3 transition-all rounded-lg relative",
                  location.pathname === `/${item.id}` ? "bg-secondary text-primary border border-primary/20" : "text-muted-foreground hover:text-foreground",
                  !isSidebarOpen && "justify-center px-0"
                )}
              >
                <item.icon className="h-5 w-5 shrink-0" />
                {isSidebarOpen && (
                  <>
                    <span className="font-medium text-sm">{item.label}</span>
                    <span className="ml-auto bg-primary/10 text-primary text-[10px] px-1.5 py-0.5 rounded font-bold">BETA</span>
                  </>
                )}
              </Button>
            ))}
          </nav>

          <div className="px-3 py-4 text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-4">Management</div>
          <nav className="space-y-1">
            {navItems.slice(1, 7).map((item) => (
              <Button
                key={item.id}
                variant="ghost"
                onClick={() => navigate(`/${item.id}`)}
                className={cn(
                  "w-full justify-start gap-3 h-11 px-3 transition-all rounded-lg",
                  location.pathname === `/${item.id}` ? "bg-secondary text-primary border border-primary/20" : "text-muted-foreground hover:text-foreground",
                  !isSidebarOpen && "justify-center px-0"
                )}
              >
                <item.icon className="h-5 w-5 shrink-0" />
                {isSidebarOpen && <span className="font-medium text-sm">{item.label}</span>}
              </Button>
            ))}
            <Button
              variant="ghost"
              onClick={() => navigate('/onboarding')}
              className={cn(
                "w-full justify-start gap-3 h-11 px-3 transition-all rounded-lg",
                location.pathname === '/onboarding' ? "bg-secondary text-primary border border-primary/20" : "text-muted-foreground hover:text-foreground",
                !isSidebarOpen && "justify-center px-0"
              )}
            >
              <UserPlus className="h-5 w-5 shrink-0" />
              {isSidebarOpen && <span className="font-medium text-sm">Onboarding</span>}
            </Button>
          </nav>

          <div className="px-3 py-4 text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-4">Resources</div>
          <nav className="space-y-1">
            <Button
              variant="ghost"
              onClick={() => navigate('/handbook')}
              className={cn(
                "w-full justify-start gap-3 h-11 px-3 transition-all rounded-lg",
                location.pathname === '/handbook' ? "bg-secondary text-primary border border-primary/20" : "text-muted-foreground hover:text-foreground",
                !isSidebarOpen && "justify-center px-0"
              )}
            >
              <BookOpen className="h-5 w-5 shrink-0 animate-in fade-in" />
              {isSidebarOpen && <span className="font-medium text-sm">Company Handbook</span>}
            </Button>
          </nav>
        </ScrollArea>

        <div className="p-4 border-t border-border mt-auto">
          <div className={cn("flex items-center gap-3", !isSidebarOpen && "justify-center")}>
            <Avatar className="h-10 w-10 border border-primary">
              <AvatarImage src="https://avatar.iran.liara.run/public/job/officer/male" />
              <AvatarFallback>AS</AvatarFallback>
            </Avatar>
            {isSidebarOpen && (
              <div className="flex-1 overflow-hidden">
                <p className="text-sm font-bold truncate">Alexander Sterling</p>
                <p className="text-[10px] text-muted-foreground truncate uppercase tracking-widest">Chief HR Officer</p>
              </div>
            )}
          </div>
        </div>

        {/* Toggle Button */}
        <Button 
          variant="secondary" 
          size="icon" 
          className="absolute -right-3 top-20 h-6 w-6 rounded-full border border-border shadow-md z-50 hover:bg-primary hover:text-primary-foreground transform transition-colors"
          onClick={toggleSidebar}
        >
          {isSidebarOpen ? <X className="h-3 w-3" /> : <Menu className="h-3 w-3" />}
        </Button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col relative overflow-hidden bg-background/50">
        {/* Header */}
        <header className="h-16 flex items-center justify-between px-8 border-b border-border bg-[#080808] z-40">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative w-full max-w-md group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <input 
                type="text" 
                placeholder="Command Palette: search employees, reports, AI..." 
                className="w-full bg-[#111] border border-[#222] rounded-lg py-2 pl-10 pr-12 text-sm focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all font-medium"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-muted-foreground border border-[#333] px-1.5 py-0.5 rounded pointer-events-none">⌘K</span>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-2 text-[10px] text-primary font-mono font-bold tracking-widest">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
              <span>AI ENGINE ACTIVE v4.2</span>
            </div>
            
            <div className="relative cursor-pointer hover:text-primary transition-colors">
              <Bell className="h-5 w-5 text-muted-foreground hover:text-primary" />
              <span className="absolute -top-1 -right-1 h-2.5 w-2.5 bg-primary rounded-full ring-2 ring-[#080808]" />
            </div>
          </div>
        </header>

        {/* Content Area */}
        <ScrollArea className="flex-1">
          <div className="p-6 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
            {children}
          </div>
        </ScrollArea>
      </main>
    </div>
  );
}
