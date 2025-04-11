
import React, { useState, useEffect } from 'react';
import { useUser } from '@/components/UserProvider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FinancialOverview from '@/components/financial/FinancialOverview';
import TransactionsTab from '@/components/financial/TransactionsTab';
import FixedTransactionsTab from '@/components/financial/FixedTransactionsTab';
import InvestmentsTab from '@/components/financial/InvestmentsTab';
import { Transaction, Investment } from '@/types/financial';

const Financial: React.FC = () => {
  const { userId } = useUser();
  const [activeTab, setActiveTab] = useState("overview");
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const savedTransactions = localStorage.getItem(`focuscore-${userId}-transactions`);
    return savedTransactions ? JSON.parse(savedTransactions) : [];
  });
  
  const [investments, setInvestments] = useState<Investment[]>(() => {
    const savedInvestments = localStorage.getItem(`focuscore-${userId}-investments`);
    return savedInvestments ? JSON.parse(savedInvestments) : [];
  });

  // Save transactions to localStorage when they change
  useEffect(() => {
    localStorage.setItem(`focuscore-${userId}-transactions`, JSON.stringify(transactions));
  }, [transactions, userId]);

  // Save investments to localStorage when they change
  useEffect(() => {
    localStorage.setItem(`focuscore-${userId}-investments`, JSON.stringify(investments));
  }, [investments, userId]);

  // Helper function to format currency values
  const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  // Calculations for overview
  const totalIncome = transactions
    .filter(t => t.type === 'income' || t.type === 'fixed-income')
    .reduce((sum, t) => sum + t.amount, 0);
    
  const totalExpense = transactions
    .filter(t => t.type === 'expense' || t.type === 'fixed-expense')
    .reduce((sum, t) => sum + t.amount, 0);
    
  const totalBalance = totalIncome - totalExpense;
  
  const totalInvested = investments.reduce((sum, inv) => sum + inv.amount, 0);

  return (
    <div className="min-h-screen py-8 px-4 bg-white dark:bg-focusdark">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-focusdark dark:text-white">
          Gestão Financeira
        </h1>
        
        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-4 mb-8">
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="transactions">Transações</TabsTrigger>
            <TabsTrigger value="fixed">Receitas e Despesas Fixas</TabsTrigger>
            <TabsTrigger value="investments">Investimentos</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <FinancialOverview 
              totalBalance={totalBalance}
              totalIncome={totalIncome}
              totalExpense={totalExpense}
              formatCurrency={formatCurrency}
              setActiveTab={setActiveTab}
            />
          </TabsContent>
          
          <TabsContent value="transactions">
            <TransactionsTab 
              transactions={transactions}
              setTransactions={setTransactions}
              formatCurrency={formatCurrency}
            />
          </TabsContent>
          
          <TabsContent value="fixed">
            <FixedTransactionsTab 
              transactions={transactions}
              setTransactions={setTransactions}
              formatCurrency={formatCurrency}
            />
          </TabsContent>
          
          <TabsContent value="investments">
            <InvestmentsTab 
              investments={investments}
              setInvestments={setInvestments}
              totalInvested={totalInvested}
              formatCurrency={formatCurrency}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Financial;
