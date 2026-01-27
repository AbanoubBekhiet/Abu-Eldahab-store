import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import default_image from "@/public/default_image.webp";
import {
	Card,
	CardAction,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { ShoppingCart } from "lucide-react";

export default function ProductCard({ image }) {
	return (
		<Card className="relative mx-auto w-full max-w-sm pt-0 overflow-hidden bg-[var(--color-four)] border border-[var(--color-one)]">
			<div className="absolute inset-0 z-30 aspect-video" />
			<Image
				src={image ?? default_image}
				alt="Event cover"
				className="relative z-20 aspect-video w-full object-cover brightness-60 grayscale dark:brightness-40 "
			/>
			<CardHeader className="">
				<CardAction>
					<Badge variant="secondary">Featured</Badge>
				</CardAction>
				<CardTitle className="text-[var(--color-one)] ">
					شكارة مسحوق فل 9 كيلو
				</CardTitle>
				<CardDescription className="text-[var(--color-one)]">
					<div>
						<span className="text-2xl font-extrabold">163 </span>
						<span>ج.م / للوحدة</span>
					</div>
				</CardDescription>
			</CardHeader>
			<CardFooter>
				<Button
					variant="outline"
					size="lg"
					className="bg-[var(--color-one)] text-[var(--color-four)] text-1.5xl font-bold"
				>
					<ShoppingCart />
					اضف للسلة
				</Button>
			</CardFooter>
		</Card>
	);
}
