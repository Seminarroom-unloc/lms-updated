import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, BookOpen, GraduationCap, Search } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import ViewToggle from './ViewToggle';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [courseId, setCourseId] = useState<string | null>(null);
  const location = useLocation();

  // Get user courseId from localStorage
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      try {
        const parsed = JSON.parse(user);
        setCourseId(parsed.courseId || null);
      } catch (e) {
        console.error("Invalid user object in localStorage");
      }
    }
  }, []);

  // Track scroll position to add shadow/background to navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when changing routes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const isActive = (path: string) => location.pathname === path;

  const courseLink = courseId ? `/course/${courseId}` : '/explore';

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
      isScrolled ? "bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm shadow-sm py-3" : "py-5"
    )}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/index" className="flex items-center space-x-2">
            <GraduationCap className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold tracking-tight">Seminarroom</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <Link to={courseLink} className={`nav-link ${isActive(courseLink) ? 'active' : ''}`}>
              Courses
            </Link>
            <Link to="/assignments" className={`nav-link ${isActive('/assignments') ? 'active' : ''}`}>
              Assignments
            </Link>
            <Link to="/reading-materials" className={`nav-link ${isActive('/reading-materials') ? 'active' : ''}`}>
              Reading Materials
            </Link>
            <Link to="/quizzes" className={`nav-link ${isActive('/quizzes') ? 'active' : ''}`}>
              Quizzes
            </Link>
            <Link to="/discussions" className={`nav-link ${isActive('/discussions') ? 'active' : ''}`}>
              Discussions
            </Link>
          </nav>

          {/* View Toggle & Search Bar */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search..."
                className="w-[200px] pl-9 rounded-full bg-slate-100 dark:bg-slate-800 border-0 focus-visible:ring-1"
              />
            </div>
            <ViewToggle />
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden glass-effect border-b animate-fade-in">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-4">
              <Link to={courseLink} className={`nav-link ${isActive(courseLink) ? 'active' : ''}`}>
                Courses
              </Link>
              <Link to="/assignments" className={`nav-link ${isActive('/assignments') ? 'active' : ''}`}>
                Assignments
              </Link>
              <Link to="/reading-materials" className={`nav-link ${isActive('/reading-materials') ? 'active' : ''}`}>
                Reading Materials
              </Link>
              <Link to="/quizzes" className={`nav-link ${isActive('/quizzes') ? 'active' : ''}`}>
                Quizzes
              </Link>
              <Link to="/discussions" className={`nav-link ${isActive('/discussions') ? 'active' : ''}`}>
                Discussions
              </Link>
              <ViewToggle />
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search..."
                  className="w-full pl-9 rounded-full bg-slate-100 dark:bg-slate-800 border-0 focus-visible:ring-1"
                />
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
