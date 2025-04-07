import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { 
  Menu, 
  X, 
  Sun, 
  Moon, 
  Calendar, 
  Wallet, 
  Home, 
  CheckSquare, 
  Repeat, 
  Settings 
} from "lucide-react";

interface NavbarProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ isDarkMode, toggleDarkMode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navLinkClasses = `
    nav-link 
    text-focusdark dark:text-white 
    hover:text-focusblue dark:hover:text-focusblue
    px-3 py-2 
    text-sm font-medium 
    flex items-center 
    transition-all duration-300 
    rounded-md 
    relative 
    group
    hover:bg-accent/5
    dark:hover:bg-white/5
    before:absolute
    before:bottom-0
    before:left-0
    before:w-full
    before:h-[2px]
    before:bg-focusblue
    before:origin-left
    before:scale-x-0
    hover:before:scale-x-100
    before:transition-transform
    before:duration-300
  `.replace(/\s+/g, ' ').trim();

  const iconClasses = `
    w-4 h-4
    mr-2
    text-focusdark dark:text-white
    transition-all
    duration-300
    group-hover:scale-110
    group-hover:text-focusblue
  `.replace(/\s+/g, ' ').trim();

  const mobileNavLinkClasses = `
    nav-link 
    text-focusdark dark:text-white 
    hover:text-focusblue dark:hover:text-focusblue
    px-3 py-2 
    rounded-md 
    text-base font-medium 
    flex items-center 
    transition-all duration-300
    hover:bg-focuslight/30
    dark:hover:bg-white/10
    hover:translate-x-1
    relative
    group
  `.replace(/\s+/g, ' ').trim();

  const mobileIconClasses = `
    w-5 h-5
    mr-2
    text-focusdark dark:text-white
    transition-all
    duration-300
    group-hover:scale-110
    group-hover:text-focusblue
  `.replace(/\s+/g, ' ').trim();

  return (
    <nav className="bg-white dark:bg-focusdark sticky top-0 z-50 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center transition-transform duration-200 hover:scale-105 animate-scale">
              <span className="text-focusblue dark:text-white text-xl font-bold">Focus<span className="text-focusdark dark:text-focusblue">Core</span></span>
            </Link>
          </div>
          
          {!isMobile && (
            <div className="hidden md:flex items-center space-x-4">
              <Link to="/" className={navLinkClasses}>
                <Home className={iconClasses} />
                Home
              </Link>
              <Link to="/tasks" className={navLinkClasses}>
                <CheckSquare className={iconClasses} />
                Tarefas
              </Link>
              <Link to="/habits" className={navLinkClasses}>
                <Repeat className={iconClasses} />
                Hábitos
              </Link>
              <Link to="/routines" className={navLinkClasses}>
                <Repeat className={iconClasses} />
                Rotinas
              </Link>
              <Link to="/financial" className={navLinkClasses}>
                <Wallet className={iconClasses} />
                Finanças
              </Link>
              <Link to="/calendar" className={navLinkClasses}>
                <Calendar className={iconClasses} />
                Calendário
              </Link>
              <Link to="/settings" className={navLinkClasses}>
                <Settings className={iconClasses} />
                Configurações
              </Link>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={toggleDarkMode}
                className="ml-2 transition-all duration-300 hover:bg-accent/10 hover:rotate-[360deg]"
              >
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </Button>
              <Button 
                variant="default" 
                className="bg-focusblue hover:bg-blue-700 ml-2 transition-all duration-300 hover:scale-105 hover:shadow-lg animate-scale"
              >
                Começar
              </Button>
            </div>
          )}
          
          <div className="md:hidden flex items-center">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleMenu}
              className="transition-all duration-300 hover:bg-accent/10"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>
      </div>
      
      {isMobile && isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-focusdark pt-2 pb-4 px-4 shadow-lg animate-slide-down">
          <div className="flex flex-col space-y-2">
            <Link 
              to="/" 
              className={mobileNavLinkClasses}
              onClick={() => setIsMenuOpen(false)}
            >
              <Home className={mobileIconClasses} />
              Home
            </Link>
            <Link 
              to="/tasks" 
              className={mobileNavLinkClasses}
              onClick={() => setIsMenuOpen(false)}
            >
              <CheckSquare className={mobileIconClasses} />
              Tarefas
            </Link>
            <Link 
              to="/habits" 
              className={mobileNavLinkClasses}
              onClick={() => setIsMenuOpen(false)}
            >
              <Repeat className={mobileIconClasses} />
              Hábitos
            </Link>
            <Link 
              to="/routines" 
              className={mobileNavLinkClasses}
              onClick={() => setIsMenuOpen(false)}
            >
              <Repeat className={mobileIconClasses} />
              Rotinas
            </Link>
            <Link 
              to="/financial" 
              className={mobileNavLinkClasses}
              onClick={() => setIsMenuOpen(false)}
            >
              <Wallet className={mobileIconClasses} />
              Finanças
            </Link>
            <Link 
              to="/calendar" 
              className={mobileNavLinkClasses}
              onClick={() => setIsMenuOpen(false)}
            >
              <Calendar className={mobileIconClasses} />
              Calendário
            </Link>
            <Link 
              to="/settings" 
              className={mobileNavLinkClasses}
              onClick={() => setIsMenuOpen(false)}
            >
              <Settings className={mobileIconClasses} />
              Configurações
            </Link>
            <Button 
              variant="default" 
              className="bg-focusblue hover:bg-blue-700 w-full mt-4 transition-all duration-300 hover:scale-105 hover:shadow-lg animate-scale"
              onClick={() => setIsMenuOpen(false)}
            >
              Começar
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
