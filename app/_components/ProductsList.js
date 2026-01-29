import ProductCard from "./ProductCard";

function ProductsList({ products, params, categories }) {
	const filter = params?.filter ?? "كل المنتجات";
	const search = params?.search;
	let displayedProducts = products;
	if (filter !== "كل المنتجات") {
		const category = categories.find((category) => category.name === filter);
		if (category) {
			displayedProducts = products.filter(
				(product) => product.category_id === category.id,
			);
		}
	}
	if (params?.search&&params?.search!=="لا يوجد") {
		displayedProducts = products.filter((product) =>
			product.name.includes(search),
		);
	}

	return (
		<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-10">
			{displayedProducts.map((product) => (
				<ProductCard product={product} key={product.id} />
			))}
		</div>
	);
}

export default ProductsList;
