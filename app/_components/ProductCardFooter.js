"use client";
import { Button } from "@/components/ui/button";
import { Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";
import { CardFooter } from "@/components/ui/card";
import { useDispatch, useSelector } from "react-redux";
import { insertCartProduct } from "../_libs/APIs";
import { addToCart } from "../store/cartSlice";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { deleteCartProduct, updateCartProduct } from "../_libs/APIs";
import { removeFromCart, updateItem } from "../store/cartSlice";
import { useMemo } from "react";
function ProductCardFooter({ product, user }) {
	const dispatch = useDispatch();
	const items = useSelector((state) => state.cart.items);
	const router = useRouter();
	function isItemExisted() {
		return items.some((item) => item.product_id === product.id);
	}
	const itemExists = isItemExisted();
	let existingItem = null;
	if (itemExists) {
		existingItem = items.find((item) => item.product_id === product.id);
	}
	const handleAddToCart = async () => {
		try {
			const existed = isItemExisted();
			if (existed === false) {
				if (!user) {
					toast.info("يجب تسجيل الدخول لإضافة منتجات إلي السلة");
					setTimeout(() => {
						const currentPath = window.location.pathname + window.location.search;
						router.push(`/auth/signin?returnTo=${encodeURIComponent(currentPath)}`);
					}, 300);
				} else {
					await insertCartProduct(user.id, product);
					dispatch(addToCart({ ...product, user_id: user.id }));
					toast.success("تم إضافة المنتج للسلة بنجاح");
				}
			} else {
				toast.info("تم إضافة المنتج للسلة بالفعل لتعديل الكمية إذهب للسلة");
			}
		} catch (error) {
			console.error("Failed to add product to cart:", error);
		}
	};
	function onRemove() {
		dispatch(removeFromCart(existingItem?.product_id));
		deleteCartProduct(existingItem?.product_id, existingItem?.user_id);
		toast.success("تم إزالة المنتج من السلة");
	}
	function onDecreasePackets() {
		if (existingItem?.number_of_packets <= 0) {
			toast.warn("عدد العبوات صفر بالفعل");
			return;
		}

		const nextValue = existingItem.number_of_packets - 1;

		dispatch(
			updateItem({
				product_id: existingItem.product_id,
				number_of_packets: nextValue,
				number_of_pieces: existingItem.number_of_pieces,
			}),
		);
		updateCartProduct(
			existingItem.product_id,
			existingItem.user_id,
			nextValue,
			existingItem.number_of_pieces,
		);
	}

	function onIncreasePackets() {
		const nextValue = (existingItem?.number_of_packets || 0) + 1;

		dispatch(
			updateItem({
				product_id: existingItem.product_id,
				number_of_packets: nextValue,
				number_of_pieces: existingItem.number_of_pieces,
			}),
		);

		updateCartProduct(
			existingItem.product_id,
			existingItem.user_id,
			nextValue,
			existingItem.number_of_pieces,
		);
	}

	function onDecreasePieces() {
		if (existingItem?.number_of_pieces <= 0) {
			toast.warn("عدد القطع صفر بالفعل");
			return;
		}

		const nextValue = existingItem.number_of_pieces - 1;

		dispatch(
			updateItem({
				product_id: existingItem.product_id,
				number_of_packets: existingItem.number_of_packets,
				number_of_pieces: nextValue,
			}),
		);
		updateCartProduct(
			existingItem.product_id,
			existingItem.user_id,
			existingItem.number_of_packets,
			nextValue,
		);
	}

	function onIncreasePieces() {
		const nextValue = (existingItem?.number_of_pieces || 0) + 1;

		dispatch(
			updateItem({
				product_id: existingItem.product_id,
				number_of_packets: existingItem.number_of_packets,
				number_of_pieces: nextValue,
			}),
		);

		updateCartProduct(
			existingItem.product_id,
			existingItem.user_id,
			existingItem.number_of_packets,
			nextValue,
		);
	}

	const totalPriceOfProduct = useMemo(() => {
		if (!existingItem) return 0;
		const total =
			(existingItem.number_of_pieces || 0) *
				(existingItem.price_of_piece || 0) +
			(existingItem.number_of_packets || 0) *
				(existingItem.price_of_packet || 0);
		return Number(total.toFixed(2));
	}, [existingItem]);
	return (
		<CardFooter>
			{product?.available ? (
				itemExists ? (
					<div className="w-rounded-xl border border-gray-200 bg-white p-5 shadow-xl rounded-2xl w-full">
						<div className="mt-6 flex flex-col gap-6 ">
							<div>
								<div className="flex items-center justify-around flex-wrap gap-2 rounded-lg border border-[var(--color-one)] text-[var(--color-one)] p-2 mb-4">
									<button
										onClick={onIncreasePackets}
										className="rounded-md bg-gray-100 p-1 hover:bg-gray-200"
									>
										<Plus size={16} />
									</button>
									<span className="min-w-[24px] text-center text-lg font-bold">
										{existingItem?.number_of_packets} عبوة
									</span>
									<button
										onClick={onDecreasePackets}
										className="rounded-md bg-gray-100 p-1 hover:bg-gray-200"
									>
										<Minus size={16} />
									</button>
								</div>

								{product?.accepts_pieces && (
									<div>
										<div className="flex items-center justify-around flex-wrap gap-2 rounded-lg border border-[var(--color-one)] text-[var(--color-one)] p-2 mb-4">
											<button
												onClick={onIncreasePieces}
												className="rounded-md bg-gray-100 p-1 hover:bg-gray-200"
											>
												<Plus size={16} />
											</button>
											<span className="min-w-[24px] text-center text-lg font-bold">
												{existingItem?.number_of_pieces} قطعة
											</span>

											<button
												onClick={onDecreasePieces}
												className="rounded-md bg-gray-100 p-1 hover:bg-gray-200"
											>
												<Minus size={16} />
											</button>
										</div>
									</div>
								)}
							</div>
						</div>
						<div className="flex flex-col ">
							<div className="my-2 text-right text-lg font-bold text-[var(--color-one)] ">
								الإجمالي : {totalPriceOfProduct} ج.م
							</div>
							<button
								onClick={onRemove}
								className=" flex items-center justify-center gap-1 rounded-md border border-red-500 px-2 py-1 text-lg font-bold text-red-500 hover:bg-red-50 m-auto"
							>
								<Trash2 size={20} />
								إزالة
							</button>
						</div>
					</div>
				) : (
					<Button
						onClick={handleAddToCart}
						variant="outline"
						size="lg"
						className="bg-[var(--color-one)] text-[var(--color-four)] text-1.5xl font-bold"
					>
						<ShoppingCart />
						اضف للسلة
					</Button>
				)
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
