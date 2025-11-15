
import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import type { User } from '../types';
import Button from '../components/ui/Button';

const Profile: React.FC = () => {
    const { user, login } = useAuth(); // login is reused to update user data in this mock
    const [formData, setFormData] = useState({
        name: '',
        email: '',
    });
    
    useEffect(() => {
        if (user) {
            setFormData({ name: user.name, email: user.email });
        }
    }, [user]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Mock update by calling login again which sets the user object
        login(formData.email);
        alert('Perfil atualizado com sucesso!');
    };

    if (!user) {
        return <div>Carregando...</div>;
    }

    return (
        <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Meu Perfil</h2>
            
            <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nome</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            value={formData.email}
                            onChange={handleChange}
                            disabled
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 sm:text-sm"
                        />
                    </div>
                    <div>
                        <h3 className="text-sm font-medium text-gray-700">Plano Atual</h3>
                        <p className="mt-1 text-lg font-semibold text-blue-600 capitalize">{user.plan}</p>
                    </div>
                    <div className="pt-4">
                        <Button type="submit">Salvar Alterações</Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Profile;
