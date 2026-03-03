'use client';

import { Plus, Search } from 'lucide-react';

interface AdminToolbarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onAddProduct: () => void;
}

export default function AdminToolbar({ searchTerm, onSearchChange, onAddProduct }: AdminToolbarProps) {
  return (
    <div className="flex items-center gap-2 sm:gap-4 mb-6 w-full">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        <input
          type="text"
          placeholder="Buscar producto por nombre..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-9 pr-3 py-2 text-sm sm:text-base border border-gray-300 rounded-md focus:ring-rome-darkGreen focus:border-rome-darkGreen"
        />
      </div>

      <button
        onClick={onAddProduct}
        title="Agregar Producto"
        aria-label="Agregar Producto"
        className="bg-rome-darkGreen text-white p-2 sm:p-2.5 rounded-md flex items-center justify-center hover:bg-rome-mediumGreen transition-colors shrink-0 aspect-square"
      >
        <Plus className="w-5 h-5 sm:w-6 sm:h-6"/> 
      </button>
      
    </div>
  );
}