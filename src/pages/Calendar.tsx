
import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDisplay } from "@/components/CalendarDisplay";
import { useCalendar } from "@/hooks/useCalendar";

const Calendar: React.FC = () => {
  const { selectedDate, setSelectedDate, currentHoliday } = useCalendar();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Calendário</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Calendário Mensal</CardTitle>
          </CardHeader>
          <CardContent>
            <CalendarDisplay 
              selected={selectedDate}
              onSelect={setSelectedDate}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Informações do Dia</CardTitle>
          </CardHeader>
          <CardContent>
            {selectedDate ? (
              <div className="space-y-4">
                <p>Data selecionada: {selectedDate.toLocaleDateString('pt-BR')}</p>
                {currentHoliday && (
                  <div className="bg-red-100 dark:bg-red-900/30 p-3 rounded-md">
                    <p className="font-medium text-red-600 dark:text-red-400">
                      Feriado: {currentHoliday.name}
                    </p>
                    <p className="text-sm text-red-500 dark:text-red-300">
                      {currentHoliday.isNational ? 'Feriado Nacional' : 'Feriado Regional'}
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-muted-foreground">Selecione uma data no calendário para ver mais informações</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export { Calendar };  // Named export instead of default
