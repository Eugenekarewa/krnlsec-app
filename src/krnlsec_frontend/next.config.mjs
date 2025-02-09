/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@react-three/fiber', '@react-three/drei'],
  webpack: (config) => {
    config.resolve.alias['three'] = 'three';
    return config;
  },
};

export default nextConfig;
