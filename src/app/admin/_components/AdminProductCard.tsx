'use client';

import Image from 'next/image';
import { Edit2, Trash2 } from 'lucide-react';
import type { Product } from '@/lib/store';

interface AdminProductCardProps {
  product: Product;
  onEdit: (p: Product) => void;
  onDelete: (id: string) => void;
}

export default function AdminProductCard({ product, onEdit, onDelete }: AdminProductCardProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow">
      <div className="relative w-20 h-20 shrink-0 rounded-md overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover"
        />
      </div>
      <div className="flex-1">
        <h3 className="font-bold text-rome-darkGreen">{product.name}</h3>
        <p className="text-sm text-rome-gray line-clamp-1">{product.description}</p>
        <span className="text-xs bg-rome-lightGreen/20 text-rome-darkGreen px-2 py-1 rounded-full mt-1 inline-block">
          {product.category}
        </span>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => onEdit(product)}
          className="p-2 text-rome-mutedGreen hover:bg-rome-mutedGreen/10 rounded-full transition-colors"
          title="Editar producto"
        >
          <Edit2 size={20} />
        </button>
        <button
          onClick={() => onDelete(product.id!)}
          className="p-2 text-red-400 hover:bg-red-50 rounded-full transition-colors"
          title="Eliminar producto"
        >
          <Trash2 size={20} />
        </button>
      </div>
    </div>
  );
}
