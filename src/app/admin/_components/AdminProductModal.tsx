'use client';

import Image from 'next/image';
import { X, Upload } from 'lucide-react';
import type { Product, Category } from '@/lib/store';

interface AdminProductModalProps {
  product: Partial<Product>;
  onClose: () => void;
  onSave: () => void;
  onFieldChange: (updates: Partial<Product>) => void;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CATEGORIES: Category[] = ['Dulce', 'Salado', 'Postre'];

export default function AdminProductModal({
  product,
  onClose,
  onSave,
  onFieldChange,
  onImageChange,
}: AdminProductModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-rome-darkGreen">
            {product.id ? 'Editar Producto' : 'Nuevo Producto'}
          </h2>
          <button onClick={onClose} className="text-rome-gray hover:text-black">
            <X size={24} />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-rome-gray mb-1">Nombre</label>
            <input
              type="text"
              value={product.name ?? ''}
              onChange={(e) => onFieldChange({ name: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-rome-darkGreen focus:border-rome-darkGreen"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-rome-gray mb-1">Categoría</label>
            <select
              value={product.category ?? 'Dulce'}
              onChange={(e) => onFieldChange({ category: e.target.value as Category })}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-rome-gray mb-1">Descripción Breve</label>
            <textarea
              value={product.description ?? ''}
              onChange={(e) => onFieldChange({ description: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-md"
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-rome-gray mb-1">Imagen</label>
            <div className="flex flex-col items-center gap-2">
              {product.image && (
                <div className="relative w-32 h-32 rounded-md border overflow-hidden">
                  <Image
                    src={product.image}
                    alt="Preview"
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-8 h-8 mb-2 text-gray-500" />
                  <p className="text-xs text-gray-500">PNG, JPG o WEBP</p>
                </div>
                <input type="file" className="hidden" accept="image/*" onChange={onImageChange} />
              </label>
            </div>
          </div>

          <button
            onClick={onSave}
            className="w-full bg-rome-darkGreen text-white py-2 rounded-md font-bold hover:bg-rome-mediumGreen transition-colors mt-4"
          >
            Guardar Producto
          </button>
        </div>
      </div>
    </div>
  );
}
