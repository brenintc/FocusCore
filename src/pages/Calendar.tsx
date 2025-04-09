
import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDisplay } from "@/components/CalendarDisplay";
import { useCalendar } from "@/hooks/useCalendar";
import { useLanguage } from "@/components/LanguageProvider";

const Calendar: React.FC = () => {
  const { selectedDate, setSelectedDate, currentHoliday } = useCalendar();
  const { language } = useLanguage();

  const title = language === 'pt-BR' ? 'Calendário' : 
               language === 'es-ES' ? 'Calendario' :
               language === 'fr-FR' ? 'Calendrier' :
               language === 'de-DE' ? 'Kalender' :
               'Calendar';
               
  const monthlyCalendar = language === 'pt-BR' ? 'Calendário Mensal' : 
                          language === 'es-ES' ? 'Calendario Mensual' :
                          language === 'fr-FR' ? 'Calendrier Mensuel' :
                          language === 'de-DE' ? 'Monatskalender' :
                          'Monthly Calendar';
                          
  const dayInfo = language === 'pt-BR' ? 'Informações do Dia' : 
                 language === 'es-ES' ? 'Información del Día' :
                 language === 'fr-FR' ? 'Informations du Jour' :
                 language === 'de-DE' ? 'Tagesinformationen' :
                 'Day Information';
                 
  const selectedDateText = language === 'pt-BR' ? 'Data selecionada' : 
                          language === 'es-ES' ? 'Fecha seleccionada' :
                          language === 'fr-FR' ? 'Date sélectionnée' :
                          language === 'de-DE' ? 'Ausgewähltes Datum' :
                          'Selected date';
                          
  const holidayText = language === 'pt-BR' ? 'Feriado' : 
                     language === 'es-ES' ? 'Festivo' :
                     language === 'fr-FR' ? 'Jour férié' :
                     language === 'de-DE' ? 'Feiertag' :
                     'Holiday';
                     
  const nationalHoliday = language === 'pt-BR' ? 'Feriado Nacional' : 
                         language === 'es-ES' ? 'Festivo Nacional' :
                         language === 'fr-FR' ? 'Jour férié national' :
                         language === 'de-DE' ? 'Nationaler Feiertag' :
                         'National Holiday';
                         
  const regionalHoliday = language === 'pt-BR' ? 'Feriado Regional' : 
                         language === 'es-ES' ? 'Festivo Regional' :
                         language === 'fr-FR' ? 'Jour férié régional' :
                         language === 'de-DE' ? 'Regionaler Feiertag' :
                         'Regional Holiday';
                         
  const selectDatePrompt = language === 'pt-BR' ? 'Selecione uma data no calendário para ver mais informações' : 
                          language === 'es-ES' ? 'Seleccione una fecha en el calendario para ver más información' :
                          language === 'fr-FR' ? 'Sélectionnez une date dans le calendrier pour voir plus d\'informations' :
                          language === 'de-DE' ? 'Wählen Sie ein Datum im Kalender, um weitere Informationen zu sehen' :
                          'Select a date in the calendar to see more information';

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{title}</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>{monthlyCalendar}</CardTitle>
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
            <CardTitle>{dayInfo}</CardTitle>
          </CardHeader>
          <CardContent>
            {selectedDate ? (
              <div className="space-y-4">
                <p>{selectedDateText}: {selectedDate.toLocaleDateString(language)}</p>
                {currentHoliday && (
                  <div className="bg-red-100 dark:bg-red-900/30 p-3 rounded-md">
                    <p className="font-medium text-red-600 dark:text-red-400">
                      {holidayText}: {currentHoliday.name}
                    </p>
                    <p className="text-sm text-red-500 dark:text-red-300">
                      {currentHoliday.isNational ? nationalHoliday : regionalHoliday}
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-muted-foreground">{selectDatePrompt}</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export { Calendar };  // Named export instead of default
