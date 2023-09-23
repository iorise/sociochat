/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.externals.push({
      "utf-8-validate": "commonjs utf-8-validate",
      bufferutil: "commonjs bufferutil",
    })

    return config
  },
  images: {
    domains: ["uploadthing.com", "lh3.googleusercontent.com", "i.ibb.co"],
  },
  experimental: {
    appDir: true,
  },
};

module.exports = nextConfig;
