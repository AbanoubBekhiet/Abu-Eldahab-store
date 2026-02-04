import { Suspense } from "react";
import { ProductsFilter } from "../_components/ProductsFIlter";
import ProductsList from "../_components/ProductsList";
import { getCategories, getProductsWithPagintion } from "../_libs/APIs";
import Spinner from "../_components/Spinner";
import ProductsPagination from "../_components/ProductsPagination";

async function page({ searchParams }) {
	const params = await searchParams;
	const [products, categories] = await Promise.all([
		getProductsWithPagintion(params),
		getCategories(),
	]);
	return (
		<div className="w-full">
			<ProductsFilter categories={categories} />
			<Suspense fallback={<Spinner />} key={products}>
				<ProductsList products={products} />
			</Suspense>
			<ProductsPagination productsLength={products.length} params={params} />
		</div>
	);
}

export default page;
