import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Phone, Menu, User, LogOut, Settings } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface HeaderProps {
  userRole?: 'admin' | 'employee';
  userName?: string;
  onMenuToggle?: () => void;
  showMobileMenu?: boolean;
}

export function Header({ userRole = 'admin', userName = 'John Doe', onMenuToggle, showMobileMenu }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full bg-gradient-header border-b border-border shadow-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-4">
            {showMobileMenu && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onMenuToggle}
                className="lg:hidden text-primary-foreground hover:bg-primary-light/20"
              >
                <Menu className="h-5 w-5" />
              </Button>
            )}
            
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-primary-foreground/10 rounded-lg">
                <Phone className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-primary-foreground">DialPro</h1>
                <p className="text-xs text-primary-foreground/80">Enterprise Calling System</p>
              </div>
            </div>
          </div>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            <Badge 
              variant={userRole === 'admin' ? 'default' : 'secondary'}
              className="hidden sm:inline-flex capitalize"
            >
              {userRole}
            </Badge>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="text-primary-foreground hover:bg-primary-light/20">
                  <User className="h-5 w-5 mr-2" />
                  <span className="hidden sm:inline">{userName}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
}