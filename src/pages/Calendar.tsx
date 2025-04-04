
import React, { useState, useEffect } from 'react';
import { useUser } from '@/components/UserProvider';
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { format, parse, isEqual, getDay, setHours, setMinutes, addMonths, subMonths, getMonth, getYear, startOfDay } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CheckCircle, Clock, Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { getBrazilianHolidays, isHoliday, Holiday } from '@/utils/brazilianHolidays';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// Definições de tipos
interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  dueDate?: string; // ISO string
  priority: 'low' | 'medium' | 'high';
}

interface RoutineTask {
  id: string;
  title: string;
  timeStart?: string; // formato HH:MM
  timeEnd?: string; // formato HH:MM
  completed: boolean;
  days: number[]; // 0 = domingo, 1 = segunda, ...
}

interface CalendarEvent {
  id: string;
  title: string;
  date: Date;
  type: 'task' | 'routine' | 'holiday';
  priority?: 'low' | 'medium' | 'high';
  completed?: boolean;
  time?: string;
  original?: any; // referência ao objeto original
}

const Calendar: React.FC = () => {
  const { userId } = useUser();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [tasks, setTasks] = useState<Task[]>([]);
  const [routines, setRoutines] = useState<{ id: string; title: string; tasks: RoutineTask[] }[]>([]);
  const [holidays, setHolidays] = useState<Holiday[]>([]);
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [isEventDialogOpen, setIsEventDialogOpen] = useState(false);

  // Carregar dados do localStorage
  useEffect(() => {
    // Carregar tarefas
    const savedTasks = localStorage.getItem(`focuscore-${userId}-tasks`);
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }

    // Carregar rotinas
    const savedRoutines = localStorage.getItem(`focuscore-${userId}-routines`);
    if (savedRoutines) {
      setRoutines(JSON.parse(savedRoutines));
    }

    // Carregar feriados para o ano atual e próximo
    const currentYear = new Date().getFullYear();
    setHolidays([
      ...getBrazilianHolidays(currentYear),
      ...getBrazilianHolidays(currentYear + 1)
    ]);
  }, [userId]);

  // Converter dados em eventos de calendário
  useEffect(() => {
    const allEvents: CalendarEvent[] = [];
    const currentYear = currentMonth.getFullYear();
    const currentMonthNum = currentMonth.getMonth();

    // Adicionar tarefas com datas
    tasks.forEach(task => {
      if (task.dueDate) {
        const taskDate = new Date(task.dueDate);
        // Verificar se a tarefa está no mês atual
        if (getMonth(taskDate) === currentMonthNum && getYear(taskDate) === currentYear) {
          allEvents.push({
            id: `task-${task.id}`,
            title: task.title,
            date: taskDate,
            type: 'task',
            priority: task.priority,
            completed: task.completed,
            original: task
          });
        }
      }
    });

    // Adicionar rotinas
    const daysInCurrentMonth = new Date(currentYear, currentMonthNum + 1, 0).getDate();
    
    routines.forEach(routine => {
      routine.tasks.forEach(task => {
        // Para cada dia do mês
        for (let day = 1; day <= daysInCurrentMonth; day++) {
          const date = new Date(currentYear, currentMonthNum, day);
          const weekDay = getDay(date); // 0 = domingo, 1 = segunda, ...
          
          // Verificar se a rotina acontece neste dia da semana
          if (task.days.includes(weekDay)) {
            let taskDate = new Date(date);
            
            // Adicionar horário se disponível
            if (task.timeStart) {
              const [hours, minutes] = task.timeStart.split(':').map(Number);
              taskDate = setHours(setMinutes(taskDate, minutes || 0), hours || 0);
            }
            
            allEvents.push({
              id: `routine-${task.id}-${day}`,
              title: `${routine.title}: ${task.title}`,
              date: taskDate,
              type: 'routine',
              completed: task.completed,
              time: task.timeStart,
              original: { ...task, routineId: routine.id }
            });
          }
        }
      });
    });

    // Adicionar feriados
    for (let day = 1; day <= daysInCurrentMonth; day++) {
      const date = new Date(currentYear, currentMonthNum, day);
      const holiday = isHoliday(date, holidays);
      
      if (holiday) {
        allEvents.push({
          id: `holiday-${holiday.name}-${day}`,
          title: holiday.name,
          date: date,
          type: 'holiday',
          original: holiday
        });
      }
    }

    setEvents(allEvents);
  }, [tasks, routines, holidays, currentMonth]);

  // Função para navegar entre meses
  const navigateMonth = (direction: 'next' | 'prev') => {
    setCurrentMonth(direction === 'next' 
      ? addMonths(currentMonth, 1) 
      : subMonths(currentMonth, 1));
  };

  // Função para verificar se um dia possui eventos
  const dayHasEvents = (date: Date) => {
    return events.some(event => 
      isEqual(startOfDay(event.date), startOfDay(date))
    );
  };

  // Função para obter eventos de um dia específico
  const getEventsForDay = (date: Date) => {
    return events.filter(event => 
      isEqual(startOfDay(event.date), startOfDay(date))
    );
  };

  // Função para renderizar o conteúdo de um dia no calendário
  const renderDay = (date: Date) => {
    const dayEvents = getEventsForDay(date);
    const hasHoliday = dayEvents.some(event => event.type === 'holiday');
    const hasTasks = dayEvents.some(event => event.type === 'task');
    const hasRoutines = dayEvents.some(event => event.type === 'routine');

    return (
      <div className="relative w-full h-full">
        <div className="absolute top-0 right-0 flex flex-col gap-0.5">
          {hasHoliday && <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div>}
          {hasTasks && <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>}
          {hasRoutines && <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>}
        </div>
      </div>
    );
  };

  // Função para marcar uma tarefa como concluída
  const toggleTaskCompletion = (taskId: string) => {
    const updatedTasks = tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    
    setTasks(updatedTasks);
    localStorage.setItem(`focuscore-${userId}-tasks`, JSON.stringify(updatedTasks));
    
    // Atualizar eventos
    const updatedEvents = events.map(event => {
      if (event.type === 'task' && event.original?.id === taskId) {
        return { ...event, completed: !event.completed };
      }
      return event;
    });
    
    setEvents(updatedEvents);
  };

  // Exibir detalhes do evento
  const showEventDetails = (event: CalendarEvent) => {
    setSelectedEvent(event);
    setIsEventDialogOpen(true);
  };

  return (
    <div className="min-h-screen py-8 px-4 bg-white dark:bg-focusdark">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-focusdark dark:text-white">
          Calendário
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Calendário */}
          <Card className="md:col-span-2">
            <CardHeader className="pb-0">
              <div className="flex justify-between items-center">
                <CardTitle>
                  {format(currentMonth, 'MMMM yyyy', { locale: ptBR })}
                </CardTitle>
                <div className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    size="icon" 
                    onClick={() => navigateMonth('prev')}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    onClick={() => navigateMonth('next')}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <CardDescription>
                Feriados, tarefas e rotinas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mt-4">
                <CalendarComponent
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => date && setSelectedDate(date)}
                  month={currentMonth}
                  onMonthChange={setCurrentMonth}
                  locale={ptBR}
                  className="rounded-md border p-3 pointer-events-auto"
                  components={{
                    DayContent: ({ date }) => {
                      return renderDay(date);
                    }
                  }}
                />
                
                <div className="mt-4 flex items-center justify-center space-x-4 text-sm">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                    <span>Feriados</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                    <span>Tarefas</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                    <span>Rotinas</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Eventos do dia selecionado */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <CalendarIcon className="h-5 w-5 mr-2 text-focusblue" />
                {format(selectedDate, "dd 'de' MMMM", { locale: ptBR })}
              </CardTitle>
              <CardDescription>
                Eventos para esta data
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {getEventsForDay(selectedDate).length === 0 ? (
                  <p className="text-center text-muted-foreground py-6">
                    Nenhum evento para este dia
                  </p>
                ) : (
                  <Tabs defaultValue="all">
                    <TabsList className="w-full">
                      <TabsTrigger value="all">Todos</TabsTrigger>
                      <TabsTrigger value="tasks">Tarefas</TabsTrigger>
                      <TabsTrigger value="routines">Rotinas</TabsTrigger>
                      <TabsTrigger value="holidays">Feriados</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="all" className="space-y-2 mt-4">
                      {getEventsForDay(selectedDate)
                        .sort((a, b) => {
                          // Ordenar por tipo: feriados, depois tarefas, depois rotinas
                          if (a.type !== b.type) {
                            const typeOrder = { holiday: 0, task: 1, routine: 2 };
                            return typeOrder[a.type] - typeOrder[b.type];
                          }
                          // Se forem do mesmo tipo, ordenar por hora (se disponível)
                          if (a.time && b.time) {
                            return a.time.localeCompare(b.time);
                          }
                          return 0;
                        })
                        .map(event => (
                          <div 
                            key={event.id}
                            className="p-3 border rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer"
                            onClick={() => showEventDetails(event)}
                          >
                            <div className="flex justify-between items-start">
                              <div>
                                <div className="flex items-center">
                                  {event.type === 'task' && (
                                    <Badge variant={event.completed ? "outline" : "default"} className="mr-2">
                                      Tarefa
                                    </Badge>
                                  )}
                                  {event.type === 'routine' && (
                                    <Badge variant="secondary" className="mr-2">
                                      Rotina
                                    </Badge>
                                  )}
                                  {event.type === 'holiday' && (
                                    <Badge variant="destructive" className="mr-2">
                                      Feriado
                                    </Badge>
                                  )}
                                  <h3 className={`font-medium ${event.completed ? 'line-through text-muted-foreground' : ''}`}>
                                    {event.title}
                                  </h3>
                                </div>
                                {event.time && (
                                  <div className="flex items-center mt-1 text-sm text-muted-foreground">
                                    <Clock className="h-3 w-3 mr-1" />
                                    {event.time}
                                  </div>
                                )}
                              </div>
                              {event.type === 'task' && (
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  className={`${event.completed ? 'text-green-500' : 'text-gray-400'}`}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    if (event.original?.id) {
                                      toggleTaskCompletion(event.original.id);
                                    }
                                  }}
                                >
                                  <CheckCircle className="h-5 w-5" />
                                </Button>
                              )}
                            </div>
                          </div>
                        ))}
                    </TabsContent>
                    
                    <TabsContent value="tasks" className="space-y-2 mt-4">
                      {getEventsForDay(selectedDate)
                        .filter(event => event.type === 'task')
                        .map(event => (
                          <div 
                            key={event.id}
                            className="p-3 border rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer"
                            onClick={() => showEventDetails(event)}
                          >
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className={`font-medium ${event.completed ? 'line-through text-muted-foreground' : ''}`}>
                                  {event.title}
                                </h3>
                                {event.priority && (
                                  <Badge 
                                    variant="outline" 
                                    className={`mt-1 ${
                                      event.priority === 'high' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
                                      event.priority === 'medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                                      'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                    }`}
                                  >
                                    {event.priority === 'high' ? 'Alta' : 
                                     event.priority === 'medium' ? 'Média' : 'Baixa'}
                                  </Badge>
                                )}
                              </div>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                className={`${event.completed ? 'text-green-500' : 'text-gray-400'}`}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  if (event.original?.id) {
                                    toggleTaskCompletion(event.original.id);
                                  }
                                }}
                              >
                                <CheckCircle className="h-5 w-5" />
                              </Button>
                            </div>
                          </div>
                        ))}
                        {getEventsForDay(selectedDate).filter(e => e.type === 'task').length === 0 && (
                          <p className="text-center text-muted-foreground py-6">
                            Nenhuma tarefa para este dia
                          </p>
                        )}
                    </TabsContent>
                    
                    <TabsContent value="routines" className="space-y-2 mt-4">
                      {getEventsForDay(selectedDate)
                        .filter(event => event.type === 'routine')
                        .sort((a, b) => (a.time || '').localeCompare(b.time || ''))
                        .map(event => (
                          <div 
                            key={event.id}
                            className="p-3 border rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer"
                            onClick={() => showEventDetails(event)}
                          >
                            <div className="flex items-start justify-between">
                              <div>
                                <h3 className="font-medium">{event.title}</h3>
                                {event.time && (
                                  <div className="flex items-center mt-1 text-sm text-muted-foreground">
                                    <Clock className="h-3 w-3 mr-1" />
                                    {event.time}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                        {getEventsForDay(selectedDate).filter(e => e.type === 'routine').length === 0 && (
                          <p className="text-center text-muted-foreground py-6">
                            Nenhuma rotina para este dia
                          </p>
                        )}
                    </TabsContent>
                    
                    <TabsContent value="holidays" className="space-y-2 mt-4">
                      {getEventsForDay(selectedDate)
                        .filter(event => event.type === 'holiday')
                        .map(event => (
                          <div 
                            key={event.id}
                            className="p-3 border rounded-md bg-red-50 dark:bg-red-900/20"
                          >
                            <h3 className="font-medium text-red-600 dark:text-red-400">{event.title}</h3>
                            <p className="text-sm text-red-500 dark:text-red-300">Feriado Nacional</p>
                          </div>
                        ))}
                        {getEventsForDay(selectedDate).filter(e => e.type === 'holiday').length === 0 && (
                          <p className="text-center text-muted-foreground py-6">
                            Não é feriado
                          </p>
                        )}
                    </TabsContent>
                  </Tabs>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Dialog para detalhes do evento */}
      <Dialog open={isEventDialogOpen} onOpenChange={setIsEventDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {selectedEvent?.title}
            </DialogTitle>
            <DialogDescription>
              {selectedEvent?.type === 'holiday' && 'Feriado Nacional'}
              {selectedEvent?.type === 'task' && 'Tarefa'}
              {selectedEvent?.type === 'routine' && 'Rotina'}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 mt-2">
            {selectedEvent?.type === 'task' && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium">Data</p>
                    <p className="text-sm text-muted-foreground">
                      {format(selectedEvent.date, "dd/MM/yyyy")}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Prioridade</p>
                    <p className="text-sm">
                      <Badge 
                        variant="outline" 
                        className={`${
                          selectedEvent.priority === 'high' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
                          selectedEvent.priority === 'medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                          'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        }`}
                      >
                        {selectedEvent.priority === 'high' ? 'Alta' : 
                         selectedEvent.priority === 'medium' ? 'Média' : 'Baixa'}
                      </Badge>
                    </p>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm font-medium">Status</p>
                  <div className="flex items-center mt-1">
                    <Badge variant={selectedEvent.completed ? "outline" : "default"}>
                      {selectedEvent.completed ? 'Concluída' : 'Pendente'}
                    </Badge>
                  </div>
                </div>
                
                {selectedEvent.original?.description && (
                  <div>
                    <p className="text-sm font-medium">Descrição</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {selectedEvent.original.description}
                    </p>
                  </div>
                )}
                
                <div className="flex justify-end mt-4">
                  <Button 
                    variant={selectedEvent.completed ? "outline" : "default"}
                    onClick={() => {
                      if (selectedEvent.original?.id) {
                        toggleTaskCompletion(selectedEvent.original.id);
                        setIsEventDialogOpen(false);
                      }
                    }}
                  >
                    {selectedEvent.completed ? 'Marcar como pendente' : 'Marcar como concluída'}
                  </Button>
                </div>
              </>
            )}
            
            {selectedEvent?.type === 'routine' && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium">Data</p>
                    <p className="text-sm text-muted-foreground">
                      {format(selectedEvent.date, "dd/MM/yyyy")}
                    </p>
                  </div>
                  {selectedEvent.time && (
                    <div>
                      <p className="text-sm font-medium">Horário</p>
                      <p className="text-sm text-muted-foreground">
                        {selectedEvent.time}
                      </p>
                    </div>
                  )}
                </div>
                
                <div>
                  <p className="text-sm font-medium">Rotina</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Esta atividade faz parte da sua rotina regular.
                  </p>
                </div>
              </>
            )}
            
            {selectedEvent?.type === 'holiday' && (
              <div>
                <p className="text-sm text-muted-foreground mt-1">
                  Este é um feriado nacional brasileiro.
                </p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Calendar;
