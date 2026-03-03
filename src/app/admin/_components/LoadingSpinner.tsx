'use client';

import { Loader2 } from 'lucide-react';

export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-4">
      <Loader2 className="w-10 h-10 text-rome-darkGreen animate-spin" />
      <p className="text-rome-gray font-medium">Cargando productos...</p>
    </div>
  );
}
