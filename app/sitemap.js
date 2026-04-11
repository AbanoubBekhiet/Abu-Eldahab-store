import { getCategories } from "./_libs/APIs";

export default async function sitemap() {
	const baseUrl = "https://abu-eldahab.vercel.app";

	// Static routes
	const staticRoutes = ["", "/about", "/contact", "/categories", "/products"].map((route) => ({
		url: `${baseUrl}${route}`,
		lastModified: new Date(),
		changeFrequency: "weekly",
		priority: route === "" ? 1 : 0.8,
	}));

	try {
		const categories = await getCategories();
		const categoryRoutes = categories.map((cat) => ({
			url: `${baseUrl}/products?filter=${encodeURIComponent(cat.name)}&search=${encodeURIComponent("لا يوجد")}&page=1`,
			lastModified: new Date(),
			changeFrequency: "weekly",
			priority: 0.6,
		}));

		return [...staticRoutes, ...categoryRoutes];
	} catch (error) {
		console.error("Sitemap generation error:", error);
		return staticRoutes;
	}
}
