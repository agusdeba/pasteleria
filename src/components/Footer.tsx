export default function Footer() {
  return (
    <footer className="bg-rome-darkGreen text-rome-cream py-12 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:row justify-between items-center gap-8">
        <div className="text-center md:text-left">
          <h3 className="text-2xl font-bold mb-2">ROMÉ</h3>
          <p className="text-rome-lightGreen/80">Pastelería Keto & Artesanal</p>
        </div>
        <div className="flex gap-6">
          <a href="#" className="hover:text-rome-lightGreen transition-colors">
            Instagram
          </a>
          <a href="#" className="hover:text-rome-lightGreen transition-colors">
            WhatsApp
          </a>
        </div>
        <p className="text-sm opacity-50">
          © 2024 Romé Pastelería Keto. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
