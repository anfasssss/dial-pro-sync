import { useState, useEffect } from "react";
import { LoginForm } from "@/components/auth/LoginForm";
import { AdminDashboard } from "./AdminDashboard";
import { EmployeeDashboard } from "./EmployeeDashboard";
import { useToast } from "@/hooks/use-toast";

interface User {
  email: string;
  role: 'admin' | 'employee';
  name: string;
}

const Index = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Check for existing session on load
  useEffect(() => {
    const savedUser = localStorage.getItem('dialPro_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogin = async (email: string, password: string, role: 'admin' | 'employee') => {
    setIsLoading(true);
    
    // Simulate authentication - replace with real auth when Supabase is connected
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Demo credentials validation
    const isValidDemo = (
      (email === 'admin@company.com' && password === 'demo123' && role === 'admin') ||
      (email === 'employee@company.com' && password === 'demo123' && role === 'employee')
    );

    if (isValidDemo || email.includes('@')) {
      const userData: User = {
        email,
        role,
        name: role === 'admin' ? 'Admin User' : 'John Smith'
      };
      
      setUser(userData);
      localStorage.setItem('dialPro_user', JSON.stringify(userData));
      
      toast({
        title: "Login Successful",
        description: `Welcome back, ${userData.name}!`,
      });
    } else {
      toast({
        title: "Login Failed",
        description: "Invalid credentials. Please check your email and password.",
        variant: "destructive",
      });
    }
    
    setIsLoading(false);
  };

  const handleForgotPassword = () => {
    toast({
      title: "Password Reset",
      description: "Password reset functionality will be available when Supabase is connected.",
    });
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('dialPro_user');
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
  };

  // Show login form if not authenticated
  if (!user) {
    return (
      <LoginForm 
        onLogin={handleLogin}
        onForgotPassword={handleForgotPassword}
        isLoading={isLoading}
      />
    );
  }

  // Show appropriate dashboard based on user role
  if (user.role === 'admin') {
    return <AdminDashboard />;
  } else {
    return <EmployeeDashboard />;
  }
};

export default Index;
