export type Category = 'Dulce' | 'Salado' | 'Postre';

export interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
  category: Category;
}
