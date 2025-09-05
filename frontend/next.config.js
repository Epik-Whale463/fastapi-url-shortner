/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  turbopack: {
    // Turbopack expects an absolute root path. Using __dirname is fine for
    // the frontend folder.
    root: __dirname,
  },
};

module.exports = nextConfig;