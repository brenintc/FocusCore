
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { PlusCircle } from 'lucide-react';
import { toast } from "sonner";
import { TransactionFormProps } from '@/types/financial';

const TransactionForm: React.FC<TransactionFormProps> = ({ 
  type = 'income',
  onAddTransaction 
}) => {
  const [newTransaction, setNewTransaction] = useState({
    type: type,
    description: '',
    amount: 0,
    date: new Date().toISOString().substring(0, 10),
    category: ''
  });

  const isFixedTransaction = type === 'fixed-income' || type === 'fixed-expense';
  
  const handleSubmit = () => {
    if (!newTransaction.description || newTransaction.amount <= 0) {
      toast.error("Por favor, preencha a descrição e valor corretamente");
      return;
    }

    onAddTransaction(newTransaction);
    
    // Reset form
    setNewTransaction({
      type: type,
      description: '',
      amount: 0,
      date: new Date().toISOString().substring(0, 10),
      category: ''
    });
    
    toast.success("Transação adicionada com sucesso!");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {isFixedTransaction ? 'Adicionar Receita/Despesa Fixa' : 'Adicionar Nova Transação'}
        </CardTitle>
        <CardDescription>
          {isFixedTransaction 
            ? 'Registre seus ganhos e gastos mensais recorrentes'
            : 'Registre suas receitas e despesas'}
        </CardDescription>
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
              {isFixedTransaction ? (
                <>
                  <option value="fixed-income">Receita Fixa</option>
                  <option value="fixed-expense">Despesa Fixa</option>
                </>
              ) : (
                <>
                  <option value="income">Receita</option>
                  <option value="expense">Despesa</option>
                </>
              )}
            </select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="transaction-category">Categoria (opcional)</Label>
            <Input
              id="transaction-category"
              placeholder={isFixedTransaction ? "Ex: Salário, Aluguel..." : "Ex: Alimentação, Transporte..."}
              value={newTransaction.category}
              onChange={(e) => setNewTransaction({...newTransaction, category: e.target.value})}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="transaction-description">Descrição</Label>
            <Input
              id="transaction-description"
              placeholder={`Descrição da ${isFixedTransaction ? "transação fixa" : "transação"}`}
              value={newTransaction.description}
              onChange={(e) => setNewTransaction({...newTransaction, description: e.target.value})}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="transaction-amount">
              {isFixedTransaction ? "Valor Mensal (R$)" : "Valor (R$)"}
            </Label>
            <Input
              id="transaction-amount"
              type="number"
              placeholder="0,00"
              value={newTransaction.amount || ''}
              onChange={(e) => setNewTransaction({...newTransaction, amount: parseFloat(e.target.value) || 0})}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="transaction-date">
              {isFixedTransaction ? "Data de Início" : "Data"}
            </Label>
            <Input
              id="transaction-date"
              type="date"
              value={newTransaction.date}
              onChange={(e) => setNewTransaction({...newTransaction, date: e.target.value})}
            />
          </div>
        </div>
        
        <Button className="w-full" onClick={handleSubmit}>
          <PlusCircle className="mr-2 h-4 w-4" />
          {isFixedTransaction ? 'Adicionar Item Fixo' : 'Adicionar Transação'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default TransactionForm;
