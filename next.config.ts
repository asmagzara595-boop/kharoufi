import type { NextConfig } from "next";
const config: NextConfig = {
  devIndicators: false,
  // Keep production validation from overwriting the running development server.
  distDir: process.env.NODE_ENV === "production" ? ".next-production" : ".next",
};
export default config;
