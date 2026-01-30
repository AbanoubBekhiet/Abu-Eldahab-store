import default_image from "@/public/default_image.webp";
import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import ProductCardFooter from "./ProductCardFooter";
const IMAGE_PATH =
	"https://vyojzehexdatndltudup.supabase.co/storage/v1/object/public/products_images";

export default function ProductCard({ product, user }) {
	return (
		<Card className="relative mx-auto w-full max-w-sm pt-0 overflow-hidden bg-[var(--color-four)] border border-[var(--color-one)] flex flex-col">
			<div className="relative w-full h-60 inset-0 z-30 aspect-video">
				<Image
					src={
						product?.image_url
							? `${IMAGE_PATH}/${product.image_url}`
							: default_image
					}
					fill
					alt={product?.name ?? "Product image"}
					sizes="100vw"
					className="z-20 aspect-video w-full object-cover brightness-80  "
				/>
			</div>
			<CardHeader className="flex-1">
				<CardTitle className="text-[var(--color-one)] ">
					{product.name}
				</CardTitle>
				<CardDescription className="text-[var(--color-one)]">
					<div>
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
