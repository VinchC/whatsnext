/** @type {import('next').NextConfig} */

// CORS is a security mechanism that enables a server to specify which origins are allowed to access and load resources in a web browser. In this context, an “origin” refers to the combination of the protocol, domain, and port number a request comes from.

const nextConfig = {
    reactStrictMode: true,
    async rewrites() {
        return [
          {
            source: "/api/:path*", // defines the source that will access to the server
            destination: "http://localhost:4000/:path*", // Proxy to Backend - defines the server
          },
        ];
      },
};

export default nextConfig;
