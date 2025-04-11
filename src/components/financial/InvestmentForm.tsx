
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { PiggyBank } from 'lucide-react';
import { toast } from "sonner";
import { InvestmentFormProps } from '@/types/financial';

const InvestmentForm: React.FC<InvestmentFormProps> = ({ onAddInvestment }) => {
  const [newInvestment, setNewInvestment] = useState({
    name: '',
    amount: 0,
    interestRate: 0,
    startDate: new Date().toISOString().substring(0, 10),
    endDate: '',
    notes: ''
  });
  
  const handleSubmit = () => {
    if (!newInvestment.name || newInvestment.amount <= 0) {
      toast.error("Por favor, preencha o nome e valor do investimento corretamente");
      return;
    }

    onAddInvestment(newInvestment);
    
    // Reset form
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

  return (
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
        
        <Button className="w-full" onClick={handleSubmit}>
          <PiggyBank className="mr-2 h-4 w-4" />
          Adicionar Investimento
        </Button>
      </CardContent>
    </Card>
  );
};

export default InvestmentForm;
