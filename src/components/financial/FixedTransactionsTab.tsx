
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Trash2 } from 'lucide-react';
import { toast } from "sonner";
import TransactionForm from './TransactionForm';
import { Transaction } from '@/types/financial';

interface FixedTransactionsTabProps {
  transactions: Transaction[];
  setTransactions: React.Dispatch<React.SetStateAction<Transaction[]>>;
  formatCurrency: (value: number) => string;
}

const FixedTransactionsTab: React.FC<FixedTransactionsTabProps> = ({ 
  transactions, 
  setTransactions,
  formatCurrency
}) => {
  const handleAddFixedTransaction = (newTransaction: Omit<Transaction, 'id'>) => {
    const transaction: Transaction = {
      ...newTransaction,
      id: `trans_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
      amount: Number(newTransaction.amount)
    };

    setTransactions(prev => [...prev, transaction]);
  };

  const handleDeleteTransaction = (id: string) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
    toast.success("Transação removida com sucesso!");
  };

  const fixedIncomes = transactions.filter(t => t.type === 'fixed-income');
  const fixedExpenses = transactions.filter(t => t.type === 'fixed-expense');

  return (
    <div className="space-y-6">
      <TransactionForm 
        type="fixed-income" 
        onAddTransaction={handleAddFixedTransaction} 
      />
      
      <Card>
        <CardHeader>
          <CardTitle>Receitas Fixas</CardTitle>
          <CardDescription>Seus ganhos mensais recorrentes</CardDescription>
        </CardHeader>
        <CardContent>
          {fixedIncomes.length > 0 ? (
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
                {fixedIncomes.map((transaction) => (
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
          {fixedExpenses.length > 0 ? (
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
                {fixedExpenses.map((transaction) => (
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
    </div>
  );
};

export default FixedTransactionsTab;
