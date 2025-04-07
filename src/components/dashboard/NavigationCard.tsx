
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface NavigationCardProps {
  title: string;
  description: string;
  path: string;
  icon: LucideIcon;
  buttonText: string;
  buttonVariant?: "default" | "outline";
  buttonClassName?: string;
}

const NavigationCard: React.FC<NavigationCardProps> = ({
  title,
  description,
  path,
  icon: Icon,
  buttonText,
  buttonVariant = "default",
  buttonClassName = "bg-focusblue"
}) => {
  const navigate = useNavigate();

  return (
    <Card className="hover:shadow-md transition-all duration-200 hover:-translate-y-1">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center text-xl">
          <Icon className="mr-2 h-5 w-5 text-focusblue" />
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Button 
          onClick={() => navigate(path)} 
          variant={buttonVariant}
          className={buttonClassName}
        >
          {buttonText}
        </Button>
      </CardContent>
    </Card>
  );
};

export default NavigationCard;
