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
  FileText, 
  Home, 
  CheckSquare, 
  Repeat, 
  Settings,
  ChevronRight
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
              <Link to="/" className="nav-link text-focusdark dark:text-white hover:text-focusblue px-3 py-2 text-sm font-medium flex items-center transition-all duration-200 hover:bg-accent/10 rounded-md">
                <Home className="mr-1 h-4 w-4" />
                Home
              </Link>
              <Link to="/tasks" className="nav-link text-focusdark dark:text-white hover:text-focusblue px-3 py-2 text-sm font-medium flex items-center transition-all duration-200 hover:bg-accent/10 rounded-md">
                <CheckSquare className="mr-1 h-4 w-4" />
                Tarefas
              </Link>
              <Link to="/habits" className="nav-link text-focusdark dark:text-white hover:text-focusblue px-3 py-2 text-sm font-medium flex items-center transition-all duration-200 hover:bg-accent/10 rounded-md">
                <Repeat className="mr-1 h-4 w-4" />
                Hábitos
              </Link>
              <Link to="/routines" className="nav-link text-focusdark dark:text-white hover:text-focusblue px-3 py-2 text-sm font-medium flex items-center transition-all duration-200 hover:bg-accent/10 rounded-md">
                <Repeat className="mr-1 h-4 w-4" />
                Rotinas
              </Link>
              <Link to="/financial" className="nav-link text-focusdark dark:text-white hover:text-focusblue px-3 py-2 text-sm font-medium flex items-center transition-all duration-200 hover:bg-accent/10 rounded-md">
                <Wallet className="mr-1 h-4 w-4" />
                Finanças
              </Link>
              <Link to="/calendar" className="nav-link text-focusdark dark:text-white hover:text-focusblue px-3 py-2 text-sm font-medium flex items-center transition-all duration-200 hover:bg-accent/10 rounded-md">
                <Calendar className="mr-1 h-4 w-4" />
                Calendário
              </Link>
              <Link to="/notes" className="nav-link text-focusdark dark:text-white hover:text-focusblue px-3 py-2 text-sm font-medium flex items-center transition-all duration-200 hover:bg-accent/10 rounded-md">
                <FileText className="mr-1 h-4 w-4" />
                Bloco de Notas
              </Link>
              <Link to="/settings" className="nav-link text-focusdark dark:text-white hover:text-focusblue px-3 py-2 text-sm font-medium flex items-center transition-all duration-200 hover:bg-accent/10 rounded-md">
                <Settings className="mr-1 h-4 w-4" />
                Configurações
              </Link>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={toggleDarkMode}
                className="ml-2 transition-all duration-200 hover:bg-accent/10"
              >
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              </Button>
              <Button 
                variant="default" 
                className="bg-focusblue hover:bg-blue-700 ml-2 transition-all duration-200 hover:scale-105 animate-scale"
              >
                Começar
              </Button>
            </div>
          )}
          
          <div className="md:hidden flex items-center">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleDarkMode}
              className="mr-2 transition-all duration-200 hover:bg-accent/10"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleMenu}
              className="transition-all duration-200 hover:bg-accent/10"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMobile && isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-focusdark pt-2 pb-4 px-4 shadow-lg animate-slide-down">
          <div className="flex flex-col space-y-2">
            <Link 
              to="/" 
              className="nav-link text-focusdark dark:text-white hover:bg-focuslight dark:hover:bg-gray-700 px-3 py-2 rounded-md text-base font-medium flex items-center transition-all duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              <Home className="mr-2 h-5 w-5" />
              Home
            </Link>
            <Link 
              to="/tasks" 
              className="nav-link text-focusdark dark:text-white hover:bg-focuslight dark:hover:bg-gray-700 px-3 py-2 rounded-md text-base font-medium flex items-center transition-all duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              <CheckSquare className="mr-2 h-5 w-5" />
              Tarefas
            </Link>
            <Link 
              to="/habits" 
              className="nav-link text-focusdark dark:text-white hover:bg-focuslight dark:hover:bg-gray-700 px-3 py-2 rounded-md text-base font-medium flex items-center transition-all duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              <Repeat className="mr-2 h-5 w-5" />
              Hábitos
            </Link>
            <Link 
              to="/routines" 
              className="nav-link text-focusdark dark:text-white hover:bg-focuslight dark:hover:bg-gray-700 px-3 py-2 rounded-md text-base font-medium flex items-center transition-all duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              <Repeat className="mr-2 h-5 w-5" />
              Rotinas
            </Link>
            <Link 
              to="/financial" 
              className="nav-link text-focusdark dark:text-white hover:bg-focuslight dark:hover:bg-gray-700 px-3 py-2 rounded-md text-base font-medium flex items-center transition-all duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              <Wallet className="mr-2 h-5 w-5" />
              Finanças
            </Link>
            <Link 
              to="/calendar" 
              className="nav-link text-focusdark dark:text-white hover:bg-focuslight dark:hover:bg-gray-700 px-3 py-2 rounded-md text-base font-medium flex items-center transition-all duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              <Calendar className="mr-2 h-5 w-5" />
              Calendário
            </Link>
            <Link 
              to="/notes" 
              className="nav-link text-focusdark dark:text-white hover:bg-focuslight dark:hover:bg-gray-700 px-3 py-2 rounded-md text-base font-medium flex items-center transition-all duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              <FileText className="mr-2 h-5 w-5" />
              Bloco de Notas
            </Link>
            <Link 
              to="/settings" 
              className="nav-link text-focusdark dark:text-white hover:bg-focuslight dark:hover:bg-gray-700 px-3 py-2 rounded-md text-base font-medium flex items-center transition-all duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              <Settings className="mr-2 h-5 w-5" />
              Configurações
            </Link>
            <Button 
              variant="default" 
              className="bg-focusblue hover:bg-blue-700 w-full mt-4 transition-all duration-200 hover:scale-105 animate-scale"
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
