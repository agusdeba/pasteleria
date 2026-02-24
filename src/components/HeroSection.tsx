import { ChevronDown } from 'lucide-react';

type HeroSectionProps = {
  onNavigate: (id: string) => void;
};

export default function HeroSection({ onNavigate }: HeroSectionProps) {
  return (
    <section id="inicio" className="min-h-screen flex flex-col items-center justify-center bg-rome-cream px-6 pt-16">
      <div className="text-center animate-fade-in">
        <h1 className="text-7xl md:text-9xl font-bold text-rome-darkGreen mb-4 tracking-tighter">Romé</h1>
        <p className="text-xl md:text-2xl text-rome-gray max-w-2xl mx-auto mb-10 font-serif italic">
          Pastelería Keto artesanal: Sabor sin culpas, bajo en carbohidratos y 100% natural.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => onNavigate('nosotros')}
            className="px-8 py-3 bg-rome-darkGreen text-white rounded-full font-bold hover:bg-rome-mediumGreen transition-all transform hover:scale-105 shadow-lg"
          >
            Conócenos
          </button>
          <button
            onClick={() => onNavigate('productos')}
            className="px-8 py-3 border-2 border-rome-darkGreen text-rome-darkGreen rounded-full font-bold hover:bg-rome-darkGreen hover:text-white transition-all transform hover:scale-105"
          >
            Ver productos
          </button>
        </div>
      </div>
      <div className="absolute bottom-10 animate-bounce cursor-pointer" onClick={() => onNavigate('nosotros')}>
        <ChevronDown className="text-rome-darkGreen" size={32} />
      </div>
    </section>
  );
}
