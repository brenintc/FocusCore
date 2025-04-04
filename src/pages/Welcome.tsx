
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@/components/UserProvider';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const Welcome: React.FC = () => {
  const { userName, setUserName } = useUser();
  const [name, setName] = useState(userName);
  const navigate = useNavigate();
  
  // If user already has a name, redirect to dashboard
  useEffect(() => {
    if (userName) {
      navigate('/dashboard');
    }
  }, [userName, navigate]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      setUserName(name.trim());
      navigate('/dashboard');
    }
  };
  
  return (
    <div className="min-h-screen bg-white dark:bg-focusdark flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Bem-vindo ao FocusCore</CardTitle>
          <CardDescription className="text-center">
            Sua plataforma de gestão de produtividade pessoal
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">
                  Como devemos te chamar?
                </label>
                <Input
                  id="name"
                  placeholder="Seu nome"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full"
                  required
                />
              </div>
              <Button type="submit" className="w-full bg-focusblue">
                Começar
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center text-sm text-gray-500">
          Seus dados são armazenados apenas no seu dispositivo
        </CardFooter>
      </Card>
    </div>
  );
};

export default Welcome;
