import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import type { Product, Movement } from '../types';
import { MovementType } from '../types';

interface StockContextType {
  products: Product[];
  movements: Movement[];
  addProduct: (product: Omit<Product, 'id' | 'createdAt'>) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (productId: string) => void;
  addMovement: (movement: Omit<Movement, 'id' | 'date' | 'productName'>) => void;
  loading: boolean;
  getProductById: (id: string) => Product | undefined;
}

const StockContext = createContext<StockContextType | undefined>(undefined);

const initialProducts: Product[] = [
    { id: '1', name: 'Shampoo Hidratante', category: 'Cabelo', quantity: 50, minStock: 10, purchasePrice: 15.50, sellPrice: 39.90, internalCode: 'SH001', createdAt: new Date().toISOString() },
    { id: '2', name: 'Condicionador Nutritivo', category: 'Cabelo', quantity: 8, minStock: 10, purchasePrice: 16.00, sellPrice: 42.90, internalCode: 'CN001', createdAt: new Date().toISOString() },
    { id: '3', name: 'Esmalte Vermelho', category: 'Unhas', quantity: 120, minStock: 20, purchasePrice: 3.00, sellPrice: 8.99, internalCode: 'ES001', createdAt: new Date().toISOString() },
    { id: '4', name: 'Creme para Mãos', category: 'Cuidados', quantity: 30, minStock: 5, purchasePrice: 8.75, sellPrice: 25.00, internalCode: 'CM001', createdAt: new Date().toISOString() },
];

const initialMovements: Movement[] = [
    { id: 'm1', productId: '1', productName: 'Shampoo Hidratante', type: MovementType.IN, quantity: 20, reason: 'Compra fornecedor', date: new Date(Date.now() - 86400000 * 2).toISOString() },
    { id: 'm2', productId: '3', productName: 'Esmalte Vermelho', type: MovementType.OUT, quantity: 5, reason: 'Venda', date: new Date(Date.now() - 86400000).toISOString() },
    { id: 'm3', productId: '2', productName: 'Condicionador Nutritivo', type: MovementType.OUT, quantity: 2, reason: 'Venda', date: new Date().toISOString() },
];

export const StockProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [movements, setMovements] = useState<Movement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      const storedProducts = localStorage.getItem('stocklite_products');
      const storedMovements = localStorage.getItem('stocklite_movements');
      setProducts(storedProducts ? JSON.parse(storedProducts) : initialProducts);
      setMovements(storedMovements ? JSON.parse(storedMovements) : initialMovements);
      setLoading(false);
    }, 500);
  }, []);

  useEffect(() => {
    if (!loading) {
      localStorage.setItem('stocklite_products', JSON.stringify(products));
      localStorage.setItem('stocklite_movements', JSON.stringify(movements));
    }
  }, [products, movements, loading]);

  const addProduct = (productData: Omit<Product, 'id' | 'createdAt'>) => {
    const newProduct: Product = {
      ...productData,
      id: `prod-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    setProducts(prev => [...prev, newProduct]);
  };
  
  const updateProduct = (updatedProduct: Product) => {
    setProducts(prev => prev.map(p => p.id === updatedProduct.id ? updatedProduct : p));
  };
  
  const deleteProduct = (productId: string) => {
    setProducts(prev => prev.filter(p => p.id !== productId));
    // Optional: also delete movements associated with this product
    // setMovements(prev => prev.filter(m => m.productId !== productId));
  };

  const addMovement = (movementData: Omit<Movement, 'id' | 'date' | 'productName'>) => {
    setProducts(prevProducts => {
        const product = prevProducts.find(p => p.id === movementData.productId);
        if (!product) return prevProducts;

        const newMovement: Movement = {
            ...movementData,
            id: `mov-${Date.now()}`,
            date: new Date().toISOString(),
            productName: product.name,
        };
        setMovements(prev => [newMovement, ...prev]);

        return prevProducts.map(p => {
            if (p.id === movementData.productId) {
                const newQuantity = movementData.type === MovementType.IN
                    ? p.quantity + movementData.quantity
                    : p.quantity - movementData.quantity;
                return { ...p, quantity: newQuantity >= 0 ? newQuantity : 0 };
            }
            return p;
        });
    });
  };
  
  const getProductById = (id: string) => products.find(p => p.id === id);

  const value = {
    products,
    movements,
    addProduct,
    updateProduct,
    deleteProduct,
    addMovement,
    loading,
    getProductById,
  };

  return (
    <StockContext.Provider value={value}>
      {children}
    </StockContext.Provider>
  );
};

export const useStock = (): StockContextType => {
  const context = useContext(StockContext);
  if (context === undefined) {
    throw new Error('useStock must be used within a StockProvider');
  }
  return context;
};