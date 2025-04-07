
import { useEffect } from 'react';

// Função para sincronizar dados entre dispositivos
export const useMobileSync = (userId: string) => {
  useEffect(() => {
    // Função que será chamada quando o app iniciar
    const setupSyncListeners = () => {
      // Evento disparado quando dados são alterados no localStorage
      window.addEventListener('storage', (event) => {
        if (event.key && event.key.startsWith(`focuscore-${userId}`)) {
          console.log('Dados sincronizados:', event.key);
        }
      });
    };

    setupSyncListeners();
    
    // Log informativo sobre status da sincronização
    console.log('Sincronização mobile ativada para usuário:', userId);
    
    return () => {
      // Remover event listeners quando o componente for desmontado
      window.removeEventListener('storage', () => {});
    };
  }, [userId]);
};

// Função para exportar todos os dados do usuário (para backup)
export const exportUserData = (userId: string): string => {
  const userData: Record<string, any> = {};
  
  // Iterar sobre todos os itens no localStorage
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith(`focuscore-${userId}`)) {
      const value = localStorage.getItem(key);
      if (value) {
        userData[key] = JSON.parse(value);
      }
    }
  }
  
  // Retornar dados como JSON string
  return JSON.stringify(userData);
};

// Função para importar dados do usuário (de backup)
export const importUserData = (userId: string, jsonData: string): boolean => {
  try {
    const userData = JSON.parse(jsonData);
    
    // Importar dados para localStorage
    Object.keys(userData).forEach(key => {
      if (key.startsWith(`focuscore-${userId}`)) {
        localStorage.setItem(key, JSON.stringify(userData[key]));
      }
    });
    
    return true;
  } catch (error) {
    console.error('Erro ao importar dados:', error);
    return false;
  }
};
