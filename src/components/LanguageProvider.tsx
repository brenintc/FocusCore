
import React, { createContext, useState, useContext, useEffect } from 'react';

type Language = 'pt-BR' | 'en-US' | 'es-ES' | 'fr-FR' | 'de-DE';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  'pt-BR': {
    'settings.title': 'Configurações',
    'settings.personalize': 'Personalize sua experiência no FocusCore',
    'settings.profile': 'Perfil',
    'settings.updatePersonal': 'Atualize suas informações pessoais',
    'settings.yourName': 'Seu nome',
    'settings.update': 'Atualizar',
    'settings.userId': 'ID do usuário',
    'settings.userIdDesc': 'Este ID é usado para identificar seus dados localmente.',
    'settings.sync': 'Sincronização Mobile',
    'settings.syncDesc': 'Exporte e importe seus dados entre dispositivos',
    'settings.syncText': 'Você pode transferir seus dados entre diferentes dispositivos exportando um arquivo de backup e importando-o em outro dispositivo onde o FocusCore esteja instalado.',
    'settings.exportData': 'Exportar Dados',
    'settings.importData': 'Importar Dados',
    'settings.mobileUse': 'Para usar o app como aplicativo nativo em seu smartphone:',
    'settings.appearance': 'Aparência',
    'settings.customizeTheme': 'Personalize o tema visual',
    'settings.darkMode': 'Modo escuro',
    'settings.enabled': 'Ativado',
    'settings.disabled': 'Desativado',
    'settings.language': 'Idioma',
    'settings.languageDesc': 'Selecione o idioma do aplicativo',
    'settings.reset': 'Redefinir dados',
    'settings.clearData': 'Limpar todos os dados salvos',
    'settings.resetAll': 'Redefinir todos os dados',
    'settings.confirmation': 'Você tem certeza?',
    'settings.confirmationDesc': 'Esta ação não pode ser desfeita. Isso irá apagar permanentemente todas as suas tarefas, hábitos e rotinas salvos neste dispositivo.',
    'settings.cancel': 'Cancelar',
    'settings.confirm': 'Sim, apagar tudo',
    'settings.localData': 'Todos os dados são armazenados apenas no seu dispositivo.',
    'nav.back': 'Voltar',
    'languages.pt': 'Português (Brasil)',
    'languages.en': 'English (US)',
    'languages.es': 'Español',
    'languages.fr': 'Français',
    'languages.de': 'Deutsch',
  },
  'en-US': {
    'settings.title': 'Settings',
    'settings.personalize': 'Customize your FocusCore experience',
    'settings.profile': 'Profile',
    'settings.updatePersonal': 'Update your personal information',
    'settings.yourName': 'Your name',
    'settings.update': 'Update',
    'settings.userId': 'User ID',
    'settings.userIdDesc': 'This ID is used to identify your data locally.',
    'settings.sync': 'Mobile Sync',
    'settings.syncDesc': 'Export and import your data between devices',
    'settings.syncText': 'You can transfer your data between different devices by exporting a backup file and importing it on another device where FocusCore is installed.',
    'settings.exportData': 'Export Data',
    'settings.importData': 'Import Data',
    'settings.mobileUse': 'To use the app as a native application on your smartphone:',
    'settings.appearance': 'Appearance',
    'settings.customizeTheme': 'Customize the visual theme',
    'settings.darkMode': 'Dark mode',
    'settings.enabled': 'Enabled',
    'settings.disabled': 'Disabled',
    'settings.language': 'Language',
    'settings.languageDesc': 'Select application language',
    'settings.reset': 'Reset Data',
    'settings.clearData': 'Clear all saved data',
    'settings.resetAll': 'Reset all data',
    'settings.confirmation': 'Are you sure?',
    'settings.confirmationDesc': 'This action cannot be undone. This will permanently delete all your tasks, habits, and routines saved on this device.',
    'settings.cancel': 'Cancel',
    'settings.confirm': 'Yes, delete everything',
    'settings.localData': 'All data is stored only on your device.',
    'nav.back': 'Back',
    'languages.pt': 'Português (Brasil)',
    'languages.en': 'English (US)',
    'languages.es': 'Español',
    'languages.fr': 'Français',
    'languages.de': 'Deutsch',
  },
  'es-ES': {
    'settings.title': 'Configuración',
    'settings.personalize': 'Personalice su experiencia en FocusCore',
    'settings.profile': 'Perfil',
    'settings.updatePersonal': 'Actualice su información personal',
    'settings.yourName': 'Su nombre',
    'settings.update': 'Actualizar',
    'settings.userId': 'ID de usuario',
    'settings.userIdDesc': 'Este ID se utiliza para identificar sus datos localmente.',
    'settings.sync': 'Sincronización Móvil',
    'settings.syncDesc': 'Exporte e importe sus datos entre dispositivos',
    'settings.syncText': 'Puede transferir sus datos entre diferentes dispositivos exportando un archivo de respaldo e importándolo en otro dispositivo donde esté instalado FocusCore.',
    'settings.exportData': 'Exportar Datos',
    'settings.importData': 'Importar Datos',
    'settings.mobileUse': 'Para usar la aplicación como aplicación nativa en su smartphone:',
    'settings.appearance': 'Apariencia',
    'settings.customizeTheme': 'Personalice el tema visual',
    'settings.darkMode': 'Modo oscuro',
    'settings.enabled': 'Activado',
    'settings.disabled': 'Desactivado',
    'settings.language': 'Idioma',
    'settings.languageDesc': 'Seleccione el idioma de la aplicación',
    'settings.reset': 'Restablecer datos',
    'settings.clearData': 'Borrar todos los datos guardados',
    'settings.resetAll': 'Restablecer todos los datos',
    'settings.confirmation': '¿Está seguro?',
    'settings.confirmationDesc': 'Esta acción no se puede deshacer. Esto eliminará permanentemente todas sus tareas, hábitos y rutinas guardadas en este dispositivo.',
    'settings.cancel': 'Cancelar',
    'settings.confirm': 'Sí, borrar todo',
    'settings.localData': 'Todos los datos se almacenan solo en su dispositivo.',
    'nav.back': 'Volver',
    'languages.pt': 'Português (Brasil)',
    'languages.en': 'English (US)',
    'languages.es': 'Español',
    'languages.fr': 'Français',
    'languages.de': 'Deutsch',
  },
  'fr-FR': {
    'settings.title': 'Paramètres',
    'settings.personalize': 'Personnalisez votre expérience FocusCore',
    'settings.profile': 'Profil',
    'settings.updatePersonal': 'Mettez à jour vos informations personnelles',
    'settings.yourName': 'Votre nom',
    'settings.update': 'Mettre à jour',
    'settings.userId': 'ID utilisateur',
    'settings.userIdDesc': 'Cet ID est utilisé pour identifier vos données localement.',
    'settings.sync': 'Synchronisation Mobile',
    'settings.syncDesc': 'Exportez et importez vos données entre appareils',
    'settings.syncText': 'Vous pouvez transférer vos données entre différents appareils en exportant un fichier de sauvegarde et en l\'important sur un autre appareil où FocusCore est installé.',
    'settings.exportData': 'Exporter les données',
    'settings.importData': 'Importer les données',
    'settings.mobileUse': 'Pour utiliser l\'application comme application native sur votre smartphone:',
    'settings.appearance': 'Apparence',
    'settings.customizeTheme': 'Personnalisez le thème visuel',
    'settings.darkMode': 'Mode sombre',
    'settings.enabled': 'Activé',
    'settings.disabled': 'Désactivé',
    'settings.language': 'Langue',
    'settings.languageDesc': 'Sélectionnez la langue de l\'application',
    'settings.reset': 'Réinitialiser les données',
    'settings.clearData': 'Effacer toutes les données enregistrées',
    'settings.resetAll': 'Réinitialiser toutes les données',
    'settings.confirmation': 'Êtes-vous sûr?',
    'settings.confirmationDesc': 'Cette action ne peut pas être annulée. Cela supprimera définitivement toutes vos tâches, habitudes et routines enregistrées sur cet appareil.',
    'settings.cancel': 'Annuler',
    'settings.confirm': 'Oui, tout supprimer',
    'settings.localData': 'Toutes les données sont stockées uniquement sur votre appareil.',
    'nav.back': 'Retour',
    'languages.pt': 'Português (Brasil)',
    'languages.en': 'English (US)',
    'languages.es': 'Español',
    'languages.fr': 'Français',
    'languages.de': 'Deutsch',
  },
  'de-DE': {
    'settings.title': 'Einstellungen',
    'settings.personalize': 'Passen Sie Ihr FocusCore-Erlebnis an',
    'settings.profile': 'Profil',
    'settings.updatePersonal': 'Aktualisieren Sie Ihre persönlichen Daten',
    'settings.yourName': 'Ihr Name',
    'settings.update': 'Aktualisieren',
    'settings.userId': 'Benutzer-ID',
    'settings.userIdDesc': 'Diese ID wird verwendet, um Ihre Daten lokal zu identifizieren.',
    'settings.sync': 'Mobile Synchronisierung',
    'settings.syncDesc': 'Exportieren und importieren Sie Ihre Daten zwischen Geräten',
    'settings.syncText': 'Sie können Ihre Daten zwischen verschiedenen Geräten übertragen, indem Sie eine Sicherungsdatei exportieren und auf einem anderen Gerät importieren, auf dem FocusCore installiert ist.',
    'settings.exportData': 'Daten exportieren',
    'settings.importData': 'Daten importieren',
    'settings.mobileUse': 'Um die App als native Anwendung auf Ihrem Smartphone zu verwenden:',
    'settings.appearance': 'Aussehen',
    'settings.customizeTheme': 'Passen Sie das visuelle Thema an',
    'settings.darkMode': 'Dunkler Modus',
    'settings.enabled': 'Aktiviert',
    'settings.disabled': 'Deaktiviert',
    'settings.language': 'Sprache',
    'settings.languageDesc': 'Wählen Sie die Anwendungssprache',
    'settings.reset': 'Daten zurücksetzen',
    'settings.clearData': 'Alle gespeicherten Daten löschen',
    'settings.resetAll': 'Alle Daten zurücksetzen',
    'settings.confirmation': 'Sind Sie sicher?',
    'settings.confirmationDesc': 'Diese Aktion kann nicht rückgängig gemacht werden. Dadurch werden alle Ihre auf diesem Gerät gespeicherten Aufgaben, Gewohnheiten und Routinen dauerhaft gelöscht.',
    'settings.cancel': 'Abbrechen',
    'settings.confirm': 'Ja, alles löschen',
    'settings.localData': 'Alle Daten werden nur auf Ihrem Gerät gespeichert.',
    'nav.back': 'Zurück',
    'languages.pt': 'Português (Brasil)',
    'languages.en': 'English (US)',
    'languages.es': 'Español',
    'languages.fr': 'Français',
    'languages.de': 'Deutsch',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const savedLanguage = localStorage.getItem('focuscore-language');
    return (savedLanguage as Language) || 'pt-BR';
  });

  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage);
    localStorage.setItem('focuscore-language', newLanguage);
  };

  // Translation function
  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
