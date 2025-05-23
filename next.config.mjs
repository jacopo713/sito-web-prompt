/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
        pathname: '/a/**', // Permette qualsiasi path sotto /a/
      },
      // Aggiungi altri pattern se necessario per altre fonti di immagini
      // Ad esempio, se hai immagini su Firebase Storage:
      // {
      //   protocol: 'https',
      //   hostname: 'firebasestorage.googleapis.com',
      //   port: '',
      //   pathname: '/v0/b/tuo-project-id.appspot.com/o/**',
      // },
    ],
  },
  // Altre configurazioni di Next.js possono andare qui
};

export default nextConfig;
