
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { PlusCircle, MinusCircle, Trash2 } from 'lucide-react';
import { toast } from "sonner";
import TransactionForm from './TransactionForm';
import { Transaction } from '@/types/financial';

interface TransactionsTabProps {
  transactions: Transaction[];
  setTransactions: React.Dispatch<React.SetStateAction<Transaction[]>>;
  formatCurrency: (value: number) => string;
}

const TransactionsTab: React.FC<TransactionsTabProps> = ({ 
  transactions, 
  setTransactions,
  formatCurrency
}) => {
  const handleAddTransaction = (newTransaction: Omit<Transaction, 'id'>) => {
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

  const regularTransactions = transactions.filter(t => 
    t.type === 'income' || t.type === 'expense'
  ).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="space-y-6">
      <TransactionForm onAddTransaction={handleAddTransaction} />
      
      <Card>
        <CardHeader>
          <CardTitle>Histórico de Transações</CardTitle>
          <CardDescription>Todas as suas transações recentes</CardDescription>
        </CardHeader>
        <CardContent>
          {regularTransactions.length > 0 ? (
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
                {regularTransactions.map((transaction) => (
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
    </div>
  );
};

export default TransactionsTab;
