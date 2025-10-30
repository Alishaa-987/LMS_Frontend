/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        remotePatterns: [
            {hostname: "images.pexels.com"},
            {hostname: "res.cloudinary.com"}
        ],
        domains: ["img.freepik.com"],

    }
};

export default nextConfig;
