
import React, { useState, useEffect } from 'react';
import { useUser } from '@/components/UserProvider';
import { toast } from "@/hooks/use-toast";
import FixedIncomeCard from '@/components/dashboard/FixedIncomeCard';
import NavigationGrid from '@/components/dashboard/NavigationGrid';

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
  const [fixedIncomes, setFixedIncomes] = useState<Transaction[]>([]);
  const [totalFixedIncome, setTotalFixedIncome] = useState(0);

  useEffect(() => {
    const loadFixedIncomes = () => {
      try {
        const savedTransactions = localStorage.getItem(`focuscore-${userId}-transactions`);
        console.log('Loaded transactions from localStorage:', savedTransactions);
        
        if (savedTransactions) {
          const transactions: Transaction[] = JSON.parse(savedTransactions);
          const fixed = transactions.filter(t => t.type === 'fixed-income');
          console.log('Fixed income transactions:', fixed);
          
          setFixedIncomes(fixed);
          setTotalFixedIncome(fixed.reduce((sum, t) => sum + t.amount, 0));
        } else {
          console.log('No transactions found in localStorage');
        }
      } catch (error) {
        console.error('Error loading transactions:', error);
        toast({
          title: "Erro ao carregar receitas fixas",
          description: "Não foi possível carregar suas receitas fixas",
          variant: "destructive",
        });
      }
    };

    loadFixedIncomes();
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
        
        <FixedIncomeCard 
          fixedIncomes={fixedIncomes} 
          totalFixedIncome={totalFixedIncome} 
          formatCurrency={formatCurrency} 
        />
        
        <NavigationGrid />
      </div>
    </div>
  );
};

export default Dashboard;
