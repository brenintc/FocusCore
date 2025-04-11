
import React from 'react';
import { format } from 'date-fns';
import { 
  MoreVertical, 
  Flame, 
  Check,
  Trash2
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Habit } from '@/types/habits';

interface HabitListProps {
  habits: Habit[];
  lastWeekDates: string[];
  today: string;
  onDelete: (id: string) => void;
  onToggleCompletion: (habitId: string) => void;
}

export const HabitList: React.FC<HabitListProps> = ({ 
  habits, 
  lastWeekDates, 
  today, 
  onDelete, 
  onToggleCompletion 
}) => {
  // Get short day name for display
  const getShortDayName = (dateStr: string) => {
    const date = new Date(dateStr);
    // Return just the day number (1-31)
    return date.getDate().toString();
  };

  if (habits.length === 0) {
    return (
      <div className="bg-focuslight dark:bg-gray-800 rounded-lg p-8 text-center">
        <p className="text-gray-600 dark:text-gray-300 text-lg">
          Você não tem hábitos. Adicione um novo hábito para começar!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {habits.map(habit => (
        <div key={habit.id} className="habit-card">
          <div className="flex justify-between">
            <div>
              <div className="flex items-center">
                <h3 className="font-medium text-focusdark dark:text-white">{habit.name}</h3>
                {habit.streak > 0 && (
                  <div className="ml-2 flex items-center text-amber-500">
                    <Flame className="h-4 w-4 mr-1" />
                    <span className="text-sm">{habit.streak}</span>
                  </div>
                )}
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {habit.category}
              </p>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onDelete(habit.id)}>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Excluir
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          {/* Weekly Calendar */}
          <div className="mt-4 flex justify-between">
            {lastWeekDates.map(date => {
              const day = getShortDayName(date);
              const isCompleted = habit.completion[date];
              const isToday = date === today;
              
              return (
                <div 
                  key={date} 
                  className={`flex flex-col items-center ${isToday ? 'relative' : ''}`}
                >
                  <span className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                    {day}
                  </span>
                  <button
                    onClick={() => isToday && onToggleCompletion(habit.id)}
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      isCompleted 
                        ? 'bg-focusgreen text-white' 
                        : isToday 
                          ? 'bg-gray-200 dark:bg-gray-700 hover:bg-focusblue hover:text-white' 
                          : 'bg-gray-200 dark:bg-gray-700'
                    } ${isToday ? 'cursor-pointer' : 'cursor-default'}`}
                  >
                    {isCompleted && <Check className="h-4 w-4" />}
                  </button>
                  {isToday && (
                    <div className="absolute -bottom-2 w-full flex justify-center">
                      <div className="w-1 h-1 bg-focusblue rounded-full"></div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};
