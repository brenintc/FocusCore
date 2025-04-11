
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Trash2 } from 'lucide-react';
import { toast } from "sonner";
import InvestmentForm from './InvestmentForm';
import { Investment } from '@/types/financial';

interface InvestmentsTabProps {
  investments: Investment[];
  setInvestments: React.Dispatch<React.SetStateAction<Investment[]>>;
  totalInvested: number;
  formatCurrency: (value: number) => string;
}

const InvestmentsTab: React.FC<InvestmentsTabProps> = ({ 
  investments, 
  setInvestments,
  totalInvested,
  formatCurrency
}) => {
  const handleAddInvestment = (newInvestment: Omit<Investment, 'id'>) => {
    const investment: Investment = {
      ...newInvestment,
      id: `inv_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
      amount: Number(newInvestment.amount),
      interestRate: Number(newInvestment.interestRate)
    };

    setInvestments(prev => [...prev, investment]);
  };

  const handleDeleteInvestment = (id: string) => {
    setInvestments(prev => prev.filter(inv => inv.id !== id));
    toast.success("Investimento removido com sucesso!");
  };

  return (
    <div className="space-y-6">
      <InvestmentForm onAddInvestment={handleAddInvestment} />
      
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
    </div>
  );
};

export default InvestmentsTab;
