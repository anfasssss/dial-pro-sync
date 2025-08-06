import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Phone, 
  PhoneIncoming, 
  PhoneOutgoing, 
  PhoneMissed, 
  Play, 
  Download,
  Filter,
  Calendar,
  Tag,
  User,
  Clock
} from "lucide-react";
import { cn } from "@/lib/utils";

interface CallLogEntry {
  id: string;
  employeeName: string;
  customerNumber: string;
  customerName?: string;
  type: 'incoming' | 'outgoing' | 'missed';
  duration: string;
  timestamp: string;
  date: string;
  tags: string[];
  hasRecording: boolean;
  notes?: string;
  status: 'completed' | 'missed' | 'follow-up';
}

interface CallLogTableProps {
  data?: CallLogEntry[];
  userRole: 'admin' | 'employee';
  onPlayRecording?: (id: string) => void;
  onDownloadRecording?: (id: string) => void;
  onAddNote?: (id: string, note: string) => void;
}

const mockData: CallLogEntry[] = [
  {
    id: '1',
    employeeName: 'John Smith',
    customerNumber: '+1-555-0123',
    customerName: 'Acme Corp',
    type: 'outgoing',
    duration: '5:23',
    timestamp: '10:30 AM',
    date: '2024-08-06',
    tags: ['Sales', 'Follow-up'],
    hasRecording: true,
    notes: 'Customer interested in premium package',
    status: 'completed'
  },
  {
    id: '2',
    employeeName: 'Sarah Johnson',
    customerNumber: '+1-555-0456',
    customerName: 'Tech Solutions Inc',
    type: 'incoming',
    duration: '12:45',
    timestamp: '09:15 AM',
    date: '2024-08-06',
    tags: ['Support', 'Escalated'],
    hasRecording: true,
    status: 'follow-up'
  },
  {
    id: '3',
    employeeName: 'Mike Wilson',
    customerNumber: '+1-555-0789',
    type: 'missed',
    duration: '0:00',
    timestamp: '08:45 AM',
    date: '2024-08-06',
    tags: ['Callback'],
    hasRecording: false,
    status: 'missed'
  }
];

export function CallLogTable({ 
  data = mockData, 
  userRole, 
  onPlayRecording, 
  onDownloadRecording,
  onAddNote 
}: CallLogTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterEmployee, setFilterEmployee] = useState("all");

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'incoming':
        return <PhoneIncoming className="h-4 w-4 text-success" />;
      case 'outgoing':
        return <PhoneOutgoing className="h-4 w-4 text-primary" />;
      case 'missed':
        return <PhoneMissed className="h-4 w-4 text-destructive" />;
      default:
        return <Phone className="h-4 w-4" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge variant="outline" className="bg-success/10 text-success border-success/20">Completed</Badge>;
      case 'follow-up':
        return <Badge variant="outline" className="bg-warning/10 text-warning border-warning/20">Follow-up</Badge>;
      case 'missed':
        return <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/20">Missed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const filteredData = data.filter(call => {
    const matchesSearch = 
      call.customerNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      call.customerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      call.employeeName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = filterType === 'all' || call.type === filterType;
    const matchesEmployee = filterEmployee === 'all' || call.employeeName === filterEmployee;
    
    return matchesSearch && matchesType && matchesEmployee;
  });

  return (
    <Card className="shadow-lg border-0">
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <CardTitle className="flex items-center gap-2">
            <Phone className="h-5 w-5 text-primary" />
            Call Logs
          </CardTitle>
          
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative">
              <Input
                placeholder="Search calls..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 w-full sm:w-64"
              />
              <Filter className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            </div>
            
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-full sm:w-32">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="incoming">Incoming</SelectItem>
                <SelectItem value="outgoing">Outgoing</SelectItem>
                <SelectItem value="missed">Missed</SelectItem>
              </SelectContent>
            </Select>

            {userRole === 'admin' && (
              <Select value={filterEmployee} onValueChange={setFilterEmployee}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Employee" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Employees</SelectItem>
                  <SelectItem value="John Smith">John Smith</SelectItem>
                  <SelectItem value="Sarah Johnson">Sarah Johnson</SelectItem>
                  <SelectItem value="Mike Wilson">Mike Wilson</SelectItem>
                </SelectContent>
              </Select>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          {filteredData.map((call) => (
            <div 
              key={call.id} 
              className="p-4 border border-border rounded-lg hover:bg-accent/50 transition-smooth"
            >
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                {/* Call Info */}
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-3">
                    {getTypeIcon(call.type)}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-medium">{call.customerNumber}</span>
                        {call.customerName && (
                          <Badge variant="outline" className="text-xs">{call.customerName}</Badge>
                        )}
                        {getStatusBadge(call.status)}
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                        {userRole === 'admin' && (
                          <span className="flex items-center gap-1">
                            <User className="h-3 w-3" />
                            {call.employeeName}
                          </span>
                        )}
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {call.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {call.timestamp}
                        </span>
                        <span>Duration: {call.duration}</span>
                      </div>
                    </div>
                  </div>

                  {/* Tags */}
                  {call.tags.length > 0 && (
                    <div className="flex items-center gap-2 flex-wrap">
                      <Tag className="h-3 w-3 text-muted-foreground" />
                      {call.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}

                  {/* Notes */}
                  {call.notes && (
                    <p className="text-sm text-muted-foreground bg-muted/50 p-2 rounded">
                      {call.notes}
                    </p>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  {call.hasRecording && (
                    <>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onPlayRecording?.(call.id)}
                        className="flex items-center gap-1"
                      >
                        <Play className="h-3 w-3" />
                        Play
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onDownloadRecording?.(call.id)}
                        className="flex items-center gap-1"
                      >
                        <Download className="h-3 w-3" />
                        Download
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredData.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <Phone className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No call logs found matching your criteria.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}