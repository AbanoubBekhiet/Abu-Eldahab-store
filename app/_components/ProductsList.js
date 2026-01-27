import ProductCard from "./ProductCard";

function ProductsList() {
	return (
		<div className="grid grid-cols-2 sm:grid-cols-3  md:grid-cols-4  gap-10">
			<ProductCard />
			<ProductCard />
			<ProductCard />
			<ProductCard />
			<ProductCard />
			<ProductCard />
			<ProductCard />
			<ProductCard />
		</div>
	);
}

export default ProductsList;
