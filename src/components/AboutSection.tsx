export default function AboutSection() {
  return (
    <section id="nosotros" className="py-24 bg-white px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-rome-darkGreen mb-12">Nuestra Esencia</h2>
        <div className="grid md:grid-cols-2 gap-12 items-center text-left">
          <div className="space-y-6">
            <p className="text-lg leading-relaxed text-rome-gray">
              En <span className="font-bold text-rome-darkGreen">Romé Pastelería Keto</span>, creemos que disfrutar de lo
              dulce no debería comprometer tu salud. Nuestra misión es crear experiencias gastronómicas excepcionales que
              respeten tu estilo de vida.
            </p>
            <p className="text-lg leading-relaxed text-rome-gray font-serif italic border-l-4 border-rome-lightGreen pl-4">
              &quot;Lo más importante es que nuestra comida es naturalmente baja en calorías y carbohidratos, utilizando
              ingredientes de la más alta calidad.&quot;
            </p>
          </div>
          <div className="bg-rome-cream p-8 rounded-2xl shadow-inner border border-rome-mutedGreen/20">
            <h3 className="text-2xl font-bold text-rome-mediumGreen mb-4">¿Por qué Keto?</h3>
            <ul className="space-y-3 text-rome-gray">
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-rome-lightGreen rounded-full" />
                Sin azúcares añadidos
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-rome-lightGreen rounded-full" />
                Harinas de frutos secos (Almendra, Coco)
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-rome-lightGreen rounded-full" />
                Bajo índice glucémico
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-rome-lightGreen rounded-full" />
                Ideal para celíacos y diabéticos
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
