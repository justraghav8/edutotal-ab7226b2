import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  FileText, 
  Briefcase, 
  Building2, 
  Newspaper, 
  Users, 
  MessageSquare, 
  ShieldCheck,
  LogOut,
  Settings,
  Mail,
  ImageIcon,
  Images
} from "lucide-react";

export function AdminLayout() {
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate("/admin/login");
  };

  const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/admin" },
    { icon: Settings, label: "Site Settings", path: "/admin/settings" },
    { icon: ImageIcon, label: "Image Library", path: "/admin/images" },
    { icon: FileText, label: "Hero Banners", path: "/admin/hero-banners" },
    { icon: Briefcase, label: "Services", path: "/admin/services" },
    { icon: Building2, label: "Industries", path: "/admin/industries" },
    { icon: Newspaper, label: "Insights", path: "/admin/insights" },
    { icon: Users, label: "Team Members", path: "/admin/team" },
    { icon: ShieldCheck, label: "Clients", path: "/admin/clients" },
    { icon: MessageSquare, label: "Testimonials", path: "/admin/testimonials" },
    { icon: Briefcase, label: "Careers", path: "/admin/careers" },
    { icon: Mail, label: "Contact Forms", path: "/admin/contacts" },
    { icon: Images, label: "Gallery", path: "/admin/gallery" },
  ];

  return (
    <div className="min-h-screen bg-muted/30">
      <aside className="fixed left-0 top-0 h-screen w-64 bg-card border-r p-4 overflow-y-auto">
        <div className="mb-8">
          <h1 className="text-xl font-bold text-primary">EduTotal CMS</h1>
          <p className="text-sm text-muted-foreground">Admin Dashboard</p>
        </div>

        <nav className="space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-muted transition-colors text-sm"
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="mt-8 pt-4 border-t">
          <Button
            variant="ghost"
            onClick={handleSignOut}
            className="w-full justify-start"
          >
            <LogOut className="h-4 w-4 mr-3" />
            Sign Out
          </Button>
        </div>
      </aside>

      <main className="ml-64 p-8">
        <Outlet />
      </main>
    </div>
  );
}
