/** @type {import('next').NextConfig} */
const nextConfig = {
	/* config options here */
	reactCompiler: true,
	skipTrailingSlashRedirect: true,
    images:{
        remotePatterns:[
            {
                protocol: 'https',
                hostname: "aperture.ai"
            }
        ]
    },
    allowedDevOrigins:['*.ngrok-free.app']
};

export default nextConfig;
