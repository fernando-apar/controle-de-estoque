
import React, { useState } from 'react';
import { useStock } from '../contexts/StockContext';
import type { Movement } from '../types';
import { MovementType } from '../types';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import { PlusIcon } from '../components/icons';

const MovementForm: React.FC<{onSave: (data: any) => void, onCancel: () => void}> = ({ onSave, onCancel }) => {
    const { products } = useStock();
    const [formData, setFormData] = useState({
        productId: '',
        type: MovementType.OUT,
        quantity: 1,
        reason: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: name === 'quantity' ? parseInt(value) : value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if(!formData.productId) {
            alert("Por favor, selecione um produto.");
            return;
        }
        onSave(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <select name="productId" value={formData.productId} onChange={handleChange} required className="w-full p-2 border rounded">
                <option value="">Selecione um produto</option>
                {products.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
            </select>
            <select name="type" value={formData.type} onChange={handleChange} required className="w-full p-2 border rounded">
                <option value={MovementType.OUT}>Saída</option>
                <option value={MovementType.IN}>Entrada</option>
            </select>
            <input name="quantity" type="number" min="1" value={formData.quantity} onChange={handleChange} placeholder="Quantidade" required className="w-full p-2 border rounded"/>
            <input name="reason" value={formData.reason} onChange={handleChange} placeholder="Motivo (ex: Venda, Compra)" required className="w-full p-2 border rounded"/>
            <div className="flex justify-end gap-4 pt-4">
                <Button type="button" variant="secondary" onClick={onCancel}>Cancelar</Button>
                <Button type="submit">Registrar</Button>
            </div>
        </form>
    );
}

const Movements: React.FC = () => {
    const { movements, addMovement } = useStock();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSave = (data: Omit<Movement, 'id' | 'date' | 'productName'>) => {
        addMovement(data);
        setIsModalOpen(false);
    };
    
    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Histórico de Movimentações</h2>
                <Button onClick={() => setIsModalOpen(true)}><PlusIcon className="w-5 h-5 mr-2" />Nova Movimentação</Button>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3">Data</th>
                            <th scope="col" className="px-6 py-3">Produto</th>
                            <th scope="col" className="px-6 py-3">Tipo</th>
                            <th scope="col" className="px-6 py-3">Quantidade</th>
                            <th scope="col" className="px-6 py-3">Motivo</th>
                        </tr>
                    </thead>
                    <tbody>
                        {movements.map(mov => (
                            <tr key={mov.id} className="bg-white border-b hover:bg-gray-50">
                                <td className="px-6 py-4">{new Date(mov.date).toLocaleString('pt-BR')}</td>
                                <td className="px-6 py-4 font-medium text-gray-900">{mov.productName}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                        mov.type === MovementType.IN ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                    }`}>
                                        {mov.type}
                                    </span>
                                </td>
                                <td className="px-6 py-4">{mov.quantity}</td>
                                <td className="px-6 py-4">{mov.reason}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                 {movements.length === 0 && <p className="p-6 text-center text-gray-500">Nenhuma movimentação registrada.</p>}
            </div>
            
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Registrar Movimentação">
                <MovementForm onSave={handleSave} onCancel={() => setIsModalOpen(false)} />
            </Modal>
        </div>
    );
};

export default Movements;
