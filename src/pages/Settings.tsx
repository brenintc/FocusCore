
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@/components/UserProvider';
import { useTheme } from '@/components/ThemeProvider';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Moon, Sun, User, Trash2, Smartphone, Download, Upload } from 'lucide-react';
import { toast } from "sonner";
import { exportUserData, importUserData } from '../utils/mobileSync';
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
  const [backupData, setBackupData] = useState<string>('');
  
  const handleUpdateName = () => {
    if (name.trim()) {
      setUserName(name.trim());
      toast.success("Nome atualizado com sucesso!");
    }
  };
  
  const handleExportData = () => {
    const data = exportUserData(userId);
    setBackupData(data);
    
    // Criar e iniciar download do arquivo
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `focuscore-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast.success("Dados exportados com sucesso!");
  };
  
  const handleImportData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      if (content) {
        const success = importUserData(userId, content);
        if (success) {
          toast.success("Dados importados com sucesso! Recarregando a página...");
          // Recarregar a página para aplicar as alterações
          setTimeout(() => window.location.reload(), 1500);
        } else {
          toast.error("Erro ao importar dados. Verifique o arquivo.");
        }
      }
    };
    reader.readAsText(file);
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
                <Smartphone className="mr-2 h-5 w-5" />
                Sincronização Mobile
              </CardTitle>
              <CardDescription>Exporte e importe seus dados entre dispositivos</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm">
                Você pode transferir seus dados entre diferentes dispositivos exportando um arquivo de backup 
                e importando-o em outro dispositivo onde o FocusCore esteja instalado.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Button
                  onClick={handleExportData}
                  className="flex items-center justify-center"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Exportar Dados
                </Button>
                
                <div className="relative">
                  <input
                    type="file"
                    id="import-data"
                    accept=".json"
                    onChange={handleImportData}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <Button
                    className="w-full flex items-center justify-center"
                    variant="outline"
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    Importar Dados
                  </Button>
                </div>
              </div>
              
              <div className="mt-4 text-sm text-gray-500">
                <p>Para usar o app como aplicativo nativo em seu smartphone:</p>
                <ol className="list-decimal pl-5 mt-2 space-y-1">
                  <li>Exporte seus dados usando o botão acima</li>
                  <li>Acesse este mesmo site em seu smartphone</li>
                  <li>Importe o arquivo baixado</li>
                  <li>No Android, toque em "Adicionar à tela inicial" no menu do navegador</li>
                  <li>No iOS, toque em "Compartilhar" e depois "Adicionar à Tela de Início"</li>
                </ol>
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
