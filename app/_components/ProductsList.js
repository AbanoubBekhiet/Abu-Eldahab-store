import ProductCard from "./ProductCard";
import { getUserData } from "../_libs/actions";
import EmptyProducts from "./EmptyProducts";

async function ProductsList({ products, params, categories }) {
	const user = await getUserData();
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
	if (params?.search && params?.search !== "لا يوجد") {
		displayedProducts = products.filter((product) =>
			product.name.includes(search),
		);
	}
	if (displayedProducts.length == 0) {
		return (
			<div className="flex items-center justify-center ">
				<EmptyProducts />
			</div>
		);
	}
	return (
		<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
			{displayedProducts.map((product) => (
				<ProductCard product={product} key={product.id} user={user} />
			))}
		</div>
	);
}

export default ProductsList;
