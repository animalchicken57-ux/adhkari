import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // نُثبّت جذر Turbopack على هذا المجلد (يوجد lockfile آخر في مجلد المستخدم)
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
