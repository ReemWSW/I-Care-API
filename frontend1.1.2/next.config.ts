import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
   // เพิ่มส่วนนี้เข้าไป
  images: {
    remotePatterns: [
      
      {
        protocol: 'http',
        hostname: 'https://icareapp1-0-0dfz.onrender.com/',
        port: '', // ระบุ port ของ API ของคุณ
        pathname: '/uploads/**', // อนุญาตทุก path ที่อยู่ใต้ /uploads
      },
    ],
  },
};



export default nextConfig;
