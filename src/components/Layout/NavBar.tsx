
import { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { getUser, logout } from '@/lib/authUtils';
import { User } from '@/types';
import { Button } from '@/components/ui/button';
import { Home, Calendar, MessageSquare, User as UserIcon, Menu, X, ShoppingCart, Baby } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

const NavBar = () => {
  const [user, setUser] = useState<User | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useIsMobile();

  useEffect(() => {
    setUser(getUser());
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const navItems = user ? [
    { path: '/dashboard', icon: <Home className="mr-2 h-5 w-5" />, label: 'Dashboard' },
    { path: '/appointments', icon: <Calendar className="mr-2 h-5 w-5" />, label: 'Appointments' },
    { path: '/chatbot', icon: <MessageSquare className="mr-2 h-5 w-5" />, label: 'Chatbot' },
    { path: '/shopping-list', icon: <ShoppingCart className="mr-2 h-5 w-5" />, label: 'Shopping List' },
    { path: '/profile', icon: <UserIcon className="mr-2 h-5 w-5" />, label: 'Profile' },
  ] : [
    { path: '/login', icon: <UserIcon className="mr-2 h-5 w-5" />, label: 'Login' },
    { path: '/signup', icon: <UserIcon className="mr-2 h-5 w-5" />, label: 'Sign Up' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <Baby className="h-8 w-8 text-kilkari-purple" />
          <span className="font-bold text-xl text-kilkari-purple hidden sm:inline-block">Kilkari AI</span>
        </Link>

        {isMobile ? (
          <>
            <Button variant="ghost" size="icon" onClick={toggleMobileMenu} aria-label="Toggle menu">
              {mobileMenuOpen ? (
                <X className="h-5 w-5 text-kilkari-purple" />
              ) : (
                <Menu className="h-5 w-5 text-kilkari-purple" />
              )}
            </Button>
            
            {mobileMenuOpen && (
              <div className="fixed inset-0 top-16 bg-white z-40 animate-fade-in">
                <nav className="container py-6">
                  <ul className="space-y-4">
                    {navItems.map((item) => (
                      <li key={item.path}>
                        <Link
                          to={item.path}
                          className={cn(
                            "flex items-center px-4 py-3 rounded-lg hover:bg-kilkari-purple/10 transition-colors",
                            location.pathname === item.path && "bg-kilkari-purple/10 text-kilkari-purple font-medium"
                          )}
                          onClick={closeMobileMenu}
                        >
                          {item.icon}
                          <span>{item.label}</span>
                        </Link>
                      </li>
                    ))}
                    
                    {user && (
                      <li>
                        <Button 
                          variant="outline" 
                          onClick={() => {
                            handleLogout();
                            closeMobileMenu();
                          }}
                          className="w-full kilkari-button-secondary"
                        >
                          Logout
                        </Button>
                      </li>
                    )}
                  </ul>
                </nav>
              </div>
            )}
          </>
        ) : (
          <nav>
            <ul className="flex items-center gap-4">
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={cn(
                      "flex items-center px-3 py-2 rounded-lg hover:bg-kilkari-purple/10 transition-colors",
                      location.pathname === item.path && "bg-kilkari-purple/10 text-kilkari-purple font-medium"
                    )}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
              
              {user && (
                <li>
                  <Button 
                    variant="outline" 
                    onClick={handleLogout}
                    className="kilkari-button-secondary"
                  >
                    Logout
                  </Button>
                </li>
              )}
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
};

export default NavBar;
