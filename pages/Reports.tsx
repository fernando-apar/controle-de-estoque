
import React from 'react';
import { useStock } from '../contexts/StockContext';
import { useAuth } from '../contexts/AuthContext';
import { Plan } from '../types';
import { exportToCSV, exportProductsToPDF, exportMovementsToPDF } from '../lib/utils';
import Button from '../components/ui/Button';

const Reports: React.FC = () => {
    const { products, movements } = useStock();
    const { user } = useAuth();

    const handleExport = (type: 'csv' | 'pdf', report: 'products' | 'movements') => {
        if (user?.plan === Plan.FREE && type === 'pdf') {
            alert('A exportação em PDF é uma funcionalidade do plano Premium. Faça o upgrade para usar!');
            return;
        }

        if (report === 'products') {
            type === 'csv' ? exportToCSV(products, 'produtos') : exportProductsToPDF(products);
        } else {
            type === 'csv' ? exportToCSV(movements, 'movimentacoes') : exportMovementsToPDF(movements);
        }
    };
    
    return (
        <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Relatórios</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">Relatório de Estoque Atual</h3>
                    <p className="text-gray-600 mb-6">Exporte uma lista completa de todos os seus produtos cadastrados, com quantidades e preços.</p>
                    <div className="flex gap-4">
                        <Button onClick={() => handleExport('csv', 'products')}>Exportar CSV</Button>
                        <Button onClick={() => handleExport('pdf', 'products')} disabled={user?.plan === Plan.FREE}>
                            Exportar PDF {user?.plan === Plan.FREE && <span className="ml-2 text-xs bg-yellow-400 text-yellow-800 px-2 py-0.5 rounded-full">PRO</span>}
                        </Button>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">Relatório de Movimentações</h3>
                    <p className="text-gray-600 mb-6">Exporte o histórico completo de entradas e saídas de estoque para uma análise detalhada.</p>
                    <div className="flex gap-4">
                        <Button onClick={() => handleExport('csv', 'movements')}>Exportar CSV</Button>
                        <Button onClick={() => handleExport('pdf', 'movements')} disabled={user?.plan === Plan.FREE}>
                             Exportar PDF {user?.plan === Plan.FREE && <span className="ml-2 text-xs bg-yellow-400 text-yellow-800 px-2 py-0.5 rounded-full">PRO</span>}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Reports;
