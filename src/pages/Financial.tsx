
import React, { useState, useEffect } from 'react';
import { useUser } from '@/components/UserProvider';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";

// Definição dos tipos
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

  // Salvar transações no localStorage quando elas mudarem
  useEffect(() => {
    localStorage.setItem(`focuscore-${userId}-transactions`, JSON.stringify(transactions));
  }, [transactions, userId]);

  // Salvar investimentos no localStorage quando eles mudarem
  useEffect(() => {
    localStorage.setItem(`focuscore-${userId}-investments`, JSON.stringify(investments));
  }, [investments, userId]);

  // Funções para manipular transações
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

  // Funções para manipular investimentos
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

  // Cálculos financeiros
  const totalIncome = transactions
    .filter(t => t.type === 'income' || t.type === 'fixed-income')
    .reduce((sum, t) => sum + t.amount, 0);
    
  const totalExpense = transactions
    .filter(t => t.type === 'expense' || t.type === 'fixed-expense')
    .reduce((sum, t) => sum + t.amount, 0);
    
  const totalBalance = totalIncome - totalExpense;
  
  const totalInvested = investments.reduce((sum, inv) => sum + inv.amount, 0);
  
  // Funções para formatar valores monetários
  const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

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
          
          {/* Tab: Visão Geral */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <DollarSign className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400" />
                    Saldo Total
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className={`text-2xl font-bold ${totalBalance >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                    {formatCurrency(totalBalance)}
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <PlusCircle className="h-5 w-5 mr-2 text-green-600 dark:text-green-400" />
                    Receitas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {formatCurrency(totalIncome)}
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950 dark:to-red-900">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <MinusCircle className="h-5 w-5 mr-2 text-red-600 dark:text-red-400" />
                    Despesas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-red-600 dark:text-red-400">
                    {formatCurrency(totalExpense)}
                  </p>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Resumo Financeiro</CardTitle>
                <CardDescription>Visão geral das suas finanças</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Total Investido:</span>
                    <span className="text-sm font-bold">{formatCurrency(totalInvested)}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Transações Recentes:</span>
                    <span className="text-sm font-bold">{transactions.length}</span>
                  </div>
                  
                  <Button 
                    onClick={() => setActiveTab("transactions")} 
                    variant="outline" 
                    className="w-full mt-4"
                  >
                    <ArrowRightLeft className="mr-2 h-4 w-4" />
                    Gerenciar Transações
                  </Button>
                  
                  <Button 
                    onClick={() => setActiveTab("investments")} 
                    variant="outline" 
                    className="w-full"
                  >
                    <LineChart className="mr-2 h-4 w-4" />
                    Gerenciar Investimentos
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Tab: Transações */}
          <TabsContent value="transactions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Adicionar Nova Transação</CardTitle>
                <CardDescription>Registre suas receitas e despesas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="space-y-2">
                    <Label htmlFor="transaction-type">Tipo</Label>
                    <select
                      id="transaction-type"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      value={newTransaction.type}
                      onChange={(e) => setNewTransaction({...newTransaction, type: e.target.value as any})}
                    >
                      <option value="income">Receita</option>
                      <option value="expense">Despesa</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="transaction-category">Categoria (opcional)</Label>
                    <Input
                      id="transaction-category"
                      placeholder="Ex: Alimentação, Transporte..."
                      value={newTransaction.category}
                      onChange={(e) => setNewTransaction({...newTransaction, category: e.target.value})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="transaction-description">Descrição</Label>
                    <Input
                      id="transaction-description"
                      placeholder="Descrição da transação"
                      value={newTransaction.description}
                      onChange={(e) => setNewTransaction({...newTransaction, description: e.target.value})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="transaction-amount">Valor (R$)</Label>
                    <Input
                      id="transaction-amount"
                      type="number"
                      placeholder="0,00"
                      value={newTransaction.amount || ''}
                      onChange={(e) => setNewTransaction({...newTransaction, amount: parseFloat(e.target.value) || 0})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="transaction-date">Data</Label>
                    <Input
                      id="transaction-date"
                      type="date"
                      value={newTransaction.date}
                      onChange={(e) => setNewTransaction({...newTransaction, date: e.target.value})}
                    />
                  </div>
                </div>
                
                <Button className="w-full" onClick={handleAddTransaction}>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Adicionar Transação
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Histórico de Transações</CardTitle>
                <CardDescription>Todas as suas transações recentes</CardDescription>
              </CardHeader>
              <CardContent>
                {transactions.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Data</TableHead>
                        <TableHead>Descrição</TableHead>
                        <TableHead>Categoria</TableHead>
                        <TableHead>Tipo</TableHead>
                        <TableHead className="text-right">Valor</TableHead>
                        <TableHead className="text-right">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {transactions
                        .filter(t => t.type === 'income' || t.type === 'expense')
                        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                        .map((transaction) => (
                          <TableRow key={transaction.id}>
                            <TableCell>
                              {new Date(transaction.date).toLocaleDateString('pt-BR')}
                            </TableCell>
                            <TableCell>{transaction.description}</TableCell>
                            <TableCell>{transaction.category || '-'}</TableCell>
                            <TableCell>
                              {transaction.type === 'income' ? (
                                <span className="flex items-center text-green-600 dark:text-green-400">
                                  <PlusCircle className="h-4 w-4 mr-1" /> Receita
                                </span>
                              ) : (
                                <span className="flex items-center text-red-600 dark:text-red-400">
                                  <MinusCircle className="h-4 w-4 mr-1" /> Despesa
                                </span>
                              )}
                            </TableCell>
                            <TableCell className={`text-right font-medium ${
                              transaction.type === 'income' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                            }`}>
                              {formatCurrency(transaction.amount)}
                            </TableCell>
                            <TableCell className="text-right">
                              <Button 
                                size="sm" 
                                variant="ghost" 
                                onClick={() => handleDeleteTransaction(transaction.id)}
                              >
                                <Trash2 className="h-4 w-4 text-red-600 dark:text-red-400" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    Nenhuma transação encontrada. Adicione sua primeira transação acima.
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Tab: Receitas e Despesas Fixas */}
          <TabsContent value="fixed" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Adicionar Receita/Despesa Fixa</CardTitle>
                <CardDescription>Registre seus ganhos e gastos mensais recorrentes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="space-y-2">
                    <Label htmlFor="fixed-type">Tipo</Label>
                    <select
                      id="fixed-type"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      value={newTransaction.type}
                      onChange={(e) => setNewTransaction({...newTransaction, type: e.target.value as any})}
                    >
                      <option value="fixed-income">Receita Fixa</option>
                      <option value="fixed-expense">Despesa Fixa</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="fixed-category">Categoria (opcional)</Label>
                    <Input
                      id="fixed-category"
                      placeholder="Ex: Salário, Aluguel..."
                      value={newTransaction.category}
                      onChange={(e) => setNewTransaction({...newTransaction, category: e.target.value})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="fixed-description">Descrição</Label>
                    <Input
                      id="fixed-description"
                      placeholder="Descrição da transação fixa"
                      value={newTransaction.description}
                      onChange={(e) => setNewTransaction({...newTransaction, description: e.target.value})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="fixed-amount">Valor Mensal (R$)</Label>
                    <Input
                      id="fixed-amount"
                      type="number"
                      placeholder="0,00"
                      value={newTransaction.amount || ''}
                      onChange={(e) => setNewTransaction({...newTransaction, amount: parseFloat(e.target.value) || 0})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="fixed-date">Data de Início</Label>
                    <Input
                      id="fixed-date"
                      type="date"
                      value={newTransaction.date}
                      onChange={(e) => setNewTransaction({...newTransaction, date: e.target.value})}
                    />
                  </div>
                </div>
                
                <Button className="w-full" onClick={handleAddTransaction}>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Adicionar Item Fixo
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Receitas Fixas</CardTitle>
                <CardDescription>Seus ganhos mensais recorrentes</CardDescription>
              </CardHeader>
              <CardContent>
                {transactions.filter(t => t.type === 'fixed-income').length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Descrição</TableHead>
                        <TableHead>Categoria</TableHead>
                        <TableHead>Data de Início</TableHead>
                        <TableHead className="text-right">Valor Mensal</TableHead>
                        <TableHead className="text-right">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {transactions
                        .filter(t => t.type === 'fixed-income')
                        .map((transaction) => (
                          <TableRow key={transaction.id}>
                            <TableCell>{transaction.description}</TableCell>
                            <TableCell>{transaction.category || '-'}</TableCell>
                            <TableCell>
                              {new Date(transaction.date).toLocaleDateString('pt-BR')}
                            </TableCell>
                            <TableCell className="text-right font-medium text-green-600 dark:text-green-400">
                              {formatCurrency(transaction.amount)}
                            </TableCell>
                            <TableCell className="text-right">
                              <Button 
                                size="sm" 
                                variant="ghost" 
                                onClick={() => handleDeleteTransaction(transaction.id)}
                              >
                                <Trash2 className="h-4 w-4 text-red-600 dark:text-red-400" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                ) : (
                  <div className="text-center py-4 text-muted-foreground">
                    Nenhuma receita fixa encontrada.
                  </div>
                )}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Despesas Fixas</CardTitle>
                <CardDescription>Seus gastos mensais recorrentes</CardDescription>
              </CardHeader>
              <CardContent>
                {transactions.filter(t => t.type === 'fixed-expense').length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Descrição</TableHead>
                        <TableHead>Categoria</TableHead>
                        <TableHead>Data de Início</TableHead>
                        <TableHead className="text-right">Valor Mensal</TableHead>
                        <TableHead className="text-right">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {transactions
                        .filter(t => t.type === 'fixed-expense')
                        .map((transaction) => (
                          <TableRow key={transaction.id}>
                            <TableCell>{transaction.description}</TableCell>
                            <TableCell>{transaction.category || '-'}</TableCell>
                            <TableCell>
                              {new Date(transaction.date).toLocaleDateString('pt-BR')}
                            </TableCell>
                            <TableCell className="text-right font-medium text-red-600 dark:text-red-400">
                              {formatCurrency(transaction.amount)}
                            </TableCell>
                            <TableCell className="text-right">
                              <Button 
                                size="sm" 
                                variant="ghost" 
                                onClick={() => handleDeleteTransaction(transaction.id)}
                              >
                                <Trash2 className="h-4 w-4 text-red-600 dark:text-red-400" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                ) : (
                  <div className="text-center py-4 text-muted-foreground">
                    Nenhuma despesa fixa encontrada.
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Tab: Investimentos */}
          <TabsContent value="investments" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Adicionar Novo Investimento</CardTitle>
                <CardDescription>Registre seus investimentos e acompanhe seu rendimento</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="space-y-2">
                    <Label htmlFor="investment-name">Nome do Investimento</Label>
                    <Input
                      id="investment-name"
                      placeholder="Ex: Tesouro Direto, Ações..."
                      value={newInvestment.name}
                      onChange={(e) => setNewInvestment({...newInvestment, name: e.target.value})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="investment-amount">Valor Investido (R$)</Label>
                    <Input
                      id="investment-amount"
                      type="number"
                      placeholder="0,00"
                      value={newInvestment.amount || ''}
                      onChange={(e) => setNewInvestment({...newInvestment, amount: parseFloat(e.target.value) || 0})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="investment-rate">Taxa de Juros (% ao ano)</Label>
                    <Input
                      id="investment-rate"
                      type="number"
                      step="0.01"
                      placeholder="0,00"
                      value={newInvestment.interestRate || ''}
                      onChange={(e) => setNewInvestment({...newInvestment, interestRate: parseFloat(e.target.value) || 0})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="investment-start-date">Data de Início</Label>
                    <Input
                      id="investment-start-date"
                      type="date"
                      value={newInvestment.startDate}
                      onChange={(e) => setNewInvestment({...newInvestment, startDate: e.target.value})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="investment-end-date">Data de Vencimento (opcional)</Label>
                    <Input
                      id="investment-end-date"
                      type="date"
                      value={newInvestment.endDate}
                      onChange={(e) => setNewInvestment({...newInvestment, endDate: e.target.value})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="investment-notes">Observações (opcional)</Label>
                    <Input
                      id="investment-notes"
                      placeholder="Notas sobre o investimento"
                      value={newInvestment.notes}
                      onChange={(e) => setNewInvestment({...newInvestment, notes: e.target.value})}
                    />
                  </div>
                </div>
                
                <Button className="w-full" onClick={handleAddInvestment}>
                  <PiggyBank className="mr-2 h-4 w-4" />
                  Adicionar Investimento
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Seus Investimentos</CardTitle>
                <CardDescription>
                  Valor total investido: {formatCurrency(totalInvested)}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {investments.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nome</TableHead>
                        <TableHead>Valor</TableHead>
                        <TableHead>Taxa (%)</TableHead>
                        <TableHead>Início</TableHead>
                        <TableHead>Vencimento</TableHead>
                        <TableHead className="text-right">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {investments.map((investment) => (
                        <TableRow key={investment.id}>
                          <TableCell className="font-medium">{investment.name}</TableCell>
                          <TableCell>{formatCurrency(investment.amount)}</TableCell>
                          <TableCell>{investment.interestRate.toFixed(2)}%</TableCell>
                          <TableCell>
                            {new Date(investment.startDate).toLocaleDateString('pt-BR')}
                          </TableCell>
                          <TableCell>
                            {investment.endDate 
                              ? new Date(investment.endDate).toLocaleDateString('pt-BR') 
                              : '-'}
                          </TableCell>
                          <TableCell className="text-right">
                            <Button 
                              size="sm" 
                              variant="ghost" 
                              onClick={() => handleDeleteInvestment(investment.id)}
                            >
                              <Trash2 className="h-4 w-4 text-red-600 dark:text-red-400" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    Nenhum investimento encontrado. Adicione seu primeiro investimento acima.
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Financial;
