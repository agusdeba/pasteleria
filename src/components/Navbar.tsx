`use client`;

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

type NavbarProps = {
  onNavigate: (id: string) => void;
};

export default function Navbar({ onNavigate }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleNavigate = (id: string) => {
    onNavigate(id);
    setIsOpen(false);
  };

  const linkBaseClasses =
    'px-4 py-2 rounded-full bg-white text-rome-gray hover:bg-rome-lightGreen/20 transition-colors';

  return (
    <nav className="fixed top-0 w-full bg-rome-cream/80 backdrop-blur-md z-40 border-b border-rome-mutedGreen/10">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <span className="font-bold text-2xl tracking-tight text-rome-darkGreen">ROMÉ</span>

        {/* Navegación desktop */}
        <div className="hidden md:flex gap-4 text-sm font-medium">
          <button onClick={() => handleNavigate('inicio')} className={linkBaseClasses}>
            Inicio
          </button>
          <button onClick={() => handleNavigate('nosotros')} className={linkBaseClasses}>
            Nosotros
          </button>
          <button onClick={() => handleNavigate('productos')} className={linkBaseClasses}>
            Productos
          </button>
          <button onClick={() => handleNavigate('contacto')} className={linkBaseClasses}>
            Contacto
          </button>
        </div>

        {/* Botón menú móvil */}
        <button
          type="button"
          className="md:hidden inline-flex items-center justify-center p-2 rounded-full bg-white text-rome-darkGreen hover:bg-rome-lightGreen/30 transition-colors"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label="Abrir menú de navegación"
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Menú desplegable móvil */}
      {isOpen && (
        <div className="md:hidden bg-rome-cream/95 border-t border-rome-mutedGreen/20">
          <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col gap-3 text-sm font-medium">
            <button onClick={() => handleNavigate('inicio')} className={linkBaseClasses}>
              Inicio
            </button>
            <button onClick={() => handleNavigate('nosotros')} className={linkBaseClasses}>
              Nosotros
            </button>
            <button onClick={() => handleNavigate('productos')} className={linkBaseClasses}>
              Productos
            </button>
            <button onClick={() => handleNavigate('contacto')} className={linkBaseClasses}>
              Contacto
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
