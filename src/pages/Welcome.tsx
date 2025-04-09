
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@/components/UserProvider';
import { useLanguage } from '@/components/LanguageProvider';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Welcome: React.FC = () => {
  const { userName, setUserName } = useUser();
  const { language, setLanguage } = useLanguage();
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

  const welcomeTitle = language === 'pt-BR' ? 'Bem-vindo ao FocusCore' :
                       language === 'es-ES' ? 'Bienvenido a FocusCore' :
                       language === 'fr-FR' ? 'Bienvenue à FocusCore' :
                       language === 'de-DE' ? 'Willkommen bei FocusCore' :
                       'Welcome to FocusCore';
                       
  const welcomeDesc = language === 'pt-BR' ? 'Sua plataforma de gestão de produtividade pessoal' :
                      language === 'es-ES' ? 'Su plataforma de gestión de productividad personal' :
                      language === 'fr-FR' ? 'Votre plateforme de gestion de productivité personnelle' :
                      language === 'de-DE' ? 'Ihre persönliche Produktivitätsmanagement-Plattform' :
                      'Your personal productivity management platform';
                      
  const nameLabel = language === 'pt-BR' ? 'Como devemos te chamar?' :
                    language === 'es-ES' ? '¿Cómo debemos llamarte?' :
                    language === 'fr-FR' ? 'Comment devrions-nous vous appeler?' :
                    language === 'de-DE' ? 'Wie sollen wir Sie nennen?' :
                    'What should we call you?';
                    
  const namePlaceholder = language === 'pt-BR' ? 'Seu nome' :
                          language === 'es-ES' ? 'Su nombre' :
                          language === 'fr-FR' ? 'Votre nom' :
                          language === 'de-DE' ? 'Ihr Name' :
                          'Your name';
                          
  const startButton = language === 'pt-BR' ? 'Começar' :
                      language === 'es-ES' ? 'Comenzar' :
                      language === 'fr-FR' ? 'Commencer' :
                      language === 'de-DE' ? 'Starten' :
                      'Start';
                      
  const dataPrivacy = language === 'pt-BR' ? 'Seus dados são armazenados apenas no seu dispositivo' :
                      language === 'es-ES' ? 'Sus datos se almacenan solo en su dispositivo' :
                      language === 'fr-FR' ? 'Vos données sont stockées uniquement sur votre appareil' :
                      language === 'de-DE' ? 'Ihre Daten werden nur auf Ihrem Gerät gespeichert' :
                      'Your data is stored only on your device';
  
  return (
    <div className="min-h-screen bg-white dark:bg-focusdark flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">{welcomeTitle}</CardTitle>
          <CardDescription className="text-center">
            {welcomeDesc}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Language / Idioma</label>
            <Select value={language} onValueChange={(val) => setLanguage(val as any)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pt-BR">Português (Brasil)</SelectItem>
                <SelectItem value="en-US">English (US)</SelectItem>
                <SelectItem value="es-ES">Español</SelectItem>
                <SelectItem value="fr-FR">Français</SelectItem>
                <SelectItem value="de-DE">Deutsch</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">
                  {nameLabel}
                </label>
                <Input
                  id="name"
                  placeholder={namePlaceholder}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full"
                  required
                />
              </div>
              <Button type="submit" className="w-full bg-focusblue">
                {startButton}
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center text-sm text-gray-500">
          {dataPrivacy}
        </CardFooter>
      </Card>
    </div>
  );
};

export default Welcome;
