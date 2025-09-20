/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        remotePatterns: [{hostname: "images.pexels.com"}],
        domains: ["img.freepik.com"], 

    }
};

export default nextConfig;
