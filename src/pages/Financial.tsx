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

// ... (keep all interfaces unchanged)

const Financial: React.FC = () => {
  // ... (keep all state and functions unchanged until the return statement)

  return (
    <div className="min-h-screen py-8 px-4 bg-white dark:bg-focusdark">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-focusdark dark:text-white">
          Gestão Financeira
        </h1>
        
        <FinancialPagination 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          tabs={tabs} 
        />
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
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
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Button 
                      onClick={() => setActiveTab("transactions")} 
                      variant="outline" 
                      className="w-full"
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
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* ... (keep all other TabsContent sections unchanged) */}
        </Tabs>
      </div>
    </div>
  );
};

export default Financial;
