import { Outlet } from "react-router-dom";
import { 
  SidebarProvider, 
  Sidebar, 
  SidebarContent, 
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupContent,
  SidebarFooter
} from "@/components/ui/sidebar";
import { 
  LayoutDashboard, 
  Compass, 
  Calendar, 
  ShoppingCart, 
  BookOpen,
  Code, 
  Zap,
  User,
  LogOut,
  HelpCircle
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";

export default function MainLayout() {
  const navigate = useNavigate();
  const handleLogout = () => {
    // TODO: Implement Supabase logout logic
    toast.success("Logged out successfully");
    navigate("/");
  };

  const handleSupport = () => {
    // TODO: Implement support action
    toast.info("Support feature coming soon");
  };
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen flex w-full">
        {/* Left Sidebar */}
        <Sidebar side="left" variant="sidebar" collapsible="icon">
          <SidebarContent>
            <div className="flex items-center h-16 px-4 border-b">
              <h1 className="text-xl font-bold">Seminarroom</h1>
            </div>
            
            {/* Profile Section */}
            <div className="px-4 py-4 border-b">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" alt="Mark Geiler" />
                  <AvatarFallback>MG</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="font-medium text-sm">Mark Geiler</span>
                  <span className="text-xs text-muted-foreground">Student</span>
                </div>
              </div>
            </div>
            
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip="Dashboard">
                      <Link to="/dashboard">
                        <LayoutDashboard />
                        <span>Dashboard</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip="Explore" isActive={window.location.pathname === "/explore"}>
                      <Link to="/explore">
                        <Compass />
                        <span>Explore</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip="Calendar">
                      <Link to="/calendar">
                        <Calendar />
                        <span>Calendar</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip="Cart">
                      <Link to="/cart">
                        <ShoppingCart />
                        <span>Cart</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip="Courses" isActive={window.location.pathname === "/index"}>
                      <Link to="/index">
                        <BookOpen />
                        <span>Courses</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip="Practice">
                      <Link to="/practice">
                        <Code />
                        <span>Practice</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip="Live Challenges">
                      <Link to="/live-challenges">
                        <Zap />
                        <span>Live Challenges</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip="Profile">
                      <Link to="/profile">
                        <User />
                        <span>Profile</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            <SidebarFooter>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    onClick={handleSupport} 
                    tooltip="Support"
                  >
                    <HelpCircle />
                    <span>Support</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    onClick={handleLogout} 
                    tooltip="Logout"
                    className="text-destructive hover:bg-destructive/10"
                  >
                    <LogOut />
                    <span>Logout</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarFooter>
          </SidebarContent>
        </Sidebar>
        
        {/* Main Content */}
        <div className="flex-1">
          <Outlet />
        </div>
      </div>
    </SidebarProvider>
  );
}