
import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface AddHabitFormProps {
  onAddHabit: (name: string, category: string) => void;
}

export const AddHabitForm: React.FC<AddHabitFormProps> = ({ onAddHabit }) => {
  const [newHabitName, setNewHabitName] = useState('');
  const [newHabitCategory, setNewHabitCategory] = useState('');
  
  const handleAddHabit = () => {
    if (newHabitName.trim() === '') return;
    
    onAddHabit(newHabitName, newHabitCategory);
    setNewHabitName('');
    setNewHabitCategory('');
  };
  
  return (
    <div className="mb-6 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
      <Input
        type="text"
        placeholder="Nome do hábito..."
        value={newHabitName}
        onChange={(e) => setNewHabitName(e.target.value)}
        className="flex-grow"
        onKeyDown={(e) => e.key === 'Enter' && handleAddHabit()}
      />
      <Input
        type="text"
        placeholder="Categoria (opcional)"
        value={newHabitCategory}
        onChange={(e) => setNewHabitCategory(e.target.value)}
        className="sm:w-1/3"
        onKeyDown={(e) => e.key === 'Enter' && handleAddHabit()}
      />
      <Button onClick={handleAddHabit} className="bg-focusblue whitespace-nowrap">
        <Plus className="mr-2 h-4 w-4" /> Adicionar
      </Button>
    </div>
  );
};
