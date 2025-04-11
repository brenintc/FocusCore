
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DollarSign, LineChart, PlusCircle, MinusCircle, ArrowRightLeft } from 'lucide-react';

interface FinancialOverviewProps {
  totalBalance: number;
  totalIncome: number;
  totalExpense: number;
  formatCurrency: (value: number) => string;
  setActiveTab: (tab: string) => void;
}

const FinancialOverview: React.FC<FinancialOverviewProps> = ({
  totalBalance,
  totalIncome,
  totalExpense,
  formatCurrency,
  setActiveTab
}) => {
  return (
    <div className="space-y-6">
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
            <div className="flex flex-col md:flex-row md:space-x-4">
              <Button 
                onClick={() => setActiveTab("transactions")} 
                variant="outline" 
                className="flex-1 mb-2 md:mb-0"
              >
                <ArrowRightLeft className="mr-2 h-4 w-4" />
                Gerenciar Transações
              </Button>
              
              <Button 
                onClick={() => setActiveTab("investments")} 
                variant="outline" 
                className="flex-1"
              >
                <LineChart className="mr-2 h-4 w-4" />
                Gerenciar Investimentos
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FinancialOverview;
