'use client';

import { useState, useEffect } from 'react';
import { Product, Category } from '@/lib/store';
import { fetchProducts, createProduct, updateProduct, removeProduct, uploadProductImage } from '@/lib/products';
import ProtectedRoute from '@/components/ProtectedRoute';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import {
  LoadingSpinner,
  AdminProductCard,
  AdminHeader,
  AdminProductModal,
  AdminCategoryFilter,
  AdminEmptyState,
} from './_components';

const INITIAL_PRODUCT: Partial<Product> = {
  name: '',
  description: '',
  image: '',
  category: 'Dulce',
};

export default function AdminPage() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [filterCategory, setFilterCategory] = useState<string>('Todas');
  const [isLoading, setIsLoading] = useState(true);
  const [currentProduct, setCurrentProduct] = useState<Partial<Product>>(INITIAL_PRODUCT);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    setIsLoading(true);
    try {
      const data = await fetchProducts();
      setProducts(data);
    } catch (error) {
      console.error('Error cargando productos:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if (
      currentProduct.name &&
      currentProduct.description &&
      currentProduct.image &&
      currentProduct.category
    ) {
      try {
        if (currentProduct.id) {
          await updateProduct(currentProduct as Product);
        } else {
          await createProduct(currentProduct as Omit<Product, 'id'>);
        }
        await loadProducts();
        setIsEditing(false);
        setCurrentProduct(INITIAL_PRODUCT);
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
        setCurrentProduct((prev) => ({ ...prev, image: publicUrl }));
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

  const openAddProduct = () => {
    setIsEditing(true);
    setCurrentProduct(INITIAL_PRODUCT);
  };

  const filteredProducts = products.filter((product) =>
    filterCategory === 'Todas' ? true : product.category === filterCategory
  );

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-rome-cream p-8">
        <div className="max-w-4xl mx-auto">
          <AdminHeader onLogout={handleLogout} onAddProduct={openAddProduct} />

          {isEditing && (
            <AdminProductModal
              product={currentProduct}
              onClose={() => setIsEditing(false)}
              onSave={handleSave}
              onFieldChange={(updates) => setCurrentProduct((prev) => ({ ...prev, ...updates }))}
              onImageChange={handleImageChange}
            />
          )}

          <AdminCategoryFilter
            activeCategory={filterCategory}
            onSelect={setFilterCategory}
          />

          {isLoading ? (
            <LoadingSpinner />
          ) : filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <AdminProductCard
                  key={product.id}
                  product={product}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          ) : (
            <AdminEmptyState />
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}
