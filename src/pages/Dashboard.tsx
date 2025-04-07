
import React, { useState, useEffect } from 'react';
import { useUser } from '@/components/UserProvider';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Calendar, BarChart2, Settings, Wallet, FileText, DollarSign } from 'lucide-react';

interface Transaction {
  id: string;
  type: 'income' | 'expense' | 'fixed-expense' | 'fixed-income' | 'investment';
  description: string;
  amount: number;
  date: string;
  category?: string;
}

const Dashboard: React.FC = () => {
  const { userName, userId } = useUser();
  const navigate = useNavigate();
  const [fixedIncomes, setFixedIncomes] = useState<Transaction[]>([]);
  const [totalFixedIncome, setTotalFixedIncome] = useState(0);

  useEffect(() => {
    // Carregar transações do localStorage
    const savedTransactions = localStorage.getItem(`focuscore-${userId}-transactions`);
    if (savedTransactions) {
      const transactions: Transaction[] = JSON.parse(savedTransactions);
      const fixed = transactions.filter(t => t.type === 'fixed-income');
      setFixedIncomes(fixed);
      setTotalFixedIncome(fixed.reduce((sum, t) => sum + t.amount, 0));
    }
  }, [userId]);

  const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };
  
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
        
        {/* Card de Receitas Fixas */}
        <Card className="mb-8 hover:shadow-md transition-all duration-200">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-xl">
              <DollarSign className="mr-2 h-5 w-5 text-green-600 dark:text-green-400" />
              Receitas Fixas
            </CardTitle>
            <CardDescription>Total Mensal: {formatCurrency(totalFixedIncome)}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {fixedIncomes.length > 0 ? (
                <div className="grid gap-2">
                  {fixedIncomes.map(income => (
                    <div key={income.id} className="flex justify-between items-center p-2 rounded-lg bg-gray-50 dark:bg-gray-800">
                      <div>
                        <p className="font-medium">{income.description}</p>
                        {income.category && (
                          <p className="text-sm text-gray-500 dark:text-gray-400">{income.category}</p>
                        )}
                      </div>
                      <p className="font-semibold text-green-600 dark:text-green-400">
                        {formatCurrency(income.amount)}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-gray-500 dark:text-gray-400">
                  Nenhuma receita fixa cadastrada
                </p>
              )}
              <Button 
                onClick={() => navigate('/financial')} 
                className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white"
              >
                Gerenciar Receitas Fixas
              </Button>
            </div>
          </CardContent>
        </Card>
        
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
                <Calendar className="mr-2 h-5 w-5 text-focusblue" />
                Meu Calendário
              </CardTitle>
              <CardDescription>Visualize sua agenda e feriados</CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={() => navigate('/calendar')} 
                className="w-full bg-focusblue"
              >
                Acessar Calendário
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
