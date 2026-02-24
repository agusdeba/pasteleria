'use client';

import { useState, useEffect } from 'react';
import { Product, Category, getProducts, saveProduct, deleteProduct } from '@/lib/store';
import { Plus, Edit2, Trash2, X, Upload } from 'lucide-react';
import { cn, fileToBase64 } from '@/lib/utils';

export default function AdminPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Partial<Product>>({
    name: '',
    description: '',
    image: '',
    category: 'Dulce',
  });

  useEffect(() => {
    setProducts(getProducts());
  }, []);

  const handleSave = () => {
    if (currentProduct.name && currentProduct.description && currentProduct.image && currentProduct.category) {
      const productToSave: Product = {
        id: currentProduct.id || Math.random().toString(36).substr(2, 9),
        name: currentProduct.name,
        description: currentProduct.description,
        image: currentProduct.image,
        category: currentProduct.category as Category,
      };
      saveProduct(productToSave);
      setProducts(getProducts());
      setIsEditing(false);
      setCurrentProduct({ name: '', description: '', image: '', category: 'Dulce' });
    } else {
      alert('Por favor complete todos los campos');
    }
  };

  const handleEdit = (product: Product) => {
    setCurrentProduct(product);
    setIsEditing(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('¿Está seguro de eliminar este producto?')) {
      deleteProduct(id);
      setProducts(getProducts());
    }
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const base64 = await fileToBase64(file);
      setCurrentProduct({ ...currentProduct, image: base64 });
    }
  };

  return (
    <div className="min-h-screen bg-rome-cream p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-rome-darkGreen">Administrador de Productos</h1>
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

        {/* Modal-like Overlay for Form */}
        {isEditing && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl">
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
                      <img
                        src={currentProduct.image}
                        alt="Preview"
                        className="w-32 h-32 object-cover rounded-md border"
                      />
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
              <img src={product.image} alt={product.name} className="w-20 h-20 object-cover rounded-md" />
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
  );
}
