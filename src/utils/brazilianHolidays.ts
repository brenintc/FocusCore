// Lista de feriados nacionais brasileiros
// Esta é uma implementação básica, considera apenas os feriados fixos
// Para feriados móveis (Páscoa, Carnaval, etc) seria necessário um cálculo mais complexo

export interface Holiday {
  date: string; // formato: MM-DD (mês-dia)
  name: string;
  isNational: boolean;
}

export const getBrazilianHolidays = (year: number): Holiday[] => {
  // Feriados fixos nacionais
  const fixedHolidays: Holiday[] = [
    { date: `01-01`, name: "Ano Novo", isNational: true },
    { date: `04-21`, name: "Tiradentes", isNational: true },
    { date: `05-01`, name: "Dia do Trabalho", isNational: true },
    { date: `09-07`, name: "Independência do Brasil", isNational: true },
    { date: `10-12`, name: "Nossa Senhora Aparecida", isNational: true },
    { date: `11-02`, name: "Finados", isNational: true },
    { date: `11-15`, name: "Proclamação da República", isNational: true },
    { date: `12-25`, name: "Natal", isNational: true },
  ];
  
  // Cálculo da Páscoa (Algoritmo de Meeus/Jones/Butcher)
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31);
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  
  // Data da Páscoa
  const easterDate = new Date(year, month - 1, day);
  
  // Sexta-feira Santa (2 dias antes da Páscoa)
  const goodFriday = new Date(easterDate);
  goodFriday.setDate(easterDate.getDate() - 2);
  
  // Carnaval (47 dias antes da Páscoa)
  const carnivalTuesday = new Date(easterDate);
  carnivalTuesday.setDate(easterDate.getDate() - 47);
  
  // Corpus Christi (60 dias após a Páscoa)
  const corpusChristi = new Date(easterDate);
  corpusChristi.setDate(easterDate.getDate() + 60);
  
  // Adicionar feriados móveis
  const mobileHolidays: Holiday[] = [
    { 
      date: `${String(goodFriday.getMonth() + 1).padStart(2, '0')}-${String(goodFriday.getDate()).padStart(2, '0')}`, 
      name: "Sexta-feira Santa", 
      isNational: true 
    },
    { 
      date: `${String(carnivalTuesday.getMonth() + 1).padStart(2, '0')}-${String(carnivalTuesday.getDate()).padStart(2, '0')}`, 
      name: "Carnaval", 
      isNational: true 
    },
    { 
      date: `${String(corpusChristi.getMonth() + 1).padStart(2, '0')}-${String(corpusChristi.getDate()).padStart(2, '0')}`, 
      name: "Corpus Christi", 
      isNational: true 
    },
    { 
      date: `${String(easterDate.getMonth() + 1).padStart(2, '0')}-${String(easterDate.getDate()).padStart(2, '0')}`, 
      name: "Páscoa", 
      isNational: true 
    }
  ];
  
  return [...fixedHolidays, ...mobileHolidays];
};

// Verificar se uma data é feriado
export const isHoliday = (date: Date, holidays: Holiday[]): Holiday | null => {
  const monthDay = `${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  const holiday = holidays.find(h => h.date === monthDay);
  return holiday || null;
};

// Export the current year's holidays for convenience
export const brazilianHolidays = getBrazilianHolidays(new Date().getFullYear());
