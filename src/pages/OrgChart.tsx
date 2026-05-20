import React, { useState } from 'react';
import { 
  Users, 
  ChevronRight, 
  ChevronDown, 
  Search,
  Maximize2,
  Minimize2,
  UserCircle
} from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { EmployeeProfileSheet, EmployeeProfile } from "@/components/EmployeeProfileSheet";

interface OrgNode {
  id: string;
  name: string;
  role: string;
  dept: string;
  avatar?: string;
  children?: OrgNode[];
}

const initialOrgData: OrgNode = {
  id: '1',
  name: 'Alexander Sterling',
  role: 'Chief Executive Officer',
  dept: 'Executive',
  children: [
    {
      id: '2',
      name: 'Sarah Chen',
      role: 'Head of Engineering',
      dept: 'Engineering',
      children: [
        { id: '5', name: 'Marcus Thorne', role: 'Staff Security Engineer', dept: 'Engineering' },
        { id: '6', name: 'David Kim', role: 'Staff Software Engineer', dept: 'Engineering' },
      ]
    },
    {
      id: '3',
      name: 'James Wilson',
      role: 'VP of Product',
      dept: 'Product',
      children: [
        { id: '7', name: 'Elena Rodriguez', role: 'Design Director', dept: 'Design' },
      ]
    },
    {
      id: '4',
      name: 'Sophia Lee',
      role: 'VP of People',
      dept: 'HR',
    }
  ]
};

const Node: React.FC<{ 
  node: OrgNode; 
  level?: number; 
  onSelect?: (node: OrgNode) => void;
  selectedId?: string;
  searchTerm?: string;
}> = ({ node, level = 0, onSelect, selectedId, searchTerm = '' }) => {
  const isMatch = searchTerm !== '' && (
    node.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    node.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    node.dept.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const [isExpanded, setIsExpanded] = useState(true);
  const hasChildren = node.children && node.children.length > 0;
  const isSelected = selectedId === node.id;

  // Auto-expand if children match search
  React.useEffect(() => {
    if (searchTerm) {
      const checkChildrenMatch = (n: OrgNode): boolean => {
        return n.children?.some(c => 
          c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          c.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
          c.dept.toLowerCase().includes(searchTerm.toLowerCase()) ||
          checkChildrenMatch(c)
        ) || false;
      };

      if (checkChildrenMatch(node)) {
        setIsExpanded(true);
      }
    }
  }, [searchTerm, node]);

  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-4 relative">
        {level > 0 && (
          <div className="absolute -left-6 top-1/2 w-6 h-px bg-border" />
        )}
        
        <Card 
          onClick={() => onSelect?.(node)}
          className={cn(
            "bg-card/40 backdrop-blur-md border border-border hover:border-primary/50 transition-all cursor-pointer w-72 mb-4 group relative overflow-hidden",
            level === 0 && "border-primary/50 shadow-lg shadow-primary/5",
            isSelected && "border-primary ring-1 ring-primary/50 bg-primary/5",
            isMatch && "border-primary ring-2 ring-primary/40 shadow-[0_0_15px_rgba(var(--primary-rgb),0.3)] animate-pulse"
          )}
        >
          {isMatch && (
            <div className="absolute top-0 right-0 p-1">
              <div className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(var(--primary-rgb),1)]" />
            </div>
          )}
          <CardContent className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10 border border-primary/20">
                <AvatarImage src={node.avatar} className="object-cover" />
                <AvatarFallback className="bg-primary/10 text-primary font-bold">{node.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div className="overflow-hidden flex-1">
                <div className="flex items-center justify-between gap-2 overflow-hidden">
                  <p className="text-sm font-bold truncate">{node.name}</p>
                  {hasChildren && (
                    <div className="flex items-center gap-1 shrink-0">
                      <Users className="h-3 w-3 text-primary/70" />
                      <span className="text-[10px] font-bold text-primary">{node.children?.length}</span>
                    </div>
                  )}
                </div>
                <Badge variant="outline" className="text-[8px] h-4 py-0 px-1.5 bg-primary/10 text-primary border-none font-bold uppercase tracking-widest mt-0.5">
                  {node.role}
                </Badge>
              </div>
            </div>
            {hasChildren && (
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-6 w-6 rounded-full" 
                onClick={(e) => {
                  e.stopPropagation();
                  setIsExpanded(!isExpanded);
                }}
              >
                {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
              </Button>
            )}
          </CardContent>
        </Card>
      </div>

      {hasChildren && isExpanded && (
        <div className="ml-10 border-l border-border pl-6 relative">
          {node.children?.map((child) => (
            <Node 
              key={child.id} 
              node={child} 
              level={level + 1} 
              onSelect={onSelect}
              selectedId={selectedId}
              searchTerm={searchTerm}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default function OrgChart() {
  const [orgData, setOrgData] = useState<OrgNode>(initialOrgData);
  const [selectedNode, setSelectedNode] = useState<OrgNode | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const updateNodeAvatar = (nodes: OrgNode, id: string, avatarUrl: string): OrgNode => {
    if (nodes.id === id) {
      return { ...nodes, avatar: avatarUrl };
    }
    if (nodes.children) {
      return {
        ...nodes,
        children: nodes.children.map(child => updateNodeAvatar(child, id, avatarUrl))
      };
    }
    return nodes;
  };

  const handleUpdateAvatar = (avatarUrl: string) => {
    if (!selectedEmployee) return;
    const newData = updateNodeAvatar(orgData, selectedEmployee.id, avatarUrl);
    setOrgData(newData);
    
    // Update selectedNode if it's the one being modified
    if (selectedNode && selectedNode.id === selectedEmployee.id) {
      setSelectedNode(prev => prev ? { ...prev, avatar: avatarUrl } : null);
    }
  };

  const selectedEmployee: EmployeeProfile | null = selectedNode || orgData ? {
    id: (selectedNode || orgData).id,
    name: (selectedNode || orgData).name,
    role: (selectedNode || orgData).role,
    dept: (selectedNode || orgData).dept,
    avatar: (selectedNode || orgData).avatar,
    status: 'active',
    email: `${(selectedNode || orgData).name.toLowerCase().replace(' ', '.')}@nexushr.com`
  } : null;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Organization Hierarchy</h1>
          <p className="text-muted-foreground mt-1">Navigate reporting lines and departmental structures across the enterprise.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2">
            <Maximize2 className="h-4 w-4" />
            Fullscreen
          </Button>
          <Button className="bg-primary text-black font-bold">Manage Roles</Button>
        </div>
      </div>

      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Find employee by name, role, or department..." 
            className="pl-10" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline" onClick={() => setSearchTerm('')}>Reset Search</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 p-8 bg-[#0d0d0d]/50 border border-border rounded-2xl overflow-auto min-h-[600px] flex items-start justify-center">
          <div className="inline-block p-12">
            <Node 
              node={orgData} 
              onSelect={setSelectedNode} 
              selectedId={selectedNode?.id} 
              searchTerm={searchTerm}
            />
          </div>
        </div>
        
        <div className="space-y-6">
          <Card className="bg-[#0d0d0d] border border-border overflow-hidden">
            <div className="h-24 bg-gradient-to-br from-primary/20 to-primary/5 border-b border-border" />
            <CardContent className="p-6 -mt-12 text-center">
              <Avatar className="h-20 w-20 border-4 border-[#0d0d0d] mx-auto mb-4">
                <AvatarImage src={(selectedNode || orgData).avatar} className="object-cover" />
                <AvatarFallback className="bg-primary/10 text-primary font-bold text-xl">
                  {(selectedNode || orgData).name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <h3 className="font-bold text-lg">{selectedNode?.name || orgData.name}</h3>
              <p className="text-xs text-primary font-bold uppercase tracking-widest mb-4">
                {selectedNode?.role || orgData.role}
              </p>
              
              <div className="grid grid-cols-2 gap-4 text-left border-t border-border pt-6">
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Department</p>
                  <p className="text-sm font-medium">{selectedNode?.dept || orgData.dept}</p>
                </div>
                <div className="space-y-1 text-right">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Reports</p>
                  <p className="text-sm font-medium">
                    {(selectedNode || orgData).children?.length || 0} Direct
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Location</p>
                  <p className="text-sm font-medium">NY Office</p>
                </div>
                <div className="space-y-1 text-right">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Status</p>
                  <Badge className="bg-primary/10 text-primary border-none text-[8px] h-4">ACTIVE</Badge>
                </div>
              </div>
              
              <Button 
                onClick={() => setIsSheetOpen(true)}
                className="w-full mt-6 bg-primary text-black font-bold text-xs h-9"
              >
                VIEW FULL DOSSIER
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-[#0d0d0d] border border-border p-6">
            <h4 className="font-bold text-[10px] text-muted-foreground uppercase tracking-[0.2em] mb-4">Quick Stats</h4>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Total Layers</span>
                <span className="text-sm font-bold">5 Levels</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Deepest Node</span>
                <span className="text-sm font-bold">Level 8</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Orphan Nodes</span>
                <span className="text-sm font-bold text-primary">0</span>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <EmployeeProfileSheet 
        employee={selectedEmployee}
        isOpen={isSheetOpen}
        onOpenChange={setIsSheetOpen}
        onUpdateAvatar={handleUpdateAvatar}
      />
    </div>
  );
}
