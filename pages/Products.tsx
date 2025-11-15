
import React, { useState, useMemo } from 'react';
import { useStock } from '../contexts/StockContext';
import { useAuth } from '../contexts/AuthContext';
import { Plan, Product } from '../types';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import { PlusIcon, SearchIcon } from '../components/icons';

const ProductForm: React.FC<{ product?: Product | null, onSave: (product: any) => void, onCancel: () => void }> = ({ product, onSave, onCancel }) => {
    const [formData, setFormData] = useState({
        name: product?.name || '',
        category: product?.category || '',
        quantity: product?.quantity || 0,
        minStock: product?.minStock || 0,
        purchasePrice: product?.purchasePrice || 0,
        sellPrice: product?.sellPrice || 0,
        internalCode: product?.internalCode || '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: name.includes('Price') || name === 'quantity' || name === 'minStock' ? parseFloat(value) : value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({ ...product, ...formData });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input name="name" value={formData.name} onChange={handleChange} placeholder="Nome do Produto" required className="w-full p-2 border rounded"/>
                <input name="internalCode" value={formData.internalCode} onChange={handleChange} placeholder="Código Interno" required className="w-full p-2 border rounded"/>
            </div>
            <input name="category" value={formData.category} onChange={handleChange} placeholder="Categoria" required className="w-full p-2 border rounded"/>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <input name="quantity" type="number" value={formData.quantity} onChange={handleChange} placeholder="Quantidade Atual" required className="w-full p-2 border rounded"/>
                 <input name="minStock" type="number" value={formData.minStock} onChange={handleChange} placeholder="Estoque Mínimo" required className="w-full p-2 border rounded"/>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input name="purchasePrice" type="number" step="0.01" value={formData.purchasePrice} onChange={handleChange} placeholder="Preço de Compra" required className="w-full p-2 border rounded"/>
                <input name="sellPrice" type="number" step="0.01" value={formData.sellPrice} onChange={handleChange} placeholder="Preço de Venda" required className="w-full p-2 border rounded"/>
            </div>
            <div className="flex justify-end gap-4 pt-4">
                <Button type="button" variant="secondary" onClick={onCancel}>Cancelar</Button>
                <Button type="submit">Salvar</Button>
            </div>
        </form>
    );
};

const Products: React.FC = () => {
    const { products, addProduct, updateProduct, deleteProduct } = useStock();
    const { user } = useAuth();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');

    const categories = useMemo(() => [...new Set(products.map(p => p.category))], [products]);

    const filteredProducts = useMemo(() => {
        return products.filter(p =>
            (p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.internalCode.toLowerCase().includes(searchTerm.toLowerCase())) &&
            (categoryFilter === '' || p.category === categoryFilter)
        );
    }, [products, searchTerm, categoryFilter]);
    
    const handleSave = (productData: Product) => {
        if(user?.plan === Plan.FREE && products.length >= 10 && !productData.id){
            alert('Seu plano gratuito permite cadastrar apenas 10 produtos. Faça o upgrade para cadastrar mais!');
            return;
        }

        if (productData.id) {
            updateProduct(productData);
        } else {
            addProduct(productData);
        }
        setIsModalOpen(false);
        setEditingProduct(null);
    };

    const handleEdit = (product: Product) => {
        setEditingProduct(product);
        setIsModalOpen(true);
    };
    
    const handleDelete = (productId: string) => {
        if(window.confirm('Tem certeza que deseja excluir este produto?')) {
            deleteProduct(productId);
        }
    };
    
    const openAddModal = () => {
        setEditingProduct(null);
        setIsModalOpen(true);
    }

    return (
        <div>
            <div className="flex flex-col md:flex-row justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">Meus Produtos</h2>
                <Button onClick={openAddModal}><PlusIcon className="w-5 h-5 mr-2"/>Adicionar Produto</Button>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-md mb-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="relative md:col-span-2">
                        <input type="text" placeholder="Buscar por nome ou código..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full p-2 pl-10 border rounded-md"/>
                        <SearchIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2"/>
                    </div>
                    <select value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)} className="w-full p-2 border rounded-md">
                        <option value="">Todas as categorias</option>
                        {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                    </select>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3">Produto</th>
                            <th scope="col" className="px-6 py-3">Código</th>
                            <th scope="col" className="px-6 py-3">Categoria</th>
                            <th scope="col" className="px-6 py-3 text-center">Qtd.</th>
                            <th scope="col" className="px-6 py-3">Preço Venda</th>
                            <th scope="col" className="px-6 py-3 text-right">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredProducts.map(product => (
                            <tr key={product.id} className="bg-white border-b hover:bg-gray-50">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{product.name}</th>
                                <td className="px-6 py-4">{product.internalCode}</td>
                                <td className="px-6 py-4">{product.category}</td>
                                <td className={`px-6 py-4 text-center font-bold ${product.quantity <= product.minStock ? 'text-red-500' : 'text-green-500'}`}>{product.quantity}</td>
                                <td className="px-6 py-4">R$ {product.sellPrice.toFixed(2)}</td>
                                <td className="px-6 py-4 text-right">
                                    <button onClick={() => handleEdit(product)} className="font-medium text-blue-600 hover:underline mr-4">Editar</button>
                                    <button onClick={() => handleDelete(product.id)} className="font-medium text-red-600 hover:underline">Excluir</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                 {filteredProducts.length === 0 && <p className="p-6 text-center text-gray-500">Nenhum produto encontrado.</p>}
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingProduct ? "Editar Produto" : "Adicionar Produto"}>
                <ProductForm product={editingProduct} onSave={handleSave} onCancel={() => setIsModalOpen(false)} />
            </Modal>
        </div>
    );
};

export default Products;
