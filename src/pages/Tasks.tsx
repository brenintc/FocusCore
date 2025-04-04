
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Plus, 
  Trash2, 
  Check, 
  ChevronDown, 
  ChevronUp, 
  Star, 
  Calendar 
} from 'lucide-react';

interface Task {
  id: string;
  title: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  dueDate?: string;
}

const Tasks: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', title: 'Finalizar relatório do projeto', completed: false, priority: 'high' },
    { id: '2', title: 'Preparar apresentação para reunião', completed: false, priority: 'medium' },
    { id: '3', title: 'Responder e-mails pendentes', completed: true, priority: 'low' },
    { id: '4', title: 'Agendar reunião com equipe', completed: false, priority: 'medium', dueDate: '2025-04-10' },
  ]);
  
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'active' | 'completed'>('all');
  
  const addTask = () => {
    if (newTaskTitle.trim() === '') return;
    
    const newTask: Task = {
      id: Date.now().toString(),
      title: newTaskTitle,
      completed: false,
      priority: 'medium'
    };
    
    setTasks([...tasks, newTask]);
    setNewTaskTitle('');
  };
  
  const toggleTaskCompletion = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };
  
  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };
  
  const changePriority = (id: string) => {
    setTasks(tasks.map(task => {
      if (task.id === id) {
        const priorities: ('low' | 'medium' | 'high')[] = ['low', 'medium', 'high'];
        const currentIndex = priorities.indexOf(task.priority);
        const nextIndex = (currentIndex + 1) % priorities.length;
        return { ...task, priority: priorities[nextIndex] };
      }
      return task;
    }));
  };
  
  const filteredTasks = tasks.filter(task => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'active') return !task.completed;
    if (activeFilter === 'completed') return task.completed;
    return true;
  });
  
  const priorityColors = {
    low: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    medium: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
    high: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  };

  return (
    <div className="min-h-screen bg-white dark:bg-focusdark py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-focusdark dark:text-white">Minhas Tarefas</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Gerencie suas tarefas e mantenha-se produtivo
          </p>
        </div>
        
        {/* Task Filters */}
        <div className="mb-6 flex space-x-2">
          <Button 
            variant={activeFilter === 'all' ? 'default' : 'outline'}
            onClick={() => setActiveFilter('all')}
            className={activeFilter === 'all' ? 'bg-focusblue' : ''}
          >
            Todas
          </Button>
          <Button 
            variant={activeFilter === 'active' ? 'default' : 'outline'}
            onClick={() => setActiveFilter('active')}
            className={activeFilter === 'active' ? 'bg-focusblue' : ''}
          >
            Ativas
          </Button>
          <Button 
            variant={activeFilter === 'completed' ? 'default' : 'outline'}
            onClick={() => setActiveFilter('completed')}
            className={activeFilter === 'completed' ? 'bg-focusblue' : ''}
          >
            Concluídas
          </Button>
        </div>
        
        {/* Add New Task */}
        <div className="mb-6 flex">
          <Input
            type="text"
            placeholder="Adicionar nova tarefa..."
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            className="flex-grow mr-2"
            onKeyDown={(e) => e.key === 'Enter' && addTask()}
          />
          <Button onClick={addTask} className="bg-focusblue">
            <Plus className="mr-2 h-4 w-4" /> Adicionar
          </Button>
        </div>
        
        {/* Tasks List */}
        <div className="space-y-3">
          {filteredTasks.length === 0 ? (
            <div className="bg-focuslight dark:bg-gray-800 rounded-lg p-8 text-center">
              <p className="text-gray-600 dark:text-gray-300 text-lg">
                {activeFilter === 'all' 
                  ? 'Você não tem tarefas. Adicione uma nova tarefa para começar!'
                  : activeFilter === 'active' 
                    ? 'Você não tem tarefas ativas.'
                    : 'Você não tem tarefas concluídas.'}
              </p>
            </div>
          ) : (
            filteredTasks.map(task => (
              <div 
                key={task.id} 
                className={`task-card flex items-center ${task.completed ? 'bg-gray-50 dark:bg-gray-800' : ''}`}
              >
                <Checkbox 
                  checked={task.completed}
                  onCheckedChange={() => toggleTaskCompletion(task.id)}
                  className="mr-3"
                />
                <div className="flex-grow">
                  <p className={`${task.completed ? 'line-through text-gray-500 dark:text-gray-400' : 'text-focusdark dark:text-white'}`}>
                    {task.title}
                  </p>
                  {task.dueDate && (
                    <div className="flex items-center mt-1 text-sm text-gray-500 dark:text-gray-400">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>Prazo: {new Date(task.dueDate).toLocaleDateString()}</span>
                    </div>
                  )}
                </div>
                <div className="flex items-center">
                  <span 
                    className={`text-xs px-2 py-1 rounded-full mr-2 ${priorityColors[task.priority]}`}
                    onClick={() => changePriority(task.id)}
                    style={{ cursor: 'pointer' }}
                  >
                    {task.priority === 'low' ? 'Baixa' : task.priority === 'medium' ? 'Média' : 'Alta'}
                  </span>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => deleteTask(task.id)}
                    className="text-gray-500 hover:text-red-500"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
        
        {/* Task Summary */}
        {tasks.length > 0 && (
          <div className="mt-8 text-sm text-gray-600 dark:text-gray-300">
            <p>{tasks.filter(t => t.completed).length} de {tasks.length} tarefas concluídas</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Tasks;
