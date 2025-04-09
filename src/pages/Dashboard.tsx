
import React from 'react';
import { useUser } from '@/components/UserProvider';
import NavigationGrid from '@/components/dashboard/NavigationGrid';

const Dashboard: React.FC = () => {
  const { userName } = useUser();

  return (
    <div className="min-h-screen bg-white dark:bg-focusdark py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-focusdark dark:text-white">
            Olá, {userName || 'Usuário'}
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Bem-vindo de volta à sua central de produtividade
          </p>
        </div>
        
        <NavigationGrid />
      </div>
    </div>
  );
};

export default Dashboard;
