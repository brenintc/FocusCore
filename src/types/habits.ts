
export interface Habit {
  id: string;
  name: string;
  frequency: 'daily' | 'weekly';
  streak: number;
  completion: {
    [date: string]: boolean;
  };
  category: string;
}
