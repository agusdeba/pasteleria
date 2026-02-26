'use client';

import { useState, useEffect } from 'react';
import { Product, Category } from '@/lib/store';
import { fetchProducts, createProduct, updateProduct, removeProduct, uploadProductImage } from '@/lib/products';
import { Plus, Edit2, Trash2, X, Upload, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import ProtectedRoute from '@/components/ProtectedRoute';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
export default function AdminPage() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Partial<Product>>({
    name: '',
    description: '',
    image: '',
    category: 'Dulce',
  });

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const data = await fetchProducts();
    setProducts(data);
  };

  const handleSave = async () => {
    if (currentProduct.name && currentProduct.description && currentProduct.image && currentProduct.category) {
      try {
        if (currentProduct.id) {
          await updateProduct(currentProduct as Product);
        } else {
          await createProduct(currentProduct as Omit<Product, 'id'>);
        }
        await loadProducts();
        setIsEditing(false);
        setCurrentProduct({ name: '', description: '', image: '', category: 'Dulce' });
      } catch (error) {
        console.error(error);
        alert('Error al guardar el producto. Asegúrese de haber iniciado sesión.');
      }
    } else {
      alert('Por favor complete todos los campos');
    }
  };

  const handleEdit = (product: Product) => {
    setCurrentProduct(product);
    setIsEditing(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('¿Está seguro de eliminar este producto?')) {
      try {
        await removeProduct(id);
        await loadProducts();
      } catch (error) {
        console.error(error);
        alert('Error al eliminar');
      }
    }
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const publicUrl = await uploadProductImage(file);
        setCurrentProduct({ ...currentProduct, image: publicUrl });
      } catch (error) {
        console.error(error);
        alert('Error al subir la imagen');
      }
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/admin/login');
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-rome-cream p-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-rome-darkGreen">Administrador de Productos</h1>
            <div className="flex gap-4">
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-red-600 transition-colors"
              >
                <LogOut size={20} /> Salir
              </button>
              <button
                onClick={() => {
                  setIsEditing(true);
                  setCurrentProduct({ name: '', description: '', image: '', category: 'Dulce' });
                }}
                className="bg-rome-darkGreen text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-rome-mediumGreen transition-colors"
              >
                <Plus size={20} /> Agregar Producto
              </button>
            </div>
          </div>

        {/* Modal-like Overlay for Form */}
        {isEditing && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-rome-darkGreen">
                  {currentProduct.id ? 'Editar Producto' : 'Nuevo Producto'}
                </h2>
                <button onClick={() => setIsEditing(false)} className="text-rome-gray hover:text-black">
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-rome-gray mb-1">Nombre</label>
                  <input
                    type="text"
                    value={currentProduct.name}
                    onChange={(e) => setCurrentProduct({ ...currentProduct, name: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-rome-darkGreen focus:border-rome-darkGreen"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-rome-gray mb-1">Categoría</label>
                  <select
                    value={currentProduct.category}
                    onChange={(e) => setCurrentProduct({ ...currentProduct, category: e.target.value as Category })}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value="Dulce">Dulce</option>
                    <option value="Salado">Salado</option>
                    <option value="Postre">Postre</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-rome-gray mb-1">Descripción Breve</label>
                  <textarea
                    value={currentProduct.description}
                    onChange={(e) => setCurrentProduct({ ...currentProduct, description: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    rows={3}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-rome-gray mb-1">Imagen</label>
                  <div className="flex flex-col items-center gap-2">
                    {currentProduct.image && (
                      <div className="relative w-32 h-32 rounded-md border overflow-hidden">
                        <Image
                          src={currentProduct.image}
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
                      <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                    </label>
                  </div>
                </div>

                <button
                  onClick={handleSave}
                  className="w-full bg-rome-darkGreen text-white py-2 rounded-md font-bold hover:bg-rome-mediumGreen transition-colors mt-4"
                >
                  Guardar Producto
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Product List */}
        <div className="grid gap-4">
          {products.map((product) => (
            <div key={product.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex items-center gap-4">
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
                  onClick={() => handleEdit(product)}
                  className="p-2 text-rome-mutedGreen hover:bg-rome-mutedGreen/10 rounded-full transition-colors"
                >
                  <Edit2 size={20} />
                </button>
                <button
                  onClick={() => handleDelete(product.id)}
                  className="p-2 text-red-400 hover:bg-red-50 rounded-full transition-colors"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))}
          {products.length === 0 && (
            <div className="text-center py-12 text-rome-gray italic">
              No hay productos registrados.
            </div>
          )}
        </div>
      </div>
    </div>
    </ProtectedRoute>
  );
}
