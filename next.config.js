/** @type {import('next').NextConfig} */

const API_KEY = process.env.API_KEY;

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async redirects() {
    return [
      {
        // Step 1. source를 찾는다
        source: "/contact/:path*",
        // Step 2. destination으로 보낸다
        destination: "/form/:path*",
        // redirection이 영구적인지 아닌지 결정
        permanent: false,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/api/movies",
        destination: `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`,
      },
      {
        source: "/api/movies/:movieid",
        destination: `https://api.themoviedb.org/3/movie/:movieid?api_key=${API_KEY}`,
      },
    ];
  },
};

module.exports = nextConfig;
