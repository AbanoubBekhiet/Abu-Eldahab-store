"use client";
import { Button } from "@/components/ui/button";
import { getProductsForSpecificCategory } from "../_libs/APIs";
import ProductCard from "./ProductCard";
import { ChevronLeft, ChevronRight, MoveRight } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";

const ITEMS_PER_PAGE = 15;

function HomeProductsList({ category, user }) {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(false);
	const [hasMore, setHasMore] = useState(true);
	const scrollRef = useRef(null);

	useEffect(() => {
		setProducts([]);
		setHasMore(true);
		fetchProducts(0, true);
	}, [category.id]);

	async function fetchProducts(lastId, isInitial = false) {
		if (loading || (!isInitial && !hasMore)) return;
		setLoading(true);
		try {
			const fetchedProducts = await getProductsForSpecificCategory(
				category.id,
				lastId,
				ITEMS_PER_PAGE,
			);
			if (fetchedProducts.length < ITEMS_PER_PAGE) setHasMore(false);
			setProducts((prev) => {
				if (isInitial) return fetchedProducts;
				const existingIds = new Set(prev.map((p) => p.id));
				const uniqueNew = fetchedProducts.filter((p) => !existingIds.has(p.id));
				return [...prev, ...uniqueNew];
			});
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	}

	const handleScrollNavigation = (direction) => {
		if (!scrollRef.current) return;
		const container = scrollRef.current;
		const cardWidth = container.firstChild?.offsetWidth || 200;
		const scrollAmount = cardWidth * 3;

		const currentScroll = container.scrollLeft;
		const newScrollGoal =
			direction === "left"
				? currentScroll - scrollAmount
				: currentScroll + scrollAmount;

		container.scrollTo({ left: newScrollGoal, behavior: "smooth" });

		const triggerThreshold = cardWidth * 2.5;
		const remainingSpace =
			container.scrollWidth - (Math.abs(newScrollGoal) + container.clientWidth);

		if (
			direction === "right" &&
			remainingSpace < triggerThreshold &&
			hasMore &&
			!loading
		) {
			const lastId = products[products.length - 1]?.incre_id;
			if (lastId) fetchProducts(lastId);
		}
	};

	if (products.length === 0 && !loading) return null;

	return (
		<section className="my-12">
			<header className="flex items-center justify-between p-4 mb-6 bg-[var(--color-three)] rounded-xl">
				<h3 className="text-[var(--color-one)] text-xl font-bold">
					{category.name}
				</h3>
				<Link href={`/products?filter=${category.name}&search=لا+يوجد`}>
					<Button
						variant="outline"
						className="text-[var(--color-one)] gap-2 h-9 text-sm"
					>
						<MoveRight size={18} /> عرض الكل
					</Button>
				</Link>
			</header>

			<div className="relative group w-full">
				<button
					className="absolute -right-2 top-1/2 -translate-y-1/2 z-50 bg-[var(--color-one)] rounded-full p-2 shadow-xl hover:scale-110 transition-all opacity-0 group-hover:opacity-100 hidden md:flex items-center justify-center border border-white"
					onClick={() => handleScrollNavigation("left")}
				>
					<ChevronRight className="text-white" size={20} />
				</button>

				<button
					className="absolute -left-2 top-1/2 -translate-y-1/2 z-50 bg-[var(--color-one)] rounded-full p-2 shadow-xl hover:scale-110 transition-all opacity-0 group-hover:opacity-100 hidden md:flex items-center justify-center border border-white"
					onClick={() => handleScrollNavigation("right")}
				>
					<ChevronLeft className="text-white" size={20} />
				</button>

				<div
					ref={scrollRef}
					className="flex gap-3 overflow-x-auto scroll-smooth py-2 no-scrollbar flex-nowrap w-full"
					style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
				>
					{products.map((product) => (
						<div
							key={product.id}
							className="min-w-[160px] sm:min-w-[200px] max-w-[280px] sm:max-w-[320px] flex-shrink-0"
						>
							<ProductCard product={product} user={user} />
						</div>
					))}

					{loading && (
						<div className="flex gap-3">
							{[...Array(4)].map((_, i) => (
								<div
									key={i}
									className="min-w-[160px] sm:min-w-[200px] h-[280px] bg-gray-100 animate-pulse rounded-lg"
								/>
							))}
						</div>
					)}
				</div>
			</div>
		</section>
	);
}

export default HomeProductsList;
