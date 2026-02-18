import default_image from "@/public/default_image.webp";
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import ProductCardFooter from "./ProductCardFooter";

const image_path =
    "https://vyojzehexdatndltudup.supabase.co/storage/v1/object/public/products_images";

export default function ProductCard({ product, user }) {
    const isAvailable = product?.available;

    return (
        <Card 
            className={`relative w-full max-w-sm pt-0 overflow-hidden bg-[var(--color-four)] border border-[var(--color-one)] flex flex-col transition-all duration-300 ${
                !isAvailable ? "opacity-70 shadow-none" : ""
            }`}
        >
            {!isAvailable && (
                <div className="absolute top-4 left-4 z-50 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg transform -rotate-12 border border-white">
                    غير متوفر
                </div>
            )}

            <div className={`relative w-full min-h-60 inset-0 z-30 aspect-video overflow-hidden ${!isAvailable ? "bg-gray-100" : ""}`}>
                <Image
                    src={
                        product?.image_url
                            ? `${image_path}/${product.image_url.trim()}`
                            : default_image
                    }
                    fill
                    alt={product?.name ?? "Product image"}
                    className={`z-20 aspect-video w-full object-contain brightness-90 transition-all ${
                        !isAvailable ? "grayscale contrast-75 brightness-75" : "brightness-80"
                    }`}
                />
                
                {!isAvailable && <div className="absolute inset-0 bg-black/5 z-25" />}
            </div>

            <CardHeader className="flex-1">
                <CardTitle className={`text-[var(--color-one)] text-xl min-h-24 sm:text-2xl ${!isAvailable ? "text-gray-500" : ""}`}>
                    {product?.name}
                </CardTitle>
                <CardDescription className="text-[var(--color-one)] min-h-16">
                    <div className={!isAvailable ? "text-gray-400" : ""}>
                        <span className="text-2xl font-extrabold">
                            {product?.price_of_packet} ج.م
                        </span>
                        <span>
                            /
                            {!product?.number_of_pieces_in_packet ||
                            product?.number_of_pieces_in_packet === 0
                                ? "1"
                                : product?.number_of_pieces_in_packet}{" "}
                            قطعة{" "}
                        </span>
                    </div>
                </CardDescription>
            </CardHeader>

            <ProductCardFooter product={product} user={user} />
        </Card>
    );
}