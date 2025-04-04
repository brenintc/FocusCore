
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  Plus, 
  Trash2, 
  Edit, 
  PlayCircle, 
  PauseCircle, 
  RotateCcw, 
  MoreVertical, 
  Coffee,
  Sun,
  Moon,
  Check
} from 'lucide-react';

interface RoutineTask {
  id: string;
  name: string;
  completed: boolean;
  duration?: number; // in minutes
}

interface Routine {
  id: string;
  name: string;
  type: 'morning' | 'evening' | 'custom';
  tasks: RoutineTask[];
}

interface TimerState {
  mode: 'pomodoro' | 'shortBreak' | 'longBreak';
  timeLeft: number; // in seconds
  isActive: boolean;
  rounds: number;
}

const Routines: React.FC = () => {
  const [routines, setRoutines] = useState<Routine[]>([
    {
      id: '1',
      name: 'Rotina Matinal',
      type: 'morning',
      tasks: [
        { id: '101', name: 'Beber água', completed: false },
        { id: '102', name: 'Meditar por 10 minutos', completed: false, duration: 10 },
        { id: '103', name: 'Café da manhã', completed: false },
        { id: '104', name: 'Revisar tarefas do dia', completed: false },
      ]
    },
    {
      id: '2',
      name: 'Rotina Noturna',
      type: 'evening',
      tasks: [
        { id: '201', name: 'Anotar conquistas do dia', completed: false },
        { id: '202', name: 'Preparar roupas para amanhã', completed: false },
        { id: '203', name: 'Leitura - 20 minutos', completed: false, duration: 20 },
        { id: '204', name: 'Meditação para dormir', completed: false, duration: 5 },
      ]
    },
  ]);
  
  const [timer, setTimer] = useState<TimerState>({
    mode: 'pomodoro',
    timeLeft: 25 * 60, // 25 minutes in seconds
    isActive: false,
    rounds: 0
  });
  
  const [newRoutineName, setNewRoutineName] = useState('');
  const [newTaskName, setNewTaskName] = useState('');
  const [selectedRoutine, setSelectedRoutine] = useState<string>(routines[0]?.id || '');
  
  // Pomodoro Timer logic
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    if (timer.isActive && timer.timeLeft > 0) {
      interval = setInterval(() => {
        setTimer(prev => ({
          ...prev,
          timeLeft: prev.timeLeft - 1
        }));
      }, 1000);
    } else if (timer.isActive && timer.timeLeft === 0) {
      // Timer finished
      if (timer.mode === 'pomodoro') {
        // Increment rounds and switch to break
        const newRounds = timer.rounds + 1;
        if (newRounds % 4 === 0) {
          // Long break after 4 pomodoros
          setTimer({
            mode: 'longBreak',
            timeLeft: 15 * 60, // 15 minutes
            isActive: true,
            rounds: newRounds
          });
        } else {
          // Short break
          setTimer({
            mode: 'shortBreak',
            timeLeft: 5 * 60, // 5 minutes
            isActive: true,
            rounds: newRounds
          });
        }
      } else {
        // Break finished, back to pomodoro
        setTimer({
          mode: 'pomodoro',
          timeLeft: 25 * 60, // 25 minutes
          isActive: true,
          rounds: timer.rounds
        });
      }
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timer]);
  
  const addRoutine = () => {
    if (newRoutineName.trim() === '') return;
    
    const newRoutine: Routine = {
      id: Date.now().toString(),
      name: newRoutineName,
      type: 'custom',
      tasks: []
    };
    
    setRoutines([...routines, newRoutine]);
    setNewRoutineName('');
    setSelectedRoutine(newRoutine.id);
  };
  
  const addTask = (routineId: string) => {
    if (newTaskName.trim() === '') return;
    
    const newTask: RoutineTask = {
      id: Date.now().toString(),
      name: newTaskName,
      completed: false
    };
    
    setRoutines(routines.map(routine => 
      routine.id === routineId
        ? { ...routine, tasks: [...routine.tasks, newTask] }
        : routine
    ));
    
    setNewTaskName('');
  };
  
  const toggleTaskCompletion = (routineId: string, taskId: string) => {
    setRoutines(routines.map(routine => 
      routine.id === routineId
        ? {
            ...routine,
            tasks: routine.tasks.map(task => 
              task.id === taskId
                ? { ...task, completed: !task.completed }
                : task
            )
          }
        : routine
    ));
  };
  
  const deleteTask = (routineId: string, taskId: string) => {
    setRoutines(routines.map(routine => 
      routine.id === routineId
        ? {
            ...routine,
            tasks: routine.tasks.filter(task => task.id !== taskId)
          }
        : routine
    ));
  };
  
  const deleteRoutine = (routineId: string) => {
    setRoutines(routines.filter(routine => routine.id !== routineId));
    if (selectedRoutine === routineId && routines.length > 1) {
      setSelectedRoutine(routines[0].id);
    }
  };
  
  const resetRoutine = (routineId: string) => {
    setRoutines(routines.map(routine => 
      routine.id === routineId
        ? {
            ...routine,
            tasks: routine.tasks.map(task => ({ ...task, completed: false }))
          }
        : routine
    ));
  };
  
  const startTimer = () => {
    setTimer(prev => ({ ...prev, isActive: true }));
  };
  
  const pauseTimer = () => {
    setTimer(prev => ({ ...prev, isActive: false }));
  };
  
  const resetTimer = () => {
    let timeLeft = 25 * 60; // Default pomodoro
    if (timer.mode === 'shortBreak') timeLeft = 5 * 60;
    if (timer.mode === 'longBreak') timeLeft = 15 * 60;
    
    setTimer(prev => ({
      ...prev,
      timeLeft,
      isActive: false
    }));
  };
  
  const changeTimerMode = (mode: 'pomodoro' | 'shortBreak' | 'longBreak') => {
    let timeLeft = 25 * 60; // Default pomodoro
    if (mode === 'shortBreak') timeLeft = 5 * 60;
    if (mode === 'longBreak') timeLeft = 15 * 60;
    
    setTimer({
      mode,
      timeLeft,
      isActive: false,
      rounds: timer.rounds
    });
  };
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  const calculateProgress = (routine: Routine) => {
    const totalTasks = routine.tasks.length;
    if (totalTasks === 0) return 0;
    
    const completedTasks = routine.tasks.filter(task => task.completed).length;
    return (completedTasks / totalTasks) * 100;
  };
  
  const currentRoutine = routines.find(r => r.id === selectedRoutine) || routines[0];
  
  return (
    <div className="min-h-screen bg-white dark:bg-focusdark py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-focusdark dark:text-white">Minhas Rotinas</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Organize seu dia com rotinas consistentes e aumente sua produtividade
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Routines List */}
          <div className="md:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 mb-4">
              <h2 className="text-lg font-bold text-focusdark dark:text-white mb-4">Minhas Rotinas</h2>
              
              <div className="mb-4">
                <Input
                  type="text"
                  placeholder="Nova rotina..."
                  value={newRoutineName}
                  onChange={(e) => setNewRoutineName(e.target.value)}
                  className="mb-2"
                  onKeyDown={(e) => e.key === 'Enter' && addRoutine()}
                />
                <Button onClick={addRoutine} className="bg-focusblue w-full">
                  <Plus className="mr-2 h-4 w-4" /> Adicionar
                </Button>
              </div>
              
              <div className="space-y-2">
                {routines.map(routine => (
                  <div 
                    key={routine.id} 
                    className={`p-3 rounded-lg flex items-center justify-between cursor-pointer ${
                      selectedRoutine === routine.id 
                        ? 'bg-focusblue text-white'
                        : 'bg-focuslight dark:bg-gray-700 text-focusdark dark:text-white hover:bg-blue-100 dark:hover:bg-gray-600'
                    }`}
                    onClick={() => setSelectedRoutine(routine.id)}
                  >
                    <div className="flex items-center">
                      {routine.type === 'morning' ? (
                        <Sun className="h-4 w-4 mr-2" />
                      ) : routine.type === 'evening' ? (
                        <Moon className="h-4 w-4 mr-2" />
                      ) : (
                        <div className="h-4 w-4 mr-2"></div>
                      )}
                      <span className="font-medium">{routine.name}</span>
                    </div>
                    <div className="flex items-center">
                      <Progress 
                        value={calculateProgress(routine)} 
                        className="w-16 h-1.5 mr-2" 
                      />
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                          <Button variant="ghost" size="icon" className={selectedRoutine === routine.id ? 'text-white' : ''}>
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => resetRoutine(routine.id)}>
                            <RotateCcw className="h-4 w-4 mr-2" />
                            Reiniciar
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => deleteRoutine(routine.id)}>
                            <Trash2 className="h-4 w-4 mr-2" />
                            Excluir
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Pomodoro Timer */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
              <h2 className="text-lg font-bold text-focusdark dark:text-white mb-4">Timer Pomodoro</h2>
              
              <Tabs defaultValue="pomodoro" className="w-full" onValueChange={(v) => changeTimerMode(v as any)}>
                <TabsList className="grid grid-cols-3 mb-4">
                  <TabsTrigger value="pomodoro">Pomodoro</TabsTrigger>
                  <TabsTrigger value="shortBreak">Pausa Curta</TabsTrigger>
                  <TabsTrigger value="longBreak">Pausa Longa</TabsTrigger>
                </TabsList>
                
                <TabsContent value="pomodoro" className="space-y-4">
                  <div className="flex flex-col items-center">
                    <div className="text-4xl font-bold text-focusdark dark:text-white mb-4">
                      {formatTime(timer.timeLeft)}
                    </div>
                    <div className="flex space-x-2">
                      {!timer.isActive ? (
                        <Button onClick={startTimer} className="bg-focusgreen">
                          <PlayCircle className="mr-2 h-4 w-4" /> Iniciar
                        </Button>
                      ) : (
                        <Button onClick={pauseTimer} variant="outline">
                          <PauseCircle className="mr-2 h-4 w-4" /> Pausar
                        </Button>
                      )}
                      <Button onClick={resetTimer} variant="outline">
                        <RotateCcw className="mr-2 h-4 w-4" /> Reiniciar
                      </Button>
                    </div>
                    <div className="mt-4 text-sm text-gray-600 dark:text-gray-300">
                      Rounds: {timer.rounds}
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="shortBreak" className="space-y-4">
                  <div className="flex flex-col items-center">
                    <div className="text-4xl font-bold text-focusdark dark:text-white mb-4">
                      {formatTime(timer.timeLeft)}
                    </div>
                    <div className="flex space-x-2">
                      {!timer.isActive ? (
                        <Button onClick={startTimer} className="bg-focusblue">
                          <PlayCircle className="mr-2 h-4 w-4" /> Iniciar
                        </Button>
                      ) : (
                        <Button onClick={pauseTimer} variant="outline">
                          <PauseCircle className="mr-2 h-4 w-4" /> Pausar
                        </Button>
                      )}
                      <Button onClick={resetTimer} variant="outline">
                        <RotateCcw className="mr-2 h-4 w-4" /> Reiniciar
                      </Button>
                    </div>
                    <div className="mt-4 text-sm text-gray-600 dark:text-gray-300">
                      <Coffee className="inline-block mr-1 h-4 w-4" /> Pausa para descansar
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="longBreak" className="space-y-4">
                  <div className="flex flex-col items-center">
                    <div className="text-4xl font-bold text-focusdark dark:text-white mb-4">
                      {formatTime(timer.timeLeft)}
                    </div>
                    <div className="flex space-x-2">
                      {!timer.isActive ? (
                        <Button onClick={startTimer} className="bg-focusblue">
                          <PlayCircle className="mr-2 h-4 w-4" /> Iniciar
                        </Button>
                      ) : (
                        <Button onClick={pauseTimer} variant="outline">
                          <PauseCircle className="mr-2 h-4 w-4" /> Pausar
                        </Button>
                      )}
                      <Button onClick={resetTimer} variant="outline">
                        <RotateCcw className="mr-2 h-4 w-4" /> Reiniciar
                      </Button>
                    </div>
                    <div className="mt-4 text-sm text-gray-600 dark:text-gray-300">
                      <Coffee className="inline-block mr-1 h-4 w-4" /> Pausa longa após 4 pomodoros
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
          
          {/* Routine Details */}
          <div className="md:col-span-2">
            {currentRoutine ? (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-focusdark dark:text-white">
                    {currentRoutine.name}
                  </h2>
                  <div className="flex items-center">
                    <Progress 
                      value={calculateProgress(currentRoutine)} 
                      className="w-24 h-2 mr-2" 
                    />
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      {Math.round(calculateProgress(currentRoutine))}%
                    </span>
                  </div>
                </div>
                
                {/* Add new task */}
                <div className="mb-6 flex">
                  <Input
                    type="text"
                    placeholder="Nova tarefa..."
                    value={newTaskName}
                    onChange={(e) => setNewTaskName(e.target.value)}
                    className="flex-grow mr-2"
                    onKeyDown={(e) => e.key === 'Enter' && addTask(currentRoutine.id)}
                  />
                  <Button onClick={() => addTask(currentRoutine.id)} className="bg-focusblue">
                    <Plus className="mr-2 h-4 w-4" /> Adicionar
                  </Button>
                </div>
                
                {/* Tasks List */}
                <div className="space-y-3">
                  {currentRoutine.tasks.length === 0 ? (
                    <div className="bg-focuslight dark:bg-gray-700 rounded-lg p-6 text-center">
                      <p className="text-gray-600 dark:text-gray-300">
                        Esta rotina não tem tarefas. Adicione uma nova tarefa para começar!
                      </p>
                    </div>
                  ) : (
                    currentRoutine.tasks.map(task => (
                      <div 
                        key={task.id} 
                        className={`p-4 rounded-lg bg-focuslight dark:bg-gray-700 flex items-center justify-between ${
                          task.completed ? 'bg-opacity-50 dark:bg-opacity-50' : ''
                        }`}
                      >
                        <div className="flex items-center">
                          <Button 
                            variant={task.completed ? 'default' : 'outline'} 
                            size="icon" 
                            className={`mr-3 h-6 w-6 min-w-[1.5rem] ${task.completed ? 'bg-focusgreen' : ''}`}
                            onClick={() => toggleTaskCompletion(currentRoutine.id, task.id)}
                          >
                            {task.completed && <Check className="h-3 w-3" />}
                          </Button>
                          <div>
                            <p className={`font-medium ${task.completed ? 'line-through text-gray-500 dark:text-gray-400' : 'text-focusdark dark:text-white'}`}>
                              {task.name}
                            </p>
                            {task.duration && (
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                {task.duration} minutos
                              </p>
                            )}
                          </div>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => deleteTask(currentRoutine.id, task.id)}
                          className="text-gray-500 hover:text-red-500"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))
                  )}
                </div>
                
                {/* Action Buttons */}
                {currentRoutine.tasks.length > 0 && (
                  <div className="mt-6 flex justify-end">
                    <Button 
                      variant="outline" 
                      onClick={() => resetRoutine(currentRoutine.id)}
                      className="mr-2"
                    >
                      <RotateCcw className="mr-2 h-4 w-4" /> Reiniciar
                    </Button>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 text-center">
                <p className="text-gray-600 dark:text-gray-300">
                  Selecione uma rotina para gerenciar suas tarefas.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Routines;
