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
  PhoneCall, 
  Clock,
  Calendar,
  Play,
  Pause,
  MicIcon,
  MicOff,
  Settings,
  Upload,
  Wifi,
  WifiOff
} from "lucide-react";

export function EmployeeDashboard() {
  const [activeRoute, setActiveRoute] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isCallActive, setIsCallActive] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const employeeStats = [
    {
      title: "Calls Today",
      value: "18",
      change: { value: "+3", trend: "up" as const },
      icon: Phone,
      variant: "default" as const
    },
    {
      title: "Talk Time",
      value: "2h 34m",
      change: { value: "+22m", trend: "up" as const },
      icon: Clock,
      variant: "success" as const
    },
    {
      title: "Success Rate",
      value: "89%",
      change: { value: "+5%", trend: "up" as const },
      icon: PhoneCall,
      variant: "success" as const
    },
    {
      title: "Follow-ups",
      value: "4",
      change: { value: "Due today", trend: "neutral" as const },
      icon: Calendar,
      variant: "warning" as const
    }
  ];

  const upcomingFollowUps = [
    {
      id: 1,
      customer: 'Acme Corp',
      phone: '+1-555-0123',
      time: '2:00 PM',
      reason: 'Product demo follow-up'
    },
    {
      id: 2,
      customer: 'Tech Solutions',
      phone: '+1-555-0456',
      time: '3:30 PM',
      reason: 'Pricing discussion'
    },
    {
      id: 3,
      customer: 'Global Industries',
      phone: '+1-555-0789',
      time: '4:15 PM',
      reason: 'Contract renewal'
    }
  ];

  const handleCall = (phone: string) => {
    setIsCallActive(true);
    setIsRecording(true);
    // Simulate call functionality
    console.log(`Calling ${phone}`);
  };

  const handleEndCall = () => {
    setIsCallActive(false);
    setIsRecording(false);
    setIsMuted(false);
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Header 
        userRole="employee" 
        userName="John Smith"
        onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
        showMobileMenu
      />
      
      <div className="flex">
        <Sidebar 
          userRole="employee" 
          activeRoute={activeRoute}
          isOpen={sidebarOpen}
          onRouteChange={setActiveRoute}
        />
        
        <main className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'lg:ml-64' : ''}`}>
          <div className="container mx-auto p-6 space-y-6">
            {/* Employee Dashboard */}
            {activeRoute === 'dashboard' && (
              <>
                <div>
                  <h1 className="text-3xl font-bold text-foreground mb-2">My Dashboard</h1>
                  <p className="text-muted-foreground">Track your calling performance and manage your daily tasks.</p>
                </div>

                {/* Call Status Banner */}
                {isCallActive && (
                  <Card className="bg-gradient-primary border-0 text-primary-foreground shadow-elegant">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="p-3 bg-primary-foreground/20 rounded-full">
                            <PhoneCall className="h-6 w-6" />
                          </div>
                          <div>
                            <h3 className="font-semibold">Call in Progress</h3>
                            <p className="text-primary-foreground/80">+1-555-0123 • Acme Corp</p>
                            <p className="text-sm text-primary-foreground/60">Duration: 0:45</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setIsMuted(!isMuted)}
                            className="text-primary-foreground hover:bg-primary-foreground/20"
                          >
                            {isMuted ? <MicOff className="h-4 w-4" /> : <MicIcon className="h-4 w-4" />}
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setIsRecording(!isRecording)}
                            className="text-primary-foreground hover:bg-primary-foreground/20"
                          >
                            {isRecording ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={handleEndCall}
                          >
                            End Call
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {employeeStats.map((stat, index) => (
                    <StatsCard key={index} {...stat} />
                  ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Follow-ups */}
                  <Card className="lg:col-span-1 shadow-lg border-0">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Calendar className="h-5 w-5 text-warning" />
                        Today's Follow-ups
                      </CardTitle>
                      <CardDescription>
                        Scheduled callbacks and meetings
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {upcomingFollowUps.map((followUp) => (
                        <div key={followUp.id} className="p-3 bg-muted/50 rounded-lg space-y-2">
                          <div className="flex items-center justify-between">
                            <p className="font-medium text-sm">{followUp.customer}</p>
                            <Badge variant="outline" className="text-xs">{followUp.time}</Badge>
                          </div>
                          <p className="text-xs text-muted-foreground">{followUp.phone}</p>
                          <p className="text-xs text-muted-foreground">{followUp.reason}</p>
                          <Button 
                            size="sm" 
                            className="w-full bg-gradient-primary hover:opacity-90"
                            onClick={() => handleCall(followUp.phone)}
                          >
                            <PhoneCall className="h-3 w-3 mr-1" />
                            Call Now
                          </Button>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  {/* Quick Actions */}
                  <Card className="lg:col-span-2 shadow-lg border-0">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <PhoneCall className="h-5 w-5 text-primary" />
                        Quick Dialer
                      </CardTitle>
                      <CardDescription>
                        Make calls and manage your calling tools
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <Button className="bg-gradient-primary hover:opacity-90 h-16 flex-col gap-2">
                          <PhoneCall className="h-5 w-5" />
                          Quick Call
                        </Button>
                        <Button variant="outline" className="h-16 flex-col gap-2">
                          <Upload className="h-5 w-5" />
                          Sync Recordings
                        </Button>
                        <Button variant="outline" className="h-16 flex-col gap-2">
                          <Settings className="h-5 w-5" />
                          Call Settings
                        </Button>
                      </div>
                      
                      {/* Connection Status */}
                      <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <Wifi className="h-4 w-4 text-success" />
                          <span className="text-sm">Online - Auto sync enabled</span>
                        </div>
                        <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                          Connected
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Recent Calls */}
                <CallLogTable userRole="employee" />
              </>
            )}

            {/* My Calls Page */}
            {activeRoute === 'calls' && (
              <>
                <div>
                  <h1 className="text-3xl font-bold text-foreground mb-2">My Call History</h1>
                  <p className="text-muted-foreground">View your call records, recordings, and notes.</p>
                </div>
                
                <CallLogTable userRole="employee" />
              </>
            )}

            {/* Follow-ups Page */}
            {activeRoute === 'schedule' && (
              <>
                <div>
                  <h1 className="text-3xl font-bold text-foreground mb-2">Follow-up Schedule</h1>
                  <p className="text-muted-foreground">Manage your scheduled callbacks and follow-up meetings.</p>
                </div>
                
                <Card className="shadow-lg border-0">
                  <CardHeader>
                    <CardTitle>Upcoming Follow-ups</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {upcomingFollowUps.map((followUp) => (
                        <div key={followUp.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                          <div>
                            <p className="font-medium">{followUp.customer}</p>
                            <p className="text-sm text-muted-foreground">{followUp.phone}</p>
                            <p className="text-sm text-muted-foreground">{followUp.reason}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline">{followUp.time}</Badge>
                            <Button 
                              size="sm" 
                              className="bg-gradient-primary hover:opacity-90"
                              onClick={() => handleCall(followUp.phone)}
                            >
                              <PhoneCall className="h-3 w-3 mr-1" />
                              Call
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </>
            )}

            {/* Other employee routes */}
            {activeRoute === 'tags' && (
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">Call Tags</h1>
                <p className="text-muted-foreground">Coming soon - Manage your call tags and categories.</p>
              </div>
            )}

            {activeRoute === 'exports' && (
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">Export Data</h1>
                <p className="text-muted-foreground">Coming soon - Export your call data and reports.</p>
              </div>
            )}

            {activeRoute === 'settings' && (
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">Settings</h1>
                <p className="text-muted-foreground">Coming soon - Configure your calling preferences.</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
