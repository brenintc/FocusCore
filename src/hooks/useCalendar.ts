
import { useState, useEffect } from "react";
import { Holiday, getBrazilianHolidays, isHoliday } from "@/utils/brazilianHolidays";

export function useCalendar() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [holidays, setHolidays] = useState<Holiday[]>([]);
  const [currentHoliday, setCurrentHoliday] = useState<Holiday | null>(null);

  // Fetch holidays when year changes
  useEffect(() => {
    setHolidays(getBrazilianHolidays(currentYear));
  }, [currentYear]);

  // Update current holiday when selected date changes
  useEffect(() => {
    if (selectedDate) {
      setCurrentHoliday(isHoliday(selectedDate, holidays));
    } else {
      setCurrentHoliday(null);
    }
  }, [selectedDate, holidays]);

  // Handle year change when month changes
  const handleMonthChange = (month: Date) => {
    if (month.getFullYear() !== currentYear) {
      setCurrentYear(month.getFullYear());
    }
  };

  return {
    selectedDate,
    setSelectedDate,
    currentYear,
    holidays,
    currentHoliday,
    handleMonthChange
  };
}
