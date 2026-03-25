import ProductCard from "./ProductCard";
import { getUserData } from "../_libs/actions";
import EmptyProducts from "./EmptyProducts";

async function ProductsList({ products }) {
	const user = await getUserData();
	if (products.length == 0) {
		return (
			<div className="flex items-center justify-center ">
				<EmptyProducts />
			</div>
		);
	}
	return (
		<div className="grid grid-cols-2 sm:grid-cols-3  lg:grid-cols-5 gap-4">
			{products.map((product) => (
				<ProductCard product={product} key={product.id} user={user} />
			))}
		</div>
	);
}

export default ProductsList;
