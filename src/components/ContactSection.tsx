'use client';

import { useState } from 'react';
import { Instagram, MapPin, Clock, Send } from 'lucide-react';
import { cn } from '@/lib/utils';
import Swal from 'sweetalert2';

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

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePhone = (phone: string) => {
    return /^\d+$/.test(phone);
  };

  const handleSubmit = async (e: React.FormEvent) => {
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
      setIsSubmitting(true);
      
      try {
        const response = await fetch('/api/send', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        const data = await response.json();
        console.log("Respuesta de la API:", data);

        if (response.ok && data.success) {
          // Vaciamos el formulario
          setFormData({ name: '', phone: '', email: '', inquiry: '' });
          
          Swal.fire({
            title: '¡Mensaje enviado!',
            text: 'Tu consulta ha sido enviada correctamente.',
            icon: 'success',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            customClass: {
              popup: 'rounded-2xl', 
            }
          });
        } else {
          throw new Error(data.error?.message || 'Error desconocido al enviar');
        }
      } catch (error) {
        console.error("Error al enviar el formulario", error);
        Swal.fire({
          title: 'Error',
          text: 'Hubo un problema al enviar el mensaje. Por favor, intenta de nuevo.',
          icon: 'error',
          confirmButtonColor: '#1a3626', // Verde oscuro de tu paleta
          customClass: {
            popup: 'rounded-2xl',
          }
        });
      } finally {
        setIsSubmitting(false);
      }
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
                    <p className="text-rome-gray">Caronti 572, Bahía Blanca, Buenos Aires</p>
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

            <div className="h-64 bg-rome-cream rounded-2xl overflow-hidden border border-rome-mutedGreen/20">
              <iframe
                title="Ubicación Romé Pastelería Keto"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3114.402918674894!2d-62.26669!3d-38.71941!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95eda35a7a3e2b7f%3A0x0000000000000000!2sCaronti%20572%2C%20B8000%20Bah%C3%ADa%20Blanca%2C%20Buenos%20Aires!5e0!3m2!1ses-419!2sar!4v1700000000000"
                width="100%"
                height="100%"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full border-0"
                allowFullScreen
              />
            </div>
          </div>

          {/* Form */}
          <div className="bg-rome-cream p-8 md:p-10 rounded-3xl shadow-sm">
            <h3 className="text-2xl font-bold text-rome-darkGreen mb-8">Envíanos un mensaje</h3>
            
            {/* Mensaje de éxito condicional */}
            {submitSuccess && (
              <div className="mb-6 bg-rome-mediumGreen/10 text-rome-darkGreen p-4 rounded-xl border border-rome-mediumGreen/20 flex items-center gap-3">
                <span className="font-bold">¡Gracias!</span> Tu consulta ha sido enviada correctamente. Nos pondremos en contacto pronto.
              </div>
            )}

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
                disabled={isSubmitting}
                className="w-full bg-rome-darkGreen text-white py-4 rounded-xl font-bold hover:bg-rome-mediumGreen transition-all flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Enviando...' : 'Enviar Consulta'}
                {!isSubmitting && <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
