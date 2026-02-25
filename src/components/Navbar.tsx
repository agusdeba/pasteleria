import Link from 'next/link';

type NavbarProps = {
  onNavigate: (id: string) => void;
};

export default function Navbar({ onNavigate }: NavbarProps) {
  return (
    <nav className="fixed top-0 w-full bg-rome-cream/80 backdrop-blur-md z-40 border-b border-rome-mutedGreen/10">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <span className="font-bold text-2xl tracking-tight text-rome-darkGreen">ROMÉ</span>
        <div className="hidden md:flex gap-8 text-sm font-medium">
          <button onClick={() => onNavigate('inicio')} className="hover:text-rome-darkGreen transition-colors">
            Inicio
          </button>
          <button onClick={() => onNavigate('nosotros')} className="hover:text-rome-darkGreen transition-colors">
            Nosotros
          </button>
          <button onClick={() => onNavigate('productos')} className="hover:text-rome-darkGreen transition-colors">
            Productos
          </button>
          <button onClick={() => onNavigate('contacto')} className="hover:text-rome-darkGreen transition-colors">
            Contacto
          </button>
        </div>
      </div>
    </nav>
  );
}
