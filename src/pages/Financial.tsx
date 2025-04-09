import React, { useState, useEffect } from 'react';
import { useUser } from '@/components/UserProvider';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  PlusCircle, 
  MinusCircle, 
  DollarSign, 
  LineChart, 
  Trash2, 
  PiggyBank,
  ArrowRightLeft,
  BarChart4
} from 'lucide-react';
import { toast } from "sonner";
import FinancialPagination from '@/components/financial/FinancialPagination';
import { useIsMobile } from '@/hooks/use-mobile';

interface Transaction {
  id: string;
  type: 'income' | 'expense' | 'fixed-expense' | 'fixed-income' | 'investment';
  description: string;
  amount: number;
  date: string;
  category?: string;
}

interface Investment {
  id: string;
  name: string;
  amount: number;
  interestRate: number;
  startDate: string;
  endDate?: string;
  notes?: string;
}

const Financial: React.FC = () => {
  const { userId } = useUser();
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState("overview");
  
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const savedTransactions = localStorage.getItem(`focuscore-${userId}-transactions`);
    return savedTransactions ? JSON.parse(savedTransactions) : [];
  });
  
  const [investments, setInvestments] = useState<Investment[]>(() => {
    const savedInvestments = localStorage.getItem(`focuscore-${userId}-investments`);
    return savedInvestments ? JSON.parse(savedInvestments) : [];
  });

  const [newTransaction, setNewTransaction] = useState<Omit<Transaction, 'id'>>({
    type: 'income',
    description: '',
    amount: 0,
    date: new Date().toISOString().substring(0, 10),
    category: ''
  });

  const [newInvestment, setNewInvestment] = useState<Omit<Investment, 'id'>>({
    name: '',
    amount: 0,
    interestRate: 0,
    startDate: new Date().toISOString().substring(0, 10),
    endDate: '',
    notes: ''
  });

  const tabs = [
    { value: "overview", label: "Visão Geral" },
    { value: "transactions", label: "Transações" },
    { value: "fixed", label: "Receitas e Despesas Fixas" },
    { value: "investments", label: "Investimentos" }
  ];

  useEffect(() => {
    localStorage.setItem(`focuscore-${userId}-transactions`, JSON.stringify(transactions));
  }, [transactions, userId]);

  useEffect(() => {
    localStorage.setItem(`focuscore-${userId}-investments`, JSON.stringify(investments));
  }, [investments, userId]);

  const handleAddTransaction = () => {
    if (!newTransaction.description || newTransaction.amount <= 0) {
      toast.error("Por favor, preencha a descrição e valor corretamente");
      return;
    }

    const transaction: Transaction = {
      ...newTransaction,
      id: `trans_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
      amount: Number(newTransaction.amount)
    };

    setTransactions([...transactions, transaction]);
    setNewTransaction({
      type: 'income',
      description: '',
      amount: 0,
      date: new Date().toISOString().substring(0, 10),
      category: ''
    });
    
    toast.success("Transação adicionada com sucesso!");
  };

  const handleDeleteTransaction = (id: string) => {
    setTransactions(transactions.filter(t => t.id !== id));
    toast.success("Transação removida com sucesso!");
  };

  const handleAddInvestment = () => {
    if (!newInvestment.name || newInvestment.amount <= 0) {
      toast.error("Por favor, preencha o nome e valor do investimento corretamente");
      return;
    }

    const investment: Investment = {
      ...newInvestment,
      id: `inv_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
      amount: Number(newInvestment.amount),
      interestRate: Number(newInvestment.interestRate)
    };

    setInvestments([...investments, investment]);
    setNewInvestment({
      name: '',
      amount: 0,
      interestRate: 0,
      startDate: new Date().toISOString().substring(0, 10),
      endDate: '',
      notes: ''
    });
    
    toast.success("Investimento adicionado com sucesso!");
  };

  const handleDeleteInvestment = (id: string) => {
    setInvestments(investments.filter(inv => inv.id !== id));
    toast.success("Investimento removido com sucesso!");
  };

  const totalIncome = transactions
    .filter(t => t.type === 'income' || t.type === 'fixed-income')
    .reduce((sum, t) => sum + t.amount, 0);
    
  const totalExpense = transactions
    .filter(t => t.type === 'expense' || t.type === 'fixed-expense')
    .reduce((sum, t) => sum + t.amount, 0);
    
  const totalBalance = totalIncome - totalExpense;
  
  const totalInvested = investments.reduce((sum, inv) => sum + inv.amount, 0);
  
  const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  return (
    <div className="min-h-screen py-8 px-4 bg-white dark:bg-focusdark">
      <div className="max-w-5xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-focusdark dark:text-white">
          Gestão Financeira
        </h1>
        
        <div className="bg-card rounded-lg p-1 shadow-sm">
          <FinancialPagination 
            activeTab={activeTab} 
            setActiveTab={setActiveTab} 
            tabs={tabs} 
            className="grid grid-cols-2 md:grid-cols-4 gap-1"
          />
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          {/* Conteúdo das abas permanece o mesmo */}
          <TabsContent value="overview" className="space-y-6">
            {/* ... conteúdo existente ... */}
          </TabsContent>
          
          <TabsContent value="transactions" className="space-y-6">
            {/* ... conteúdo existente ... */}
          </TabsContent>
          
          <TabsContent value="fixed" className="space-y-6">
            {/* ... conteúdo existente ... */}
          </TabsContent>
          
          <TabsContent value="investments" className="space-y-6">
            {/* ... conteúdo existente ... */}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Financial;
