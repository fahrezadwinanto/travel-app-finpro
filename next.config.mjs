/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'travel-journal-api-bootcamp.do.dibimbing.id',
        },
        {
          protocol: 'https',
          hostname: 's-light.tiket.photos',
        },
      ],
    },
  };
  
  export default nextConfig;
  