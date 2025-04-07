
import React from 'react';
import { CheckCircle, Calendar, BarChart2, Settings, Wallet } from 'lucide-react';
import NavigationCard from './NavigationCard';

const NavigationGrid: React.FC = () => {
  const navigationItems = [
    {
      title: 'Minhas Tarefas',
      description: 'Gerencie sua lista de tarefas',
      path: '/tasks',
      icon: CheckCircle,
      buttonText: 'Acessar Tarefas',
    },
    {
      title: 'Meus Hábitos',
      description: 'Acompanhe seus hábitos diários',
      path: '/habits',
      icon: BarChart2,
      buttonText: 'Acessar Hábitos',
    },
    {
      title: 'Minhas Rotinas',
      description: 'Organize suas rotinas diárias',
      path: '/routines',
      icon: Calendar,
      buttonText: 'Acessar Rotinas',
    },
    {
      title: 'Minhas Finanças',
      description: 'Controle seus gastos e investimentos',
      path: '/financial',
      icon: Wallet,
      buttonText: 'Acessar Finanças',
    },
    {
      title: 'Meu Calendário',
      description: 'Visualize sua agenda e feriados',
      path: '/calendar',
      icon: Calendar,
      buttonText: 'Acessar Calendário',
    },
    {
      title: 'Configurações',
      description: 'Personalize sua experiência',
      path: '/settings',
      icon: Settings,
      buttonVariant: 'outline',
      buttonText: 'Configurar',
      buttonClassName: '',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      {navigationItems.map((item, index) => (
        <NavigationCard
          key={index}
          title={item.title}
          description={item.description}
          path={item.path}
          icon={item.icon}
          buttonText={item.buttonText}
          buttonVariant={item.buttonVariant}
          buttonClassName={item.buttonClassName}
        />
      ))}
    </div>
  );
};

export default NavigationGrid;
