
import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious
} from "@/components/ui/pagination";

interface FinancialPaginationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  tabs: { value: string; label: string }[];
}

const FinancialPagination: React.FC<FinancialPaginationProps> = ({ 
  activeTab, 
  setActiveTab, 
  tabs 
}) => {
  const isMobile = useIsMobile();
  const currentIndex = tabs.findIndex(tab => tab.value === activeTab);
  
  const goToNext = () => {
    if (currentIndex < tabs.length - 1) {
      setActiveTab(tabs[currentIndex + 1].value);
    }
  };
  
  const goToPrevious = () => {
    if (currentIndex > 0) {
      setActiveTab(tabs[currentIndex - 1].value);
    }
  };
  
  if (isMobile) {
    return (
      <div className="flex justify-between items-center w-full mb-6">
        <Button 
          variant="outline" 
          size="icon" 
          onClick={goToPrevious} 
          disabled={currentIndex === 0}
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="sr-only">Anterior</span>
        </Button>
        
        <span className="text-sm font-medium">
          {tabs[currentIndex].label}
        </span>
        
        <Button 
          variant="outline" 
          size="icon" 
          onClick={goToNext} 
          disabled={currentIndex === tabs.length - 1}
        >
          <ArrowRight className="h-4 w-4" />
          <span className="sr-only">Próximo</span>
        </Button>
      </div>
    );
  }
  
  return (
    <Pagination className="mb-8">
      <PaginationContent>
        {tabs.map((tab) => (
          <PaginationItem key={tab.value}>
            <PaginationLink 
              isActive={activeTab === tab.value}
              onClick={() => setActiveTab(tab.value)}
              className="cursor-pointer"
            >
              {tab.label}
            </PaginationLink>
          </PaginationItem>
        ))}
      </PaginationContent>
    </Pagination>
  );
};

export default FinancialPagination;
