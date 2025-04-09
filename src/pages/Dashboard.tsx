
import React from 'react';
import { useUser } from '@/components/UserProvider';
import { useLanguage } from '@/components/LanguageProvider';
import NavigationGrid from '@/components/dashboard/NavigationGrid';

const Dashboard: React.FC = () => {
  const { userName } = useUser();
  const { language } = useLanguage();

  const greeting = language === 'pt-BR' ? 'Olá' : 
                   language === 'es-ES' ? 'Hola' :
                   language === 'fr-FR' ? 'Bonjour' :
                   language === 'de-DE' ? 'Hallo' : 'Hello';
                   
  const welcome = language === 'pt-BR' ? 'Bem-vindo de volta à sua central de produtividade' : 
                 language === 'es-ES' ? 'Bienvenido de nuevo a su centro de productividad' :
                 language === 'fr-FR' ? 'Bienvenue à votre centre de productivité' :
                 language === 'de-DE' ? 'Willkommen zurück in Ihrem Produktivitätszentrum' : 
                 'Welcome back to your productivity center';

  return (
    <div className="min-h-screen bg-white dark:bg-focusdark py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-focusdark dark:text-white">
            {greeting}, {userName || (language === 'pt-BR' ? 'Usuário' : 'User')}
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            {welcome}
          </p>
        </div>
        
        <NavigationGrid />
      </div>
    </div>
  );
};

export default Dashboard;
