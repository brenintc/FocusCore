
import React, { useState, useMemo } from 'react';
import { format } from 'date-fns';
import { AlertTriangle, Calendar } from 'lucide-react';
import { AddHabitForm } from '@/components/habits/AddHabitForm';
import { WeeklyProgress } from '@/components/habits/WeeklyProgress';
import { HabitList } from '@/components/habits/HabitList';
import { Habit } from '@/types/habits';

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
  
  // Calculate the last week dates dynamically based on today
  const lastWeekDates = useMemo(() => {
    return Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (6 - i));
      return format(date, 'yyyy-MM-dd');
    });
  }, []);
  
  const addHabit = (name: string, category: string) => {
    const newHabit: Habit = {
      id: Date.now().toString(),
      name,
      frequency: 'daily',
      streak: 0,
      completion: {
        [today]: false // Initialize today with false
      },
      category: category || 'Geral'
    };
    
    setHabits([...habits, newHabit]);
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
        <AddHabitForm onAddHabit={addHabit} />
        
        {/* Weekly Progress Overview */}
        <WeeklyProgress habits={habits} lastWeekDates={lastWeekDates} />
        
        {/* Habits List */}
        <HabitList 
          habits={habits} 
          lastWeekDates={lastWeekDates} 
          today={today} 
          onDelete={deleteHabit} 
          onToggleCompletion={toggleCompletion} 
        />
      </div>
    </div>
  );
};

export default Habits;
