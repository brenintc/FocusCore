
import React from 'react';
import { useUser } from '@/components/UserProvider';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Calendar, BarChart2, Settings, Wallet } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { userName } = useUser();
  const navigate = useNavigate();
  
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="hover:shadow-md transition-all duration-200 hover:-translate-y-1">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-xl">
                <CheckCircle className="mr-2 h-5 w-5 text-focusblue" />
                Minhas Tarefas
              </CardTitle>
              <CardDescription>Gerencie sua lista de tarefas</CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={() => navigate('/tasks')} 
                className="w-full bg-focusblue"
              >
                Acessar Tarefas
              </Button>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-md transition-all duration-200 hover:-translate-y-1">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-xl">
                <BarChart2 className="mr-2 h-5 w-5 text-focusblue" />
                Meus Hábitos
              </CardTitle>
              <CardDescription>Acompanhe seus hábitos diários</CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={() => navigate('/habits')} 
                className="w-full bg-focusblue"
              >
                Acessar Hábitos
              </Button>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-md transition-all duration-200 hover:-translate-y-1">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-xl">
                <Calendar className="mr-2 h-5 w-5 text-focusblue" />
                Minhas Rotinas
              </CardTitle>
              <CardDescription>Organize suas rotinas diárias</CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={() => navigate('/routines')} 
                className="w-full bg-focusblue"
              >
                Acessar Rotinas
              </Button>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-md transition-all duration-200 hover:-translate-y-1">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-xl">
                <Wallet className="mr-2 h-5 w-5 text-focusblue" />
                Minhas Finanças
              </CardTitle>
              <CardDescription>Controle seus gastos e investimentos</CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={() => navigate('/financial')} 
                className="w-full bg-focusblue"
              >
                Acessar Finanças
              </Button>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-md transition-all duration-200 hover:-translate-y-1">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-xl">
                <Settings className="mr-2 h-5 w-5 text-focusblue" />
                Configurações
              </CardTitle>
              <CardDescription>Personalize sua experiência</CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={() => navigate('/settings')} 
                variant="outline" 
                className="w-full"
              >
                Configurar
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
