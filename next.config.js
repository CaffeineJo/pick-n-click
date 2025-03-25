/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com', 'picsum.photos', 'svqahkrytqcdumiejdmf.supabase.co'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'svqahkrytqcdumiejdmf.supabase.co',
        pathname: '/storage/v1/object/public/item-img/uploads/**',
      },
    ],
  },
};

module.exports = nextConfig;
