"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

const PAGE_LIMIT = 30;

function ProductsPagination({ productsLength, totalPages, currentPage }) {
    const router = useRouter();
    const searchParams = useSearchParams();

    function createPageURL(pageNumber) {
        const params = new URLSearchParams(searchParams);
        params.set("page", pageNumber.toString());
        return `/products?${params.toString()}`;
    }

    function handleNextPage() {
        if (totalPages !== undefined) {
            if (currentPage >= totalPages) return;
        } else {
            if (productsLength < PAGE_LIMIT) return;
        }
        router.push(createPageURL(currentPage + 1));
    }

    function handlePrevPage() {
        if (currentPage <= 1) return;
        router.push(createPageURL(currentPage - 1));
    }

    return (
        <div className="flex items-center justify-center gap-8 mt-8" dir="rtl">
            <button
                className="p-3 bg-[var(--color-one)] text-white rounded-full cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                disabled={currentPage <= 1}
                onClick={handlePrevPage}
            >
                <ChevronRight size={24} />
            </button>

            <span className="text-lg font-bold text-[var(--color-one)]">
                صفحة {currentPage} من {totalPages || 1}
            </span>

            <button
                className="p-3 bg-[var(--color-one)] text-white rounded-full cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                disabled={totalPages !== undefined ? currentPage >= totalPages : productsLength < PAGE_LIMIT}
                onClick={handleNextPage}
            >
                <ChevronLeft size={24} />
            </button>
        </div>
    );
}

export default ProductsPagination;