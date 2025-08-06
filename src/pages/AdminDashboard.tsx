import { useState } from "react";
import { Header } from "@/components/Layout/Header";
import { Sidebar } from "@/components/Layout/Sidebar";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { CallLogTable } from "@/components/calls/CallLogTable";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Phone, 
  Users, 
  TrendingUp, 
  Clock,
  FileText,
  Download,
  AlertTriangle,
  CheckCircle,
  XCircle
} from "lucide-react";

export function AdminDashboard() {
  const [activeRoute, setActiveRoute] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const stats = [
    {
      title: "Total Calls Today",
      value: "247",
      change: { value: "+12%", trend: "up" as const },
      icon: Phone,
      variant: "default" as const
    },
    {
      title: "Active Employees",
      value: "23",
      change: { value: "+2", trend: "up" as const },
      icon: Users,
      variant: "success" as const
    },
    {
      title: "Call Success Rate",
      value: "94.2%",
      change: { value: "+3.1%", trend: "up" as const },
      icon: TrendingUp,
      variant: "success" as const
    },
    {
      title: "Avg Call Duration",
      value: "7:32",
      change: { value: "-0:45", trend: "down" as const },
      icon: Clock,
      variant: "warning" as const
    }
  ];

  const recentAlerts = [
    {
      id: 1,
      type: 'warning',
      employee: 'Mike Wilson',
      message: 'High missed call rate (15% today)',
      time: '2 hours ago'
    },
    {
      id: 2,
      type: 'success',
      employee: 'Sarah Johnson',
      message: 'Exceeded daily call target by 25%',
      time: '4 hours ago'
    },
    {
      id: 3,
      type: 'error',
      employee: 'System',
      message: 'Call recording upload failed for 3 calls',
      time: '1 day ago'
    }
  ];

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-warning" />;
      case 'success':
        return <CheckCircle className="h-4 w-4 text-success" />;
      case 'error':
        return <XCircle className="h-4 w-4 text-destructive" />;
      default:
        return <AlertTriangle className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Header 
        userRole="admin" 
        userName="Admin User"
        onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
        showMobileMenu
      />
      
      <div className="flex">
        <Sidebar 
          userRole="admin" 
          activeRoute={activeRoute}
          isOpen={sidebarOpen}
          onRouteChange={setActiveRoute}
        />
        
        <main className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'lg:ml-64' : ''}`}>
          <div className="container mx-auto p-6 space-y-6">
            {/* Dashboard Overview */}
            {activeRoute === 'dashboard' && (
              <>
                <div>
                  <h1 className="text-3xl font-bold text-foreground mb-2">Admin Dashboard</h1>
                  <p className="text-muted-foreground">Monitor your team's calling performance and system metrics.</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {stats.map((stat, index) => (
                    <StatsCard key={index} {...stat} />
                  ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Recent Alerts */}
                  <Card className="lg:col-span-1 shadow-lg border-0">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5 text-warning" />
                        Recent Alerts
                      </CardTitle>
                      <CardDescription>
                        System notifications and employee updates
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {recentAlerts.map((alert) => (
                        <div key={alert.id} className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                          {getAlertIcon(alert.type)}
                          <div className="flex-1 space-y-1">
                            <p className="text-sm font-medium">{alert.employee}</p>
                            <p className="text-xs text-muted-foreground">{alert.message}</p>
                            <p className="text-xs text-muted-foreground">{alert.time}</p>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  {/* Quick Actions */}
                  <Card className="lg:col-span-2 shadow-lg border-0">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <FileText className="h-5 w-5 text-primary" />
                        Quick Actions
                      </CardTitle>
                      <CardDescription>
                        Common administrative tasks
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Button className="bg-gradient-primary hover:opacity-90 h-20 flex-col gap-2">
                          <Download className="h-5 w-5" />
                          Export Today's Calls
                        </Button>
                        <Button variant="outline" className="h-20 flex-col gap-2">
                          <Users className="h-5 w-5" />
                          Manage Employees
                        </Button>
                        <Button variant="outline" className="h-20 flex-col gap-2">
                          <TrendingUp className="h-5 w-5" />
                          View Analytics
                        </Button>
                        <Button variant="outline" className="h-20 flex-col gap-2">
                          <FileText className="h-5 w-5" />
                          Generate Report
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Recent Calls */}
                <CallLogTable userRole="admin" />
              </>
            )}

            {/* Call Logs Page */}
            {activeRoute === 'calls' && (
              <>
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-3xl font-bold text-foreground mb-2">Call Logs</h1>
                    <p className="text-muted-foreground">View and manage all call records across your organization.</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Export CSV
                    </Button>
                    <Button className="bg-gradient-primary hover:opacity-90">
                      <FileText className="h-4 w-4 mr-2" />
                      Generate Report
                    </Button>
                  </div>
                </div>
                
                <CallLogTable userRole="admin" />
              </>
            )}

            {/* Employees Page */}
            {activeRoute === 'employees' && (
              <>
                <div>
                  <h1 className="text-3xl font-bold text-foreground mb-2">Employee Management</h1>
                  <p className="text-muted-foreground">Manage your team members and their calling permissions.</p>
                </div>
                
                <Card className="shadow-lg border-0">
                  <CardHeader>
                    <CardTitle>Team Overview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {['John Smith', 'Sarah Johnson', 'Mike Wilson', 'Lisa Davis'].map((name, index) => (
                        <div key={index} className="flex items-center justify-between p-4 border border-border rounded-lg">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center text-primary-foreground font-medium">
                              {name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div>
                              <p className="font-medium">{name}</p>
                              <p className="text-sm text-muted-foreground">{name.toLowerCase().replace(' ', '.')}@company.com</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                              Active
                            </Badge>
                            <Button variant="outline" size="sm">
                              Manage
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </>
            )}

            {/* Other routes would be implemented similarly */}
            {activeRoute === 'analytics' && (
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">Analytics</h1>
                <p className="text-muted-foreground">Coming soon - Performance insights and detailed reports.</p>
              </div>
            )}

            {activeRoute === 'reports' && (
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">Reports</h1>
                <p className="text-muted-foreground">Coming soon - Custom report generation and scheduling.</p>
              </div>
            )}

            {activeRoute === 'settings' && (
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">Settings</h1>
                <p className="text-muted-foreground">Coming soon - System configuration and preferences.</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
