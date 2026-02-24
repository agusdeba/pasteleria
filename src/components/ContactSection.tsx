'use client';

import { useState } from 'react';
import { Instagram, MapPin, Clock, Mail, Phone, Send } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    inquiry: '',
  });

  const [errors, setErrors] = useState({
    phone: '',
    email: '',
  });

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePhone = (phone: string) => {
    return /^\d+$/.test(phone);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let valid = true;
    const newErrors = { phone: '', email: '' };

    if (!validateEmail(formData.email)) {
      newErrors.email = 'Email inválido';
      valid = false;
    }

    if (!validatePhone(formData.phone)) {
      newErrors.phone = 'El teléfono debe contener solo números';
      valid = false;
    }

    setErrors(newErrors);

    if (valid) {
      alert('¡Gracias! Tu consulta ha sido enviada (Simulación).');
      setFormData({ name: '', phone: '', email: '', inquiry: '' });
    }
  };

  return (
    <section id="contacto" className="py-24 bg-white px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-rome-darkGreen text-center mb-16">Contacto</h2>
        
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <div className="space-y-12">
            <div>
              <h3 className="text-2xl font-bold text-rome-mediumGreen mb-6 font-sans">Encuéntranos</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-rome-cream p-3 rounded-full text-rome-darkGreen">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <p className="font-bold text-rome-darkGreen">Ubicación</p>
                    <p className="text-rome-gray">Calle Gourmet 123, Barrio Pastel, Ciudad Keto</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-rome-cream p-3 rounded-full text-rome-darkGreen">
                    <Clock size={24} />
                  </div>
                  <div>
                    <p className="font-bold text-rome-darkGreen">Horarios</p>
                    <p className="text-rome-gray">Mar - Sáb: 10:00 - 19:00</p>
                    <p className="text-rome-gray">Dom: 10:00 - 14:00</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-rome-cream p-3 rounded-full text-rome-darkGreen">
                    <Instagram size={24} />
                  </div>
                  <div>
                    <p className="font-bold text-rome-darkGreen">Instagram</p>
                    <a href="#" className="text-rome-mutedGreen hover:underline">@romepasteleriaketo</a>
                  </div>
                </div>
              </div>
            </div>

            <div className="h-64 bg-rome-cream rounded-2xl overflow-hidden border border-rome-mutedGreen/20 flex items-center justify-center">
              <span className="text-rome-gray italic font-serif text-center px-8">
                [Espacio para Mapa Interactivo]
                <br />
                <MapPin className="mx-auto mt-2 opacity-50" />
              </span>
            </div>
          </div>

          {/* Form */}
          <div className="bg-rome-cream p-8 md:p-10 rounded-3xl shadow-sm">
            <h3 className="text-2xl font-bold text-rome-darkGreen mb-8">Envíanos un mensaje</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-rome-gray mb-1">Nombre y Apellido *</label>
                <input
                  required
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full p-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-rome-darkGreen outline-none transition-all"
                  placeholder="Tu nombre completo"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-rome-gray mb-1">Teléfono *</label>
                  <input
                    required
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className={cn(
                      "w-full p-3 bg-white border rounded-xl focus:ring-2 outline-none transition-all",
                      errors.phone ? "border-red-400 focus:ring-red-200" : "border-gray-200 focus:ring-rome-darkGreen"
                    )}
                    placeholder="Solo números"
                  />
                  {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-rome-gray mb-1">Email *</label>
                  <input
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={cn(
                      "w-full p-3 bg-white border rounded-xl focus:ring-2 outline-none transition-all",
                      errors.email ? "border-red-400 focus:ring-red-200" : "border-gray-200 focus:ring-rome-darkGreen"
                    )}
                    placeholder="ejemplo@mail.com"
                  />
                  {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-rome-gray mb-1">Consulta *</label>
                <textarea
                  required
                  value={formData.inquiry}
                  onChange={(e) => setFormData({ ...formData, inquiry: e.target.value })}
                  className="w-full p-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-rome-darkGreen outline-none transition-all"
                  rows={4}
                  placeholder="¿En qué podemos ayudarte?"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-rome-darkGreen text-white py-4 rounded-xl font-bold hover:bg-rome-mediumGreen transition-all flex items-center justify-center gap-2 group"
              >
                Enviar Consulta
                <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
