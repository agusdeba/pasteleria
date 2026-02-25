import { supabase } from './supabase';
import { Product, Category } from './store';

export const fetchProducts = async (): Promise<Product[]> => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching products:', error);
    return [];
  }

  return data.map((p: any) => ({
    id: p.id,
    name: p.name,
    description: p.description,
    category: p.category as Category,
    image: p.image_url,
  }));
};

export const createProduct = async (product: Omit<Product, 'id'>) => {
  // Upload image logic is separate, we assume product.image is the URL here?
  // Or do we upload first? The AdminPage will handle upload and pass URL here.

  const { data, error } = await supabase
    .from('products')
    .insert([
      {
        name: product.name,
        description: product.description,
        category: product.category,
        image_url: product.image,
      },
    ])
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const updateProduct = async (product: Product) => {
  const { error } = await supabase
    .from('products')
    .update({
      name: product.name,
      description: product.description,
      category: product.category,
      image_url: product.image,
    })
    .eq('id', product.id);

  if (error) throw error;
};

export const removeProduct = async (id: string) => {
  const { error } = await supabase.from('products').delete().eq('id', id);
  if (error) throw error;
};

// Helper to compress image
const compressImage = (file: File): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) {
            resolve(file);
            return;
        }

        // Calculate new dimensions (max 800px)
        const MAX_SIZE = 800;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_SIZE) {
            height *= MAX_SIZE / width;
            width = MAX_SIZE;
          }
        } else {
          if (height > MAX_SIZE) {
            width *= MAX_SIZE / height;
            height = MAX_SIZE;
          }
        }

        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(blob);
            } else {
              reject(new Error('Canvas to Blob failed'));
            }
          },
          'image/webp',
          0.7
        );
      };
      img.onerror = (error) => reject(error);
    };
    reader.onerror = (error) => reject(error);
  });
};

export const uploadProductImage = async (file: File): Promise<string> => {
  try {
    const compressedBlob = await compressImage(file);
    const fileName = `${Math.random().toString(36).substring(2)}.webp`;

    const { data, error: uploadError } = await supabase.storage
      .from('product-images')
      .upload(fileName, compressedBlob, {
        contentType: 'image/webp',
        upsert: false
      });

    if (uploadError) {
      throw uploadError;
    }

    const { data: { publicUrl } } = supabase.storage
      .from('product-images')
      .getPublicUrl(fileName);

    return publicUrl;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};
