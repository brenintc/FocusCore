
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@/components/UserProvider';
import { useTheme } from '@/components/ThemeProvider';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Moon, Sun, User, Trash2 } from 'lucide-react';
import { toast } from "sonner";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const Settings: React.FC = () => {
  const { userName, setUserName, userId } = useUser();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [name, setName] = useState(userName);
  
  const handleUpdateName = () => {
    if (name.trim()) {
      setUserName(name.trim());
      toast.success("Nome atualizado com sucesso!");
    }
  };
  
  const handleReset = () => {
    // Clear localStorage
    localStorage.clear();
    // Reload the page to reset everything
    window.location.href = '/';
  };
  
  return (
    <div className="min-h-screen bg-white dark:bg-focusdark py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/dashboard')}
          className="mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Voltar
        </Button>
        
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-focusdark dark:text-white">Configurações</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Personalize sua experiência no FocusCore
          </p>
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="mr-2 h-5 w-5" />
                Perfil
              </CardTitle>
              <CardDescription>Atualize suas informações pessoais</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">
                  Seu nome
                </label>
                <div className="flex space-x-2">
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="flex-grow"
                  />
                  <Button onClick={handleUpdateName}>
                    Atualizar
                  </Button>
                </div>
              </div>
              
              <div className="text-sm text-gray-500">
                <p>ID do usuário: {userId}</p>
                <p className="mt-1">Este ID é usado para identificar seus dados localmente.</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                {theme === 'dark' ? (
                  <Moon className="mr-2 h-5 w-5" />
                ) : (
                  <Sun className="mr-2 h-5 w-5" />
                )}
                Aparência
              </CardTitle>
              <CardDescription>Personalize o tema visual</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Modo escuro</p>
                  <p className="text-sm text-gray-500">
                    {theme === 'dark' ? 'Ativado' : 'Desativado'}
                  </p>
                </div>
                <Switch
                  checked={theme === 'dark'}
                  onCheckedChange={toggleTheme}
                />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-red-500">
                <Trash2 className="mr-2 h-5 w-5" />
                Redefinir dados
              </CardTitle>
              <CardDescription>Limpar todos os dados salvos</CardDescription>
            </CardHeader>
            <CardContent>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive">
                    Redefinir todos os dados
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Esta ação não pode ser desfeita. Isso irá apagar permanentemente todas as suas
                      tarefas, hábitos e rotinas salvos neste dispositivo.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction onClick={handleReset}>
                      Sim, apagar tudo
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </CardContent>
            <CardFooter className="text-sm text-gray-500">
              Todos os dados são armazenados apenas no seu dispositivo.
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Settings;
