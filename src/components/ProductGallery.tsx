'use client';

import { useState, useEffect } from 'react';
import { Product, Category } from '@/lib/store';
import { fetchProducts } from '@/lib/products';
import { cn } from '@/lib/utils';
import Image from 'next/image';

export default function ProductGallery() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filter, setFilter] = useState<Category | 'Todos'>('Todos');

  useEffect(() => {
    const loadProducts = async () => {
      const data = await fetchProducts();
      setProducts(data);
    };
    loadProducts();
  }, []);

  const filteredProducts = filter === 'Todos' 
    ? products 
    : products.filter(p => p.category === filter);

  const categories: (Category | 'Todos')[] = ['Todos', 'Dulce', 'Salado', 'Postre'];

  return (
    <section id="productos" className="py-24 bg-rome-cream px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-rome-darkGreen text-center mb-12">Nuestras Creaciones</h2>
        
        {/* Selector */}
        <div className="flex justify-center gap-4 mb-16 overflow-x-auto pb-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={cn(
                "px-6 py-2 rounded-full font-medium transition-all whitespace-nowrap",
                filter === cat
                  ? "bg-rome-darkGreen text-white shadow-md"
                  : "bg-white text-rome-gray hover:bg-rome-lightGreen/20"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <div className="relative h-72 w-full overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute top-4 left-4">
                  <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-md text-rome-darkGreen font-bold text-sm shadow-sm">
                    {product.name}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs font-bold uppercase tracking-widest text-rome-mutedGreen">
                    {product.category}
                  </span>
                </div>
                <p className="text-rome-gray text-sm line-clamp-2 italic font-serif">
                  {product.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-20 text-rome-gray italic">
            Próximamente más productos en esta categoría.
          </div>
        )}
      </div>
    </section>
  );
}
