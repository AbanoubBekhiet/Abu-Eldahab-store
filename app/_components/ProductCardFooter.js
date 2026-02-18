"use client";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { CardFooter } from "@/components/ui/card";
import { useDispatch, useSelector } from "react-redux";
import { insertCartProduct } from "../_libs/APIs";
import { addToCart } from "../store/cartSlice";
import { toast } from "react-toastify";
import { redirect } from "next/navigation";

function ProductCardFooter({ product, user }) {
	const dispatch = useDispatch();
	const items = useSelector((state) => state.cart.items);
	function isItemExisted() {
		return items.some((item) => item.product_id === product.id);
	}

	const handleAddToCart = async () => {
		try {
			const existed = isItemExisted();
			if (existed === false) {
				if (!user) {
					toast.info("يجب تسجيل الدخول لإضافة منتجات إلي السلة");
					setTimeout(() => {
						redirect("/auth/signin");
					}, 300);
				} else {
					await insertCartProduct(user.id, product);
					dispatch(addToCart(product));
					toast.success("تم إضافة المنتج للسلة بنجاح");
				}
			} else {
				toast.info("تم إضافة المنتج للسلة بالفعل لتعديل الكمية إذهب للسلة");
			}
		} catch (error) {
			console.error("Failed to add product to cart:", error);
		}
	};

	return (
		<CardFooter>
			{product?.available ? (
				<Button
					onClick={handleAddToCart}
					variant="outline"
					size="lg"
					className="bg-[var(--color-one)] text-[var(--color-four)] text-1.5xl font-bold"
				>
					<ShoppingCart />
					اضف للسلة
				</Button>
			) : (
				<Button
					variant="outline"
					size="lg"
					className=" cursor-not-allowed bg-[var(--color-one)] text-[var(--color-four)] text-1.5xl font-bold"
				>
					<ShoppingCart />
					نفذت الكمية
				</Button>
			)}
		</CardFooter>
	);
}

export default ProductCardFooter;
