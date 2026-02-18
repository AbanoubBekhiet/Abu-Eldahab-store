"use client";
import { Button } from "@/components/ui/button";
import { getProductsForSpecificCategory } from "../_libs/APIs";
import ProductCard from "./ProductCard";
import { ChevronLeft, ChevronRight, MoveRight } from "lucide-react";
import { useEffect, useState, useRef, useCallback } from "react";
import Link from "next/link";

const ITEMS_PER_PAGE = 15;

function HomeProductsList({ category, user }) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const scrollRef = useRef(null);
    
    // Refs to keep values sync'd inside event listeners without closure staleness
    const loadingRef = useRef(loading);
    const hasMoreRef = useRef(hasMore);
    const lastIdRef = useRef(0);

    useEffect(() => {
        loadingRef.current = loading;
        hasMoreRef.current = hasMore;
        if (products.length > 0) {
            lastIdRef.current = products[products.length - 1].incre_id;
        }
    }, [loading, hasMore, products]);

    useEffect(() => {
        setProducts([]);
        setHasMore(true);
        lastIdRef.current = 0;
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

            if (!fetchedProducts || fetchedProducts.length < ITEMS_PER_PAGE) {
                setHasMore(false);
            }

            if (fetchedProducts && fetchedProducts.length > 0) {
                setProducts((prev) => {
                    if (isInitial) return fetchedProducts;
                    const existingIds = new Set(prev.map((p) => p.id));
                    const uniqueNew = fetchedProducts.filter(
                        (p) => !existingIds.has(p.id),
                    );
                    return [...prev, ...uniqueNew];
                });
            }
        } catch (error) {
            console.error("Error fetching products:", error);
        } finally {
            setLoading(false);
        }
    }

    // New: Handle scroll for both mobile (swipe) and desktop (button results)
    const handleScroll = useCallback(() => {
        if (!scrollRef.current || loadingRef.current || !hasMoreRef.current) return;

        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        
        // In RTL, scrollLeft is usually 0 at the start and becomes more negative as you scroll left
        const scrollPos = Math.abs(scrollLeft);
        const isNearEnd = scrollPos + clientWidth >= scrollWidth - 800; // 800px threshold for smoother loading

        if (isNearEnd) {
            fetchProducts(lastIdRef.current);
        }
    }, []);

    const handleScrollNavigation = (direction) => {
        if (!scrollRef.current) return;
        const container = scrollRef.current;

        const cardWidth = container.querySelector("div")?.offsetWidth || 200;
        const scrollAmount = cardWidth * 2; 

        const multiplier = direction === "left" ? -1 : 1;
        container.scrollBy({ left: scrollAmount * multiplier, behavior: "smooth" });
        
        // No need to call fetchProducts here anymore; handleScroll will catch the movement
    };

    if (products.length === 0 && !loading) return null;

    return (
        <section className="my-12" dir="rtl">
            <header className="flex items-center justify-between p-4 mb-6 bg-[var(--color-three)] rounded-xl">
                <h3 className="text-[var(--color-one)] text-xl font-bold">
                    {category.name}
                </h3>
                <Link href={`/products?filter=${category.name}&search=لا+يوجد`}>
                    <Button
                        variant="outline"
                        className="text-[var(--color-one)] gap-2 h-9 text-sm"
                    >
                        عرض الكل <MoveRight size={18} className="rotate-180" />
                    </Button>
                </Link>
            </header>

            <div className="relative group w-full">
                {/* Desktop Navigation Buttons */}
                <button
                    className="absolute -right-2 top-1/2 -translate-y-1/2 z-50 bg-[var(--color-one)] rounded-full p-2 shadow-xl hover:scale-110 transition-all opacity-0 group-hover:opacity-100 hidden md:flex items-center justify-center border border-white"
                    onClick={() => handleScrollNavigation("right")}
                >
                    <ChevronRight className="text-white" size={20} />
                </button>

                <button
                    className="absolute -left-2 top-1/2 -translate-y-1/2 z-50 bg-[var(--color-one)] rounded-full p-2 shadow-xl hover:scale-110 transition-all opacity-0 group-hover:opacity-100 hidden md:flex items-center justify-center border border-white"
                    onClick={() => handleScrollNavigation("left")}
                >
                    <ChevronLeft className="text-white" size={20} />
                </button>

                {/* Main Scroll Container */}
                <div
                    ref={scrollRef}
                    onScroll={handleScroll} // <--- Listens for both swipe and button-driven scrolls
                    className="flex gap-3 overflow-x-auto scroll-smooth py-2 no-scrollbar flex-nowrap w-full"
                    style={{ 
                        scrollbarWidth: "none", 
                        msOverflowStyle: "none",
                        WebkitOverflowScrolling: "touch" // Added for iOS momentum scrolling
                    }}
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
                                    key={`skeleton-${i}`}
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