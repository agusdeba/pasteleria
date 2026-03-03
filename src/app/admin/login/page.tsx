'use client';

import { useRouter } from 'next/navigation';
import { LoginForm } from '../_components';

export default function LoginPage() {
  const router = useRouter();

  const handleSuccess = () => {
    router.push('/admin');
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-rome-cream flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full border border-gray-100">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-rome-darkGreen mb-2">Acceso Administrativo</h1>
          <p className="text-rome-gray text-sm">Ingrese sus credenciales para continuar</p>
        </div>
        <LoginForm onSuccess={handleSuccess} />
      </div>
    </div>
  );
}
