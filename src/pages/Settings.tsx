
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@/components/UserProvider';
import { useTheme } from '@/components/ThemeProvider';
import { useLanguage } from '@/components/LanguageProvider';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Moon, Sun, User, Trash2, Smartphone, Download, Upload, Globe } from 'lucide-react';
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
  const { language, setLanguage, t } = useLanguage();
  const navigate = useNavigate();
  const [name, setName] = useState(userName);
  const [backupData, setBackupData] = useState<string>('');
  
  const handleUpdateName = () => {
    if (name.trim()) {
      setUserName(name.trim());
      toast.success(language === 'pt-BR' ? "Nome atualizado com sucesso!" : "Name updated successfully!");
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
    
    toast.success(t('settings.exportData') + " " + (language === 'pt-BR' ? "com sucesso!" : "successful!"));
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
          toast.success(language === 'pt-BR' 
            ? "Dados importados com sucesso! Recarregando a página..." 
            : "Data imported successfully! Reloading the page...");
          // Recarregar a página para aplicar as alterações
          setTimeout(() => window.location.reload(), 1500);
        } else {
          toast.error(language === 'pt-BR'
            ? "Erro ao importar dados. Verifique o arquivo."
            : "Error importing data. Check the file.");
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
  
  const handleLanguageChange = (value: string) => {
    setLanguage(value as 'pt-BR' | 'en-US' | 'es-ES' | 'fr-FR' | 'de-DE');
  };
  
  return (
    <div className="min-h-screen bg-white dark:bg-focusdark py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/dashboard')}
          className="mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> {t('nav.back')}
        </Button>
        
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-focusdark dark:text-white">{t('settings.title')}</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            {t('settings.personalize')}
          </p>
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="mr-2 h-5 w-5" />
                {t('settings.profile')}
              </CardTitle>
              <CardDescription>{t('settings.updatePersonal')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">
                  {t('settings.yourName')}
                </label>
                <div className="flex space-x-2">
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="flex-grow"
                  />
                  <Button onClick={handleUpdateName}>
                    {t('settings.update')}
                  </Button>
                </div>
              </div>
              
              <div className="text-sm text-gray-500">
                <p>{t('settings.userId')}: {userId}</p>
                <p className="mt-1">{t('settings.userIdDesc')}</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Smartphone className="mr-2 h-5 w-5" />
                {t('settings.sync')}
              </CardTitle>
              <CardDescription>{t('settings.syncDesc')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm">
                {t('settings.syncText')}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Button
                  onClick={handleExportData}
                  className="flex items-center justify-center"
                >
                  <Download className="mr-2 h-4 w-4" />
                  {t('settings.exportData')}
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
                    {t('settings.importData')}
                  </Button>
                </div>
              </div>
              
              <div className="mt-4 text-sm text-gray-500">
                <p>{t('settings.mobileUse')}:</p>
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
                <Globe className="mr-2 h-5 w-5" />
                {t('settings.language')}
              </CardTitle>
              <CardDescription>{t('settings.languageDesc')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Select value={language} onValueChange={handleLanguageChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pt-BR">{t('languages.pt')}</SelectItem>
                  <SelectItem value="en-US">{t('languages.en')}</SelectItem>
                  <SelectItem value="es-ES">{t('languages.es')}</SelectItem>
                  <SelectItem value="fr-FR">{t('languages.fr')}</SelectItem>
                  <SelectItem value="de-DE">{t('languages.de')}</SelectItem>
                </SelectContent>
              </Select>
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
                {t('settings.appearance')}
              </CardTitle>
              <CardDescription>{t('settings.customizeTheme')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{t('settings.darkMode')}</p>
                  <p className="text-sm text-gray-500">
                    {theme === 'dark' ? t('settings.enabled') : t('settings.disabled')}
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
                {t('settings.reset')}
              </CardTitle>
              <CardDescription>{t('settings.clearData')}</CardDescription>
            </CardHeader>
            <CardContent>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive">
                    {t('settings.resetAll')}
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>{t('settings.confirmation')}</AlertDialogTitle>
                    <AlertDialogDescription>
                      {t('settings.confirmationDesc')}
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>{t('settings.cancel')}</AlertDialogCancel>
                    <AlertDialogAction onClick={handleReset}>
                      {t('settings.confirm')}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </CardContent>
            <CardFooter className="text-sm text-gray-500">
              {t('settings.localData')}
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Settings;
