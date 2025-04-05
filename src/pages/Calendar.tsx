
import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { brazilianHolidays } from "@/utils/brazilianHolidays";

const Calendar: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Calendário</h1>
      <CalendarComponent
        mode="single"
        holidays={brazilianHolidays}
        className="rounded-md border"
      />
    </div>
  );
};

export { Calendar };  // Named export instead of default
