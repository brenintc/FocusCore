
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { Check, Clock, ListTodo, CalendarDays, BarChart4 } from 'lucide-react';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-16 md:py-20 bg-white dark:bg-focusdark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-focusdark dark:text-white animate-fade-in">
              Domine seu tempo com <span className="text-focusblue">FocusCore</span>
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-300 animate-slide-up delay-150">
              Gerencie tarefas, rastreie hábitos e organize suas rotinas diárias em um único lugar. 
              Sem distrações, apenas produtividade pura.
            </p>
            <div className="mt-10 flex justify-center space-x-4 animate-slide-up delay-300">
              <Button className="bg-focusblue hover:bg-blue-700 text-white px-8 py-3 text-lg">
                Experimente Grátis
              </Button>
              <Button variant="outline" className="border-focusblue text-focusblue hover:bg-focuslight dark:text-white dark:hover:bg-gray-800 px-8 py-3 text-lg">
                Recursos
              </Button>
            </div>
          </div>
          <div className="mt-16 flex justify-center">
            <div className="relative rounded-2xl bg-focuslight overflow-hidden shadow-xl dark:bg-gray-800 animate-slide-up delay-450">
              <img 
                src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d" 
                alt="FocusCore App" 
                className="w-full max-w-4xl h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-focuslight dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-focusdark dark:text-white">Recursos Principais</h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              Tudo o que você precisa para maximizar sua produtividade
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="feature-card">
              <div className="h-12 w-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-5">
                <ListTodo size={28} className="text-focusblue" />
              </div>
              <h3 className="text-xl font-bold text-focusdark dark:text-white mb-3">Gestão de Tarefas</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Crie listas personalizadas, adicione subtarefas e defina prioridades para manter-se organizado.
              </p>
              <ul className="mt-4">
                <li className="flex items-center text-gray-600 dark:text-gray-300 mb-2">
                  <Check size={18} className="text-focusgreen mr-2" />
                  <span>Listas personalizáveis</span>
                </li>
                <li className="flex items-center text-gray-600 dark:text-gray-300 mb-2">
                  <Check size={18} className="text-focusgreen mr-2" />
                  <span>Subtarefas e checklists</span>
                </li>
                <li className="flex items-center text-gray-600 dark:text-gray-300">
                  <Check size={18} className="text-focusgreen mr-2" />
                  <span>Lembretes e notificações</span>
                </li>
              </ul>
            </div>
            
            {/* Feature 2 */}
            <div className="feature-card">
              <div className="h-12 w-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mb-5">
                <Check size={28} className="text-focusgreen" />
              </div>
              <h3 className="text-xl font-bold text-focusdark dark:text-white mb-3">Rastreamento de Hábitos</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Desenvolva e mantenha hábitos positivos com rastreamento visual e estatísticas de progresso.
              </p>
              <ul className="mt-4">
                <li className="flex items-center text-gray-600 dark:text-gray-300 mb-2">
                  <Check size={18} className="text-focusgreen mr-2" />
                  <span>Hábitos diários/semanais</span>
                </li>
                <li className="flex items-center text-gray-600 dark:text-gray-300 mb-2">
                  <Check size={18} className="text-focusgreen mr-2" />
                  <span>Check-ins visuais</span>
                </li>
                <li className="flex items-center text-gray-600 dark:text-gray-300">
                  <Check size={18} className="text-focusgreen mr-2" />
                  <span>Sequências de dias consecutivos</span>
                </li>
              </ul>
            </div>
            
            {/* Feature 3 */}
            <div className="feature-card">
              <div className="h-12 w-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mb-5">
                <Clock size={28} className="text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-focusdark dark:text-white mb-3">Rotinas Diárias</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Estabeleça rotinas consistentes com timers integrados e templates personalizáveis.
              </p>
              <ul className="mt-4">
                <li className="flex items-center text-gray-600 dark:text-gray-300 mb-2">
                  <Check size={18} className="text-focusgreen mr-2" />
                  <span>Rotinas matinais/noturnas</span>
                </li>
                <li className="flex items-center text-gray-600 dark:text-gray-300 mb-2">
                  <Check size={18} className="text-focusgreen mr-2" />
                  <span>Timer Pomodoro integrado</span>
                </li>
                <li className="flex items-center text-gray-600 dark:text-gray-300">
                  <Check size={18} className="text-focusgreen mr-2" />
                  <span>Templates personalizáveis</span>
                </li>
              </ul>
            </div>
            
            {/* Feature 4 */}
            <div className="feature-card">
              <div className="h-12 w-12 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center mb-5">
                <BarChart4 size={28} className="text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-focusdark dark:text-white mb-3">Estatísticas e Relatórios</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Acompanhe seu progresso com estatísticas detalhadas e relatórios personalizados.
              </p>
              <ul className="mt-4">
                <li className="flex items-center text-gray-600 dark:text-gray-300 mb-2">
                  <Check size={18} className="text-focusgreen mr-2" />
                  <span>Progresso semanal/mensal</span>
                </li>
                <li className="flex items-center text-gray-600 dark:text-gray-300 mb-2">
                  <Check size={18} className="text-focusgreen mr-2" />
                  <span>Análise de hábitos</span>
                </li>
                <li className="flex items-center text-gray-600 dark:text-gray-300">
                  <Check size={18} className="text-focusgreen mr-2" />
                  <span>Exportação de dados</span>
                </li>
              </ul>
            </div>
            
            {/* Feature 5 */}
            <div className="feature-card">
              <div className="h-12 w-12 bg-red-100 dark:bg-red-900 rounded-lg flex items-center justify-center mb-5">
                <CalendarDays size={28} className="text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-focusdark dark:text-white mb-3">Sincronização Multiplataforma</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Acesse seus dados em qualquer lugar, seja no celular ou no computador.
              </p>
              <ul className="mt-4">
                <li className="flex items-center text-gray-600 dark:text-gray-300 mb-2">
                  <Check size={18} className="text-focusgreen mr-2" />
                  <span>Mobile (iOS/Android)</span>
                </li>
                <li className="flex items-center text-gray-600 dark:text-gray-300 mb-2">
                  <Check size={18} className="text-focusgreen mr-2" />
                  <span>Web (navegadores)</span>
                </li>
                <li className="flex items-center text-gray-600 dark:text-gray-300">
                  <Check size={18} className="text-focusgreen mr-2" />
                  <span>Backup em nuvem</span>
                </li>
              </ul>
            </div>
            
            {/* Feature 6 */}
            <div className="feature-card">
              <div className="h-12 w-12 bg-indigo-100 dark:bg-indigo-900 rounded-lg flex items-center justify-center mb-5">
                <CalendarDays size={28} className="text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold text-focusdark dark:text-white mb-3">Integrações</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Conecte-se com outras ferramentas de produtividade para uma experiência completa.
              </p>
              <ul className="mt-4">
                <li className="flex items-center text-gray-600 dark:text-gray-300 mb-2">
                  <Check size={18} className="text-focusgreen mr-2" />
                  <span>Google Calendar</span>
                </li>
                <li className="flex items-center text-gray-600 dark:text-gray-300 mb-2">
                  <Check size={18} className="text-focusgreen mr-2" />
                  <span>Notion</span>
                </li>
                <li className="flex items-center text-gray-600 dark:text-gray-300">
                  <Check size={18} className="text-focusgreen mr-2" />
                  <span>Outras ferramentas populares</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-16 bg-white dark:bg-focusdark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-focusdark dark:text-white">O que nossos usuários dizem</h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              Pessoas reais, resultados reais
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-focuslight dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-gray-300 mr-4"></div>
                <div>
                  <h4 className="font-bold text-focusdark dark:text-white">Rafael Silva</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Gerente de Projetos</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                "FocusCore transformou completamente minha rotina diária. Consigo gerenciar múltiplos projetos enquanto mantenho um equilíbrio saudável entre trabalho e vida pessoal."
              </p>
            </div>
            
            {/* Testimonial 2 */}
            <div className="bg-focuslight dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-gray-300 mr-4"></div>
                <div>
                  <h4 className="font-bold text-focusdark dark:text-white">Julia Oliveira</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Estudante de Medicina</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                "Como estudante de medicina, preciso ser extremamente organizada. FocusCore me ajuda a manter o foco nos estudos e a desenvolver hábitos que melhoram meu desempenho acadêmico."
              </p>
            </div>
            
            {/* Testimonial 3 */}
            <div className="bg-focuslight dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-gray-300 mr-4"></div>
                <div>
                  <h4 className="font-bold text-focusdark dark:text-white">Marcelo Santos</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Empresário</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                "Tentei diversas ferramentas de produtividade, mas o FocusCore é diferente. É simples, eficiente e me ajuda a manter o foco no que realmente importa para meu negócio."
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-focusblue">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white">Pronto para dominar seu tempo?</h2>
            <p className="mt-4 text-lg text-blue-100">
              Comece a usar o FocusCore hoje e transforme sua produtividade
            </p>
            <div className="mt-10">
              <Button className="bg-white text-focusblue hover:bg-blue-50 px-8 py-3 text-lg">
                Experimente Grátis
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-16 bg-white dark:bg-focusdark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-focusdark dark:text-white">Perguntas Frequentes</h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              Tudo o que você precisa saber sobre o FocusCore
            </p>
          </div>
          <div className="max-w-3xl mx-auto">
            <div className="space-y-6">
              <div className="bg-focuslight dark:bg-gray-800 p-6 rounded-lg">
                <h4 className="text-lg font-bold text-focusdark dark:text-white mb-2">O FocusCore é gratuito?</h4>
                <p className="text-gray-600 dark:text-gray-300">
                  Sim, oferecemos uma versão gratuita com recursos básicos. Para funcionalidades avançadas, temos planos premium com preços acessíveis.
                </p>
              </div>
              <div className="bg-focuslight dark:bg-gray-800 p-6 rounded-lg">
                <h4 className="text-lg font-bold text-focusdark dark:text-white mb-2">Posso acessar meus dados em vários dispositivos?</h4>
                <p className="text-gray-600 dark:text-gray-300">
                  Sim, o FocusCore sincroniza seus dados em todos os seus dispositivos, permitindo acesso em qualquer lugar.
                </p>
              </div>
              <div className="bg-focuslight dark:bg-gray-800 p-6 rounded-lg">
                <h4 className="text-lg font-bold text-focusdark dark:text-white mb-2">Como o FocusCore se compara a outros aplicativos de produtividade?</h4>
                <p className="text-gray-600 dark:text-gray-300">
                  O FocusCore se destaca pela integração completa de tarefas, hábitos e rotinas em uma única plataforma, com foco em design limpo e funcionalidade sem distrações.
                </p>
              </div>
              <div className="bg-focuslight dark:bg-gray-800 p-6 rounded-lg">
                <h4 className="text-lg font-bold text-focusdark dark:text-white mb-2">Meus dados estão seguros?</h4>
                <p className="text-gray-600 dark:text-gray-300">
                  Absolutamente. A segurança dos seus dados é nossa prioridade. Utilizamos criptografia de ponta a ponta e seguimos as melhores práticas de proteção de dados.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
