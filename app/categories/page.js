import { getCategories } from "../_libs/APIs";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export const metadata = {
	title: "الفئات",
	description: "تصفح جميع فئات المنتجات المتاحة لدينا.",
};

export default async function CategoriesPage() {
	const categories = await getCategories();

	return (
		<div className="w-full p-5 max-w-7xl mx-auto my-10 min-h-screen">
			<div className="flex justify-center mb-10">
				<h1 className="text-4xl font-bold text-center text-[var(--color-one)] border-b-4 border-[var(--color-two)] inline-block pb-2">
					تسوق حسب الفئات
				</h1>
			</div>
			
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
				{categories.map((category) => {
					const params = new URLSearchParams();
					params.set("filter", category.name);
					params.set("search", "لا يوجد");
					params.set("page", "1");
					const href = `/products?${params.toString()}`;

					return (
						<Link key={category.id} href={href} className="flex h-full w-full">
							<Card className="hover:-translate-y-2 hover:shadow-[0_10px_20px_rgba(0,0,0,0.1)] transition-all duration-300 w-full h-full flex flex-col justify-center min-h-[160px] border-2 border-[var(--color-one)] bg-white overflow-hidden group">
								<CardHeader className="flex flex-col items-center justify-center p-6 bg-[var(--color-one)] group-hover:bg-[var(--color-two)] transition-colors duration-300 h-full">
									<CardTitle className="text-center text-3xl font-bold text-white tracking-wide">
										{category.name}
									</CardTitle>
								</CardHeader>
							</Card>
						</Link>
					);
				})}
			</div>
		</div>
	);
}
