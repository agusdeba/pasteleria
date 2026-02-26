/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        optimizePackageImports: ['lucide-react'],
      },
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'vgnlnxxqtbckumlfnaal.supabase.co',
          port: '',
          pathname: '/storage/v1/object/public/product-images/**',
        },
      ],
    },
  };
export default nextConfig;
