'use client';

import { Plus, LogOut } from 'lucide-react';

interface AdminHeaderProps {
  onLogout: () => void;
  onAddProduct: () => void;
}

export default function AdminHeader({ onLogout, onAddProduct }: AdminHeaderProps) {
  return (
    <div className="flex justify-between items-center mb-8">
      <h1 className="text-3xl font-bold text-rome-darkGreen">Administrador de Productos</h1>
      <div className="flex gap-4">
        <button
          onClick={onLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-red-600 transition-colors"
        >
          <LogOut size={20} /> Salir
        </button>
        <button
          onClick={onAddProduct}
          className="bg-rome-darkGreen text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-rome-mediumGreen transition-colors"
        >
          <Plus size={20} /> Agregar Producto
        </button>
      </div>
    </div>
  );
}
