export default function robots() {
	return {
		rules: {
			userAgent: "*",
			allow: "/",
			disallow: ["/tmp/"],
		},
		sitemap: "https://abu-eldahab.vercel.app/sitemap.xml",
	};
}
