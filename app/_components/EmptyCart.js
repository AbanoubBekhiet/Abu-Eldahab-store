import { Button } from "@/components/ui/button";
import {
	Empty,
	EmptyContent,
	EmptyDescription,
	EmptyHeader,
	EmptyMedia,
	EmptyTitle,
} from "@/components/ui/empty";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";

export default function EmptyCart() {
	return (
		<div className="flex h-[50vh]">
			<Empty className="border border-dashed ">
				<EmptyHeader>
					<EmptyMedia variant="icon">
						<ShoppingCart />
					</EmptyMedia>
					<EmptyTitle>السلة فارغة</EmptyTitle>
					<EmptyDescription>
						لا توجد اي منتجات في السلة قم بالتسوق
					</EmptyDescription>
				</EmptyHeader>
				<EmptyContent>
					<Link href="/products">
						<Button variant="outline" size="sm">
							قم بالتسوق
						</Button>
					</Link>
				</EmptyContent>
			</Empty>
		</div>
	);
}
