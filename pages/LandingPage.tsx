
import React from 'react';
import { Link } from 'react-router-dom';
import { PackageIcon, BellIcon, ChartBarIcon } from '../components/icons';

const LandingPage: React.FC = () => {
  return (
    <div className="bg-white text-gray-800">
      {/* Header */}
      <header className="fixed w-full bg-white/80 backdrop-blur-sm shadow-sm z-10">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">StockLite</h1>
          <nav>
            <Link to="/auth" className="bg-blue-600 text-white font-semibold px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Acessar
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-blue-50 pt-24 pb-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
            Controle seu estoque sem complicação
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            A solução prática e moderna para pequenos negócios. Foque em vender, deixe o controle de estoque com a gente.
          </p>
          <Link to="/auth" className="mt-8 inline-block bg-blue-600 text-white font-bold px-8 py-4 rounded-lg text-lg hover:bg-blue-700 transition-transform transform hover:scale-105">
            Começar Gratuitamente
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900">Tudo que você precisa para crescer</h3>
            <p className="text-gray-600 mt-2">Ferramentas simples que fazem a diferença no seu dia a dia.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-10">
            <div className="bg-gray-50 p-8 rounded-lg text-center shadow-sm hover:shadow-lg transition-shadow">
              <div className="bg-blue-100 text-blue-600 rounded-full p-4 inline-block mb-4">
                <PackageIcon className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-semibold mb-2">Cadastro Fácil de Produtos</h4>
              <p className="text-gray-600">
                Cadastre seus produtos com informações essenciais como preço de custo, venda e foto.
              </p>
            </div>
            <div className="bg-gray-50 p-8 rounded-lg text-center shadow-sm hover:shadow-lg transition-shadow">
              <div className="bg-blue-100 text-blue-600 rounded-full p-4 inline-block mb-4">
                <BellIcon className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-semibold mb-2">Alertas para não perder vendas</h4>
              <p className="text-gray-600">
                Seja notificado quando um produto atingir o estoque mínimo e nunca mais perca uma venda.
              </p>
            </div>
            <div className="bg-gray-50 p-8 rounded-lg text-center shadow-sm hover:shadow-lg transition-shadow">
              <div className="bg-blue-100 text-blue-600 rounded-full p-4 inline-block mb-4">
                <ChartBarIcon className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-semibold mb-2">Relatórios que ajudam</h4>
              <p className="text-gray-600">
                Relatórios simples que ajudam você a tomar as melhores decisões para o seu negócio.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white">
        <div className="container mx-auto px-6 py-16 text-center">
          <h3 className="text-3xl font-bold">Pronto para organizar seu negócio?</h3>
          <p className="mt-2 text-blue-100">Crie sua conta grátis e comece a usar agora mesmo.</p>
          <Link to="/auth" className="mt-6 inline-block bg-white text-blue-600 font-bold px-8 py-3 rounded-lg text-lg hover:bg-blue-50 transition-colors">
            Quero começar agora!
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white">
        <div className="container mx-auto px-6 py-6 text-center">
          <p>&copy; {new Date().getFullYear()} StockLite. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
