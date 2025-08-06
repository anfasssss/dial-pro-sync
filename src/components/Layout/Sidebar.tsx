import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  Phone, 
  Users, 
  BarChart3, 
  Settings, 
  FileText,
  Calendar,
  Tag,
  Download
} from "lucide-react";

interface SidebarProps {
  userRole: 'admin' | 'employee';
  activeRoute?: string;
  isOpen?: boolean;
  onRouteChange?: (route: string) => void;
}

const adminMenuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'calls', label: 'Call Logs', icon: Phone },
  { id: 'employees', label: 'Employees', icon: Users },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'reports', label: 'Reports', icon: FileText },
  { id: 'settings', label: 'Settings', icon: Settings },
];

const employeeMenuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'calls', label: 'My Calls', icon: Phone },
  { id: 'schedule', label: 'Follow-ups', icon: Calendar },
  { id: 'tags', label: 'Call Tags', icon: Tag },
  { id: 'exports', label: 'Export Data', icon: Download },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export function Sidebar({ userRole, activeRoute = 'dashboard', isOpen = true, onRouteChange }: SidebarProps) {
  const menuItems = userRole === 'admin' ? adminMenuItems : employeeMenuItems;

  return (
    <aside className={cn(
      "fixed left-0 top-16 z-40 h-[calc(100vh-4rem)] w-64 transform bg-card border-r border-border transition-transform duration-300 ease-in-out lg:translate-x-0",
      isOpen ? "translate-x-0" : "-translate-x-full"
    )}>
      <div className="flex h-full flex-col">
        <div className="flex-1 overflow-y-auto px-4 py-6">
          <nav className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeRoute === item.id;
              
              return (
                <Button
                  key={item.id}
                  variant={isActive ? "default" : "ghost"}
                  className={cn(
                    "w-full justify-start transition-smooth",
                    isActive 
                      ? "bg-primary text-primary-foreground shadow-md" 
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  )}
                  onClick={() => onRouteChange?.(item.id)}
                >
                  <Icon className="mr-3 h-5 w-5" />
                  {item.label}
                </Button>
              );
            })}
          </nav>
        </div>
        
        {/* Role Badge */}
        <div className="border-t border-border p-4">
          <div className="rounded-lg bg-gradient-subtle p-3 text-center">
            <p className="text-sm font-medium text-foreground capitalize">
              {userRole} Portal
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {userRole === 'admin' ? 'Full System Access' : 'Employee Dashboard'}
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}