import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: {
    value: string;
    trend: 'up' | 'down' | 'neutral';
  };
  icon: LucideIcon;
  variant?: 'default' | 'success' | 'warning' | 'destructive';
  className?: string;
}

export function StatsCard({ 
  title, 
  value, 
  change, 
  icon: Icon, 
  variant = 'default',
  className 
}: StatsCardProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case 'success':
        return {
          card: 'border-success/20 bg-success/5',
          icon: 'text-success bg-success/10',
          value: 'text-success'
        };
      case 'warning':
        return {
          card: 'border-warning/20 bg-warning/5',
          icon: 'text-warning bg-warning/10',
          value: 'text-warning'
        };
      case 'destructive':
        return {
          card: 'border-destructive/20 bg-destructive/5',
          icon: 'text-destructive bg-destructive/10',
          value: 'text-destructive'
        };
      default:
        return {
          card: 'border-primary/20 bg-primary/5',
          icon: 'text-primary bg-primary/10',
          value: 'text-primary'
        };
    }
  };

  const styles = getVariantStyles();

  const getTrendColor = () => {
    switch (change?.trend) {
      case 'up':
        return 'bg-success/10 text-success border-success/20';
      case 'down':
        return 'bg-destructive/10 text-destructive border-destructive/20';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  return (
    <Card className={cn("transition-smooth hover:shadow-md", styles.card, className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className={cn("p-2 rounded-lg", styles.icon)}>
          <Icon className="h-4 w-4" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-end justify-between">
          <div>
            <div className={cn("text-2xl font-bold", styles.value)}>
              {value}
            </div>
            {change && (
              <Badge 
                variant="outline" 
                className={cn("mt-2 text-xs", getTrendColor())}
              >
                {change.trend === 'up' ? '↗' : change.trend === 'down' ? '↘' : '→'} {change.value}
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}