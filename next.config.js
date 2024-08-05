/** @type {import('next').NextConfig} */
const path = require("path");


const nextConfig = {
  reactStrictMode: true,
  env: {
    BASE_URL: process.env.BASE_URL,
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  output: "standalone",
  logging: {
    level: "debug",
    fetches: {
      fullUrl: true,
    },
  },
};

module.exports = nextConfig;
