
import * as React from "react";
import { Calendar } from "@/components/ui/calendar";
import { Holiday, getBrazilianHolidays } from "@/utils/brazilianHolidays";

interface CalendarDisplayProps {
  className?: string;
  onSelect?: (date: Date | undefined) => void;
  selected?: Date;
}

const CalendarDisplay: React.FC<CalendarDisplayProps> = ({ 
  className, 
  onSelect,
  selected 
}) => {
  const [year, setYear] = React.useState(new Date().getFullYear());
  const [holidays, setHolidays] = React.useState<Holiday[]>([]);

  React.useEffect(() => {
    const yearsHolidays = getBrazilianHolidays(year);
    setHolidays(yearsHolidays);
  }, [year]);

  const handleMonthChange = (month: Date) => {
    if (month.getFullYear() !== year) {
      setYear(month.getFullYear());
    }
  };

  // Custom function to modify day presentation
  const modifiersClassNames = {
    holiday: "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 font-medium",
  };

  // Custom modifiers for holidays
  const modifiers = {
    holiday: (date: Date) => {
      const monthDay = `${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
      return holidays.some(h => h.date === monthDay);
    }
  };

  // Custom day content renderer to show holiday information
  const renderDay = (day: Date, modifiers: Record<string, boolean>) => {
    const monthDay = `${String(day.getMonth() + 1).padStart(2, '0')}-${String(day.getDate()).padStart(2, '0')}`;
    const holiday = holidays.find(h => h.date === monthDay);

    return (
      <div className="relative w-full h-full flex items-center justify-center">
        {day.getDate()}
      </div>
    );
  };

  return (
    <Calendar
      mode="single"
      selected={selected}
      onSelect={onSelect}
      className={`rounded-md border ${className || ''}`}
      modifiers={modifiers}
      modifiersClassNames={modifiersClassNames}
      footer={holidays.length > 0 && (
        <div className="pt-3 text-xs text-muted-foreground">
          * Feriados nacionais destacados
        </div>
      )}
      onMonthChange={handleMonthChange}
    />
  );
};

export { CalendarDisplay };
