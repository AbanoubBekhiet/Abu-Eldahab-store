/** @type {import('next').NextConfig} */
const nextConfig = {
	/* config options here */
	reactCompiler: true,
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "vyojzehexdatndltudup.supabase.co",
				port: "",
				pathname: "/storage/v1/object/public/**",
			},
				images: {
		unoptimized: true,
	},
		],
	},
};

export default nextConfig;
