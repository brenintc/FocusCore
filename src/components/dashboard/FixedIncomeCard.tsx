
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { DollarSign } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Transaction {
  id: string;
  type: 'income' | 'expense' | 'fixed-expense' | 'fixed-income' | 'investment';
  description: string;
  amount: number;
  date: string;
  category?: string;
}

interface FixedIncomeCardProps {
  fixedIncomes: Transaction[];
  totalFixedIncome: number;
  formatCurrency: (value: number) => string;
}

const FixedIncomeCard: React.FC<FixedIncomeCardProps> = ({ 
  fixedIncomes, 
  totalFixedIncome, 
  formatCurrency 
}) => {
  const navigate = useNavigate();

  return (
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
  );
};

export default FixedIncomeCard;
