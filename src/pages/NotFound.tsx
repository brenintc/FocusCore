
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useLanguage } from "@/components/LanguageProvider";

const NotFound = () => {
  const location = useLocation();
  const { language } = useLanguage();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  const title = language === 'pt-BR' ? '404' : '404';
  const message = language === 'pt-BR' ? 'Ops! Página não encontrada' : 
                  language === 'es-ES' ? '¡Ups! Página no encontrada' :
                  language === 'fr-FR' ? 'Oups! Page non trouvée' :
                  language === 'de-DE' ? 'Hoppla! Seite nicht gefunden' :
                  'Oops! Page not found';
  const returnText = language === 'pt-BR' ? 'Voltar para a página inicial' : 
                     language === 'es-ES' ? 'Volver a la página principal' :
                     language === 'fr-FR' ? 'Retourner à l\'accueil' :
                     language === 'de-DE' ? 'Zurück zur Startseite' :
                     'Return to Home';

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-800">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">{title}</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-4">{message}</p>
        <a href="/" className="text-blue-500 hover:text-blue-700 underline">
          {returnText}
        </a>
      </div>
    </div>
  );
};

export default NotFound;
