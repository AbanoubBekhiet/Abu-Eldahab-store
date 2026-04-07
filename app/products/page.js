import { Suspense } from "react";
import { ProductsFilter } from "../_components/ProductsFIlter";
import ProductsList from "../_components/ProductsList";
import { getCategories, getProductsWithPagintion } from "../_libs/APIs";
import Spinner from "../_components/Spinner";
import ProductsPagination from "../_components/ProductsPagination";

export const metadata = {
	title: "المنتجات",
	description:
		"هتلاقي عند ابو الدهب كل اللي بتدور عليه من منتجات بجودة عالية واسعار منافسة من خردوات و منظفات و ورقيات و ادوات مكتبية",
};

async function page({ searchParams }) {
	const params = await searchParams;
	const [productsData, categories] = await Promise.all([
		getProductsWithPagintion(params),
		getCategories(),
	]);
	const { products, count, limit } = productsData;
	const totalPages = Math.ceil((count || 0) / limit) || 1;
	const currentPage = parseInt(params?.page) || 1;

	return (
		<div className="w-full">
			<ProductsFilter categories={categories} />
			<Suspense fallback={<Spinner />} key={products}>
				<ProductsList products={products} />
			</Suspense>
			<ProductsPagination productsLength={products.length} totalPages={totalPages} currentPage={currentPage} />
		</div>
	);
}

export default page;
