import React, { useState, useMemo } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { 
  Plus, 
  Trash2, 
  MoreVertical, 
  Flame, 
  BarChart4, 
  Calendar, 
  Check,
  AlertTriangle,
} from 'lucide-react';
import { Progress } from "@/components/ui/progress";
import { format } from 'date-fns';

interface Habit {
  id: string;
  name: string;
  frequency: 'daily' | 'weekly';
  streak: number;
  completion: {
    [date: string]: boolean;
  };
  category: string;
}

const Habits: React.FC = () => {
  // Get current date in YYYY-MM-DD format
  const today = useMemo(() => format(new Date(), 'yyyy-MM-dd'), []);
  
  const [habits, setHabits] = useState<Habit[]>([
    { 
      id: '1', 
      name: 'Beber 2L de água', 
      frequency: 'daily', 
      streak: 5, 
      completion: {
        [today]: false, // Initialize today with false
      },
      category: 'Saúde' 
    },
    { 
      id: '2', 
      name: 'Exercício físico', 
      frequency: 'daily', 
      streak: 3, 
      completion: {
        [today]: false, // Initialize today with false
      },
      category: 'Fitness' 
    },
    { 
      id: '3', 
      name: 'Leitura - 30 minutos', 
      frequency: 'daily', 
      streak: 0, 
      completion: {
        [today]: false, // Initialize today with false
      },
      category: 'Desenvolvimento pessoal' 
    },
    { 
      id: '4', 
      name: 'Programar por 1 hora', 
      frequency: 'daily', 
      streak: 7, 
      completion: {
        [today]: false, // Initialize today with false
      },
      category: 'Aprendizado' 
    },
  ]);
  
  const [newHabitName, setNewHabitName] = useState('');
  const [newHabitCategory, setNewHabitCategory] = useState('');
  
  // Calculate the last week dates dynamically based on today
  const lastWeekDates = useMemo(() => {
    return Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (6 - i));
      return format(date, 'yyyy-MM-dd');
    });
  }, []);
  
  const addHabit = () => {
    if (newHabitName.trim() === '') return;
    
    const newHabit: Habit = {
      id: Date.now().toString(),
      name: newHabitName,
      frequency: 'daily',
      streak: 0,
      completion: {
        [today]: false // Initialize today with false
      },
      category: newHabitCategory || 'Geral'
    };
    
    setHabits([...habits, newHabit]);
    setNewHabitName('');
    setNewHabitCategory('');
  };
  
  const deleteHabit = (id: string) => {
    setHabits(habits.filter(habit => habit.id !== id));
  };
  
  const toggleCompletion = (habitId: string) => {
    setHabits(habits.map(habit => {
      if (habit.id === habitId) {
        const wasCompleted = habit.completion[today] || false;
        
        // Toggle completion
        const updatedCompletion = {
          ...habit.completion,
          [today]: !wasCompleted
        };
        
        // Update streak
        let updatedStreak = habit.streak;
        if (!wasCompleted) {
          // If marking as completed, increase streak
          updatedStreak += 1;
        } else {
          // If unmarking, decrease streak
          updatedStreak = Math.max(0, updatedStreak - 1);
        }
        
        return {
          ...habit,
          completion: updatedCompletion,
          streak: updatedStreak
        };
      }
      return habit;
    }));
  };
  
  const calculateProgress = (habit: Habit) => {
    const totalDays = lastWeekDates.length;
    const completedDays = lastWeekDates.filter(date => habit.completion[date]).length;
    return (completedDays / totalDays) * 100;
  };
  
  // Get short day name for display - fixing to properly show current day numbers
  const getShortDayName = (dateStr: string) => {
    const date = new Date(dateStr);
    // Return just the day number (1-31)
    return date.getDate().toString();
  };
  
  return (
    <div className="min-h-screen bg-white dark:bg-focusdark py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-focusdark dark:text-white">Meus Hábitos</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Rastreie e desenvolva hábitos positivos para seu crescimento pessoal
          </p>
        </div>
        
        {/* Add New Habit */}
        <div className="mb-6 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
          <Input
            type="text"
            placeholder="Nome do hábito..."
            value={newHabitName}
            onChange={(e) => setNewHabitName(e.target.value)}
            className="flex-grow"
            onKeyDown={(e) => e.key === 'Enter' && addHabit()}
          />
          <Input
            type="text"
            placeholder="Categoria (opcional)"
            value={newHabitCategory}
            onChange={(e) => setNewHabitCategory(e.target.value)}
            className="sm:w-1/3"
            onKeyDown={(e) => e.key === 'Enter' && addHabit()}
          />
          <Button onClick={addHabit} className="bg-focusblue whitespace-nowrap">
            <Plus className="mr-2 h-4 w-4" /> Adicionar
          </Button>
        </div>
        
        {/* Weekly Progress Overview */}
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
        
        {/* Habits List */}
        <div className="space-y-3">
          {habits.length === 0 ? (
            <div className="bg-focuslight dark:bg-gray-800 rounded-lg p-8 text-center">
              <p className="text-gray-600 dark:text-gray-300 text-lg">
                Você não tem hábitos. Adicione um novo hábito para começar!
              </p>
            </div>
          ) : (
            habits.map(habit => (
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
                      <DropdownMenuItem onClick={() => deleteHabit(habit.id)}>
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
                          onClick={() => isToday && toggleCompletion(habit.id)}
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
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Habits;
