
import React, { useMemo } from 'react';
import { useStock } from '../contexts/StockContext';
import { useAuth } from '../contexts/AuthContext';
import DashboardCard from '../components/ui/DashboardCard';
import Chart from '../components/ui/Chart';
import { PackageIcon, ArrowRightLeftIcon, BellIcon, ChartBarIcon } from '../components/icons';
import { MovementType } from '../types';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { products, movements, loading } = useStock();

  const totalProducts = useMemo(() => products.length, [products]);
  const lowStockProducts = useMemo(() => products.filter(p => p.quantity <= p.minStock), [products]);
  const mostMovedProducts = useMemo(() => {
    const counts = movements.reduce((acc, mov) => {
      acc[mov.productId] = (acc[mov.productId] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(counts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([id]) => products.find(p => p.id === id))
      .filter(Boolean);
  }, [movements, products]);

  const chartData = useMemo(() => {
    const data: { [key: string]: { name: string; entradas: number; saidas: number } } = {};
    const today = new Date();

    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      const key = date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
      data[key] = { name: key, entradas: 0, saidas: 0 };
    }
    
    movements.forEach(mov => {
      const movDate = new Date(mov.date);
      if (movDate > new Date(today.setDate(today.getDate() - 7))) {
          const key = new Date(mov.date).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
          if (data[key]) {
              if (mov.type === MovementType.IN) data[key].entradas += mov.quantity;
              else data[key].saidas += mov.quantity;
          }
      }
    });

    return Object.values(data);
  }, [movements]);

  if (loading) return <div>Carregando...</div>;

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-800 mb-2">Bem-vindo(a), {user?.name}!</h2>
      <p className="text-gray-600 mb-6">Aqui está um resumo do seu negócio.</p>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <DashboardCard title="Total de Produtos" value={totalProducts} icon={<PackageIcon className="h-6 w-6 text-white" />} color="bg-blue-500" />
        <DashboardCard title="Produtos com Baixo Estoque" value={lowStockProducts.length} icon={<BellIcon className="h-6 w-6 text-white" />} color="bg-red-500" />
        <DashboardCard title="Movimentações (7 dias)" value={chartData.reduce((acc, d) => acc + d.entradas + d.saidas, 0)} icon={<ArrowRightLeftIcon className="h-6 w-6 text-white" />} color="bg-green-500" />
        <DashboardCard title="Valor em Estoque (Venda)" value={`R$ ${products.reduce((acc, p) => acc + p.quantity * p.sellPrice, 0).toFixed(2)}`} icon={<ChartBarIcon className="h-6 w-6 text-white" />} color="bg-yellow-500" />
      </div>

      {/* Chart and Lists */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Chart data={chartData} />
        </div>
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Produtos com Baixo Estoque</h3>
            {lowStockProducts.length > 0 ? (
              <ul className="space-y-3">
                {lowStockProducts.slice(0,5).map(p => (
                  <li key={p.id} className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">{p.name}</span>
                    <span className="font-bold text-red-500">{p.quantity} un.</span>
                  </li>
                ))}
              </ul>
            ) : <p className="text-sm text-gray-500">Nenhum produto com baixo estoque.</p>}
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Produtos mais Movimentados</h3>
            {mostMovedProducts.length > 0 ? (
              <ul className="space-y-3">
                {mostMovedProducts.map(p => p && (
                  <li key={p.id} className="text-sm text-gray-600">{p.name}</li>
                ))}
              </ul>
            ) : <p className="text-sm text-gray-500">Nenhuma movimentação registrada.</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
