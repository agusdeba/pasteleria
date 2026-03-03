'use client';

import { LogOut } from 'lucide-react';

interface AdminHeaderProps {
  onLogout: () => void;
}

export default function AdminHeader({ onLogout }: AdminHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0 mb-8">
      
      <h1 className="text-2xl md:text-3xl font-bold text-rome-darkGreen text-center md:text-left">
        Administrador de Productos
      </h1>
    
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full md:w-auto">
        <button
          onClick={onLogout}
          title="Cerrar sesión"
          aria-label="Cerrar sesión"
          className="bg-red-500 text-white px-4 py-2 rounded-md flex items-center justify-center gap-2 hover:bg-red-600 transition-colors w-full sm:w-auto"
        >
          <LogOut size={20} />
        </button>
      </div>
      
    </div>
  );
}
