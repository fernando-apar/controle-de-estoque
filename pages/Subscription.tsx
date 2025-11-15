
import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Plan } from '../types';
import Button from '../components/ui/Button';

const CheckIcon: React.FC = () => (
  <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
);

const Subscription: React.FC = () => {
  const { user, upgradePlan } = useAuth();

  const handleUpgrade = () => {
    alert("Simulação de checkout: Plano Premium ativado!");
    upgradePlan();
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Planos e Assinatura</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {/* Free Plan */}
        <div className={`p-8 rounded-lg shadow-lg border-2 ${user?.plan === Plan.FREE ? 'border-blue-500' : 'border-gray-200'} bg-white`}>
          <h3 className="text-2xl font-semibold text-gray-800">Gratuito</h3>
          <p className="text-gray-500 mt-2">Perfeito para começar</p>
          <p className="text-4xl font-bold mt-6">R$ 0<span className="text-lg font-medium text-gray-500">/mês</span></p>

          <ul className="mt-8 space-y-4 text-gray-600">
            <li className="flex items-center"><CheckIcon /><span className="ml-3">Até 10 produtos</span></li>
            <li className="flex items-center"><CheckIcon /><span className="ml-3">Movimentações ilimitadas</span></li>
            <li className="flex items-center"><CheckIcon /><span className="ml-3">Dashboard principal</span></li>
            <li className="flex items-center"><CheckIcon /><span className="ml-3">Exportação em CSV</span></li>
          </ul>

          {user?.plan === Plan.FREE && (
            <div className="mt-8 text-center bg-blue-100 text-blue-800 font-semibold py-3 rounded-lg">
              Seu plano atual
            </div>
          )}
        </div>

        {/* Premium Plan */}
        <div className={`p-8 rounded-lg shadow-lg border-2 ${user?.plan === Plan.PREMIUM ? 'border-blue-500' : 'border-gray-200'} bg-white`}>
          <h3 className="text-2xl font-semibold text-gray-800">Premium</h3>
          <p className="text-gray-500 mt-2">Para negócios que querem mais</p>
          <p className="text-4xl font-bold mt-6">R$ 29,90<span className="text-lg font-medium text-gray-500">/mês</span></p>

          <ul className="mt-8 space-y-4 text-gray-600">
            <li className="flex items-center"><CheckIcon /><span className="ml-3">Produtos ilimitados</span></li>
            <li className="flex items-center"><CheckIcon /><span className="ml-3">Movimentações ilimitadas</span></li>
            <li className="flex items-center"><CheckIcon /><span className="ml-3">Dashboard principal</span></li>
            <li className="flex items-center"><CheckIcon /><span className="ml-3">Exportação em CSV e PDF</span></li>
            <li className="flex items-center"><CheckIcon /><span className="ml-3">Relatórios avançados (em breve)</span></li>
            <li className="flex items-center"><CheckIcon /><span className="ml-3">Suporte prioritário</span></li>
          </ul>
          
          {user?.plan === Plan.FREE ? (
            <Button onClick={handleUpgrade} className="w-full mt-8">Fazer Upgrade</Button>
          ) : (
            <div className="mt-8 text-center bg-blue-100 text-blue-800 font-semibold py-3 rounded-lg">
              Seu plano atual
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Subscription;
