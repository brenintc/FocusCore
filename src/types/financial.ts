
export interface Transaction {
  id: string;
  type: 'income' | 'expense' | 'fixed-expense' | 'fixed-income' | 'investment';
  description: string;
  amount: number;
  date: string;
  category?: string;
}

export interface Investment {
  id: string;
  name: string;
  amount: number;
  interestRate: number;
  startDate: string;
  endDate?: string;
  notes?: string;
}

export interface TransactionFormProps {
  type?: 'income' | 'expense' | 'fixed-income' | 'fixed-expense';
  onAddTransaction: (transaction: Omit<Transaction, 'id'>) => void;
}

export interface InvestmentFormProps {
  onAddInvestment: (investment: Omit<Investment, 'id'>) => void;
}
