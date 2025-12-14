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
            },
            {
                protocol: 'https',
                hostname: "www.dpgpolytechnic.com"
            },            {
                protocol: 'https',
                hostname: ""
            },

        ]
    },
    allowedDevOrigins:['*.ngrok-free.app']
};

export default nextConfig;
