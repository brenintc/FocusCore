
import React from 'react';
import { BarChart4 } from 'lucide-react';
import { Progress } from "@/components/ui/progress";
import { Habit } from '@/types/habits';

interface WeeklyProgressProps {
  habits: Habit[];
  lastWeekDates: string[];
}

export const WeeklyProgress: React.FC<WeeklyProgressProps> = ({ habits, lastWeekDates }) => {
  const calculateProgress = (habit: Habit) => {
    const totalDays = lastWeekDates.length;
    const completedDays = lastWeekDates.filter(date => habit.completion[date]).length;
    return (completedDays / totalDays) * 100;
  };
  
  return (
    <div className="mb-8 p-5 bg-focuslight dark:bg-gray-800 rounded-lg">
      <h2 className="text-xl font-bold text-focusdark dark:text-white mb-4 flex items-center">
        <BarChart4 className="mr-2 h-5 w-5 text-focusblue" />
        Progresso Semanal
      </h2>
      <div className="space-y-3">
        {habits.map(habit => (
          <div key={habit.id} className="flex items-center">
            <div className="w-1/3 mr-3">
              <p className="text-sm font-medium text-focusdark dark:text-white truncate">
                {habit.name}
              </p>
            </div>
            <div className="flex-grow">
              <Progress value={calculateProgress(habit)} className="h-2" />
            </div>
            <div className="ml-3 text-sm text-gray-600 dark:text-gray-300 whitespace-nowrap">
              {Math.round(calculateProgress(habit))}%
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
