-- Create the products table
create table if not exists public.products (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  description text,
  category text not null, -- 'Dulce', 'Salado', 'Postre'
  image_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS)
alter table public.products enable row level security;

-- Create policies for products
-- Allow public read access
create policy "Public products are viewable by everyone"
  on public.products for select
  using ( true );

-- Allow authenticated users (admin) to insert, update, delete
create policy "Authenticated users can insert products"
  on public.products for insert
  with check ( auth.role() = 'authenticated' );

create policy "Authenticated users can update products"
  on public.products for update
  using ( auth.role() = 'authenticated' );

create policy "Authenticated users can delete products"
  on public.products for delete
  using ( auth.role() = 'authenticated' );

-- Create storage bucket for images
insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict (id) do nothing;

-- Set up storage policies
-- Allow public access to view images
create policy "Public Access"
  on storage.objects for select
  using ( bucket_id = 'product-images' );

-- Allow authenticated users to upload images
create policy "Authenticated users can upload images"
  on storage.objects for insert
  with check ( bucket_id = 'product-images' and auth.role() = 'authenticated' );

create policy "Authenticated users can update images"
  on storage.objects for update
  using ( bucket_id = 'product-images' and auth.role() = 'authenticated' );

create policy "Authenticated users can delete images"
  on storage.objects for delete
  using ( bucket_id = 'product-images' and auth.role() = 'authenticated' );
