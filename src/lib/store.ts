export type Category = 'Dulce' | 'Salado' | 'Postre';

export interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
  category: Category;
}

const STORAGE_KEY = 'rome_products';

export const getProducts = (): Product[] => {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    const initialData: Product[] = [
      {
        id: '1',
        name: 'Tarta de Chocolate Keto',
        description: 'Deliciosa tarta de chocolate sin azúcar y baja en carbohidratos.',
        image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=1000&auto=format&fit=crop',
        category: 'Dulce',
      },
      {
        id: '2',
        name: 'Pan de Queso Keto',
        description: 'Esponjosos panes de queso hechos con harina de almendras.',
        image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1000&auto=format&fit=crop',
        category: 'Salado',
      }
    ];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialData));
    return initialData;
  }
  return JSON.parse(stored);
};

export const saveProduct = (product: Product) => {
  const products = getProducts();
  const index = products.findIndex((p) => p.id === product.id);
  if (index !== -1) {
    products[index] = product;
  } else {
    products.push(product);
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
};

export const deleteProduct = (id: string) => {
  const products = getProducts();
  const filtered = products.filter((p) => p.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
};
