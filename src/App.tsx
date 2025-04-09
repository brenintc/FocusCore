
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Welcome from "./pages/Welcome";
import Dashboard from "./pages/Dashboard";
import Tasks from "./pages/Tasks";
import Habits from "./pages/Habits";
import Routines from "./pages/Routines";
import Settings from "./pages/Settings";
import Financial from "./pages/Financial";
import { Calendar } from "./pages/Calendar";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { ThemeProvider, useTheme } from "./components/ThemeProvider";
import { UserProvider } from "./components/UserProvider";
import { LanguageProvider, useLanguage } from "./components/LanguageProvider";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const AppContent = () => {
  const { theme, toggleTheme } = useTheme();
  const { language } = useLanguage();
  const isDarkMode = theme === 'dark';

  // Traduzindo os títulos das rotas
  const getRouteTitle = (key: string) => {
    const titles: Record<string, Record<string, string>> = {
      'dashboard': {
        'pt-BR': 'Painel',
        'en-US': 'Dashboard',
        'es-ES': 'Panel',
        'fr-FR': 'Tableau de bord',
        'de-DE': 'Dashboard'
      },
      'tasks': {
        'pt-BR': 'Tarefas',
        'en-US': 'Tasks',
        'es-ES': 'Tareas',
        'fr-FR': 'Tâches',
        'de-DE': 'Aufgaben'
      },
      'habits': {
        'pt-BR': 'Hábitos',
        'en-US': 'Habits',
        'es-ES': 'Hábitos',
        'fr-FR': 'Habitudes',
        'de-DE': 'Gewohnheiten'
      },
      'routines': {
        'pt-BR': 'Rotinas',
        'en-US': 'Routines',
        'es-ES': 'Rutinas',
        'fr-FR': 'Routines',
        'de-DE': 'Routinen'
      },
      'financial': {
        'pt-BR': 'Finanças',
        'en-US': 'Financial',
        'es-ES': 'Finanzas',
        'fr-FR': 'Finances',
        'de-DE': 'Finanzen'
      },
      'calendar': {
        'pt-BR': 'Calendário',
        'en-US': 'Calendar',
        'es-ES': 'Calendario',
        'fr-FR': 'Calendrier',
        'de-DE': 'Kalender'
      },
      'settings': {
        'pt-BR': 'Configurações',
        'en-US': 'Settings',
        'es-ES': 'Configuración',
        'fr-FR': 'Paramètres',
        'de-DE': 'Einstellungen'
      },
      'welcome': {
        'pt-BR': 'Bem-vindo',
        'en-US': 'Welcome',
        'es-ES': 'Bienvenido',
        'fr-FR': 'Bienvenue',
        'de-DE': 'Willkommen'
      }
    };

    return titles[key][language] || titles[key]['en-US'];
  };

  return (
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="flex flex-col min-h-screen">
          <Navbar 
            isDarkMode={isDarkMode} 
            toggleDarkMode={toggleTheme} 
            routeTitles={{
              dashboard: getRouteTitle('dashboard'),
              tasks: getRouteTitle('tasks'),
              habits: getRouteTitle('habits'),
              routines: getRouteTitle('routines'),
              financial: getRouteTitle('financial'),
              calendar: getRouteTitle('calendar'),
              settings: getRouteTitle('settings')
            }}
          />
          <div className="flex-grow">
            <Routes>
              <Route path="/" element={<Welcome />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/tasks" element={<Tasks />} />
              <Route path="/habits" element={<Habits />} />
              <Route path="/routines" element={<Routines />} />
              <Route path="/financial" element={<Financial />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
          <Footer 
            language={language}
          />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <LanguageProvider>
        <UserProvider>
          <AppContent />
        </UserProvider>
      </LanguageProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
