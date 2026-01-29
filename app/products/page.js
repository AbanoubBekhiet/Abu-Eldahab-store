import { Suspense } from "react";
import { ProductsFilter } from "../_components/ProductsFIlter";
import ProductsList from "../_components/ProductsList";
import { getCategories, getProducts } from "../_libs/APIs";
import Spinner from "../_components/Spinner";
export const dynamic = "force-dynamic";
export const revalidate = 0;

async function page({ searchParams }) {
	const [products, categories] = await Promise.all([
		getProducts(),
		getCategories(),
	]);
	const params = await searchParams;
	return (
		<div className="w-full">
			<ProductsFilter categories={categories} />
			<Suspense fallback={<Spinner />} key={products}>
				<ProductsList
					products={products}
					params={params}
					categories={categories}
				/>
			</Suspense>
		</div>
	);
}

export default page;
